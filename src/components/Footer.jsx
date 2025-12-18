import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div>
                        <h4 className="logo-text">Luminera</h4>
                        <p>Redefining beauty with nature and science.</p>
                    </div>

                    <div>
                        <h4>SHOP</h4>
                        <ul>
                            <li><a href="#">Skin</a></li>
                            <li><a href="#">Body</a></li>
                            <li><a href="#">Hair</a></li>
                            <li><a href="#">Sets</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4>ABOUT</h4>
                        <ul>
                            <li><a href="#">Our Story</a></li>
                            <li><a href="#">Ingredients</a></li>
                            <li><a href="#">Sustainability</a></li>
                            <li><a href="#">Journal</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4>NEWSLETTER</h4>
                        <div className="footer-newsletter-input">
                            <input type="email" placeholder="Your email address" />
                            <button style={{ color: '#fff' }}>Subscribe</button>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div>© 2025 Luminera Cosmetics. All rights reserved.</div>
                    <div className="footer-socials">
                        <span>Instagram</span>
                        <span>Facebook</span>
                        <span>Pinterest</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
