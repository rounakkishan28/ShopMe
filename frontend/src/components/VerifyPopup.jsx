import React, { useContext, useState } from 'react';
import { StoreContext } from '../context/storeContext.jsx';
import { assets } from '../assets/assets.js';
import axios from 'axios';
import { toast } from 'react-toastify';

const VerifyPopup = ({ setShowVerify, data, setData }) => {
    
    const { url, setToken } = useContext(StoreContext);

    const onChangeHandler = (e) => {
        setData(data => ({ ...data, otp: e.target.value }))
    };

    const onLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${url}/api/users/register`, data);
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                setShowVerify(false);
            } else {
                toast.error("Error Occured");
                setShowVerify(false);
            }
            setData({ name: "", email: "", password: "" });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <div className='fixed inset-0 bg-black/[0.565] flex items-center justify-center z-50'>
            <form
                onSubmit={onLogin}
                className='bg-white rounded-lg shadow-lg p-6 sm:w-80 w-full max-w-md mx-4'
            >
                <div className='flex justify-between items-center text-black font-bold text-xl mb-4'>
                    <h2>Verify E-mail</h2>
                    <img
                        className='cursor-pointer w-5 h-5'
                        onClick={() => { setShowVerify(false); setData({ name: "", email: "", password: "" }) }}
                        src={assets.cross_icon}
                        alt="Close"
                    />
                </div>
                <div className='flex flex-col gap-4'>
                    <input
                        className='p-2 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-violet-500 hover:border-violet-500 transition duration-200'
                        name='email'
                        value={data.email}
                        type="email"
                        readOnly
                    />
                    <input
                        className='p-2 border border-stone-300 rounded outline-none focus:ring-2 focus:ring-violet-500 hover:border-violet-500 transition duration-200'
                        name='otp'
                        onChange={onChangeHandler}
                        type="text"
                        placeholder='Enter Otp (6-digits)'
                        maxLength={6}
                        required
                    />
                    <button
                        className='p-2.5 rounded text-white font-semibold text-sm bg-violet-600 cursor-pointer hover:bg-violet-700 transition duration-300'
                        type='submit'
                    >
                        Verify
                    </button>
                </div>
            </form>
        </div>
    );
}

export default VerifyPopup;
