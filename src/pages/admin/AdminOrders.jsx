import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { useShop } from '../../context/ShopContext';

const AdminOrders = () => {
    const { formatPrice } = useShop();
    const [orders, setOrders] = useState([]);

    const token = localStorage.getItem('token');
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    const fetchOrders = async () => {
        try {
            const res = await fetch('/api/orders', { headers });
            const data = await res.json();
            setOrders(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            const res = await fetch(`/api/orders/${id}/status`, {
                method: 'PUT',
                headers,
                body: JSON.stringify({ status })
            });

            if (res.ok) {
                toast.success('Order Status Updated');
                fetchOrders();
            } else {
                toast.error('Update Failed');
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '2rem' }}>Orders</h1>
            <div style={{ background: '#fff', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f9f9f9', textAlign: 'left' }}>
                            <th style={{ padding: '1rem' }}>Order ID</th>
                            <th style={{ padding: '1rem' }}>User</th>
                            <th style={{ padding: '1rem' }}>Total</th>
                            <th style={{ padding: '1rem' }}>Date</th>
                            <th style={{ padding: '1rem' }}>Status</th>
                            <th style={{ padding: '1rem' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(!Array.isArray(orders) || orders.length === 0) ? (
                            <tr><td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: '#999' }}>No orders found.</td></tr>
                        ) : orders.map(order => (
                            <tr key={order.orderId} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '1rem' }}>{order.orderId}</td>
                                <td style={{ padding: '1rem' }}>{order.userEmail || order.userName || 'Unknown'}</td>
                                <td style={{ padding: '1rem' }}>{formatPrice(order.totalAmount)}</td>
                                <td style={{ padding: '1rem' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '5px 10px', borderRadius: '20px', fontSize: '0.85rem',
                                        background: order.status === 'Completed' ? '#d4edda' : order.status === 'Cancelled' ? '#f8d7da' : '#fff3cd',
                                        color: order.status === 'Completed' ? '#155724' : order.status === 'Cancelled' ? '#721c24' : '#856404'
                                    }}>
                                        {order.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <select
                                        value={order.status}
                                        onChange={(e) => updateStatus(order.orderId, e.target.value)}
                                        style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminOrders;
