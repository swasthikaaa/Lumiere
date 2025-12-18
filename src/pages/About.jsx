import React from 'react';
import aboutImg from '../assets/about-bg.png';

// Dummy icons/svgs could be replaced with real ones or handled via props
const IconLeaf = () => <span style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}>🌿</span>;
const IconScience = () => <span style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}>🔬</span>;
const IconPure = () => <span style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}>💧</span>;

const About = () => {
    return (
        <div style={{ paddingTop: '80px' }}>
            {/* Header Image */}
            <div style={{
                height: '60vh',
                width: '100%',
                position: 'relative',
                marginBottom: '4rem'
            }}>
                <img src={aboutImg} alt="Botanical Ingredients" style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                }} />
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <h1 className="fade-in-up" style={{ color: '#fff', fontSize: '4.5rem', textAlign: 'center' }}>
                        Our Essence
                    </h1>
                </div>
            </div>

            <div className="container">
                {/* Intro */}
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '6rem' }}>
                    <h2 className="mb-md" style={{ fontSize: '2.5rem' }}>Rooted in Nature, Verified by Science.</h2>
                    <p className="mb-md" style={{ fontSize: '1.2rem', color: '#555' }}>
                        Luminera was born from a desire to bridge the gap between ancient botanical rituals and modern dermatological science.
                    </p>
                    <p style={{ lineHeight: '1.8', color: '#666' }}>
                        We travel the globe to source the potent extracts—lavender from Provence, roses from Bulgaria, and precious oils from Morocco.
                        Each ingredient is selected for its purity and efficacy, then crafted in our state-of-the-art laboratory to ensure maximum potency.
                        We believe in transparency, sustainability, and beauty that goes beyond the surface.
                    </p>
                </div>

                {/* Core Values */}
                <div style={{ marginBottom: '8rem' }}>
                    <h3 className="text-center mb-lg" style={{ fontSize: '2rem' }}>Core Values</h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '3rem',
                        textAlign: 'center'
                    }}>
                        <div style={{ padding: '2rem', background: '#F9F9F9' }}>
                            <IconLeaf />
                            <h4 className="mb-sm">Sustainably Sourced</h4>
                            <p style={{ fontSize: '0.95rem', color: '#666' }}>
                                We work directly with farmers who prioritize regenerative agriculture and fair trade practices.
                            </p>
                        </div>
                        <div style={{ padding: '2rem', background: '#F9F9F9' }}>
                            <IconScience />
                            <h4 className="mb-sm">Clinically Proven</h4>
                            <p style={{ fontSize: '0.95rem', color: '#666' }}>
                                Every formula is rigorously tested for safety and efficacy in independent laboratories.
                            </p>
                        </div>
                        <div style={{ padding: '2rem', background: '#F9F9F9' }}>
                            <IconPure />
                            <h4 className="mb-sm">Pure Potency</h4>
                            <p style={{ fontSize: '0.95rem', color: '#666' }}>
                                No fillers, no parabens, no sulfates. Just high concentrations of active botanical ingredients.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Process / Founder Note */}
                <div style={{ marginBottom: '6rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                    {/* Just re-using hero image as a placeholder for founder/process for now to save tokens/complexity */}
                    <div style={{ height: '400px', overflow: 'hidden' }}>
                        <img src={aboutImg} alt="Our Lab" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                        <h3 className="mb-md" style={{ fontSize: '2rem' }}>The Art of Formulation</h3>
                        <p style={{ marginBottom: '1.5rem', lineHeight: '1.8', color: '#555' }}>
                            Creating a Luminera product is a slow, deliberate process. We don't chase trends; we chase results.
                            Our chemists work alongside herbalists to understand the synergy between different plants.
                        </p>
                        <p style={{ lineHeight: '1.8', color: '#555', marginBottom: '2rem' }}>
                            "We believe that skincare should be a moment of pause in your day—a ritual that reconnects you with yourself."
                        </p>
                        <p style={{ fontStyle: 'italic', color: '#888' }}>— Isabelle Dumas, Founder</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
