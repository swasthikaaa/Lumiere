import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const FeaturedCollection = () => {
    const { products, addToCart, formatPrice } = useShop();

    // Get first 4 products for featured section
    const featuredProducts = products.slice(0, 4);

    if (featuredProducts.length === 0) {
        return (
            <section style={{ padding: 'var(--spacing-xl) 0' }}>
                <div className="container text-center">
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Featured Collection</h2>
                    <p style={{ color: '#666', marginBottom: '2rem' }}>No products available yet. Check back soon!</p>
                    <Link to="/shop" className="btn btn-primary">Visit Shop</Link>
                </div>
            </section>
        );
    }

    return (
        <section style={{ padding: 'var(--spacing-xl) 0' }}>
            <div className="container">
                <div className="text-center mb-lg">
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Featured Collection</h2>
                    <p style={{ color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                        Discover our curated selection of premium skincare essentials
                    </p>
                </div>

                <div className="featured-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    marginBottom: '3rem'
                }}>
                    {featuredProducts.map(product => (
                        <div key={product._id} className="fade-in-up" style={{
                            background: 'white',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            cursor: 'pointer'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}>
                            <div style={{
                                height: '320px',
                                background: '#f5f5f5',
                                overflow: 'hidden'
                            }}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <p style={{
                                    fontSize: '0.85rem',
                                    color: '#999',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    marginBottom: '0.5rem'
                                }}>
                                    {product.category}
                                </p>
                                <h3 style={{
                                    fontSize: '1.2rem',
                                    marginBottom: '0.5rem',
                                    fontWeight: 500
                                }}>
                                    {product.name}
                                </h3>
                                <p style={{
                                    color: '#666',
                                    fontSize: '0.9rem',
                                    marginBottom: '1rem',
                                    minHeight: '40px'
                                }}>
                                    {product.description?.substring(0, 80)}...
                                </p>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <span style={{
                                        fontSize: '1.3rem',
                                        fontWeight: 600
                                    }}>
                                        {formatPrice(product.price)}
                                    </span>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="btn btn-primary"
                                        style={{
                                            padding: '8px 20px',
                                            fontSize: '0.85rem'
                                        }}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Link to="/shop" className="btn btn-outline">
                        View All Products
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedCollection;
