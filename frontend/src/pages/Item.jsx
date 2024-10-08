import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { StoreContext } from '../context/storeContext.jsx';
import { assets } from '../assets/assets.js';
import { toast } from 'react-toastify';

const Item = () => {
    const { url, addToCart, removeFromCart, addToWishlist, removeFromWishlist, cartItems, wishlistItems } = useContext(StoreContext);
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState("");
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const onChangeHandlerComment = (e) => {
        setComment(e.target.value);
    }
    const onChangeHandlerRating = (e) => {
        setRating(e.target.value);
    }

    const onSubmit = async () => {
        if (comment === "") return;
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(`${url}/api/reviews/${id}/create`, { rating, comment }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (response.data.success) {
                setComment('');
                setRating('');
                toast.success("Review Added.")
            }
            else{
                setComment('');
                setRating('');
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error("Error Occurred.");
        }
    }

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${url}/api/reviews/${id}/get`);
                setReviews(response.data);
            } catch (error) {
                setError('Error while fetching reviews');
            }
        }
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${url}/api/products/${id}`);
                setProduct(response.data);
                fetchReviews();
                setLoading(false);
            } catch (error) {
                setError('Error while fetching product details');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <h2>Loading...</h2>;
    if (error) return <h2>{error}</h2>;

    return (
        <div className="flex flex-col mx-4 sm:mx-12 md:flex-row gap-8 p-4 md:p-8 items-center md:items-start">
            <img
                src={`${url}/images/${product.image}`}
                alt={product.name}
                className="w-full md:w-1/3 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
            />
            <div className="w-full md:w-2/3 flex flex-col gap-5">
                <h1 className="text-2xl md:text-3xl font-bold text-center md:text-left">{product.name}</h1>
                <p className="text-base md:text-xl">{product.description}</p>
                <h3 className="text-xl md:text-2xl text-violet-600 font-medium">
                    Price: ₹ {product.price}
                </h3>
                <p className="text-sm md:text-base">Category: {product.category}</p>
                <p className="text-sm md:text-base">{reviews.length} Ratings</p>
                <div className="flex gap-4 flex-col sm:flex-row sm:gap-8 mt-4 justify-center md:justify-start">
                    {cartItems[id] ? (
                        <div className="flex gap-2 items-center">
                            <button
                                onClick={() => removeFromCart(id)}
                                className="p-2 bg-red-100 hover:bg-red-200 rounded-full transition-colors"
                            >
                                <img src={assets.remove_icon_red} alt="Remove from cart" className="w-5 h-5" />
                            </button>
                            <p className="text-lg">{cartItems[id]}</p>
                            <button
                                onClick={() => addToCart(id)}
                                className="p-2 bg-green-100 hover:bg-green-200 rounded-full transition-colors"
                            >
                                <img src={assets.add_icon_green} alt="Add more" className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => addToCart(id)}
                            className="bg-violet-500 py-2 px-4 rounded-md text-white hover:bg-violet-600 hover:shadow-lg transition duration-300"
                        >
                            Add To Cart
                        </button>
                    )}
                    {wishlistItems[id] ? (
                        <button
                            onClick={() => removeFromWishlist(id)}
                            className="py-2 px-4 font-medium border border-violet-500 rounded-md text-violet-500 hover:bg-violet-500 hover:text-white hover:shadow-lg transition duration-300"
                        >
                            Remove From Wishlist
                        </button>
                    ) : (
                        <button
                            onClick={() => addToWishlist(id)}
                            className="py-2 px-4 font-medium border border-violet-500 rounded-md text-violet-500 hover:bg-violet-500 hover:text-white hover:shadow-lg transition duration-300"
                        >
                            Add To Wishlist
                        </button>
                    )}
                </div>

                {/* Reviews Section */}
                <div className="my-8">
                    <h2 className="text-lg md:text-2xl font-semibold text-center md:text-left">Reviews</h2>
                    <div className="flex flex-col gap-5 mt-6">
                        <div className="flex flex-col md:flex-row gap-5">
                            <textarea
                                className="w-full p-2.5 rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-violet-600 hover:border-violet-500 transition resize-none"
                                onChange={onChangeHandlerComment}
                                value={comment}
                                placeholder="Write your review"
                                rows="3"
                            ></textarea>
                            <div className="w-full md:w-1/3">
                                <select
                                    className="p-2.5 w-full rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-violet-600 hover:border-violet-500 transition"
                                    onChange={onChangeHandlerRating}
                                    value={rating}
                                >
                                    <option value="" disabled>Give Rating</option>
                                    <option value={1}>1-star</option>
                                    <option value={2}>2-star</option>
                                    <option value={3}>3-star</option>
                                    <option value={4}>4-star</option>
                                    <option value={5}>5-star</option>
                                </select>
                                <button
                                    onClick={onSubmit}
                                    className="w-full mt-2 p-2.5 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition"
                                >
                                    Add Review
                                </button>
                            </div>
                        </div>
                        {reviews.map((review, index) => (
                            <div key={index} className="mt-4 border border-violet-300 rounded-md p-3">
                                <div className='flex gap-2'>
                                    <p className="text-xs sm:text-sm text-stone-500 border border-violet-300 bg-violet-100 pl-1 pr-0.5">{review.rating}★</p>
                                    <p className="text-xs sm:text-sm text-slate-700 font-semibold">{review.name}</p>
                                </div>
                                <p className="text-xs sm:text-sm text-stone-500 mt-2">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Item;
