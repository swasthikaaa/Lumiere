import React from 'react';
import { useShop } from '../context/ShopContext';
import { Link, useNavigate } from 'react-router-dom';

const Wishlist = () => {
    const { wishlist, removeFromWishlist, addToCart } = useShop();
    const navigate = useNavigate();

    if (wishlist.length === 0) {
        return (
            <div style={{ paddingTop: '150px', paddingBottom: '4rem', textAlign: 'center', minHeight: '60vh' }}>
                <h2>Your Wishlist is empty</h2>
                <Link to="/collections" className="btn btn-primary" style={{ marginTop: '2rem' }}>Start Shopping</Link>
            </div>
        )
    }

    return (
        <div style={{ paddingTop: '150px', paddingBottom: '4rem', minHeight: '100vh' }}>
            <div className="container">
                <h1 className="text-center mb-lg" style={{ fontSize: '3rem' }}>Your Wishlist</h1>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {wishlist.map(product => {
                        const prodId = product.productId || product.id || product._id;
                        return (
                            <div key={prodId} className="fade-in-up">
                                <div style={{ position: 'relative', height: '350px', marginBottom: '1rem', background: '#f9f9f9' }}>
                                    <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <button
                                        onClick={() => removeFromWishlist(prodId)}
                                        style={{
                                            position: 'absolute',
                                            top: '10px', right: '10px',
                                            background: 'rgba(255,255,255,0.8)',
                                            border: 'none',
                                            width: '30px', height: '30px',
                                            borderRadius: '50%',
                                            cursor: 'pointer',
                                            fontSize: '1.2rem',
                                            lineHeight: '1',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}
                                    >
                                        &times;
                                    </button>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{product.name}</h3>
                                        <p style={{ color: '#666', fontSize: '0.9rem' }}>{product.category}</p>
                                    </div>
                                    <span style={{ fontWeight: 600 }}>{useShop().formatPrice(product.price)}</span>
                                </div>
                                <button
                                    className="btn btn-secondary"
                                    style={{ width: '100%', marginTop: '1rem' }}
                                    onClick={() => {
                                        addToCart(product);
                                        removeFromWishlist(prodId);
                                        // Navigate to cart as requested
                                        navigate('/cart');
                                    }}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
