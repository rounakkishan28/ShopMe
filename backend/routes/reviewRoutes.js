import { Router } from "express";
import { getReviews, createReview, updateReview, deleteReview } from '../controllers/reviewController.js';
import { authMiddleware } from "../middleware/authMiddleware.js";

const router=Router();

router.post('/:id/create', authMiddleware, createReview);
router.get('/:id/get', getReviews);
router.put('/:id/update', authMiddleware, updateReview);
router.delete('/:id/delete', authMiddleware, deleteReview);

export default router;