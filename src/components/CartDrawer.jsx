import React from 'react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
    const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal, formatPrice } = useShop();
    const navigate = useNavigate();

    if (!isCartOpen) return null;

    const handleCheckout = () => {
        setIsCartOpen(false);
        navigate('/checkout');
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 2000,
            display: 'flex',
            justifyContent: 'flex-end',
        }}>
            {/* Backdrop */}
            <div
                onClick={() => setIsCartOpen(false)}
                style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(0,0,0,0.5)',
                    cursor: 'pointer'
                }}
            ></div>

            {/* Drawer */}
            <div className="slide-in-right cart-drawer" style={{
                width: '100%',
                maxWidth: '400px',
                height: '100%',
                background: '#fff',
                position: 'relative',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem' }}>Your Bag ({cart.length})</h2>
                    <button onClick={() => setIsCartOpen(false)} style={{ fontSize: '1.5rem' }}>&times;</button>
                </div>

                {cart.length === 0 ? (
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                        Your bag is empty.
                    </div>
                ) : (
                    <>
                        <div style={{ flex: 1, overflowY: 'auto' }}>
                            {cart.map(item => {
                                return (
                                    <div key={item.productId} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                                        <div style={{ width: '80px', height: '80px', background: '#f4f4f4' }}>
                                            <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{item.name}</h4>
                                                <span>{formatPrice(item.price)}</span>
                                            </div>
                                            <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem' }}>{item.category}</p>

                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div style={{ border: '1px solid #ddd', display: 'flex', alignItems: 'center' }}>
                                                    <button onClick={() => updateQuantity(item.productId, -1)} style={{ padding: '0.25rem 0.5rem' }}>-</button>
                                                    <span style={{ padding: '0 0.5rem', fontSize: '0.9rem' }}>{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.productId, 1)} style={{ padding: '0.25rem 0.5rem' }}>+</button>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.productId)}
                                                    style={{ fontSize: '0.8rem', textDecoration: 'underline', color: '#999' }}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div style={{ paddingTop: '1.5rem', borderTop: '1px solid #eee' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontWeight: 600, fontSize: '1.2rem' }}>
                                <span>Total</span>
                                <span>{formatPrice(cartTotal)}</span>
                            </div>
                            <button onClick={handleCheckout} className="btn btn-primary" style={{ width: '100%' }}>Checkout</button>
                        </div>
                    </>
                )}
            </div>

            <style>{`
@keyframes slideInRight {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
}
@media (max-width: 480px) {
    .cart-drawer {
        padding: 1.5rem !important;
    }
}
`}</style>
        </div>
    );
};

export default CartDrawer;
