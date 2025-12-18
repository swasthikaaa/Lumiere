import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { jsPDF } from "jspdf";

const TrackOrder = () => {
    const [orderId, setOrderId] = useState('');
    const [status, setStatus] = useState(null);

    const handleTrack = (e) => {
        e.preventDefault();
        if (!orderId) {
            toast.error('Please enter an Order ID');
            return;
        }
        // Simulate tracking lookup
        toast.loading('Locating order...', { duration: 1500 });
        setTimeout(() => {
            setStatus('Shipped');
            toast.success('Order found!');
        }, 1500);
    };

    const handleDownloadInvoice = () => {
        const doc = new jsPDF();

        // Header
        doc.setFontSize(22);
        doc.setFont("helvetica", "bold");
        doc.text("Luminera", 20, 20);

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text("Luxury Cosmetics", 20, 26);
        doc.text("456 Lotus Road, Colombo 03, Sri Lanka", 20, 31);
        doc.text("Tel: +94 11 234 5678", 20, 36);

        // Invoice Details
        doc.setFontSize(16);
        doc.text("INVOICE", 150, 20);

        doc.setFontSize(10);
        doc.text(`Order ID: ${orderId || 'ORD-0000'}`, 150, 30);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 35);

        // Line
        doc.setLineWidth(0.5);
        doc.line(20, 45, 190, 45);

        // Items Header
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Item", 20, 60);
        doc.text("Qty", 140, 60);
        doc.text("Price", 170, 60);

        // Mock Items
        doc.setFont("helvetica", "normal");
        doc.text("Illuminating Serum", 20, 70);
        doc.text("1", 140, 70);
        doc.text("Rs. 8,500.00", 170, 70);

        doc.text("Rose Petal Mist", 20, 80);
        doc.text("1", 140, 80);
        doc.text("Rs. 4,500.00", 170, 80);

        // Total
        doc.line(20, 90, 190, 90);
        doc.setFont("helvetica", "bold");
        doc.text("Total", 140, 100);
        doc.text("Rs. 13,000.00", 170, 100);

        // Footer
        doc.setFontSize(10);
        doc.setFont("helvetica", "italic");
        doc.text("Thank you for choosing Lumière Sri Lanka.", 20, 120);

        doc.save(`Invoice_${orderId || 'Lumiere'}.pdf`);
        toast.success('Invoice downloaded!');
    };

    return (
        <div style={{ paddingTop: '120px', paddingBottom: '4rem', minHeight: '80vh' }}>
            <div className="container" style={{ maxWidth: '600px' }}>
                <h1 className="text-center mb-lg" style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)' }}>Track Order</h1>

                <form onSubmit={handleTrack} className="track-form" style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
                    <input
                        type="text"
                        placeholder="Enter Order ID (e.g. ORD-1234)"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        style={{ flex: 1, padding: '12px', border: '1px solid #ddd', minWidth: '200px' }}
                    />
                    <button type="submit" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>Track</button>
                </form>

                {status && (
                    <div className="fade-in-up" style={{ padding: '2rem', background: '#f9f9f9', border: '1px solid #eee' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Status: <span style={{ color: 'blue' }}>{status}</span></h3>
                            <p style={{ color: '#666' }}>Est. Delivery: Dec 24, 2023</p>
                        </div>

                        <div style={{ height: '4px', background: '#ddd', borderRadius: '4px', marginBottom: '2rem', position: 'relative' }}>
                            <div style={{ height: '100%', width: '70%', background: 'green', borderRadius: '4px' }}></div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ width: '10px', height: '10px', background: 'green', borderRadius: '50%', margin: '0 auto 0.5rem' }}></div>
                                <span style={{ fontSize: '0.8rem' }}>Processed</span>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ width: '10px', height: '10px', background: 'green', borderRadius: '50%', margin: '0 auto 0.5rem' }}></div>
                                <span style={{ fontSize: '0.8rem' }}>Shipped</span>
                            </div>
                            <div style={{ textAlign: 'center', opacity: 0.5 }}>
                                <div style={{ width: '10px', height: '10px', background: '#ccc', borderRadius: '50%', margin: '0 auto 0.5rem' }}></div>
                                <span style={{ fontSize: '0.8rem' }}>Delivered</span>
                            </div>
                        </div>

                        <button
                            onClick={handleDownloadInvoice}
                            style={{
                                marginTop: '2rem', padding: '10px 20px', border: '1px solid #333',
                                background: 'transparent', cursor: 'pointer', width: '100%', textTransform: 'uppercase', letterSpacing: '0.1em'
                            }}
                        >
                            Download Invoice PDF
                        </button>
                    </div>
                )}
            </div>
            <style>{`
                @media (max-width: 480px) {
                    .track-form {
                        flex-direction: column !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default TrackOrder;
