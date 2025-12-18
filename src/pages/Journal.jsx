import React from 'react';
import journalBg from '../assets/about-bg.png'; // Reusing about image as fallback

/* In a real app, these would come from a CMS or backend */
const articles = [
    {
        id: 1,
        title: "The Ultimate Guide to Skin Hydration",
        excerpt: "Why moisture is the key to youthful skin, and the best ingredients to lock it in for a radiant glow.",
        date: "October 12, 2025",
        category: "Skincare Science",
        image: "https://images.unsplash.com/photo-1571781565036-d3f75af02f6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        link: "https://www.healthline.com/health/beauty-skin-care/hydration-is-key" // Real external link example
    },
    {
        id: 2,
        title: "Morning Rituals for a Calm Mind & Glowing Skin",
        excerpt: "How starting your day with intention and a consistent routine can transform your skin health.",
        date: "September 28, 2025",
        category: "Lifestyle",
        image: "https://images.unsplash.com/photo-1544367563-12123d8966bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        link: "https://www.vogue.com/article/morning-skincare-routine-mindfulness"
    },
    {
        id: 3,
        title: "Ingredient Spotlight: The Power of Rosehip Oil",
        excerpt: "Discover the regenerative properties of this ancient botanical wonder and why it belongs in your routine.",
        date: "September 15, 2025",
        category: "Ingredients",
        image: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        link: "https://www.byrdie.com/rosehip-oil-for-skin"
    },
    {
        id: 4,
        title: "Sustainable Beauty: Our Commitment to the Planet",
        excerpt: "We believe in beauty that gives back. Learn about our eco-friendly packaging and ethical sourcing.",
        date: "August 30, 2025",
        category: "Sustainability",
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        link: "#"
    }
];

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
