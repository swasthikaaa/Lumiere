import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Define Product schema inline to match exactly
const productSchema = mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String },
    category: { type: String },
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

const sampleProducts = [
    // Face Category
    { id: 1001, name: "Radiance Vitamin C Serum", description: "Brighten and even skin tone with this powerful antioxidant serum featuring 15% pure vitamin C.", price: "$68.00", category: "Face", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500" },
    { id: 1002, name: "Hydrating Hyaluronic Acid Moisturizer", description: "Deeply hydrate and plump skin with multi-weight hyaluronic acid and ceramides.", price: "$52.00", category: "Face", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500" },
    { id: 1003, name: "Retinol Night Renewal Cream", description: "Transform skin overnight with encapsulated retinol and nourishing botanical oils.", price: "$85.00", category: "Face", image: "https://images.unsplash.com/photo-1571781565036-d3f75af02f6f?w=500" },

    // Body Category
    { id: 2001, name: "Luxe Body Butter - Lavender Dreams", description: "Rich, whipped body butter infused with shea butter and calming lavender essential oil.", price: "$42.00", category: "Body", image: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?w=500" },
    { id: 2002, name: "Exfoliating Coffee Body Scrub", description: "Buff away dull skin with organic coffee grounds, coconut oil, and brown sugar.", price: "$38.00", category: "Body", image: "https://images.unsplash.com/photo-1556228852-80a5e2c53b0e?w=500" },

    // Mist Category
    { id: 3001, name: "Rose Petal Hydrating Mist", description: "Refresh and hydrate throughout the day with pure rose water and hyaluronic acid.", price: "$32.00", category: "Mist", image: "https://images.unsplash.com/photo-1544367563-12123d8966bf?w=500" },
    { id: 3002, name: "Green Tea Antioxidant Toner Mist", description: "Balance and protect skin with green tea extract and niacinamide.", price: "$35.00", category: "Mist", image: "https://images.unsplash.com/photo-1571781565036-d3f75af02f6f?w=500" },

    // Eyes Category
    { id: 4001, name: "Brightening Eye Cream", description: "Reduce dark circles and puffiness with caffeine, vitamin K, and peptides.", price: "$58.00", category: "Eyes", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500" },
    { id: 4002, name: "Anti-Aging Eye Serum", description: "Target fine lines and wrinkles with retinol and hyaluronic acid.", price: "$72.00", category: "Eyes", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500" },

    // Sets Category
    { id: 5001, name: "Complete Skincare Ritual Set", description: "Everything you need for glowing skin: cleanser, serum, moisturizer, and eye cream.", price: "$195.00", category: "Sets", image: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?w=500" },
    { id: 5002, name: "Travel Essentials Mini Set", description: "TSA-friendly minis of our bestsellers, perfect for on-the-go beauty.", price: "$48.00", category: "Sets", image: "https://images.unsplash.com/photo-1556228852-80a5e2c53b0e?w=500" },

    // Lip Category
    { id: 6001, name: "Nourishing Lip Treatment Oil", description: "Hydrate and plump lips with rosehip oil, vitamin E, and natural peptides.", price: "$28.00", category: "Lip", image: "https://images.unsplash.com/photo-1544367563-12123d8966bf?w=500" },
    { id: 6002, name: "Overnight Lip Repair Mask", description: "Wake up to soft, supple lips with this intensive overnight treatment.", price: "$35.00", category: "Lip", image: "https://images.unsplash.com/photo-1571781565036-d3f75af02f6f?w=500" }
];

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected');

        // Insert sample products
        for (const product of sampleProducts) {
            try {
                await Product.create(product);
                console.log(`✅ Added: ${product.name}`);
            } catch (err) {
                if (err.code === 11000) {
                    console.log(`⚠️  Skipped (already exists): ${product.name}`);
                } else {
                    console.log(`❌ Error adding ${product.name}:`, err.message);
                }
            }
        }

        console.log('\n📊 Products by category:');
        const categories = [...new Set(sampleProducts.map(p => p.category))];
        for (const cat of categories) {
            const count = await Product.countDocuments({ category: cat });
            console.log(`  ${cat}: ${count} products`);
        }

        const total = await Product.countDocuments();
        console.log(`\n✅ Total products in database: ${total}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

seedProducts();
