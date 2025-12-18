import React from 'react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ id, _id, image, name, price, category }) => {
    const { addToCart, addToWishlist, formatPrice } = useShop();
    const navigate = useNavigate();
    const productId = id || _id;

    const handleWishlist = (e) => {
        e.stopPropagation(); // Prevent parent click if any
        addToWishlist({ id: productId, image, name, price, category });
        setTimeout(() => navigate('/wishlist'), 500); // Redirect after short delay for toast to be seen logic handled in context
    };

    return (
        <div className="product-card" style={{ cursor: 'pointer', position: 'relative' }}>
            {/* Wishlist Icon */}
            <button
                onClick={handleWishlist}
                style={{
                    position: 'absolute',
                    top: '10px', right: '10px',
                    zIndex: 2,
                    background: 'rgba(255,255,255,0.8)',
                    width: '35px', height: '35px', borderRadius: '50%',
                    border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.2rem', color: '#1A1A1A'
                }}
            >
                &#9825; {/* Empty Heart */}
            </button>

            <div style={{
                position: 'relative',
                overflow: 'hidden',
                marginBottom: '1rem',
                backgroundColor: '#F9F9F9',
                aspectRatio: '1/1.2'
            }} className="img-container">
                <img src={image} alt={name} style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease'
                }}
                    className="product-img"
                />
                {/* Quick Add Button Overlay handled via CSS group hover usually, but let's make it visible for now or use onclick */}
                <button
                    onClick={() => {
                        addToCart({ id: productId, image, name, price, category });
                        navigate('/cart');
                    }}
                    className="btn btn-primary"
                    style={{
                        position: 'absolute',
                        bottom: 0, left: 0, width: '100%',
                        padding: '1rem',
                        transform: 'translateY(100%)', // Hidden by default, CSS should handle hover
                        transition: 'transform 0.3s ease'
                    }}
                >
                    Add to Cart
                </button>
            </div>

            <div className="text-center">
                <div style={{
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    color: '#888',
                    letterSpacing: '0.05em',
                    marginBottom: '0.25rem'
                }}>{category}</div>
                <h3 style={{
                    fontSize: '1.2rem',
                    fontFamily: 'var(--font-heading)',
                    marginBottom: '0.5rem'
                }}>{name}</h3>
                <div style={{ color: 'var(--color-primary)', fontWeight: 500 }}>{formatPrice(price)}</div>
            </div>

            <style>{`
                .img-container:hover .product-img {
                    transform: scale(1.05);
                }
                .img-container:hover .btn-primary {
                    transform: translateY(0) !important;
                }
            `}</style>
        </div>
    );
};

export default ProductCard;
