import { Router } from 'express';
import { registerUser, authUser,updatePassword, addNewAddress, getAddresses, getUserProfile } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', authUser);
router.put('/update', updatePassword);

// Protected routes
router.get('/profile', authMiddleware, getUserProfile);
router.post('/addaddress', authMiddleware, addNewAddress);
router.get('/addresses', authMiddleware, getAddresses);

export default router;
