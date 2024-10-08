import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../context/storeContext.jsx';
import axios from 'axios';

const Verify = () => {

  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await axios.post(`${url}/api/order/verify`, { success, orderId });
      if (response.data.success) {
        navigate('/myorders');
      } else {
        navigate('/');
      }
    } catch (error) {
      navigate('/');
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [success, orderId, navigate, url]);

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 border-4 border-solid border-stone-400 border-t-violet-500 rounded-full animate-spin'></div>
    </div>
  );
};

export default Verify;
