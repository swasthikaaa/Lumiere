import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const VerifyOtp = () => {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    useEffect(() => {
        if (!email) {
            toast.error("Invalid access. Please request a code.");
            navigate('/forgot-password');
        }
    }, [email, navigate]);

    const handleVerify = async (e) => {
        e.preventDefault();

        try {
            // We'll use a new endpoint to verify OTP before moving to password reset
            // OR we can just pass the OTP to the next page if the backend verifies it during reset.
            // However, usually, we want to verify it first.
            // Let's create a verify-otp endpoint or check if we can verify it here.

            // For now, assuming we verify it here or just pass it along.
            // Based on user request "after entering code moves to update password page",
            // it implies validation happens here OR we validation happens at the end.
            // Better UX: Validate OTP here.

            const res = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Code verified!');
                // Move to UpdatePassword page with verified email and token/otp
                navigate('/reset-password-final', { state: { email, otp } });
            } else {
                toast.error(data.message || 'Invalid code');
            }
        } catch (error) {
            toast.error('Verification failed');
        }
    };

    return (
        <div style={{ paddingTop: '150px', paddingBottom: '4rem', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
            <div className="container" style={{ maxWidth: '400px' }}>
                <div className="text-center mb-lg">
                    <h1 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>Enter Code</h1>
                    <p style={{ color: '#666' }}>We sent a code to {email}</p>
                </div>

                <form onSubmit={handleVerify}>
                    <div className="mb-md">
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter 6-digit code"
                            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '0', fontSize: '1.2rem', letterSpacing: '4px', textAlign: 'center' }}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Verify Code</button>
                </form>
            </div>
        </div>
    );
};

export default VerifyOtp;
