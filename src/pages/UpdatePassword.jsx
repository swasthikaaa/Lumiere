import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const UpdatePassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    // Get token from URL
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    // Get email from state (if redirected from ForgotPassword)
    const email = location.state?.email;

    useEffect(() => {
        if (!token && !email) {
            toast.error("Invalid access. Please request a reset link.");
            navigate('/forgot-password');
        }
    }, [token, email, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords don't match");
            return;
        }

        const payload = token
            ? { token, newPassword: password }
            : { email, otp, newPassword: password };

        try {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Password updated! Please login.');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                toast.error(data.message || 'Reset failed');
            }
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    if (!token && !email) return null;

    return (
        <div style={{ paddingTop: '150px', paddingBottom: '4rem', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
            <div className="container" style={{ maxWidth: '400px' }}>
                <div className="text-center mb-lg">
                    <h1 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>Update Password</h1>
                    <p style={{ color: '#666' }}>
                        {token ? 'Enter your new password below.' : `Enter the code sent to ${email} and your new password.`}
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    {!token && (
                        <div className="mb-md">
                            <label style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Verification Code</label>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter 6-digit code"
                                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '0', fontSize: '1rem', letterSpacing: '2px', textAlign: 'center' }}
                                required
                            />
                        </div>
                    )}

                    <div className="mb-md">
                        <label style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>New Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '0', fontSize: '1rem' }}
                            required
                        />
                    </div>
                    <div className="mb-md">
                        <label style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '0', fontSize: '1rem' }}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Update Password</button>
                </form>
            </div>
        </div>
    );
};

export default UpdatePassword;
