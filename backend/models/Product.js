import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    id: { type: Number, required: true, unique: true }, // Keeping ID as Number for compatibility with existing frontend
    name: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String },
    category: { type: String },
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;
