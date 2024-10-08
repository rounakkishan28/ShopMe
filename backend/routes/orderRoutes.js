import { Router } from 'express';
import { createOrder, verifyOrder, getOrders, getOrderById, updateOrderToDelivered } from '../controllers/orderController.js';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', authMiddleware, createOrder);
router.get('/orders', authMiddleware, getOrders);
router.post('/verify', verifyOrder);
router.get('/:id', authMiddleware, getOrderById);
router.put('/:id/deliver', authMiddleware, adminMiddleware, updateOrderToDelivered);

export default router;
