import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_51P7Qf4SJ8X9y6z1y7X1y7X1y7X1y7X1y7X1y7X1y'); // Use Env var in prod

export const createPaymentIntent = async (req, res) => {
    try {
        const { amount } = req.body;

        // Stripe minimum for LKR (~$0.50 USD) is around 155 LKR. Enforce 160 LKR.
        if (amount < 160) {
            return res.status(400).send({ error: "Order total must be at least 160 Rs for card payments. Please use Cash on Delivery." });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // cents
            currency: 'lkr',
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('Stripe Error:', error);
        res.status(500).send({ error: error.message });
    }
};
