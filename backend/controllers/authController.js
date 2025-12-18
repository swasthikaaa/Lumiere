import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import User from '../models/User.js';
import sendEmail from '../utils/sendEmail.js';

const JWT_SECRET = 'super-secret-key-change-in-prod';

// Generate Token
const generateToken = (id, isAdmin) => {
    return jwt.sign({ id, isAdmin }, JWT_SECRET, { expiresIn: '1d' });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' });

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            id: uuidv4(),
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            token: generateToken(user.id, user.isAdmin),
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            }
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Login user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Hardcoded Admin Login
        if (email === 'adminlumiere@gmail.com' && password === 'lumiere@123') {
            const adminToken = generateToken('admin-id', true);
            return res.json({
                token: adminToken,
                user: {
                    id: 'admin-id',
                    name: 'Admin',
                    email: 'adminlumiere@gmail.com',
                    isAdmin: true
                }
            });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        if (!user.isActive) return res.status(403).json({ message: 'Account is deactivated. Contact support.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        res.json({
            token: generateToken(user.id, user.isAdmin),
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            }
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Forgot Password
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const resetToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '10m' });
        const resetUrl = `http://localhost:5173/update-password?token=${resetToken}`;

        const message = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #333;">Password Reset Request</h1>
                <p>You have requested a password reset for your Lumière account.</p>
                <div style="margin: 20px 0;">
                    <a href="${resetUrl}" style="background-color: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Reset Password</a>
                </div>
                <p style="font-size: 0.9em; color: #666;">This link expires in 10 minutes.</p>
                <p>If you did not request this, please ignore this email.</p>
            </div>
        `;

        await sendEmail({
            email: user.email,
            subject: 'Reset Your Password - Lumière',
            html: message,
            message: `Click here to reset: ${resetUrl}`,
        });

        res.status(200).json({ success: true, data: 'Email sent' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Email could not be sent' });
    }
};

// @desc    Reset Password
// @route   POST /api/auth/reset-password
// @access  Public
export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) return res.status(400).json({ message: 'Invalid request' });

        try {
            const decoded = jwt.verify(token, JWT_SECRET);

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            const user = await User.findOneAndUpdate(
                { id: decoded.id },
                { password: hashedPassword },
                { new: true }
            );

            if (user) {
                res.status(200).json({ success: true, message: 'Password updated successfully' });
            } else {
                res.status(400).json({ message: 'User not found' });
            }

        } catch (error) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
