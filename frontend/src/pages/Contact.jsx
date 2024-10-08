import React, { useContext, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../context/storeContext.jsx'
import { toast } from 'react-toastify';

const Contact = () => {
  const { url } = useContext(StoreContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData)=>({ ...formData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.name || !formData.email || !formData.message){
      return;
    }
    try {
      const response = await axios.post(`${url}/api/contact`, formData);
      if(response.data.success) toast.success('Message Sent.');
    } catch (error) {
      toast.error('Error Occured.');
    }
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <section className="flex justify-center items-center py-10 bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Form</h2>

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 hover:border-violet-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 hover:border-violet-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Your Message</label>
          <textarea
            name="message"
            placeholder="Enter your message"
            value={formData.message}
            onChange={handleChange}
            rows='4'
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 hover:border-violet-500 resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-violet-500 text-white py-3 rounded-lg hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50 transition duration-300"
        >
          Send Message
        </button>
        {statusMessage && <p className="text-center text-gray-700 mt-4">{statusMessage}</p>}
      </form>
    </section>
  );
};

export default Contact;
