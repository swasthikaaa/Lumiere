import React from 'react';
import journalBg from '../assets/about-bg.png'; // Reusing about image as fallback

import { journalArticles as articles } from '../data/journalData';

const Journal = () => {
    return (
        <div style={{ paddingTop: '120px', paddingBottom: '4rem' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
                <header className="text-center mb-lg">
                    <h1 className="fade-in-up" style={{ fontSize: '3rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>The Journal</h1>
                    <p className="fade-in-up" style={{ maxWidth: '600px', margin: '0 auto', color: '#666', animationDelay: '0.1s', fontSize: '1.1rem' }}>
                        Beauty, wellness, and the stories behind our creations.
                    </p>
                </header>

                {/* Featured Article - Static for now */}
                <div className="fade-in-up" style={{ marginBottom: '5rem', animationDelay: '0.2s' }}>
                    <a href="https://www.allure.com/story/clean-beauty-trend-explained" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none' }}>
                        <div style={{ position: 'relative', height: '500px', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                            <img
                                src="https://images.unsplash.com/photo-1556228720-1957be83f789?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
                                alt="Featured"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            />
                            <div style={{
                                position: 'absolute',
                                bottom: 0, left: 0, width: '100%',
                                padding: '4rem',
                                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'
                            }}>
                                <span style={{ color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.9rem', display: 'block', marginBottom: '0.5rem' }}>Featured Story</span>
                                <h2 style={{ color: '#fff', fontSize: '3rem', margin: 0, fontFamily: 'var(--font-heading)' }}>Embracing the Slow Beauty Movement</h2>
                                <p style={{ color: '#eee', marginTop: '1rem', maxWidth: '600px', fontSize: '1.1rem' }}>In a world of fast fixes, we explore why taking your time is the ultimate luxury for your skin.</p>
                            </div>
                        </div>
                    </a>
                </div>

                {/* Article Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '4rem 3rem'
                }}>
                    {articles.map((article, index) => (
                        <div key={article.id} className="fade-in-up" style={{ animationDelay: `${0.1 * (index + 2)}s` }}>
                            <a href={article.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div style={{ height: '280px', overflow: 'hidden', marginBottom: '1.5rem', borderRadius: '4px' }}>
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    />
                                </div>
                                <div style={{ paddingRight: '1rem' }}>
                                    <span style={{ color: 'var(--color-accent)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.1em', fontWeight: 600 }}>{article.category}</span>
                                    <h3 style={{ fontSize: '1.75rem', margin: '0.5rem 0 0.75rem', fontFamily: 'var(--font-heading)', lineHeight: 1.2 }}>{article.title}</h3>
                                    <p style={{ color: '#666', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1rem' }}>{article.excerpt}</p>
                                    <span style={{
                                        display: 'inline-block',
                                        fontSize: '0.85rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.1em',
                                        color: '#1a1a1a',
                                        borderBottom: '1px solid #1a1a1a',
                                        paddingBottom: '2px'
                                    }}>Read Article</span>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Journal;
