import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Stripe Publishable Key
const stripePromise = loadStripe('pk_test_51SfHuXJd4dNkBkphvxOqwZdMUqLitgY6vEBFcRVELCiZejtUZB5sfsZU32afFAeoMYwIrLWjKzjySrbZ0hLoUttX00toq9DqpI');

const PaymentForm = ({ formData, cart, cartTotal, clearCart, onSuccess, formatPrice }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsProcessing(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/order-confirmation`,
            },
            redirect: 'if_required'
        });

        if (error) {
            toast.error(error.message);
            setIsProcessing(false);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            onSuccess(paymentIntent.id);
        } else {
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button disabled={isProcessing} className="btn btn-primary" style={{ flex: 1, padding: '1rem' }}>
                    {isProcessing ? 'Processing...' : `Pay ${formatPrice(cartTotal)}`}
                </button>
            </div>
        </form>
    );
};

const Checkout = () => {
    const { cart, cartTotal, clearCart, formatPrice } = useShop();
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const [clientSecret, setClientSecret] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cod');

    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        apartment: '',
        city: '',
        country: '',
        postalCode: ''
    });

    // Create Payment Intent only when Stripe is selected
    useEffect(() => {
        if (cartTotal > 0 && step === 2 && paymentMethod === 'stripe') {
            const token = localStorage.getItem('token');
            if (token) {
                fetch('/api/payment/create-payment-intent', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify({ amount: cartTotal }),
                })
                    .then(res => {
                        if (!res.ok) {
                            console.log('Stripe not configured');
                            toast.error('Stripe payment not available. Please use Cash on Delivery.');
                            setPaymentMethod('cod');
                            return null;
                        }
                        return res.json();
                    })
                    .then(data => {
                        if (data && data.clientSecret) {
                            setClientSecret(data.clientSecret);
                        }
                    })
                    .catch(err => {
                        console.log("Payment Intent Error:", err);
                        toast.error('Stripe payment not available. Please use Cash on Delivery.');
                        setPaymentMethod('cod');
                    });
            }
        }
    }, [cartTotal, step, paymentMethod]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateStep1 = () => {
        if (!formData.email || !formData.firstName || !formData.lastName ||
            !formData.address || !formData.city || !formData.country || !formData.postalCode) {
            toast.error('Please fill in all required fields');
            return false;
        }
        return true;
    };

    const handleContinueToPayment = () => {
        if (validateStep1()) {
            setStep(2);
        }
    };

    const handleOrderSuccess = async (paymentId) => {
        const token = localStorage.getItem('token');
        try {
            const orderData = {
                orderItems: cart.map(item => ({
                    name: item.name,
                    qty: item.quantity,
                    image: item.image,
                    price: typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.-]+/g, "")) : item.price,
                    product: item.productId
                })),
                shippingAddress: {
                    address: formData.address,
                    city: formData.city,
                    postalCode: formData.postalCode,
                    country: formData.country
                },
                paymentMethod: paymentMethod === 'stripe' ? 'Credit Card' : 'Cash on Delivery',
                paymentResult: { id: paymentId, status: 'paid' },
                totalPrice: cartTotal
            };

            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(orderData)
            });

            const data = await res.json();

            if (res.ok) {
                clearCart();
                toast.success('Order Placed Successfully!');
                navigate('/order-confirmation', { state: { orderId: data._id } });
            } else {
                toast.error(data.message || 'Order failed');
            }
        } catch (err) {
            console.error(err);
            toast.error('Order creation failed: ' + err.message);
        }
    };

    if (cart.length === 0) {
        return (
            <div style={{ paddingTop: '150px', paddingBottom: '4rem', textAlign: 'center', minHeight: '60vh' }}>
                <h2>Your bag is empty</h2>
                <Link to="/shop" className="btn btn-primary" style={{ marginTop: '2rem' }}>Continue Shopping</Link>
            </div>
        )
    }

    return (
        <div style={{ paddingTop: '120px', paddingBottom: '4rem', background: '#F9F9F9', minHeight: '100vh' }}>
            <div className="container">
                <div className="checkout-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: '4rem' }}>

                    {/* Left Column: Form Steps */}
                    <div>
                        <div style={{ marginBottom: '2rem' }}>
                            <span style={{ fontWeight: step >= 1 ? 600 : 400, color: step >= 1 ? '#1A1A1A' : '#999' }}>Information</span>
                            <span style={{ margin: '0 1rem', color: '#ccc' }}>&gt;</span>
                            <span style={{ fontWeight: step >= 2 ? 600 : 400, color: step >= 2 ? '#1A1A1A' : '#999' }}>Payment</span>
                        </div>

                        <div style={{ background: '#fff', padding: '2rem', border: '1px solid #eee' }}>
                            {step === 1 && (
                                <>
                                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Shipping Address</h2>
                                    <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email *" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', marginBottom: '1rem' }} required />
                                    <div className="checkout-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <input name="firstName" value={formData.firstName} onChange={handleChange} type="text" placeholder="First name *" style={{ padding: '12px', border: '1px solid #ddd' }} required />
                                        <input name="lastName" value={formData.lastName} onChange={handleChange} type="text" placeholder="Last name *" style={{ padding: '12px', border: '1px solid #ddd' }} required />
                                    </div>
                                    <input name="address" value={formData.address} onChange={handleChange} type="text" placeholder="Address *" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', marginTop: '1rem' }} required />
                                    <div className="checkout-grid-3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                                        <input name="city" value={formData.city} onChange={handleChange} type="text" placeholder="City *" style={{ padding: '12px', border: '1px solid #ddd' }} required />
                                        <input name="country" value={formData.country} onChange={handleChange} type="text" placeholder="Country *" style={{ padding: '12px', border: '1px solid #ddd' }} required />
                                        <input name="postalCode" value={formData.postalCode} onChange={handleChange} type="text" placeholder="Postal code *" style={{ padding: '12px', border: '1px solid #ddd' }} required />
                                    </div>
                                    <button onClick={handleContinueToPayment} className="btn btn-primary" style={{ marginTop: '2rem', width: '100%', padding: '1rem' }}>Continue to Payment</button>
                                </>
                            )}

                            {step === 2 && (
                                <>
                                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Payment Method</h2>

                                    {/* Payment Method Selection */}
                                    <div style={{ marginBottom: '2rem' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', padding: '1rem', border: '2px solid ' + (paymentMethod === 'cod' ? '#1A1A1A' : '#ddd'), borderRadius: '8px', marginBottom: '1rem', cursor: 'pointer' }}>
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="cod"
                                                checked={paymentMethod === 'cod'}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                style={{ marginRight: '1rem' }}
                                            />
                                            <div>
                                                <strong>Cash on Delivery</strong>
                                                <p style={{ fontSize: '0.9rem', color: '#666', margin: '0.25rem 0 0 0' }}>Pay when your order is delivered</p>
                                            </div>
                                        </label>

                                        <label style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '1rem',
                                            border: '2px solid ' + (paymentMethod === 'stripe' ? '#1A1A1A' : '#ddd'),
                                            borderRadius: '8px',
                                            cursor: cartTotal < 160 ? 'not-allowed' : 'pointer',
                                            opacity: cartTotal < 160 ? 0.6 : 1
                                        }}>
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="stripe"
                                                checked={paymentMethod === 'stripe'}
                                                onChange={(e) => {
                                                    if (cartTotal < 160) {
                                                        toast.error('Stripe requires a minimum of 160 Rs. Please use Cash on Delivery.');
                                                        return;
                                                    }
                                                    setPaymentMethod(e.target.value);
                                                }}
                                                disabled={cartTotal < 160}
                                                style={{ marginRight: '1rem' }}
                                            />
                                            <div>
                                                <strong>Credit/Debit Card</strong>
                                                <p style={{ fontSize: '0.9rem', color: '#666', margin: '0.25rem 0 0 0' }}>
                                                    {cartTotal < 160
                                                        ? 'Requires minimum 160 Rs. Please use Cash on Delivery.'
                                                        : 'Pay securely with Stripe'
                                                    }
                                                </p>
                                            </div>
                                        </label>
                                    </div>

                                    {/* Payment Form */}
                                    {paymentMethod === 'stripe' ? (
                                        <div style={{ padding: '1.5rem', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '2rem', background: '#fff' }}>
                                            {clientSecret ? (
                                                <Elements stripe={stripePromise} options={{ clientSecret }}>
                                                    <PaymentForm
                                                        formData={formData}
                                                        cart={cart}
                                                        cartTotal={cartTotal}
                                                        clearCart={clearCart}
                                                        onSuccess={handleOrderSuccess}
                                                        formatPrice={formatPrice}
                                                    />
                                                </Elements>
                                            ) : (
                                                <p>Loading payment form...</p>
                                            )}
                                        </div>
                                    ) : (
                                        <div style={{ padding: '1.5rem', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '2rem', background: '#fff' }}>
                                            <p style={{ marginBottom: '1rem', color: '#666' }}>
                                                Your order will be delivered to the address provided. Payment will be collected upon delivery.
                                            </p>
                                            <button
                                                onClick={() => handleOrderSuccess('COD_' + Date.now())}
                                                className="btn btn-primary"
                                                style={{ width: '100%', padding: '1rem' }}
                                            >
                                                Place Order - {formatPrice(cartTotal)}
                                            </button>
                                        </div>
                                    )}

                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <button onClick={() => setStep(1)} style={{ padding: '1rem', background: 'transparent', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Back</button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div>
                        <div style={{ background: '#fff', padding: '2rem', border: '1px solid #eee' }}>
                            {cart.map(item => {
                                const price = typeof item.price === 'string'
                                    ? parseFloat(item.price.replace(/[^0-9.-]+/g, ""))
                                    : Number(item.price);

                                return (
                                    <div key={item.productId} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
                                        <div style={{ position: 'relative', width: '64px', height: '64px', border: '1px solid #eee' }}>
                                            <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            <span style={{ position: 'absolute', top: '-10px', right: '-10px', background: 'rgba(0,0,0,0.5)', color: '#fff', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>{item.quantity}</span>
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.name}</p>
                                            <p style={{ color: '#666', fontSize: '0.85rem' }}>{item.category}</p>
                                        </div>
                                        <span style={{ fontSize: '0.95rem' }}>{formatPrice(price * item.quantity)}</span>
                                    </div>
                                );
                            })}

                            <div style={{ borderTop: '1px solid #eee', paddingTop: '1rem', marginTop: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#666' }}>
                                    <span>Subtotal</span>
                                    <span>{formatPrice(cartTotal)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#666' }}>
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '1.25rem', fontWeight: 600 }}>
                                    <span>Total</span>
                                    <span>{formatPrice(cartTotal)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <style>{`
                @media (max-width: 900px) {
                    .checkout-layout {
                        grid-template-columns: 1fr !important;
                        gap: 2rem !important;
                    }
                    .checkout-layout > div:last-child {
                        order: -1;
                    }
                }
                @media (max-width: 480px) {
                    .checkout-grid-2, .checkout-grid-3 {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Checkout;
