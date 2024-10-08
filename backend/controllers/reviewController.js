import Review from '../models/Review.js';
import Product from '../models/Product.js';

const getReviews = async (req, res) => {
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    const reviews = await Review.find({ product: productId });
    res.status(200).json(reviews);
};

const createReview = async (req, res) => {
    const { rating, comment } = req.body;
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product) {
        res.status(404).json({ success: false, message: 'Product not found' });
        throw new Error('Product not found');
    }

    const alreadyReviewed = await Review.findOne({ product: productId, user: req.user._id });
    if (alreadyReviewed) {
        res.json({ success: false, message: 'Already Reviewed' });
    }

    const review = new Review({
        product: productId,
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    });

    await review.save();

    product.numReviews = product.numReviews + 1;
    product.rating = (product.rating * (product.numReviews - 1) + rating) / product.numReviews;

    await product.save();

    res.status(201).json({ success: true, message: 'Review added' });
};

const updateReview = async (req, res) => {
    const { rating, comment } = req.body;
    const reviewId = req.params.id;
    const userId = req.user._id;

    const review = await Review.findById(reviewId);
    if (!review) {
        res.status(404);
        throw new Error('Review not found');
    }

    if (review.user.toString() !== userId.toString()) {
        res.status(403);
        throw new Error('You are not authorized to update this review');
    }

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;

    await review.save();

    res.status(200).json({ message: 'Review updated', review });
};

const deleteReview = async (req, res) => {
    const reviewId = req.params.id;
    const userId = req.user._id;

    const review = await Review.findById(reviewId);
    if (!review) {
        res.status(404);
        throw new Error('Review not found');
    }

    if (review.user.toString() !== userId.toString() && !req.user.isAdmin) {
        res.status(403);
        throw new Error('You are not authorized to delete this review');
    }

    await review.remove();

    res.status(200).json({ message: 'Review deleted' });
};

export {
    getReviews,
    createReview,
    updateReview,
    deleteReview,
};
