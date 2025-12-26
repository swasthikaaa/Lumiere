import Order from '../models/Order.js';

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Public (for tracking)
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findOne({ orderId: req.params.id });

        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createOrder = async (req, res) => {
    try {
        const { orderItems, shippingAddress, paymentMethod, totalPrice, paymentResult } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }

        // Generate unique order ID
        const orderId = 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();

        // Map orderItems to match Order schema (items field)
        const items = orderItems.map(item => ({
            id: item.product || item.productId || item.id,
            name: item.name,
            price: typeof item.price === 'number' ? `$${item.price.toFixed(2)}` : item.price,
            quantity: item.qty || item.quantity,
            image: item.image
        }));

        const order = new Order({
            orderId,
            userId: req.user.id,
            items,
            shippingAddress: {
                street: shippingAddress.address,
                city: shippingAddress.city,
                zip: shippingAddress.postalCode,
                country: shippingAddress.country
            },
            paymentMethod: paymentMethod || 'Cash on Delivery',
            totalAmount: totalPrice
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);

    } catch (err) {
        console.error('Order creation error:', err);
        res.status(500).json({ message: err.message });
    }
};

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({});
        const User = (await import('../models/User.js')).default;

        // Fetch user data for each order
        const ordersWithUsers = await Promise.all(orders.map(async (order) => {
            try {
                const user = await User.findOne({ id: order.userId });
                return {
                    ...order.toObject(),
                    userEmail: user?.email || 'Unknown',
                    userName: user?.name || 'Unknown User'
                };
            } catch (err) {
                return {
                    ...order.toObject(),
                    userEmail: 'Unknown',
                    userName: 'Unknown User'
                };
            }
        }));

        res.json(ordersWithUsers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
    const { status } = req.body;

    try {
        const order = await Order.findOne({ orderId: req.params.id });

        if (order) {
            order.status = status;
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
