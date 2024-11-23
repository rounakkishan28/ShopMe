import Stripe from 'stripe';
import Order from '../models/Order.js';
import User from '../models/User.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create a new order
const createOrder = async (req, res) => {

    const { orderItems, shippingAddress, totalPrice } = req.body;

    if (!orderItems) {
        res.json({ success: false, message: 'failed' })
    }

    // Check if there are any order items
    if (orderItems && orderItems.length === 0) {
        res.status(400).json({ success: false, message: 'No order items' });
    }

    const frontend_url = 'http://localhost:5173';

    const order = new Order({
        user: req.user,
        orderItems,
        shippingAddress,
        totalPrice,
    });

    try {
        const createdOrder = await order.save();

        await User.findByIdAndUpdate(req.user._id, { cartData: {} })

        const line_items = orderItems.map((item) => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.name
                },
                unit_amount: item.price*100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: 100*100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${createdOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${createdOrder._id}`
        })

        res.status(201).json({ success: true, session_url: session.url, createdOrder })
    }
    catch (error) {
        res.json({ success: false, message: "error" })
    }

};

const verifyOrder = async (req, res) => {

    const { orderId, success } = req.body

    try {
        if (success) {
            await Order.findByIdAndUpdate(orderId, { isPaid: true, pairAt: Date.now() })
            res.json({ success: true, message: 'Paid' })
        }
        else {
            await Order.findByIdAndDelete(orderId)
            res.json({ success: false, message: 'Error' })
        }
    }
    catch (error) {
        res.json({ success: false, message: 'Error' })
    }

}

// Get orders of logged-in user
const getOrders = async (req, res) => {

    try {
        const orders = await Order.find({ user: req.user });
        if (orders) {
            res.json(orders);
        } else {
            res.status(404).json({ message: 'Orders not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }

};

// Get order by ID (Admin only or order owner)
const getOrderById = async (req, res) => {

    try {
        const order = await Order.findById(req.params.id).populate('user', 'username email');

        if (order) {
            // Ensure that the order belongs to the user or the user is an admin
            if (order.user._id.equals(req.user._id) || req.user.isAdmin) {
                res.json(order);
            } else {
                res.status(403).json({ message: 'Not authorized to view this order' });
            }
        } else {
            res.status(404).json({ message: 'Order not found' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }

};

// Update order to delivered (Admin only)
const updateOrderToDelivered = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export {
    createOrder,
    verifyOrder,
    getOrders,
    getOrderById,
    updateOrderToDelivered,
};
