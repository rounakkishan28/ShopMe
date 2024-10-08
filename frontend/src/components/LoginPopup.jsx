import React, { useContext, useState } from 'react';
import { StoreContext } from '../context/storeContext.jsx';
import { assets } from '../assets/assets.js';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginPopup = ({ setShowLogin, setShowVerify, data, setData, setShowUpdatePassword }) => {
    const { url, setToken } = useContext(StoreContext);
    const [currState, setCurrState] = useState("Login");

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const onLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${url}/api/users/login`, data);
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                setShowLogin(false);
                toast.success('Successfully Logged In.');
            } else {
                toast.error(response.data.message);
            }
            setData({ name: "", email: "", password: "" });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    const sendOtp = async (e) => {
        e.preventDefault();
        setShowLogin(false);
        setShowVerify(true);
        if (!data.email) return;
        try {
            const email = data.email;
            const otp = Math.floor(Math.random() * 900000) + 100000;
            const response = await axios.post(`${url}/api/otp`, { email, otp });
            setData(data => ({ ...data, generatedOtp: otp }));
            if (response.data.success) toast.success('Otp sent to your email.');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='fixed inset-0 bg-black/[0.565] flex items-center justify-center z-50'>
            <div
                className='bg-white rounded-lg shadow-lg p-6 sm:w-80 w-full max-w-md mx-4'
            >
                <div className='flex justify-between items-center text-black font-bold text-xl mb-4'>
                    <h2>{currState}</h2>
                    <img
                        className='cursor-pointer w-5 h-5'
                        onClick={() => { setShowLogin(false); setData({ name: "", email: "", password: "" }) }}
                        src={assets.cross_icon}
                        alt="Close"
                    />
                </div>
                <div className='flex flex-col gap-4'>
                    {currState === "Sign Up" && (
                        <input
                            className='p-2 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-violet-500 hover:border-violet-500 transition-colors duration-200'
                            name='name'
                            onChange={onChangeHandler}
                            value={data.name}
                            type="text"
                            placeholder='Username'
                            required
                        />
                    )}
                    <input
                        className='p-2 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-violet-500 hover:border-violet-500 transition duration-200'
                        name='email'
                        onChange={onChangeHandler}
                        value={data.email}
                        type="email"
                        placeholder='Email'
                        required
                    />
                    <input
                        className='p-2 border border-stone-300 rounded outline-none focus:ring-2 focus:ring-violet-500 hover:border-violet-500 transition duration-200'
                        name='password'
                        onChange={onChangeHandler}
                        value={data.password}
                        type="password"
                        placeholder='Password'
                        required
                    />
                    {currState === 'Login' ? (<button
                        className='p-2.5 rounded text-white font-semibold text-sm bg-violet-600 cursor-pointer hover:bg-violet-700 transition duration-300'
                        onClick={onLogin}
                    >
                        Login
                    </button>) : (<button
                        onClick={sendOtp}
                        className='p-2.5 rounded text-white font-semibold text-sm bg-violet-600 cursor-pointer hover:bg-violet-700 transition duration-300'
                    >
                        Create Account
                    </button>)}
                </div>
                <p
                    onClick={() => { setShowLogin(false); setShowUpdatePassword(true) }}
                    className='text-sm mt-3 w-fit text-violet-600 font-medium cursor-pointer hover:underline'
                >Forgot Password?</p>
                <div className='flex items-center gap-2 mt-4'>
                    <input className='accent-violet-600' type="checkbox" required />
                    <p className='text-sm'>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                <p className='text-sm mt-4'>
                    {currState === "Login" ? (
                        <>
                            Create a new account?{' '}
                            <span
                                className='text-violet-600 font-medium cursor-pointer hover:underline'
                                onClick={() => { setCurrState("Sign Up"); setData({ name: "", email: "", password: "" }) }}
                            >
                                Click here
                            </span>
                        </>
                    ) : (
                        <>
                            Already have an account?{' '}
                            <span
                                className='text-violet-600 font-medium cursor-pointer hover:underline'
                                onClick={() => { setCurrState("Login"); setData({ name: "", email: "", password: "" }) }}
                            >
                                Login here
                            </span>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}

export default LoginPopup;
