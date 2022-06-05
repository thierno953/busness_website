const express = require("express");
const Stripe = require("stripe");
const { Order } = require("../models/order");

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY);

const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {

    const customer = await stripe.customers.create({
        metadata: {
            userId: req.body.userId,
            cart: JSON.stringify(req.body.cartItems),
        },
    });

    const line_items = req.body.cartItems.map((item) => {
        return {
            price_data: {
                currency: "eur",
                product_data: {
                    name: item.name,
                    images: [item.image],
                    description: item.desc,
                    metadata: {
                        id: item.id,
                    },
                },
                unit_amount: item.price * 100,
            },
            quantity: item.cartQuantity,
        };
    });

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_address_collection: {
            allowed_countries: ["BE", "FR"],
        },
        shipping_options: [
            {
                shipping_rate_data: {
                    type: "fixed_amount",
                    fixed_amount: {
                        amount: 0,
                        currency: "eur",
                    },
                    display_name: "Free shipping",
                    // Delivers between 5-7 business days
                    delivery_estimate: {
                        minimum: {
                            unit: "business_day",
                            value: 5,
                        },
                        maximum: {
                            unit: "business_day",
                            value: 7,
                        },
                    },
                },
            },
            {
                shipping_rate_data: {
                    type: "fixed_amount",
                    fixed_amount: {
                        amount: 1500,
                        currency: "eur",
                    },
                    display_name: "Next day air",
                    // Delivers in exactly 1 business day
                    delivery_estimate: {
                        minimum: {
                            unit: "business_day",
                            value: 1,
                        },
                        maximum: {
                            unit: "business_day",
                            value: 1,
                        },
                    },
                },
            },
        ],
        phone_number_collection: {
            enabled: true,
        },
        line_items,
        mode: "payment",
        customer: customer.id,
        success_url: `${process.env.CLIENT_URL}/checkout-success`,
        cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    // res.redirect(303, session.url);
    res.send({ url: session.url });
});

// Create order function

const createOrder = async (customer, data) => {
    const Items = JSON.parse(customer.metadata.cart);

    const newOrder = new Order({
        userId: customer.metadata.userId,
        customerId: data.customer,
        paymentIntentId: data.payment_intent,
        products,
        subtotal: data.amount_subtotal,
        total: data.amount_total,
        shipping: data.customer_details,
        payment_status: data.payment_status,
    });

    try {
        const savedOrder = await newOrder.save();
        console.log("Processed Order:", savedOrder);
    } catch (err) {
        console.log(err);
    }
};

// Stripe webhook

// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret;

// endpointSecret = "whsec_ef9dc96832e7e3beba53e776686336112ff464b69cbd53609244b6d7564c949a";

router.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    (req, res) => {
        const sig = req.headers["stripe-signature"];

        let data;
        let eventType;

        if (endpointSecret) {
            let event;

            try {
                event = stripe.webhooks.constructEvent(
                    req.body,
                    sig,
                    endpointSecret
                );
                console.log("Webhook verified");
            } catch (err) {
                console.log(`Webhook Error: ${err.message}`);
                res.status(400).send(`Webhook Error: ${err.message}`);
                return;
            }

            data = event.data.object;
            eventType = event.type;
        } else {
            data = req.body.data.object;
            eventType = req.body.type;
        }

        // Handle the checkout.session.completed event
        if (eventType === "checkout.session.completed") {
            stripe.customers
                .retrieve(data.customer)
                .then((customer) => {
                    createOrder(customer, data)
                })
                .catch((err) => console.log(err.message));

        }

        res.send().end();
    }
);

module.exports = router;
