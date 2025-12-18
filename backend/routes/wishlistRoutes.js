import express from 'express';
import Wishlist from '../models/Wishlist.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Get User Wishlist
router.get('/', protect, async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ userId: req.user.id });
        res.json(wishlist ? wishlist.items : []);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add to Wishlist
router.post('/add', protect, async (req, res) => {
    const { productId, name, price, image } = req.body;
    try {
        let wishlist = await Wishlist.findOne({ userId: req.user.id });

        if (wishlist) {
            // Check if product exists
            const itemIndex = wishlist.items.findIndex(p => p.productId === productId);
            if (itemIndex === -1) {
                wishlist.items.push({ productId, name, price, image });
                await wishlist.save();
            }
        } else {
            wishlist = await Wishlist.create({
                userId: req.user.id,
                items: [{ productId, name, price, image }]
            });
        }
        res.json(wishlist.items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Remove from Wishlist
router.delete('/remove/:productId', protect, async (req, res) => {
    try {
        let wishlist = await Wishlist.findOne({ userId: req.user.id });
        if (wishlist) {
            wishlist.items = wishlist.items.filter(p => p.productId !== parseInt(req.params.productId));
            await wishlist.save();
            res.json(wishlist.items);
        } else {
            res.status(404).json({ message: 'Wishlist not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
