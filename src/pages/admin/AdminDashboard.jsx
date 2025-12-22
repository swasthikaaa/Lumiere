import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

import { useShop } from '../../context/ShopContext';

const AdminDashboard = () => {
    const { formatPrice } = useShop();
    const [stats, setStats] = useState({ products: 0, orders: 0, users: 0, revenue: 0 });
    const [chartData, setChartData] = useState([]);
    const [pieData, setPieData] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            const token = localStorage.getItem('token');
            const headers = { 'Authorization': `Bearer ${token}` };

                try {
                const [productsRaw, ordersRaw, usersRaw] = await Promise.all([
                    fetch('/api/products').then(res => res.json().catch(() => null)),
                    fetch('/api/orders', { headers }).then(res => res.json().catch(() => null)),
                    fetch('/api/users', { headers }).then(res => res.json().catch(() => null))
                ]);

                const productsRes = Array.isArray(productsRaw) ? productsRaw : [];
                const ordersRes = Array.isArray(ordersRaw) ? ordersRaw : [];
                const usersRes = Array.isArray(usersRaw) ? usersRaw : [];

                const totalRevenue = Array.isArray(ordersRes) ? ordersRes.reduce((acc, order) => acc + (order.totalAmount || 0), 0) : 0;

                setStats({
                    products: productsRes.length,
                    orders: ordersRes.length,
                    users: usersRes.length,
                    revenue: totalRevenue
                });

                // Mock Data for Charts (Real world would fetch historical data)
                setChartData([
                    { name: 'Jan', revenue: 4000 },
                    { name: 'Feb', revenue: 3000 },
                    { name: 'Mar', revenue: 2000 },
                    { name: 'Apr', revenue: 2780 },
                    { name: 'May', revenue: 1890 },
                    { name: 'Jun', revenue: 2390 },
                    { name: 'Jul', revenue: 3490 },
                ]);

                // Order Status Distribution
                const pending = ordersRes.filter(o => o.status === 'Pending').length;
                const completed = ordersRes.filter(o => o.status === 'Completed').length;
                const cancelled = ordersRes.filter(o => o.status === 'Cancelled').length;

                setPieData([
                    { name: 'Pending', value: pending },
                    { name: 'Completed', value: completed },
                    { name: 'Cancelled', value: cancelled },
                ]);

            } catch (error) {
                console.error("Error fetching stats", error);
            }
        };

        fetchStats();
    }, []);

    const COLORS = ['#FFBB28', '#00C49F', '#FF8042'];

    const cardStyle = {
        background: '#fff',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        flex: 1,
        minWidth: '200px'
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '2rem' }}>Dashboard Overview</h1>

            {/* Stats Cards */}
            <div className="admin-stats-grid">
                <div style={cardStyle}>
                    <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total Revenue</p>
                    <h3 style={{ fontSize: '2rem', color: '#1a1a1a' }}>{formatPrice(stats.revenue)}</h3>
                </div>
                <div style={cardStyle}>
                    <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total Orders</p>
                    <h3 style={{ fontSize: '2rem', color: '#1a1a1a' }}>{stats.orders}</h3>
                </div>
                <div style={cardStyle}>
                    <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total Products</p>
                    <h3 style={{ fontSize: '2rem', color: '#1a1a1a' }}>{stats.products}</h3>
                </div>
                <div style={cardStyle}>
                    <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total Users</p>
                    <h3 style={{ fontSize: '2rem', color: '#1a1a1a' }}>{stats.users}</h3>
                </div>
            </div>

            {/* Charts Section */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(Min(100%, 400px), 1fr))', gap: '2rem' }}>

                {/* Revenue Chart */}
                <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                    <h3 style={{ marginBottom: '2rem' }}>Revenue Overview</h3>
                    <div style={{ height: '300px', width: '100%' }}>
                        <ResponsiveContainer width="99%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="revenue" fill="#1a1a1a" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Order Status Chart */}
                <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                    <h3 style={{ marginBottom: '2rem' }}>Order Status</h3>
                    <div style={{ height: '300px', display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <ResponsiveContainer width="99%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
