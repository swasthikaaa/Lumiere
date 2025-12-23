import mongoose from 'mongoose';

const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        const msg = 'MONGO_URI is not defined. Set the MongoDB connection string in environment variables.';
        console.error(msg);
        throw new Error(msg);
    }

    try {
        if (mongoose.connection.readyState >= 1) return;
        const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        throw error;
    }
};

export default connectDB;
