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

    // Placeholder for generateInvoice function, assuming it will be added later
    const generateInvoice = (order) => {
        toast.info(`Generating invoice for order ${order._id}`);
        // Implement actual invoice generation logic here
    };

    return (
        <div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '2rem' }}>Orders</h1>
            <div className="admin-table-container">
                <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: '900px' }}>
                    <thead>
                        <tr style={{ background: '#f9f9f9', textAlign: 'left' }}>
                            <th style={{ padding: '1rem' }}>Order ID</th>
                            <th style={{ padding: '1rem' }}>Customer</th>
                            <th style={{ padding: '1rem' }}>Items</th>
                            <th style={{ padding: '1rem' }}>Total</th>
                            <th style={{ padding: '1rem' }}>Status</th>
                            <th style={{ padding: '1rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(!Array.isArray(orders) || orders.length === 0) ? (
                            <tr><td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: '#999' }}>No orders found.</td></tr>
                        ) : orders.map(order => (
                            <tr key={order._id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '1rem', fontSize: '0.85rem' }}>{order._id}</td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ fontWeight: 500 }}>{order.user?.name || 'Guest'}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#666' }}>{order.user?.email || order.shippingAddress?.email}</div>
                                </td>
                                <td style={{ padding: '1rem' }}>{order.orderItems?.length || 0}</td>
                                <td style={{ padding: '1rem', fontWeight: 600 }}>{formatPrice(order.totalAmount)}</td>
                                <td style={{ padding: '1rem' }}>
                                    <select
                                        value={order.status}
                                        onChange={(e) => updateStatus(order._id, e.target.value)}
                                        style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            border: '1px solid #ddd',
                                            fontSize: '0.85rem',
                                            background: order.status === 'Completed' ? '#e6f4ea' : order.status === 'Cancelled' ? '#fce8e6' : '#fff'
                                        }}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <button
                                        onClick={() => generateInvoice(order)}
                                        style={{ background: 'none', border: 'none', color: 'var(--color-accent)', cursor: 'pointer', fontWeight: 600 }}
                                    >Invoice</button>
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
