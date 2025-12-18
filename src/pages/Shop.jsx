import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useShop } from '../context/ShopContext';
import { useLocation } from 'react-router-dom';

const Shop = () => {
    const { products } = useShop();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialCategory = queryParams.get('category') || 'All Products';

    // Dynamically unique categories from products which have non-empty categories
    const categories = ['All Products', ...new Set(products.map(p => p.category).filter(Boolean))];
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);

    // Update category if URL changes
    useEffect(() => {
        const cat = new URLSearchParams(location.search).get('category');
        if (cat) setSelectedCategory(cat);
    }, [location.search]);

    const filteredProducts = selectedCategory === 'All Products'
        ? products
        : products.filter(p => p.category === selectedCategory);

    return (
        <div style={{ paddingTop: '120px', paddingBottom: '4rem', minHeight: '100vh', display: 'flex' }}>
            <div className="container">
                <header className="text-center mb-lg">
                    <h1 className="fade-in-up" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Shop All</h1>
                    <p className="fade-in-up" style={{ maxWidth: '600px', margin: '0 auto', color: '#666', animationDelay: '0.1s' }}>
                        Explore our complete range of scientifically formulated, nature-inspired skincare.
                    </p>
                </header>

                <div className="shop-layout" style={{
                    display: 'grid',
                    gridTemplateColumns: '250px 1fr',
                    gap: '3rem',
                    alignItems: 'start'
                }}>
                    {/* Sidebar Filters */}
                    <aside className="shop-sidebar" style={{
                        position: 'sticky',
                        top: '120px'
                    }}>
                        <h4 className="mb-sm" style={{ borderBottom: '1px solid #ddd', paddingBottom: '0.5rem' }}>Categories</h4>
                        <ul style={{ listStyle: 'none', lineHeight: '2.5', fontSize: '0.95rem', color: '#555' }}>
                            {categories.map(cat => (
                                <li
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    style={{
                                        cursor: 'pointer',
                                        color: selectedCategory === cat ? 'var(--color-primary)' : 'inherit',
                                        fontWeight: selectedCategory === cat ? '600' : '400',
                                        transition: 'color 0.2s'
                                    }}
                                >
                                    {cat}
                                </li>
                            ))}
                        </ul>
                    </aside>

                    {/* Product Grid */}
                    <div>
                        <p style={{ marginBottom: '1rem', color: '#888', fileSize: '0.9rem' }}>
                            Showing {filteredProducts.length} results
                        </p>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                            gap: '2rem'
                        }}>
                            {filteredProducts.map(p => (
                                <ProductCard key={p._id} id={p._id} {...p} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                @media (max-width: 768px) {
                    .shop-layout {
                        grid-template-columns: 1fr !important;
                        gap: 2rem !important;
                    }
                    .shop-sidebar {
                        position: static !important;
                        border-bottom: 1px solid #eee;
                        padding-bottom: 1rem;
                        margin-bottom: 1rem;
                    }
                    .shop-sidebar h4 {
                        display: none;
                    }
                    .shop-sidebar ul {
                        display: flex !important;
                        flex-wrap: wrap;
                        gap: 1rem;
                        line-height: 1.5 !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Shop;
