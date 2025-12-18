import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Collections from './pages/Collections';
import Journal from './pages/Journal';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Shop from './pages/Shop';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import Orders from './pages/Orders';
import TrackOrder from './pages/TrackOrder';
import CartDrawer from './components/CartDrawer';
import SearchOverlay from './components/SearchOverlay';
import { ShopProvider } from './context/ShopContext';
import { Toaster } from 'react-hot-toast';

import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';

import './App.css';


const ScrollToTopImpl = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent = () => {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register', '/forgot-password', '/update-password'];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname) || location.pathname.startsWith('/admin');

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ScrollToTopImpl />
      {!shouldHideNavbar && <Navbar />}
      {!shouldHideNavbar && <CartDrawer />}
      {!shouldHideNavbar && <SearchOverlay />}

      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/skincare" element={<Collections />} />
          <Route path="/collections/makeup" element={<Collections />} />
          <Route path="/about" element={<About />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/wishlist" element={<Wishlist />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      {!shouldHideNavbar && <Footer />}
    </div>
  );
}

function App() {
  return (
    <ShopProvider>
      <Toaster position="top-center" toastOptions={{
        style: {
          background: '#333',
          color: '#fff',
          fontFamily: 'var(--font-body)',
        },
        success: {
          iconTheme: {
            primary: 'var(--color-accent)',
            secondary: '#fff',
          },
        },
      }} />
      <Router>
        <AppContent />
      </Router>
    </ShopProvider>
  );
}

export default App;
