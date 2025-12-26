import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { setIsCartOpen, cart, setIsSearchOpen, logout } = useShop();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTransparentPage = ['/home', '/about'].includes(location.pathname);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''} ${!isTransparentPage ? 'navbar-solid' : 'navbar-transparent'}`}>
      <div className="container navbar-container">
        <Link to="/home" className="logo navbar-logo" style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.8rem',
          fontWeight: 600,
          letterSpacing: '0.05em',
          color: 'inherit',
          textDecoration: 'none'
        }}>
          Luminera
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-links hide-mobile">
          <Link to="/shop">Shop</Link>
          <Link to="/collections">Collections</Link>
          <Link to="/about">About</Link>
          <Link to="/journal">Journal</Link>
        </div>

        {/* Desktop Icons */}
        <div className="icons hide-mobile">
          <span onClick={() => setIsSearchOpen(true)} style={{ cursor: 'pointer' }}>Search</span>
          <span onClick={() => setIsCartOpen(true)} style={{ position: 'relative', cursor: 'pointer' }}>
            Cart
            {cart.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-12px',
                background: 'red',
                color: 'white',
                fontSize: '0.7rem',
                fontWeight: 600,
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {cart.length}
              </span>
            )}
          </span>

          {/* Account Dropdown */}
          <div style={{ position: 'relative' }}
            onMouseEnter={() => document.getElementById('account-dropdown').style.display = 'block'}
            onMouseLeave={() => document.getElementById('account-dropdown').style.display = 'none'}
          >
            <span style={{ cursor: 'pointer' }}>Account</span>
            <div id="account-dropdown" style={{
              display: 'none',
              position: 'absolute',
              top: '100%',
              right: 0,
              background: 'white',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              minWidth: '200px',
              padding: '1rem',
              borderRadius: '4px',
              zIndex: 1001,
              color: '#1A1A1A'
            }}>
              <Link to="/orders" style={{ display: 'block', padding: '0.5rem 0', textDecoration: 'none', color: 'inherit', fontSize: '0.9rem' }}>Placed Orders</Link>
              <Link to="/track-order" style={{ display: 'block', padding: '0.5rem 0', textDecoration: 'none', color: 'inherit', fontSize: '0.9rem' }}>Track Order</Link>
              <div style={{ borderTop: '1px solid #eee', margin: '0.5rem 0' }}></div>
              <span
                onClick={logout}
                style={{ display: 'block', padding: '0.5rem 0', cursor: 'pointer', color: 'red', fontSize: '0.9rem' }}
              >
                Logout
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="navbar-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
            {mobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu (Sidebar) */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        {/* Close Button Inside Menu */}
        <button
          onClick={closeMobileMenu}
          style={{
            alignSelf: 'flex-end',
            padding: '10px',
            marginBottom: '1rem',
            color: '#1A1A1A'
          }}
          aria-label="Close menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <Link onClick={closeMobileMenu} to="/home" style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>Home</Link>
        <Link onClick={closeMobileMenu} to="/shop" style={{ color: '#1A1A1A', fontWeight: 500 }}>Shop</Link>
        <Link onClick={closeMobileMenu} to="/collections" style={{ color: '#1A1A1A', fontWeight: 500 }}>Collections</Link>
        <Link onClick={closeMobileMenu} to="/about" style={{ color: '#1A1A1A', fontWeight: 500 }}>About</Link>
        <Link onClick={closeMobileMenu} to="/journal" style={{ color: '#1A1A1A', fontWeight: 500 }}>Journal</Link>

        <div style={{ borderTop: '2px solid #eee', margin: '1rem 0' }}></div>

        <div onClick={() => { setIsSearchOpen(true); closeMobileMenu(); }} style={{ cursor: 'pointer', color: '#1A1A1A', fontWeight: 500 }}>Search</div>
        <div onClick={() => { setIsCartOpen(true); closeMobileMenu(); }} style={{ cursor: 'pointer', color: '#1A1A1A', fontWeight: 500 }}>
          Cart {cart.length > 0 && `(${cart.length})`}
        </div>
        <Link onClick={closeMobileMenu} to="/orders" style={{ color: '#1A1A1A', fontWeight: 500 }}>My Orders</Link>
        <Link onClick={closeMobileMenu} to="/track-order" style={{ color: '#1A1A1A', fontWeight: 500 }}>Track Order</Link>

        <div style={{ marginTop: '2rem', paddingBottom: '2rem' }}>
          <span
            onClick={() => {
              logout();
              closeMobileMenu();
            }}
            style={{ color: 'red', cursor: 'pointer', fontWeight: 500 }}
          >
            Logout
          </span>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={closeMobileMenu}
      ></div>
    </nav>
  );
};

export default Navbar;
