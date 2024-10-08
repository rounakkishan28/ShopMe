import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context/storeContext.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PlaceOrder = ({ setShowAddress }) => {

  const { getTotalCartAmount, productList, cartItems, url } = useContext(StoreContext);
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState(null);
  const [address, setAddress] = useState(null);

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    productList.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      orderItems: orderItems,
      shippingAddress: address,
      totalPrice: getTotalCartAmount() + 100
    };
    const token = localStorage.getItem('token');
    let response = await axios.post(url + "/api/order/", orderData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
      navigate('/');
    } else {
      toast.error("Error Occured.");
    }
  };

  const fetchAddresses = async (token) => {
    try {
      const response = await axios.get(`${url}/api/users/addresses`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setAddresses(response.data.addresses);
      }
    } catch (error) {
      console.error("Error in fetching addresses", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
    fetchAddresses(token);
  }, []);

  if (!addresses) {
    return (
      <div className='flex items-center justify-center min-h-fit bg-gray-100'>
        <div className='w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 border-4 border-solid border-stone-400 border-t-violet-500 rounded-full animate-spin'></div>
      </div>
    )
  }

  return (
    <div className='flex flex-col md:flex-row items-start justify-around gap-8 md:gap-28 m-4 md:m-14'>
      {/* Delivery Information Section */}
      <div className='w-full md:max-w-lg'>
        <p className='text-xl md:text-2xl font-bold mb-8'>Saved Addresses</p>
        <p onClick={() => setShowAddress(true)} className='mb-8 border-none text-white text-center text-sm md:text-base bg-violet-600 w-full md:w-52 px-4 py-2 rounded cursor-pointer transition duration-200 ease-in-out hover:bg-violet-800'>Add New Address</p>
        <div className='flex flex-col gap-4'>
          {addresses.map((address, index) => {
            return (
              <div
                key={index}
                className='border-2 p-4'
              >
                <div className='flex justify-between font-semibold text-lg'>
                  <p>{address.firstName} {address.lastName}</p>
                  <input onChange={() => setAddress(address)} className='accent-violet-600' type='checkbox' />
                </div>
                <p>{address.email}</p>
                <p>{address.street}</p>
                <p>{address.city}</p>
                <p>{address.state}</p>
                <p>{address.phone}</p>
              </div>
            )
          })}</div>
      </div>

      {/* Cart Totals Section */}
      <div className='w-full md:max-w-lg'>
        <h2 className='text-xl md:text-2xl font-bold mb-8 md:mb-14'>Cart Totals</h2>
        <div className='p-4 bg-white rounded-lg shadow'>
          <div className='flex justify-between p-2'>
            <p>Subtotal</p>
            <p>₹ {getTotalCartAmount()}</p>
          </div>
          <hr className='h-px bg-slate-400 border-none' />
          <div className='flex justify-between p-2'>
            <p>Delivery Fee</p>
            <p>₹ {getTotalCartAmount() === 0 ? 0 : 100}</p>
          </div>
          <hr className='h-px bg-slate-400 border-none' />
          <div className='flex justify-between p-2'>
            <p>Total</p>
            <p>₹ {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 100}</p>
          </div>
          <button
            className='mt-8 border-none text-white text-sm md:text-base bg-violet-600 w-full md:w-52 px-4 py-2 rounded cursor-pointer transition duration-200 ease-in-out hover:bg-violet-500 hover:scale-105'
            onClick={placeOrder}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
