import React from 'react';
import { Link } from 'react-router-dom';
import { journalArticles } from '../data/journalData';

const JournalSection = () => {
    // Show first 3 articles
    const featuredArticles = journalArticles.slice(0, 3);

    return (
        <section className="section bg-light" style={{ padding: '8rem 0' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
                    <div className="fade-in-up">
                        <span style={{ color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '1rem' }}>Our Journal</span>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', margin: 0 }}>The Daily Habit</h2>
                    </div>
                    <Link
                        to="/journal"
                        className="fade-in-up"
                        style={{
                            textDecoration: 'none',
                            color: '#1a1a1a',
                            borderBottom: '1px solid #1a1a1a',
                            paddingBottom: '4px',
                            textTransform: 'uppercase',
                            fontSize: '0.85rem',
                            letterSpacing: '0.1em',
                            fontWeight: 500,
                            animationDelay: '0.1s'
                        }}
                    >
                        View All Stories
                    </Link>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '3rem'
                }}>
                    {featuredArticles.map((article, index) => (
                        <div key={article.id} className="fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                            <Link to="/journal" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div style={{ height: '400px', overflow: 'hidden', marginBottom: '1.5rem', borderRadius: '4px' }}>
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)' }}
                                        className="hover-scale"
                                    />
                                </div>
                                <div>
                                    <span style={{ color: 'var(--color-accent)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.1em' }}>{article.category}</span>
                                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', margin: '0.5rem 0 1rem', lineHeight: 1.3 }}>{article.title}</h3>
                                    <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>{article.excerpt}</p>
                                    <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#1a1a1a', fontWeight: 500 }}>Read More —</span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default JournalSection;
