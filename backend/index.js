import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import wishlistRoutes from './routes/wishlistRoutes.js';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/images', express.static('uploads'));

app.get('/', (req, res) => {
    app.use(express.static(path.resolve(__dirname, 'frontend', 'dist')));
    app.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
});

const transporter = nodemailer.createTransport({
    secure: true,
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: process.env.EMAIL_TO,
        pass: process.env.EMAIL_PASS,
    },
});

app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        to: process.env.EMAIL_TO,
        subject: `New message from ${name}`,
        html: `You received a new message from your contact form: \n\nName: ${name} \nEmail: ${email} \nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions);
    return res.json({ success: true });
});

app.post('/api/otp', (req, res) => {
    try {
        const { email, otp } = req.body;
        const mailOptions = {
            to: email,
            subject: 'Login Otp',
            html: `Your One-Time-Password for login is: ${otp}`
        }
        transporter.sendMail(mailOptions);
        return res.json({ success: true, otp });
    } catch (error) {
        console.log(error);
    }
})

app.post('/api/update', (req, res) => {
    try {
        const { email, otp } = req.body;
        const mailOptions = {
            to: email,
            subject: 'Password Update Otp',
            html: `Your One-Time-Password for password update is: ${otp}`
        }
        transporter.sendMail(mailOptions);
        return res.json({ success: true, otp });
    } catch (error) {
        console.log(error);
    }
})

// runing server
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;