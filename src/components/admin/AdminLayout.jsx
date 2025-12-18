import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';

const AdminLayout = () => {
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
            padding: '10px',
            borderRadius: '4px',
            background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
            display: 'block'
        };
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
            {/* Sidebar */}
            <div style={{ width: '250px', background: '#1a1a1a', color: '#fff', padding: '2rem' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', marginBottom: '3rem', color: '#d4af37' }}>Lumière Admin</h2>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Link to="/admin/dashboard" style={getLinkStyle('/admin/dashboard')}>Dashboard</Link>
                    <Link to="/admin/products" style={getLinkStyle('/admin/products')}>Products</Link>
                    <Link to="/admin/orders" style={getLinkStyle('/admin/orders')}>Orders</Link>
                    <Link to="/admin/users" style={getLinkStyle('/admin/users')}>Users</Link>
                    <button onClick={handleLogout} style={{ marginTop: 'auto', background: 'transparent', border: '1px solid #d4af37', color: '#d4af37', padding: '10px', cursor: 'pointer', textAlign: 'left', width: '100%' }}>Logout</button>
                </nav>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '2rem', background: '#f5f5f5' }}>
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
