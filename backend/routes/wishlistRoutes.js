import express from 'express';
import { addToWishlist, removeFromWishlist, getWishlist } from '../controllers/wishListController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const wishlistRoutes = express.Router();

wishlistRoutes.post('/add', authMiddleware, addToWishlist);
wishlistRoutes.delete('/remove', authMiddleware, removeFromWishlist);
wishlistRoutes.get('/get', authMiddleware, getWishlist);

export default wishlistRoutes;