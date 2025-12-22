import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) return;
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        // Don't throw here so the server can still start (uploads and other static routes remain usable)
        // If you want the process to exit on DB failure in production, adjust this behavior via env.
    }
};

export default connectDB;
