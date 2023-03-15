import {loadStripe} from "@stripe/stripe-js";
// @ts-ignore
let stripePromise;

const getStripe = () => {
    // @ts-ignore
    if (!stripePromise) {
        // @ts-ignore
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST);
    }
    return stripePromise;
}

export default getStripe