import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/storeContext.jsx";
import { assets } from "../assets/assets.js";
import axios from "axios";
import { toast } from "react-toastify";

const AddAddress = ({ setShowAddress }) => {

    const { url } = useContext(StoreContext);

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData((data) => ({ ...data, [name]: value }));
    };

    const addAddress = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(`${url}/api/users/addaddress`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.success) {
                setShowAddress(false);
                toast.success("New Address Added");
            } else {
                setShowAddress(false);
                toast.error("Error Occured");
            }
        } catch (error) {
            console.error("Error : ", error);
        }
    }

    return (
        <div className="fixed inset-0 bg-black/[0.565] flex items-center justify-center z-50">
            <div className='flex flex-col md:flex-row items-start justify-between bg-white gap-8 md:gap-28 p-6 rounded-lg'>
                <div className='w-full md:max-w-lg'>
                    <div className='flex justify-between text-xl md:text-2xl font-bold mb-8'>
                        <p>Delivery Information</p>
                        <img
                            className='cursor-pointer mt-2 w-5 h-5'
                            onClick={() => { setShowAddress(false); setData({ name: "", email: "", password: "" }) }}
                            src={assets.cross_icon}
                            alt="Close"
                        />
                    </div>
                    <div className='flex flex-col md:flex-row gap-2.5'>
                        <input
                            className='p-2 w-full mb-4 border border-stone-400 rounded-md outline-violet-500 transition duration-200 ease-in-out hover:border-violet-400 focus:border-violet-500'
                            required
                            name='firstName'
                            onChange={onChangeHandler}
                            value={data.firstName}
                            type="text"
                            placeholder='First name'
                        />
                        <input
                            className='p-2 w-full mb-4 border border-stone-400 rounded-md outline-violet-500 transition duration-200 ease-in-out hover:border-violet-400 focus:border-violet-500'
                            required
                            name='lastName'
                            onChange={onChangeHandler}
                            value={data.lastName}
                            type="text"
                            placeholder='Last name'
                        />
                    </div>
                    <input
                        className='p-2 w-full mb-4 border border-stone-400 rounded-md outline-violet-500 transition duration-200 ease-in-out hover:border-violet-400 focus:border-violet-500'
                        required
                        name='email'
                        onChange={onChangeHandler}
                        value={data.email}
                        type="email"
                        placeholder='Email address'
                    />
                    <input
                        className='p-2 w-full mb-4 border border-stone-400 rounded-md outline-violet-500 transition duration-200 ease-in-out hover:border-violet-400 focus:border-violet-500'
                        required
                        name='street'
                        onChange={onChangeHandler}
                        value={data.street}
                        type="text"
                        placeholder='Street'
                    />
                    <div className='flex flex-col md:flex-row gap-2.5'>
                        <input
                            className='p-2 w-full mb-4 border border-stone-400 rounded-md outline-violet-500 transition duration-200 ease-in-out hover:border-violet-400 focus:border-violet-500'
                            required
                            name='city'
                            onChange={onChangeHandler}
                            value={data.city}
                            type="text"
                            placeholder='City'
                        />
                        <input
                            className='p-2 w-full mb-4 border border-stone-400 rounded-md outline-violet-500 transition duration-200 ease-in-out hover:border-violet-400 focus:border-violet-500'
                            required
                            name='state'
                            onChange={onChangeHandler}
                            value={data.state}
                            type="text"
                            placeholder='State'
                        />
                    </div>
                    <div className='flex flex-col md:flex-row gap-2.5'>
                        <input
                            className='p-2 w-full mb-4 border border-stone-400 rounded-md outline-violet-500 transition duration-200 ease-in-out hover:border-violet-400 focus:border-violet-500'
                            required
                            name='zipcode'
                            onChange={onChangeHandler}
                            value={data.zipcode}
                            type="text"
                            placeholder='Zip code'
                        />
                        <input
                            className='p-2 w-full mb-4 border border-stone-400 rounded-md outline-violet-500 transition duration-200 ease-in-out hover:border-violet-400 focus:border-violet-500'
                            required
                            name='country'
                            onChange={onChangeHandler}
                            value={data.country}
                            type="text"
                            placeholder='Country'
                        />
                    </div>
                    <input
                        className='p-2 w-full mb-4 border border-stone-400 rounded-md outline-violet-500 transition duration-200 ease-in-out hover:border-violet-400 focus:border-violet-500'
                        required
                        name='phone'
                        onChange={onChangeHandler}
                        value={data.phone}
                        type="text"
                        placeholder='Phone'
                    />
                    <button
                    className="p-2.5 rounded text-white font-semibold text-sm bg-violet-600 cursor-pointer hover:bg-violet-700 transition duration-300"
                    onClick={addAddress}
                    >
                        Add Address
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddAddress;