import React, { useRef, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const SearchOverlay = () => {
    const { isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery, products } = useShop();
    const inputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isSearchOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isSearchOpen]);

    if (!isSearchOpen) return null;

    return (
        <div className="search-overlay" style={{
            position: 'fixed',
            top: 0, left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 2000,
            background: 'rgba(255,255,255,0.98)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '150px'
        }}>
            <button
                onClick={() => setIsSearchOpen(false)}
                style={{
                    position: 'absolute',
                    top: '2rem',
                    right: '2rem',
                    fontSize: '2rem',
                    color: '#333'
                }}
            >
                &times;
            </button>

            <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search for products..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        width: '100%',
                        border: 'none',
                        borderBottom: '2px solid #1A1A1A',
                        background: 'transparent',
                        fontSize: '2rem',
                        padding: '1rem',
                        fontFamily: 'var(--font-heading)',
                        outline: 'none',
                        textAlign: 'center'
                    }}
                />
                <p style={{ marginTop: '1rem', color: '#666' }}>Type to search and press Enter</p>

                {/* Search Results */}
                {searchQuery && (
                    <div style={{ marginTop: '4rem', textAlign: 'left' }}>
                        <p style={{ fontSize: '0.9rem', color: '#888', marginBottom: '2rem' }}>
                            {products.length} results for "{searchQuery}"
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '2rem' }}>
                            {products.map(product => {
                                const prodId = product.id || product._id || product.productId;
                                return (
                                    <div
                                        key={prodId}
                                        className="fade-in-up"
                                        onClick={() => {
                                            setIsSearchOpen(false);
                                            navigate('/shop');
                                        }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div style={{ height: '200px', background: '#f4f4f4', marginBottom: '1rem' }}>
                                            <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                        <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{product.name}</h4>
                                        <p style={{ fontSize: '0.9rem', color: '#666', fontWeight: 600 }}>{useShop().formatPrice(product.price)}</p>
                                    </div>
                                );
                            })}
                        </div>
                        {products.length === 0 && (
                            <p style={{ textAlign: 'center', color: '#999', marginTop: '2rem' }}>No products found.</p>
                        )}
                    </div>
                )}
            </div>
            <style>{`
                @media (max-width: 768px) {
                    .search-overlay {
                        padding-top: 100px !important;
                    }
                    .search-input {
                        font-size: 1.5rem !important;
                    }
                }
                @media (max-width: 480px) {
                    .search-overlay {
                        padding-top: 80px !important;
                    }
                    .search-input {
                        font-size: 1.2rem !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default SearchOverlay;
