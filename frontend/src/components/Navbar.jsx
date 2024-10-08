import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets.js';
import { StoreContext } from '../context/storeContext.jsx';

const Navbar = ({ setShowLogin }) => {
  const { getTotalCartAmount, token } = useContext(StoreContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className='flex justify-between items-center px-5 py-3 bg-white shadow-md'>
      <Link to='/'><img className='h-12 sm:h-16' src={assets.logo} alt="logo" /></Link>

      {/* Main Menu */}
      <ul className={`list-none md:flex gap-8 text-lg items-center transition-transform duration-300 transform md:translate-x-0 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:static fixed top-0 left-0 w-full h-screen bg-black/[0.565] z-50 md:h-auto md:w-auto md:bg-transparent`}>
        <Link to='/' className='md:hidden flex justify-around bg-white pt-4'><img className='h-12 sm:h-16 hover:opacity-80 transition duration-300' src={assets.logo} alt="logo" /></Link>
        <div className={`md:hidden flex items-center justify-around bg-white py-4`}>
          <Link to='/profile' className=''>
            <div className='flex justify-center items-center gap-4'>
              <img className="h-5 sm:h-8 hover:opacity-80 transition duration-300" src={assets.profile} alt="Profile" />
              <p className='font-semibold text-xl'>Profile</p>
            </div>
          </Link>
        </div>
        <Link to='/' className={`block py-2 px-4 sm:py-0 sm:px-0 bg-white text-center hover:text-violet-600 transition duration-300`}>Home</Link>
        <Link to='/products'className={`block py-2 px-4 sm:py-0 bg-white text-center sm:px-0 hover:text-violet-600 transition duration-300`}>Shop</Link>
        <Link to='/about'className={`block py-2 px-4 sm:py-0 sm:px-0 bg-white text-center hover:text-violet-600 transition duration-300`}>About</Link>
        <Link to='/contact'className={`block py-2 px-4 sm:py-0 sm:px-0 bg-white text-center hover:text-violet-600 transition duration-300`}>Contact</Link>
        <div className='flex justify-around p-6 md:hidden'>
        <img
          className='cursor-pointer w-10 h-10 transition-transform hover:scale-110 bg-black/[0.700] p-0.5 rounded-full'
          onClick={handleMenuToggle}
          src={assets.cross_icon}
          alt="Close"
        />
        </div>
      </ul>

      <div className='flex gap-5 sm:gap-10 items-center'>
        <Link to='/products'><img className="h-6 sm:h-8 hover:opacity-80 transition duration-300" src={assets.search} alt="Search" /></Link>
        <div className='relative'>
          <Link to='/cart'><img className="h-6 sm:h-8 hover:opacity-80 transition duration-300" src={assets.basket} alt="Cart" /></Link>
          {getTotalCartAmount() > 0 && (
            <div className="absolute w-3 h-3 bg-violet-600 text-violet-600 text-xs flex justify-center items-center rounded-full -top-2 -right-2">
              1
            </div>
          )}
        </div>
        {!token ? (
          <button className='sm:block bg-transparent text-base text-stone-500 border border-solid border-violet-600 rounded-2xl px-4 py-1 cursor-pointer hover:bg-violet-600 hover:text-white transition duration-300' onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (

          <div className='relative'>
            {/* Hamburger Icon for Mobile View */}
            <div className="md:hidden">
              <button onClick={handleMenuToggle}>
                <img src={assets.menu_icon} alt="Menu" className="h-6 hover:opacity-80 z-50 transition duration-300" />
              </button>
            </div>
            <Link to='/profile'><img className="h-6 sm:h-8 hidden md:block hover:opacity-80 transition duration-300" src={assets.profile} alt="Profile" /></Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
