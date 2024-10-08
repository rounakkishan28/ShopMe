import React from 'react';
import { product_list } from '../assets/assets.js';

const ProductList = ({ category, setCategory }) => {
  return (
    <div className='flex flex-col gap-5 px-4 mt-4 mx-4 sm:mx-12' id='shop'>
      <h1 className='text-black text-2xl sm:text-3xl font-bold text-center sm:text-left'>Explore our products</h1>
      <p className='text-stone-500 text-sm sm:text-base w-full sm:w-5/6 text-center sm:text-left'>
      From smartphones to laptops, home appliances to accessories, we offer a curated selection of top-tier electronics designed to enhance your lifestyle. Shop now for unbeatable quality, innovation, and the best deals on all your tech needs.
      </p>

      {/* Horizontal Scrollable Menu with Hover Effects */}
      <div className='flex justify-start items-center gap-6 overflow-x-auto py-4'>
        {product_list.map((item, index) => {
          return (
            <div 
              onClick={() => setCategory(prev => prev === item.product_name ? "All" : item.product_name)} 
              key={index} 
              className="flex-shrink-0 text-center cursor-pointer transition-transform hover:scale-105"
            >
              {/* Image */}
              <img 
                className={`w-20 h-20 sm:w-24 sm:h-24 transition-transform ${category === item.product_name ? "rounded-full p-2 border-4 border-solid border-violet-500 hover:border-violet-700" : "rounded-full hover:border-2 hover:border-violet-500"}`} 
                src={item.product_image} 
                alt={item.product_name} 
              />
              {/* Product Name */}
              <p className={`mt-2 text-xs sm:text-base transition-colors ${category === item.product_name ? "p-2 border-2 border-solid border-violet-500 hover:border-violet-700" : "hover:text-violet-500"}`}>
                {item.product_name}
              </p>
            </div>
          );
        })}
      </div>

      <hr className='border-t-2 border-stone-200' />
    </div>
  );
};

export default ProductList;
