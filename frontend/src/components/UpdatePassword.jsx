import React, { useContext, useState } from 'react';
import { StoreContext } from '../context/storeContext.jsx';
import { assets } from '../assets/assets.js';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdatePassword = ({ setShowUpdatePassword, setShowNewPassword, data, setData }) => {

    const { url } = useContext(StoreContext);
    
    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({ ...data, [name]: value }))
        console.log(data.email)
    };

    const sendOtp = async (e) => {
        e.preventDefault();
        setShowUpdatePassword(false);
        setShowNewPassword(true);
        if (!data.email) return;
        try {
            const email = data.email;
            const otp = Math.floor(Math.random() * 900000) + 100000;
            const response = await axios.post(`${url}/api/update`, { email, otp });
            setData(data => ({ ...data, generatedOtp: otp }));
            if (response.data.success) toast.success('Otp sent to your email.');
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <div className='fixed inset-0 bg-black/[0.565] flex items-center justify-center z-50'>
            <form
                onSubmit={sendOtp}
                className='bg-white rounded-lg shadow-lg p-6 sm:w-80 w-full max-w-md mx-4'
            >
                <div className='flex justify-between items-center text-black font-bold text-xl mb-4'>
                    <h2>Update Password</h2>
                    <img
                        className='cursor-pointer w-5 h-5'
                        onClick={() => { setShowUpdatePassword(false); setData({ name: "", email: "", password: "" }) }}
                        src={assets.cross_icon}
                        alt="Close"
                    />
                </div>
                <div className='flex flex-col gap-4'>
                    <input
                        className='p-2 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-violet-500 hover:border-violet-500 transition duration-200'
                        name='email'
                        onChange={onChangeHandler}
                        value={data.email}
                        type='email'
                        placeholder='Email'
                        required
                    />
                    <button
                        className='p-2.5 rounded text-white font-semibold text-sm bg-violet-600 cursor-pointer hover:bg-violet-700 transition duration-300'
                        type='submit'
                    >
                        Send OTP
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdatePassword;
