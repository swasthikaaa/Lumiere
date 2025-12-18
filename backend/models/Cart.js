import mongoose from 'mongoose';

const cartSchema = mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    items: [{
        productId: { type: Number, required: true },
        name: { type: String },
        price: { type: String },
        image: { type: String },
        quantity: { type: Number, default: 1 }
    }]
}, {
    timestamps: true
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
