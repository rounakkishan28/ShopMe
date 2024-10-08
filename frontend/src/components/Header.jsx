import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const navigate=useNavigate()

  return (
    <div 
      className="w-full min-h-[20vh] sm:min-h-[60vh] lg:min-h-[90vh] mb-12 bg-cover bg-no-repeat relative"
      style={{ backgroundImage: `url(${assets.background})` }}
    >
      <div className="absolute flex flex-col items-center gap-0.5 sm:gap-4 w-full sm:w-full py-5 sm:py-20 lg:py-20 px-4 sm:px-8 lg:px-16">
        <h2 className="font-medium text-2xl sm:text-4xl lg:text-5xl text-white pb-4 sm:pb-6 lg:pb-8 leading-tight sm:leading-normal lg:leading-snug transition duration-300">
          Double Dhamaka Offer
        </h2>
        <h1 className="font-medium text-3xl sm:text-5xl lg:text-6xl text-white pb-4 sm:pb-6 lg:pb-8 leading-tight sm:leading-normal lg:leading-snug transition duration-300">30% OFF</h1>
        <p className="hidden sm:block text-white text-center text-sm sm:text-base lg:text-lg leading-relaxed lg:leading-loose">
        From smartphones to laptops, home appliances to accessories, we offer a curated selection of top-tier electronics designed to enhance your lifestyle. Shop now for unbeatable quality, innovation, and the best deals on all your tech needs.
        </p>
        <button onClick={()=>navigate('/products')} className="border-none text-stone-500 font-medium text-xs sm:text-sm lg:text-base px-5 sm:px-8 py-2 my-6 sm:my-8 lg:my-10 bg-white rounded-full shadow-md hover:bg-violet-600 hover:text-white transition duration-300">
          Shop Now
        </button>
      </div>
    </div>
  );
}

export default Header;
