import { Router } from 'express';
import { getProducts, getProductById, createProduct, deleteProduct } from '../controllers/productController.js';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';
import multer from 'multer';
const router = Router();

router.get('/get', getProducts);
router.get('/:id', getProductById);

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Admin route
router.post('/add', authMiddleware, adminMiddleware, upload.single("image"), createProduct);
router.delete('/delete', authMiddleware, adminMiddleware, deleteProduct);

export default router;
