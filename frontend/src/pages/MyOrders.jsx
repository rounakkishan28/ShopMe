import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context/storeContext.jsx';
import axios from 'axios';
import { assets } from '../assets/assets.js';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
  const { url } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async (storedToken) => {
    const response = await axios.get(`${url}/api/order/orders`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });
    setData(response.data);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      fetchOrders(storedToken);
    }
  }, []);

  return (
    <div className="mx-4 md:mx-14 my-8">
      <h2 className="text-lg md:text-2xl font-semibold text-center md:text-left">My Orders</h2>
      
      <div className="flex flex-col gap-5 mt-8">
        {data.map((order, index) => (
          <div
            onClick={() => navigate(`/myorders/${order._id}`)}
            key={index}
            className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8 text-sm md:text-base px-4 py-5 text-stone-700 border-violet-500 border-solid border rounded-md hover:bg-violet-100 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <img
              src={assets.parcel_icon}
              alt="Parcel"
              className="w-10 md:w-12 hover:scale-110 transition-transform duration-300"
            />

            <div className="text-center md:text-left w-full md:w-64">
              {order.orderItems.map((item, index) =>
                index === order.orderItems.length - 1
                  ? <p key={index}><span className='font-semibold'>{item.name}</span> x {item.quantity}</p>
                  : <p key={index}><span className='font-semibold'>{item.name}</span> x {item.quantity}, </p>
              )}
            </div>

            <p className="font-medium w-full md:w-auto text-center md:text-left">₹ {order.totalPrice}.00</p>

            <p className="font-medium w-full md:w-auto text-center md:text-left">Items: {order.orderItems.length}</p>

            <p className="font-medium text-stone-600 w-full md:w-auto text-center md:text-left">
              {new Date(order.paidAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
