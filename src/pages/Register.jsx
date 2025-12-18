import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (res.ok) {
                toast.success('Registration Successful! Redirecting to login...');
                setTimeout(() => navigate('/login'), 1500);
            } else {
                toast.error(data.message || 'Registration failed');
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
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Create Account</h1>
                    <p style={{ color: '#666' }}>Join us for exclusive offers and faster checkout.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-md">
                        <label style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '0', fontSize: '1rem' }}
                            required
                        />
                    </div>
                    <div className="mb-md">
                        <label style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '0', fontSize: '1rem' }}
                            required
                        />
                    </div>
                    <div className="mb-md">
                        <label style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '0', fontSize: '1rem' }}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Create Account</button>
                </form>

                <div className="text-center" style={{ marginTop: '2rem' }}>
                    <p style={{ fontSize: '0.9rem' }}>
                        Already have an account? <Link to="/login" style={{ textDecoration: 'underline' }}>Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
