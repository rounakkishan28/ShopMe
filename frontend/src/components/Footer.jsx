import React from 'react';
import { assets } from '../assets/assets.js';
import { Link } from 'react-router-dom';

const Footer = () => {

    return (
        <div className='text-slate-300 bg-slate-800 flex flex-col items-center gap-5 px-5 md:px-10 lg:px-28 pt-10 lg:pt-20 mt-20 lg:mt-28'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-10 lg:gap-20'>
                <div className='flex flex-col gap-5 items-start'>
                    <a href='/' className='rounded-2xl px-4 bg-white'><img className='w-20 lg:w-24' src={assets.logo} alt="Logo" /></a>

                    <p className='text-sm lg:text-base'>We’re dedicated to quality, value, and service. Your satisfaction is our top priority, and we strive to provide you with an exceptional shopping experience from start to finish.</p>
                    <div className='flex gap-4'>
                        <a className='w-6 lg:w-8 transition-transform transform hover:scale-110' href="https://www.facebook.com/rounak.kishan.3/">
                            <img src={assets.facebook_icon} alt="Facebook" />
                        </a>
                        <a className='w-6 lg:w-8 transition-transform transform hover:scale-110' href='https://x.com/rounak_kishan28'>
                            <img src={assets.twitter_icon} alt="Twitter" />
                        </a>
                        <a className='w-6 lg:w-8 transition-transform transform hover:scale-110' href='https://www.linkedin.com/in/rounak-kishan-931394257/'>
                            <img src={assets.linkedin_icon} alt="LinkedIn" />
                        </a>
                    </div>
                </div>
                <div className='flex flex-col gap-5 items-start'>
                    <h2 className='text-white text-xl lg:text-2xl font-bold'>COMPANY</h2>
                    <ul className='space-y-2'>
                        <li><a href='/' className='text-sm lg:text-base hover:text-slate-400 transition-colors'>Home</a></li>
                        <li><a href='/about' className='text-sm lg:text-base hover:text-slate-400 transition-colors'>About us</a></li>
                        <li className='text-sm lg:text-base hover:text-slate-400 transition-colors'>Delivery</li>
                        <li className='text-sm lg:text-base hover:text-slate-400 transition-colors'>Privacy policy</li>
                    </ul>
                </div>
                <div className='flex flex-col gap-5 items-start'>
                    <h2 className='text-white text-xl lg:text-2xl font-bold'>GET IN TOUCH</h2>
                    <ul className='space-y-2'>
                        <li className='text-sm lg:text-base'>+91 91552 72627</li>
                        <li className='text-sm lg:text-base'>rounakkishan28@gmail.com</li>
                    </ul>
                </div>
            </div>
            <hr className='mx-5 h-0.5 w-full border-none bg-slate-300' />
            <p className='text-xs lg:text-base pb-6'>Copyright 2024 © shopme.com - All Right Reserved.</p>
        </div>
    )
}

export default Footer;
