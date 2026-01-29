import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import User from '../models/User.js';
import sendEmail from '../utils/sendEmail.js';

// Generate Token
const generateToken = (id, isAdmin) => {
    return jwt.sign({ id, isAdmin }, process.env.JWT_SECRET || 'super-secret-key-change-in-prod', { expiresIn: '30d' });
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

        // Generate JWT Token for Link
        const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'super-secret-key-change-in-prod', { expiresIn: '10m' });

        // Generate 6-digit OTP for Manual Entry
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.resetPasswordToken = await bcrypt.hash(otp, 10);
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
        await user.save();

        let frontendUrl = process.env.FRONTEND_URL;

        if (!frontendUrl) {
            if (process.env.VERCEL_URL) {
                frontendUrl = `https://${process.env.VERCEL_URL}`;
            } else {
                frontendUrl = 'http://localhost:5173';
            }
        }
        const resetUrl = `${frontendUrl}/update-password?token=${resetToken}`;

        const message = `
            <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 40px; border-radius: 8px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #1a1a1a; font-family: serif; font-size: 32px; letter-spacing: 2px; margin: 0;">Lumière</h1>
                    <p style="color: #666; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-top: 5px;">Purely Home Cosmetics</p>
                </div>
                <div style="background-color: #ffffff; padding: 40px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    <h2 style="color: #333; font-size: 20px; font-weight: 600; margin-top: 0;">Reset Your Password</h2>
                    <p style="color: #555; line-height: 1.6; margin-bottom: 25px;">Hello,</p>
                    <p style="color: #555; line-height: 1.6; margin-bottom: 25px;">We received a request to reset the password for your Lumière account.</p>
                    
                    <div style="background-color: #f0f0f0; padding: 15px; text-align: center; margin-bottom: 25px; border-radius: 4px;">
                        <p style="margin: 0; font-size: 14px; color: #555;">Your Verification Code:</p>
                        <p style="margin: 5px 0 0; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #1a1a1a;">${otp}</p>
                    </div>

                    <p style="color: #555; line-height: 1.6; margin-bottom: 30px;">Alternatively, you can click the button below:</p>
                    
                    <div style="text-align: center; margin-bottom: 30px;">
                        <a href="${resetUrl}" style="background-color: #1a1a1a; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 2px; font-weight: 500; display: inline-block; letter-spacing: 0.5px;">Reset Password</a>
                    </div>
                    
                    <p style="color: #888; font-size: 14px; line-height: 1.5; margin-bottom: 0;">This code and link will expire in 10 minutes.</p>
                </div>
                <div style="text-align: center; margin-top: 30px; color: #999; font-size: 12px;">
                    <p>&copy; ${new Date().getFullYear()} Lumière. All rights reserved.</p>
                </div>
            </div>
        `;

        await sendEmail({
            email: user.email,
            subject: 'Reset Your Password - Lumière',
            html: message,
            message: `Your OTP is ${otp}. Or click here: ${resetUrl}`,
        });

        res.status(200).json({ success: true, message: 'Email sent with OTP and Link' });
    } catch (err) {
        console.error("Forgot Password Error:", err);
        res.status(500).json({ message: `Email could not be sent: ${err.message}` });
    }
};

// @desc    Reset Password
// @route   POST /api/auth/reset-password
// @access  Public
export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword, email, otp } = req.body;

        if (!newPassword) return res.status(400).json({ message: 'New password is required' });

        let user;

        // Scenario 1: Using Token (Email Link)
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super-secret-key-change-in-prod');
                user = await User.findOne({ id: decoded.id });
                if (!user) return res.status(404).json({ message: 'User not found' });
            } catch (error) {
                return res.status(400).json({ message: 'Invalid or expired token' });
            }
        }
        // Scenario 2: Using Email + OTP (Manual Entry)
        else if (email && otp) {
            user = await User.findOne({
                email,
                resetPasswordExpire: { $gt: Date.now() }
            });

            if (!user) return res.status(400).json({ message: 'Invalid OTP or expired' });

            const isMatch = await bcrypt.compare(otp, user.resetPasswordToken);
            if (!isMatch) return res.status(400).json({ message: 'Invalid OTP' });
        }
        else {
            return res.status(400).json({ message: 'Invalid request' });
        }

        // Update Password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        res.status(200).json({ success: true, message: 'Password updated successfully' });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
