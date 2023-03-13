import Stripe from "stripe";
/*const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY_TEST);*/

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY_TEST,{
    apiVersion: '2022-11-15'}
);

export default async function handler(req, res) {

    const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [
            { shipping_rate: 'shr_1Ml57GKOWzINorXuUD6Pp44C' },
            { shipping_rate: 'shr_1Ml58SKOWzINorXuPIAP7C5Y' }
        ],
        line_items: req.body.map((item) => {
            const img = item.image[0].asset._ref;
            const newImage = img.replace('image-', 'https://cdn.sanity.io/images/nqo0u268//production/').replace('-webp', '.webp');
            return {
                price_data: {
                    currency: 'nzd',
                    product_data: {
                        name: item.name,
                        images: [newImage]
                    },
                    unit_amount: item.price * 100,
                },
                adjustable_quantity: {
                    enabled: true,
                    minimum: 1
                },
                quantity: item.quantity
            }
        }),
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
    }

    if (req.method === 'POST') {
        try {
            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create(params);
            res.status(200).json(session);
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}