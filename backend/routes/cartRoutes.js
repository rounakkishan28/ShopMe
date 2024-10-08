import express from 'express';
import { addToCart, removeFromCart, getCart } from '../controllers/cartController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const cartRoutes = express.Router();

cartRoutes.post('/add', authMiddleware, addToCart);
cartRoutes.delete('/remove', authMiddleware, removeFromCart);
cartRoutes.get('/get', authMiddleware, getCart);

export default cartRoutes;
