import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const OrderConfirmation = () => {
    const location = useLocation();
    const orderId = location.state?.orderId || 'Unknown';

    return (
        <div style={{ paddingTop: '150px', paddingBottom: '4rem', minHeight: '80vh', textAlign: 'center' }}>
            <div className="container">
                <div style={{ background: '#d4edda', color: '#155724', padding: '2rem', borderRadius: '8px', display: 'inline-block', marginBottom: '2rem' }}>
                    <h1 style={{ marginBottom: '0.5rem' }}>Thank You!</h1>
                    <p style={{ fontSize: '1.2rem' }}>Your order has been placed successfully.</p>
                </div>

                <div style={{ marginBottom: '3rem' }}>
                    <p style={{ color: '#666', fontSize: '1rem' }}>Order ID: <span style={{ color: '#1a1a1a', fontWeight: 600 }}>{orderId}</span></p>
                    <p style={{ color: '#666' }}>You will receive an email confirmation shortly.</p>
                </div>

                <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
            </div>
        </div>
    );
};

export default OrderConfirmation;
