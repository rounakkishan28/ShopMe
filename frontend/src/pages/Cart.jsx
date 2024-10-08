import React, { useContext } from 'react';
import { StoreContext } from '../context/storeContext.jsx';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const { cartItems, productList, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className='mt-10 mx-4 sm:mx-12 px-4'>
      <div>
        {/* Table Header */}
        <div className='hidden md:grid grid-cols-6 items-center'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr className='h-px bg-slate-300 border-none' />

        {/* Cart Items */}
        {productList.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className='flex flex-col md:grid grid-cols-6 items-center mx-2.5 text-black gap-4 my-4'>
                  <img
                    onClick={() => navigate(`/products/${item._id}`)}
                    src={url + "/images/" + item.image}
                    alt=""
                    className='w-14 md:w-20 cursor-pointer hover:scale-110 transition-transform duration-300'
                  />
                  <p onClick={() => navigate(`/products/${item._id}`)} className='text-sm font-semibold cursor-pointer md:text-base hover:text-violet-500 transition-colors duration-300'>{item.name}</p>
                  <p className='text-sm md:text-base'>₹ {item.price}</p>
                  <p className='text-sm md:text-base'>{cartItems[item._id]}</p>
                  <p className='text-sm md:text-base'>₹ {item.price * cartItems[item._id]}</p>
                  <button
                    className='w-16 bg-red-600 rounded-xl text-white md:text-red-950 text-xs md:text-base hover:bg-red-700 hover:text-white transition-all duration-300'
                    onClick={() => removeFromCart(item._id)}
                  >
                    X
                  </button>
                </div>
                <hr className='h-px bg-slate-300 border-none' />
              </div>
            );
          }
        })}
      </div>

      {/* Cart Summary */}
      <div className='flex flex-col md:flex-row justify-between mt-12 gap-5'>
        <div className='flex flex-col flex-1 gap-5'>
          <h2 className='font-bold text-lg md:text-2xl'>Cart Totals</h2>
          <div>
            <div className='flex justify-between text-stone-500'>
              <p>Subtotal</p>
              <p>₹ {getTotalCartAmount()}</p>
            </div>
            <hr className='mx-2.5' />
            <div className='flex justify-between text-stone-500'>
              <p>Delivery Fee</p>
              <p>₹ {getTotalCartAmount() === 0 ? 0 : 100}</p>
            </div>
            <hr className='mx-2.5' />
            <div className='flex justify-between text-stone-500'>
              <p>Total</p>
              <p>₹ {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 100}</p>
            </div>
          </div>
          <button
            className='border-none text-white text-sm bg-violet-600 w-full md:w-52 px-4 py-2 rounded cursor-pointer hover:bg-violet-700 transition-all duration-300'
            onClick={() => navigate('/order')}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>

        {/* Promo Code Section */}
        <div className='flex-1'>
          <div>
            <p className='text-stone-500'>If you have a promo code, Enter it here</p>
            <div className='mt-2.5 flex justify-between items-center bg-slate-100 rounded'>
              <input
                className='bg-transparent border-none outline-none pl-2.5 flex-grow'
                type="text"
                placeholder='promo-code'
              />
              <button
                className='w-24 md:w-40 px-3 py-1.5 bg-black text-white text-xs md:text-sm border-none rounded hover:bg-gray-800 transition-all duration-300'
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
