import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const products = [
    {
        id: 1,
        name: "Illuminating Serum",
        price: "$85.00",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "A lightweight serum that adds a natural glow.",
        category: "Skincare"
    },
    {
        id: 2,
        name: "Rose Petal Mist",
        price: "$45.00",
        image: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Refreshing mist with organic rose water.",
        category: "Skincare"
    },
    {
        id: 3,
        name: "Velvet Matte Lipstick",
        price: "$32.00",
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Long-lasting matte finish in classic red.",
        category: "Makeup"
    },
    {
        id: 4,
        name: "Night Recovery Cream",
        price: "$95.00",
        image: "https://images.unsplash.com/photo-1571781348782-92c8812e85a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Intense hydration for overnight repair.",
        category: "Skincare"
    },
    {
        id: 5,
        name: "Silk Foundation",
        price: "$55.00",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdd403cc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Medium coverage with a silky finish.",
        category: "Makeup"
    },
    {
        id: 6,
        name: "Golden Eye Palette",
        price: "$65.00",
        image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Versatile shades for day and night.",
        category: "Makeup"
    }
];

const importData = async () => {
    try {
        await Product.deleteMany(); // Clear existing
        await Product.insertMany(products);
        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
