import mongoose from 'mongoose';

const connectDB = async (retries = 5, delay = 2000) => {
    if (mongoose.connection.readyState >= 1) {
        console.log('MongoDB already connected');
        return;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            connectTimeoutMS: 10000
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        if (retries > 0) {
            console.log(`Retrying MongoDB connection in ${delay}ms... (${retries} retries left)`);
            await new Promise(res => setTimeout(res, delay));
            return connectDB(retries - 1, Math.min(delay * 2, 30000));
        }
        console.error('Could not connect to MongoDB after multiple attempts.');
        throw error;
    }
};

export default connectDB;
