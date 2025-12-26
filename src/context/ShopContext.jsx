import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
    // Auth state
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [products, setProducts] = useState([]);

    // Login function
    const login = async (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);

        // Sync guest cart to server if needed
        if (cart.length > 0) {
            try {
                for (const item of cart) {
                    await fetch('/api/cart/add', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${newToken}`
                        },
                        body: JSON.stringify({
                            productId: item.productId,
                            name: item.name,
                            price: item.price,
                            image: item.image,
                            quantity: item.quantity
                        })
                    });
                }
                // After syncing, fetch the updated cart from server
                const res = await fetch('/api/cart', { headers: { 'Authorization': `Bearer ${newToken}` } });
                const data = await res.json();
                if (Array.isArray(data)) setCart(data);
            } catch (error) {
                console.error("Error syncing cart after login", error);
            }
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setCart([]);
        setWishlist([]);
        toast.success("Logged out");
    };

    // Fetch products
    const fetchProducts = async () => {
        try {
            const url = searchQuery
                ? `/api/products?search=${encodeURIComponent(searchQuery)}`
                : '/api/products';
            const res = await fetch(url);
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error("Failed to fetch products", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [searchQuery]);

    // Fetch Cart & Wishlist on Token Change
    useEffect(() => {
        if (token) {
            fetch('/api/cart', { headers: { 'Authorization': `Bearer ${token}` } })
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) setCart(data);
                })
                .catch(err => console.error(err));

            fetch('/api/wishlist', { headers: { 'Authorization': `Bearer ${token}` } })
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) setWishlist(data);
                })
                .catch(err => console.error(err));
        }
    }, [token]);

    // Add to cart
    const addToCart = async (product, quantity = 1) => {
        const prodId = product.productId || product.id || product._id;
        if (token) {
            try {
                const res = await fetch('/api/cart/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        productId: prodId,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        quantity
                    })
                });
                const data = await res.json();
                if (Array.isArray(data)) {
                    setCart(data);
                }
                toast.success('Added to Cart');
            } catch (error) {
                console.error(error);
                toast.error('Failed to add to cart');
            }
        } else {
            setCart(prev => {
                const existing = prev.find(item => item.productId === prodId);
                if (existing) {
                    return prev.map(item => item.productId === prodId ? { ...item, quantity: item.quantity + quantity } : item);
                }
                return [...prev, { ...product, productId: prodId, quantity }];
            });
            toast.success('Added to Cart (Login to save)');
        }
    };

    // Remove from cart
    const removeFromCart = async (id) => {
        if (token) {
            try {
                const res = await fetch(`/api/cart/remove/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                setCart(data);
            } catch (error) {
                console.error(error);
            }
        } else {
            setCart(prev => prev.filter(item => item.productId !== id));
        }
    };

    // Update quantity
    const updateQuantity = async (id, delta) => {
        const currentItem = cart.find(item => item.productId === id);
        if (!currentItem) return;

        const newQty = Math.max(1, currentItem.quantity + delta);

        if (token) {
            try {
                const res = await fetch(`/api/cart/update/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ quantity: newQty })
                });
                const data = await res.json();
                if (res.ok) {
                    setCart(data);
                }
            } catch (error) {
                console.error(error);
                toast.error('Failed to update quantity');
            }
        } else {
            setCart(prev => prev.map(item => {
                if (item.productId === id) {
                    return { ...item, quantity: newQty };
                }
                return item;
            }));
        }
    };

    const cartTotal = cart.reduce((total, item) => {
        let price = 0;
        if (typeof item.price === 'string') {
            price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
        } else if (typeof item.price === 'number') {
            price = item.price;
        }
        return total + (isNaN(price) ? 0 : price) * item.quantity;
    }, 0);

    // Wishlist Logic
    const addToWishlist = async (product) => {
        const prodId = product.productId || product.id || product._id;
        const exists = wishlist.find(item => item.productId === prodId);
        if (exists) {
            toast.error('Item already in wishlist');
            return;
        }

        if (token) {
            try {
                const res = await fetch('/api/wishlist/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        productId: prodId,
                        name: product.name,
                        price: product.price,
                        image: product.image
                    })
                });
                const data = await res.json();
                setWishlist(data);
                toast.success('Added to wishlist');
            } catch (error) {
                console.error(error);
                toast.error('Failed to add to wishlist');
            }
        } else {
            setWishlist(prev => [...prev, { ...product, productId: prodId }]);
            toast.success('Added to wishlist (Login to save)');
        }
    };

    const removeFromWishlist = async (id) => {
        if (token) {
            try {
                const res = await fetch(`/api/wishlist/remove/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                setWishlist(data);
                toast.success('Removed from wishlist');
            } catch (error) {
                console.error(error);
            }
        } else {
            setWishlist(prev => prev.filter(item => item.productId !== id));
            toast.success('Removed from wishlist');
        }
    };

    const clearCart = () => {
        setCart([]);
        if (token) {
            fetch('/api/cart/clear', {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            }).catch(console.error);
        }
    };

    const formatPrice = (price) => {
        let num = 0;
        if (typeof price === 'string') {
            num = parseFloat(price.replace(/[^0-9.-]+/g, ""));
        } else if (typeof price === 'number') {
            num = price;
        }
        return isNaN(num) ? 'Rs. 0.00' : `Rs. ${num.toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    const value = {
        token,
        login,
        logout,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartTotal,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        products,
        formatPrice,
        refreshProducts: fetchProducts
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};
