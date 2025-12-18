import express from 'express';
import Cart from '../models/Cart.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Get User Cart
router.get('/', protect, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        res.json(cart ? cart.items : []);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add to Cart
router.post('/add', protect, async (req, res) => {
    const { productId, name, price, image, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ userId: req.user.id });

        if (cart) {
            // Check if product exists
            const itemIndex = cart.items.findIndex(p => String(p.productId) === String(productId));

            if (itemIndex > -1) {
                // Update quantity
                let product = cart.items[itemIndex];
                product.quantity += quantity || 1;
                cart.items[itemIndex] = product;
            } else {
                // Add new item
                cart.items.push({ productId, name, price, image, quantity: quantity || 1 });
            }
            await cart.save();
        } else {
            // Create new cart
            cart = await Cart.create({
                userId: req.user.id,
                items: [{ productId, name, price, image, quantity: quantity || 1 }]
            });
        }
        res.json(cart.items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Quantity
router.put('/update/:productId', protect, async (req, res) => {
    const { quantity } = req.body;
    try {
        let cart = await Cart.findOne({ userId: req.user.id });
        if (cart) {
            const itemIndex = cart.items.findIndex(p => String(p.productId) === String(req.params.productId));
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity = quantity;
                await cart.save();
                res.json(cart.items);
            } else {
                res.status(404).json({ message: 'Item not found in cart' });
            }
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Remove from Cart
router.delete('/remove/:productId', protect, async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.user.id });
        if (cart) {
            // Ensure flexible comparison (string vs number)
            cart.items = cart.items.filter(p => String(p.productId) !== String(req.params.productId));
            await cart.save();
            res.json(cart.items);
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
