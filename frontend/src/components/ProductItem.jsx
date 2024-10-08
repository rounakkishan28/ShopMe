import React, { useContext } from 'react';
import { StoreContext } from '../context/storeContext.jsx';
import { assets } from '../assets/assets.js';
import { useNavigate } from 'react-router-dom';

const ProductItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const navigate = useNavigate()

  return (
    <div className='w-fit sm:w-full m-auto rounded-2xl shadow-md transition-transform transform hover:scale-105 hover:shadow-lg hover:shadow-violet-300'>
      <div className='relative'>
        <img onClick={() => navigate(`/products/${id}`)} src={url + "/images/" + image} alt={name} className='w-full h-80 sm:h-72 object-cover rounded-2xl' />

        {!cartItems[id] ? (
          <img
            className='absolute w-9 bottom-4 right-4 cursor-pointer rounded-full hover:scale-110 transition-transform hover:shadow-md'
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="Add to cart"
          />
        ) : (
          <div className='absolute bottom-4 right-4 flex gap-0.5 p-1.5 items-center bg-white rounded-2xl hover:shadow-md transition'>
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="Remove from cart"
              className='cursor-pointer hover:scale-110 transition-transform'
            />
            <p className='px-1 text-lg'>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="Add more"
              className='cursor-pointer hover:scale-110 transition-transform'
            />
          </div>
        )}
      </div>

      <div onClick={() => navigate(`/products/${id}`)} className='p-4 sm:p-5 cursor-pointer'>
        <div className='flex justify-between items-center mb-3'>
          <p className='text-lg sm:text-xl font-medium'>{name}</p>
          <img src={assets.rating_stars} alt="Rating" className='w-12 sm:w-16' />
        </div>
        <p className='text-xs sm:text-sm text-stone-500 mb-2'>{description}</p>
        <p className='text-xl sm:text-2xl text-violet-600 font-medium'>₹ {price}</p>
      </div>
    </div>
  );
};

export default ProductItem;
