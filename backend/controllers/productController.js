import fs from 'fs';
import Product from '../models/Product.js';

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch products', error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch product', error: error.message });
    }
};

const createProduct = async (req, res) => {
    const { name, description, price, stock, category } = req.body;
    const image = `${req.file.filename}`
    try {
        const product = new Product({
            name,
            description,
            price,
            stock,
            image,
            category,
            user: req.user._id,  // The user creating the product (must be an admin)
        });

        const createdProduct = await product.save();
        res.status(201).json({ success: true, createdProduct});
    } catch (error) {
        res.status(500).json({ message: 'Failed to create product', error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.body.productId);

        if (product) {
            fs.unlink(`uploads/${product.image}`, ()=>{ })
            await Product.findByIdAndDelete(req.body.productId)
            res.json({ success: true, message: 'Product removed' });
        } else {
            res.status(404).json({ success: false, message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete product', error: error.message });
    }
};

export {
    getProducts,
    getProductById,
    createProduct,
    deleteProduct,
};
