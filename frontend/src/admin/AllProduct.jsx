import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../context/storeContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AllProduct = () => {

    const { url } = useContext(StoreContext);
    const [token, setToken] = useState("");
    const [list, setList] = useState([]);
    const [admin, setAdmin] = useState(false);
    const navigate=useNavigate();

    const fetchList = async () => {
        const response = await axios.get(`${url}/api/products/get`);
        if (response.data.success) {
            setList(response.data.data);
        }
    };

    const removeFood = async (productId) => {
        const response = await axios.delete(`${url}/api/products/delete`, { data: { productId }, headers: { Authorization: `Bearer ${token} ` } });
        await fetchList();
        if (response.data.success) {
            toast.success("Product Removed.");
        } else {
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
        const x=localStorage.getItem('token');
        if(!x){
            navigate('/');
        }
        fetchUserDetails(x);
        setToken(x);
        fetchList();
    }, []);

    if(!admin) return;

    return (
        <div className='w-full max-w-7xl mx-auto mt-8 px-4'>
            <h1 className='text-2xl font-bold mb-6'>All Products List</h1>
            <div className="overflow-x-auto">
                <div className="min-w-max w-full bg-gray-100 rounded-lg shadow">
                    {/* Table Header */}
                    <div className="grid grid-cols-6 gap-4 p-4 bg-gray-200 rounded-t-lg text-left text-sm font-semibold">
                        <p>Image</p>
                        <p>Name</p>
                        <p>Description</p>
                        <p>Category</p>
                        <p>Price</p>
                        <p className='text-center'>Action</p>
                    </div>

                    {/* Product Rows */}
                    {list.map((item, index) => (
                        <div
                            key={index}
                            className='grid grid-cols-6 gap-4 w-screen p-4 items-center border-b border-gray-200 text-sm hover:bg-gray-100 transition-colors duration-300'
                        >
                            <img
                                src={`${url}/images/` + item.image}
                                alt={item.name}
                                className='h-16 w-16 object-cover rounded-md hover:shadow-lg transition-shadow duration-300'
                            />
                            <p className='hover:text-violet-600 transition-colors duration-300'>{item.name}</p>
                            <p className='hover:text-violet-600 transition-colors duration-300'>{item.description}</p>
                            <p className='hover:text-violet-600 transition-colors duration-300'>{item.category}</p>
                            <p className='text-violet-600 font-semibold'>{`₹ ${item.price}`}</p>
                            <button
                                onClick={() => removeFood(item._id)}
                                className='text-red-500 hover:underline hover:text-red-700 transition-colors duration-300 cursor-pointer'
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllProduct;
