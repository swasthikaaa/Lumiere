import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import connectDB from './config/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productsPath = path.join(__dirname, 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await Product.deleteMany(); // Clear existing

        // Ensure price fields are stored consistently as strings (existing model expects string)
        const prepared = products.map(p => ({
            ...p,
            price: typeof p.price === 'number' ? `$${p.price.toFixed(2)}` : p.price
        }));

        await Product.insertMany(prepared);
        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
