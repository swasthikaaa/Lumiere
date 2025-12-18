import React from 'react';
import { useShop } from '../context/ShopContext';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal, formatPrice } = useShop();
    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <div style={{ paddingTop: '150px', paddingBottom: '4rem', textAlign: 'center', minHeight: '60vh' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem' }}>Your Bag is Empty</h2>
                <Link to="/collections" className="btn btn-primary" style={{ marginTop: '2rem' }}>Start Shopping</Link>
            </div>
        )
    }

    return (
        <div style={{ paddingTop: '120px', paddingBottom: '4rem', minHeight: '100vh' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <h1 className="text-center mb-lg" style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)' }}>Your Bag</h1>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {cart.map(item => {
                        const price = typeof item.price === 'string'
                            ? parseFloat(item.price.replace(/[^0-9.-]+/g, ""))
                            : Number(item.price);

                        return (
                            <div key={item.productId} className="fade-in-up cart-item" style={{
                                display: 'flex', gap: '1.5rem', alignItems: 'center',
                                borderBottom: '1px solid #eee', paddingBottom: '1.5rem'
                            }}>
                                <div style={{ width: '100px', height: '120px', background: '#f9f9f9', flexShrink: 0 }}>
                                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>

                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{item.name}</h3>
                                        <span style={{ fontWeight: 600 }}>{formatPrice(item.price)}</span>
                                    </div>
                                    <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>{item.category}</p>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd' }}>
                                            <button
                                                onClick={() => updateQuantity(item.productId, -1)}
                                                style={{ width: '30px', height: '30px', border: 'none', background: 'transparent', cursor: 'pointer' }}
                                            >-</button>
                                            <span style={{ width: '30px', textAlign: 'center', fontSize: '0.9rem' }}>{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.productId, 1)}
                                                style={{ width: '30px', height: '30px', border: 'none', background: 'transparent', cursor: 'pointer' }}
                                            >+</button>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.productId)}
                                            style={{ color: '#888', textDecoration: 'underline', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.85rem' }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div style={{ marginTop: '3rem', borderTop: '2px solid #1A1A1A', paddingTop: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.2rem', fontWeight: 600 }}>
                        <span>Total</span>
                        <span>{formatPrice(cartTotal)}</span>
                    </div>
                    <button
                        onClick={() => navigate('/checkout')}
                        className="btn btn-primary"
                        style={{ width: '100%' }}
                    >
                        Proceed to Checkout
                    </button>
                    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                        <Link to="/collections" style={{ color: '#666', textDecoration: 'underline', fontSize: '0.9rem' }}>Continue Shopping</Link>
                    </div>
                </div>
            </div>
            <style>{`
                @media (max-width: 480px) {
                    .cart-item {
                        flex-direction: column !important;
                        align-items: flex-start !important;
                        gap: 1rem !important;
                    }
                    .cart-item > div:first-child {
                        width: 100% !important;
                        height: 200px !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Cart;
