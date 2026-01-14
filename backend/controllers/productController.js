import Product from '../models/Product.js';
import mongoose from 'mongoose';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
    try {
        let query = {};
        if (req.query.search) {
            query.name = { $regex: req.query.search, $options: 'i' };
        }

        const products = await Product.find(query);
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
    const { id, name, price, image, category, description } = req.body;

    try {
        // Find highest ID if not provided
        let finalId = id;
        if (!finalId) {
            const lastProduct = await Product.findOne().sort({ id: -1 });
            finalId = lastProduct ? lastProduct.id + 1 : 1;
        }

        const product = new Product({
            id: finalId,
            name,
            price,
            image,
            category,
            description
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (err) {
        console.error('Product Creation Error:', err);
        res.status(500).json({ message: err.message || 'Error creating product' });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
    const { name, price, image, category, description } = req.body;

    try {
        const product = await Product.findOne({
            $or: [
                { id: isNaN(req.params.id) ? -1 : Number(req.params.id) },
                { _id: mongoose.isValidObjectId(req.params.id) ? req.params.id : null }
            ]
        });

        if (product) {
            product.name = name || product.name;
            product.price = price || product.price;
            product.image = image || product.image;
            product.category = category || product.category;
            product.description = description || product.description;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        console.error('Product Update Error:', err);
        res.status(500).json({ message: err.message || 'Error updating product' });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOne({
            $or: [
                { id: isNaN(req.params.id) ? -1 : Number(req.params.id) },
                { _id: mongoose.isValidObjectId(req.params.id) ? req.params.id : null }
            ]
        });

        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

