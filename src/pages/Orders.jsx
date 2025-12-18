import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const Orders = () => {
    const { formatPrice } = useShop();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await fetch('/api/orders/myorders', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    const data = await res.json();
                    if (Array.isArray(data)) {
                        setOrders(data);
                    }
                } catch (err) {
                    console.error(err);
                }
            }
            setLoading(false);
        };
        fetchOrders();
    }, []);

    const getStatusColor = (status) => {
        if (status === 'Completed') return '#00C49F';
        if (status === 'Cancelled') return '#FF8042';
        return '#FFBB28';
    };

    if (loading) {
        return (
            <div style={{ paddingTop: '150px', paddingBottom: '4rem', textAlign: 'center', minHeight: '60vh' }}>
                <p>Loading orders...</p>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div style={{ paddingTop: '150px', paddingBottom: '4rem', textAlign: 'center', minHeight: '60vh' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '1rem' }}>No Orders Yet</h2>
                <p style={{ color: '#666', marginBottom: '2rem' }}>You haven't placed any orders yet.</p>
                <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div style={{ paddingTop: '120px', paddingBottom: '4rem', minHeight: '80vh' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <h1 className="text-center mb-lg" style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)' }}>My Orders</h1>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {orders.map(order => (
                        <div key={order._id} className="fade-in-up" style={{
                            border: '1px solid #eee', padding: '1.5rem', borderRadius: '4px',
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            flexWrap: 'wrap', gap: '1rem'
                        }}>
                            <div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.2rem' }}>Order #{order.orderId || order._id.substring(0, 8)}</h3>
                                <p style={{ fontSize: '0.9rem', color: '#666' }}>{new Date(order.createdAt).toLocaleDateString()}</p>
                                <p style={{ fontSize: '0.9rem', color: '#333', marginTop: '0.5rem' }}>
                                    {order.items ? order.items.map(i => i.name).join(', ') : 'No items'}
                                </p>
                                <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>
                                    Payment: {order.paymentMethod}
                                </p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.5rem' }}>{formatPrice(order.totalAmount)}</p>
                                <span style={{
                                    fontSize: '0.85rem', padding: '4px 12px', borderRadius: '20px',
                                    background: getStatusColor(order.status), color: 'white'
                                }}>
                                    {order.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <Link to="/shop" style={{ color: '#666', textDecoration: 'underline' }}>Continue Shopping</Link>
                </div>
            </div>
        </div>
    );
};

export default Orders;
