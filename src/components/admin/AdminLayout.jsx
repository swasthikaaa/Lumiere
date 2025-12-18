import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const getLinkStyle = (path) => {
        const isActive = location.pathname === path;
        return {
            color: isActive ? '#fff' : '#aaa',
            textDecoration: 'none',
            padding: '12px 15px',
            borderRadius: '8px',
            background: isActive ? 'var(--color-accent)' : 'transparent',
            display: 'block',
            fontSize: '0.95rem',
            transition: 'all 0.3s'
        };
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'var(--font-body)', background: '#f8f9fa' }}>
            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0,0,0,0.5)',
                        zIndex: 1050
                    }}
                />
            )}

            {/* Sidebar */}
            <div className={`admin-sidebar ${isSidebarOpen ? 'active' : ''}`} style={{
                width: '280px',
                background: '#1a1a1a',
                color: '#fff',
                padding: '2rem 1.5rem',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontFamily: 'var(--font-heading)', margin: 0, color: 'var(--color-accent)', fontSize: '1.5rem' }}>Luminera Admin</h2>
                    {/* Hide close button on desktop */}
                    <button
                        className="mobile-only"
                        onClick={() => setIsSidebarOpen(false)}
                        style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}
                    >×</button>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                    <Link to="/admin/dashboard" onClick={() => setIsSidebarOpen(false)} style={getLinkStyle('/admin/dashboard')}>Dashboard</Link>
                    <Link to="/admin/products" onClick={() => setIsSidebarOpen(false)} style={getLinkStyle('/admin/products')}>Products</Link>
                    <Link to="/admin/orders" onClick={() => setIsSidebarOpen(false)} style={getLinkStyle('/admin/orders')}>Orders</Link>
                    <Link to="/admin/users" onClick={() => setIsSidebarOpen(false)} style={getLinkStyle('/admin/users')}>Users</Link>
                </nav>

                <button
                    onClick={handleLogout}
                    style={{
                        marginTop: '2rem',
                        background: 'transparent',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: '#fff',
                        padding: '12px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        textAlign: 'center',
                        width: '100%',
                        fontSize: '0.9rem'
                    }}
                >Logout</button>
            </div>

            {/* Main Content Area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Topbar for mobile */}
                <header style={{
                    height: '70px',
                    background: '#fff',
                    borderBottom: '1px solid #eee',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 2rem',
                    justifyContent: 'space-between'
                }}>
                    <button
                        className="mobile-only"
                        onClick={() => setIsSidebarOpen(true)}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '1.5rem',
                            cursor: 'pointer'
                        }}
                    >☰</button>
                    <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>Admin Panel</div>
                    <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontSize: '0.9rem', color: '#666' }}>Hello, Admin</span>
                    </div>
                </header>

                <main className="admin-main-content" style={{ flex: 1, padding: '2.5rem', overflowY: 'auto' }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
