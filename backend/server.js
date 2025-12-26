import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

import connectDB from './config/db.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/upload', uploadRoutes);

// Health check
app.get('/', (req, res) => res.send('API is running...'));

// Database connection
connectDB();

// Only start the server if we're not running as a Vercel function
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
