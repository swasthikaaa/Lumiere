import React from 'react';
import { Link } from 'react-router-dom';
import productImg from '../assets/product-1.png'; // Placeholder

const categories = [
    { name: 'Face', image: productImg, description: 'Serums, creams, and masks for a radiant complexion.' },
    { name: 'Body', image: productImg, description: 'Luxurious oils and lotions for soft, supple skin.' },
    { name: 'Mist', image: productImg, description: 'Refreshing mists to hydrate and revitalize.' },
    { name: 'Eyes', image: productImg, description: 'Targeted treatments for the delicate eye area.' },
    { name: 'Sets', image: productImg, description: 'Curated routines for complete care.' }
];

const Collections = () => {
    return (
        <div style={{ paddingTop: '120px', paddingBottom: '4rem' }}>
            <div className="container">
                <header className="text-center mb-lg">
                    <h1 className="fade-in-up" style={{ fontSize: '3rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>Our Collections</h1>
                    <p className="fade-in-up" style={{ maxWidth: '600px', margin: '0 auto', color: '#666' }}>
                        Discover our scientifically formulated ranges by category.
                    </p>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {categories.map((cat, index) => (
                        <Link
                            to={`/shop?category=${cat.name}`}
                            key={cat.name}
                            className="fade-in-up"
                            style={{ textDecoration: 'none', color: 'inherit', animationDelay: `${index * 0.1}s` }}
                        >
                            <div style={{ position: 'relative', height: '400px', marginBottom: '1rem', overflow: 'hidden', background: '#f4f4f4' }}>
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                                    onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                                />
                                <div style={{
                                    position: 'absolute', bottom: 0, left: 0, width: '100%',
                                    padding: '2rem',
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                                    color: 'white'
                                }}>
                                    <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>{cat.name}</h2>
                                    <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>{cat.description}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Collections;
