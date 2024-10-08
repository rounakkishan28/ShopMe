import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context/storeContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Order = () => {
  const { url } = useContext(StoreContext);
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        const response = await axios.get(`${url}/api/order/${id}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        setOrder(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error while fetching order details');
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return (<div className='flex items-center justify-center min-h-fit bg-gray-100'>
    <div className='w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 border-4 border-solid border-stone-400 border-t-violet-500 rounded-full animate-spin'></div>
  </div>)
  if (error) return <h2 className="text-center text-lg text-red-500">{error}</h2>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>

      {/* Delivery Address Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Delivery Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><strong>First Name:</strong> {order.shippingAddress.firstName}</p>
            <p><strong>Last Name:</strong> {order.shippingAddress.lastName}</p>
            <p><strong>Email:</strong> {order.shippingAddress.email}</p>
            <p><strong>Phone:</strong> {order.shippingAddress.phone}</p>
          </div>
          <div>
            <p><strong>Street:</strong> {order.shippingAddress.street}</p>
            <p><strong>City:</strong> {order.shippingAddress.city}</p>
            <p><strong>State:</strong> {order.shippingAddress.state}</p>
            <p><strong>Zip Code:</strong> {order.shippingAddress.zipcode}</p>
            <p><strong>Country:</strong> {order.shippingAddress.country}</p>
          </div>
        </div>
      </div>

      {/* Order Items Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-2">Order Items</h3>
        <ul>
          {order.orderItems.map((item, index) => (
            <li
              key={item._id}
              className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-2 px-4 hover:bg-gray-100 transition-colors"
            >
              <span className="truncate">{item.name}</span>
              <span className="font-semibold">₹ {item.price}</span>
              <span className="font-semibold">{item.quantity} Pcs</span>
              <span className="font-semibold">₹ {item.quantity * item.price}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Payment Status Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-2">Payment Status</h3>
        <p className={`${order.isPaid ? 'text-green-500' : 'text-red-500'}`}>
          {order.isPaid ? 'Paid' : 'Not Paid'}
        </p>
      </div>

      {/* Order Total Section */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">Order Total</h3>
        <p className="text-2xl font-bold">₹ {order.totalPrice}</p>
      </div>
    </div>
  );
};

export default Order;
