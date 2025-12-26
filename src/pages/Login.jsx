import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useShop } from '../context/ShopContext';

const Login = () => {
    const { login } = useShop();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (res.ok) {
                await login(data.token);
                // Redirect based on role
                if (data.user.isAdmin) {
                    toast.success(`Welcome Admin!`);
                    setTimeout(() => navigate('/admin/dashboard'), 1500);
                } else {
                    toast.success('Login Successful!');
                    setTimeout(() => navigate('/home'), 1500);
                }
            } else {
                toast.error(data.message || 'Login failed');
            }
        } catch (err) {
            console.error(err);
            toast.error('Something went wrong');
        }
    };

    return (
        <div style={{ paddingTop: '120px', paddingBottom: '4rem', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
            <div className="container" style={{ maxWidth: '400px' }}>
                <div className="text-center mb-lg">
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Welcome Back</h1>
                    <p style={{ color: '#666' }}>Please enter your details to sign in.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-md">
                        <label style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '0', fontSize: '1rem' }}
                            required
                        />
                    </div>
                    <div className="mb-md">
                        <label style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '0', fontSize: '1rem' }}
                            required
                        />
                        <div style={{ textAlign: 'right', marginTop: '0.5rem' }}>
                            <Link to="/forgot-password" style={{ fontSize: '0.85rem', color: '#666' }}>Forgot Password?</Link>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Sign In</button>
                </form>

                <div className="text-center" style={{ marginTop: '2rem' }}>
                    <p style={{ fontSize: '0.9rem' }}>
                        Don't have an account? <Link to="/register" style={{ textDecoration: 'underline' }}>Create one</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
