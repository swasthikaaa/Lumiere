import React from 'react';
import heroBg from '../assets/hero-bg.png';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div style={{
            height: '100vh',
            width: '100%',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden'
        }}>
            {/* Background Image with Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1
            }}>
                <img
                    src={heroBg}
                    alt="Luxury Cosmetic Background"
                    className="animate-slow-zoom"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center'
                    }}
                />
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to right, rgba(230,230,230,0.1), rgba(0,0,0,0.1))'
                }}></div>
            </div>

            {/* Content */}
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="fade-in-up hero-content" style={{ maxWidth: '600px' }}>
                    <h2 className="hero-heading" style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '5rem',
                        lineHeight: '1',
                        marginBottom: '1.5rem',
                        color: '#1E2832'
                    }}>
                        Pure <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--color-accent)' }}>Liquid</span> <br />
                        Luxury.
                    </h2>
                    <p className="hero-text" style={{
                        fontSize: '1.2rem',
                        maxWidth: '450px',
                        marginBottom: '2.5rem',
                        color: '#333'
                    }}>
                        Experience the fusion of nature and science. Our new collection brings you the purest ingredients for timeless beauty.
                    </p>
                    <Link to="/collections">
                        <button className="btn btn-primary">
                            Discover the Collection
                        </button>
                    </Link>
                </div>
            </div>
            <style>{`
                @media (max-width: 768px) {
                    .hero-heading {
                        font-size: 3rem !important;
                    }
                    .hero-text {
                        font-size: 1rem !important;
                        margin-bottom: 2rem !important;
                    }
                }
                @media (max-width: 480px) {
                    .hero-heading {
                        font-size: 2.5rem !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Hero;
