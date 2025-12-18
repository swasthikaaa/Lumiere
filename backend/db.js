import User from './models/User.js';

// Legacy helpers are removed as we switch to Mongoose
// But we keep the function signatures to avoid breaking authRoutes immediately

export const findUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        return user;
    } catch (error) {
        console.error("Error finding user:", error);
        return null; // Return null on error or not found
    }
};

export const createUser = async (userData) => {
    try {
        const user = await User.create(userData);
        return user;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

export const updateUserPassword = async (id, hashedPassword) => {
    try {
        const user = await User.findOneAndUpdate(
            { id: id }, // Searching by UUID
            { password: hashedPassword },
            { new: true }
        );
        return !!user;
    } catch (error) {
        console.error("Error updating password:", error);
        return false;
    }
};
