import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../context/storeContext.jsx';
import { assets } from '../assets/assets.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Add = () => {
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();
    const [admin, setAdmin]=useState(false);
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: ''
    });

    // Handle input changes
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Handle form submission
    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (!data.name || !data.description || !data.price || !data.category || !data.stock || !image) {
            return;
        }

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', Number(data.price));
        formData.append('category', data.category);
        formData.append('stock', data.stock);
        formData.append('image', image);

        const token = localStorage.getItem('token');

        try {
            const response = await axios.post(`${url}/api/products/add`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                setData({
                    name: '',
                    description: '',
                    price: '',
                    category: '',
                    stock: ''
                });
                setImage(null);
                toast.success("Product Added.");
            } else {
                toast.error("Error Occured.");
            }
        } catch (error) {
            toast.error("Error Occured.");
        }
    };

    const fetchUserDetails = async (token) => {
        try {
          const response = await axios.get(`${url}/api/users/profile`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (response.data.success) {
            setAdmin(response.data.user.isAdmin);
          }
        } catch (error) {
          console.error("Error fetching user details", error);
        }
      };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) navigate('/');
        fetchUserDetails(token);
    }, [])

    if(!admin) return;

    return (
        <div className='w-full max-w-7xl mx-auto mt-12 text-stone-500 text-base px-4'>
            <form className='flex flex-col lg:flex-row justify-between gap-8' onSubmit={onSubmitHandler} encType='multipart/form-data'>

                {/* Image Upload Section */}
                <div className="flex flex-col w-full lg:w-1/3">
                    <p>Upload Image</p>
                    <label htmlFor="image" className='cursor-pointer'>
                        <img
                            className='w-full rounded-lg object-cover hover:shadow-lg transition-shadow duration-300'
                            src={image ? URL.createObjectURL(image) : assets.upload_area}
                            alt="Product"
                        />
                    </label>
                    <input
                        type="file"
                        id='image'
                        hidden
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                    />
                </div>

                {/* Product Details Form */}
                <div className='flex flex-col gap-6 w-full lg:w-2/3'>

                    {/* Product Name */}
                    <div className="flex flex-col">
                        <p>Product name</p>
                        <input
                            className='p-2.5 w-full rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-violet-600 hover:border-violet-500 transition-colors duration-200'
                            onChange={onChangeHandler}
                            value={data.name}
                            type="text"
                            name="name"
                            placeholder='Product Name'
                            required
                        />
                    </div>

                    {/* Product Description */}
                    <div className="flex flex-col">
                        <p>Product description</p>
                        <textarea
                            className='p-2.5 w-full rounded-md border border-stone-300 resize-none focus:outline-none focus:ring-2 focus:ring-violet-600 hover:border-violet-500 transition-colors duration-200'
                            onChange={onChangeHandler}
                            value={data.description}
                            name="description"
                            rows='4'
                            placeholder='Product Description'
                            required
                        ></textarea>
                    </div>

                    {/* Product Category, Stock, and Price */}
                    <div className="flex flex-col sm:flex-row sm:gap-6">

                        {/* Category */}
                        <div className="flex flex-col w-full sm:w-1/3">
                            <p>Product category</p>
                            <select
                                className='p-2.5 w-full rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-violet-600 hover:border-violet-500 transition-colors duration-200'
                                onChange={onChangeHandler}
                                value={data.category}
                                name="category"
                                required
                            >
                                <option value="" disabled>Select Category</option>
                                <option value="Cameras">Cameras</option>
                                <option value="Headphones">Headphones</option>
                                <option value="Laptops">Laptops</option>
                                <option value="Mobiles">Mobiles</option>
                                <option value="Powerbanks">Powerbanks</option>
                                <option value="Smartwatches">Smartwatches</option>
                                <option value="Speakers">Speakers</option>
                                <option value="Tablets">Tablets</option>
                                <option value="Monitors">Monitors</option>
                                <option value="Hard Disks">Hard Disks</option>
                            </select>
                        </div>

                        {/* Stock */}
                        <div className="flex flex-col w-full sm:w-1/3">
                            <p>Stock</p>
                            <input
                                className='p-2.5 w-full rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-violet-600 hover:border-violet-500 transition-colors duration-200'
                                onChange={onChangeHandler}
                                value={data.stock}
                                type="number"
                                name='stock'
                                placeholder='Stock'
                                required
                            />
                        </div>

                        {/* Price */}
                        <div className="flex flex-col w-full sm:w-1/3">
                            <p>Product price</p>
                            <input
                                className='p-2.5 w-full rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-violet-600 hover:border-violet-500 transition-colors duration-200'
                                onChange={onChangeHandler}
                                value={data.price}
                                type="number"
                                name='price'
                                placeholder='Price (₹)'
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type='submit'
                        className='w-full sm:w-1/3 mt-4 p-2.5 bg-violet-600 text-white rounded-md shadow hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-600 transition-colors duration-200'
                    >
                        ADD
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Add;
