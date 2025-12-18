import mongoose from 'mongoose';

const wishlistSchema = mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    items: [{
        productId: { type: Number, required: true },
        name: { type: String },
        price: { type: String },
        image: { type: String }
    }]
}, {
    timestamps: true
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;
