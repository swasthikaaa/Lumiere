import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Link sent to your email!');
                // Removed auto-navigation logic
            } else {
                toast.error(data.message || 'Could not send link');
            }
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    return (
        <div style={{ paddingTop: '150px', paddingBottom: '4rem', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
            <div className="container" style={{ maxWidth: '400px' }}>
                <div className="text-center mb-lg">
                    <h1 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>Reset Password</h1>
                    <p style={{ color: '#666' }}>Enter your email address and we'll send you a link to reset your password.</p>
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
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Send Link</button>
                </form>

                <div className="text-center" style={{ marginTop: '2rem' }}>
                    <Link to="/login" style={{ fontSize: '0.9rem', color: '#666', textDecoration: 'underline' }}>Back to Login</Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
