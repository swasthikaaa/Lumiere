import { Link } from 'react-router-dom';

const BrandStory = () => {
    return (
        <section id="about" style={{ padding: 'var(--spacing-xl) 0', backgroundColor: 'var(--color-bg)' }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '1fr 1fr',
                    gap: 'var(--spacing-lg)',
                    alignItems: 'center'
                }}>
                    {/* Text Content */}
                    <div style={{ paddingRight: window.innerWidth < 768 ? '0' : '2rem' }}>
                        <span style={{
                            display: 'block',
                            textTransform: 'uppercase',
                            letterSpacing: '0.2em',
                            fontSize: '0.8rem',
                            marginBottom: '1rem',
                            color: 'var(--color-accent)'
                        }}>Our Philosophy</span>
                        <h2 className="mb-md" style={{ fontSize: window.innerWidth < 768 ? '2rem' : '3rem' }}>Conscious Luxury for the Modern Soul.</h2>
                        <p className="mb-md" style={{ color: '#555' }}>
                            We believe that beauty should be a ritual, not a routine. Born from the earth and refined by science, our formulations are designed to nourish both your skin and your spirit.
                        </p>
                        <p className="mb-lg" style={{ color: '#555' }}>
                            Every product is a testament to purity, ethically sourced and sustainably crafted. Join us on a journey where wellness meets indulgence.
                        </p>
                        <Link to="/about" className="btn btn-outline" style={{ textDecoration: 'none', display: 'inline-block' }}>Read Our Story</Link>
                    </div>

                    {/* Image */}
                    <div style={{
                        height: window.innerWidth < 768 ? '400px' : '600px',
                        position: 'relative',
                        overflow: 'hidden',
                        marginTop: window.innerWidth < 768 ? '2rem' : '0'
                    }}>
                        <img
                            src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="Luxury cosmetics and skincare products"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'center'
                            }}
                        />
                        {/* Decorative border overlay */}
                        <div style={{
                            position: 'absolute',
                            top: '5%',
                            left: '5%',
                            width: '90%',
                            height: '90%',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            pointerEvents: 'none'
                        }}></div>
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 767px) {
                    #about {
                        padding: 3rem 0 !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default BrandStory;
