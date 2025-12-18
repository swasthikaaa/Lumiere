import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    userId: { type: String, required: true }, // Links to User.id (UUID)
    items: [{
        id: { type: Number, required: true },
        name: { type: String, required: true },
        price: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String }
    }],
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        required: true,
        default: 'Pending',
        enum: ['Pending', 'Completed', 'Cancelled']
    },
    shippingAddress: {
        street: String,
        city: String,
        zip: String,
        country: String
    },
    paymentMethod: { type: String, default: 'Credit Card' }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
