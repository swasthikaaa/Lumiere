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
        <div style={{ paddingTop: '150px', paddingBottom: '4rem', minHeight: '100vh', background: 'var(--color-bg)' }}>
            <div className="container" style={{ maxWidth: '900px' }}>
                <h1 className="text-center mb-lg" style={{ fontSize: '3.5rem', fontFamily: 'var(--font-heading)' }}>My Wishlist</h1>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {wishlist.map(product => {
                        const prodId = product.productId || product.id || product._id;
                        const { formatPrice } = useShop();

                        return (
                            <div key={prodId} className="fade-in-up wishlist-item" style={{
                                display: 'flex',
                                gap: '2rem',
                                alignItems: 'center',
                                background: '#fff',
                                padding: '2rem',
                                border: '1px solid #eee',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                            }}>
                                <div style={{ width: '150px', height: '200px', flexShrink: 0, overflow: 'hidden', background: '#f9f9f9' }}>
                                    <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} className="wish-img" />
                                </div>

                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{product.name}</h3>
                                            <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{formatPrice(product.price)}</span>
                                        </div>
                                        <p style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '1rem' }}>{product.category}</p>
                                    </div>

                                    <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                                        <button
                                            className="btn btn-primary"
                                            style={{ flex: 1 }}
                                            onClick={() => {
                                                addToCart(product);
                                                removeFromWishlist(prodId);
                                                navigate('/cart');
                                            }}
                                        >
                                            Add To Bag
                                        </button>
                                        <button
                                            onClick={() => removeFromWishlist(prodId)}
                                            style={{
                                                padding: '0 1.5rem',
                                                border: '1px solid #ddd',
                                                color: '#666',
                                                transition: 'all 0.3s'
                                            }}
                                            className="wish-remove-btn"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <style>{`
                .wishlist-item:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
                }
                .wishlist-item:hover .wish-img {
                    transform: scale(1.05);
                }
                .wish-remove-btn:hover {
                    background: #fdfdfd;
                    color: red;
                    border-color: red;
                }
                @media (max-width: 600px) {
                    .wishlist-item {
                        flex-direction: column !important;
                        padding: 1.5rem !important;
                        text-align: center;
                    }
                    .wishlist-item > div:first-child {
                        width: 100% !important;
                        height: 250px !important;
                    }
                    .wishlist-item div[style*="justify-content: space-between"] {
                        flex-direction: column !important;
                        align-items: center !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Wishlist;
