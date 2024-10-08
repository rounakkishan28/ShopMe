import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context/storeContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const { url, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const [admin, setAdmin] = useState(false);

  const fetchUserDetails = async (token) => {
    try {
      const response = await axios.get(`${url}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setUserDetails(response.data);
        setAdmin(response.data.user.isAdmin);
      }
    } catch (error) {
      console.error("Error fetching user details", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserDetails(token);
    }
  }, []);

  return (
    <div className='min-h-fit flex justify-center items-center bg-gray-100 py-10'>
      <div className='w-full max-w-3xl p-6 bg-white shadow-lg rounded-lg'>

        <div className='text-center'>
          <h2 className='text-3xl font-bold text-violet-600 mb-6'>Profile</h2>
          {admin && (
            <div className='text-sm text-gray-600 mb-4'>
              <span className='bg-violet-100 px-2 py-1 rounded-full'>Admin User</span>
            </div>
          )}
        </div>

        {userDetails.user ? (
          <div>
            <div className='flex flex-col items-center gap-4 mb-8'>
              <div className='text-lg font-semibold text-gray-700'>
                Username: <span className='font-normal'>{userDetails.user.name}</span>
              </div>
              <div className='text-lg font-semibold text-gray-700'>
                E-mail: <span className='font-normal'>{userDetails.user.email}</span>
              </div>
            </div>

            <div className='flex justify-around flex-wrap gap-4'>
              <button
                onClick={() => navigate('/myorders')}
                className='w-40 bg-violet-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition hover:bg-violet-600'
              >
                My Orders
              </button>

              {admin && (
                <button
                  onClick={() => navigate('/addproduct')}
                  className='w-40 bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition hover:bg-blue-600'
                >
                  Add Product
                </button>
              )}
              {admin && (
                <button
                  onClick={() => navigate('/allproducts')}
                  className='w-40 bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition hover:bg-blue-600'
                >
                  All Products
                </button>
              )}

              <button
                onClick={logout}
                className='w-40 bg-red-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition hover:bg-red-600'
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className='flex items-center justify-center min-h-fit py-2 bg-gray-100'>
            <div className='w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 border-4 border-solid border-stone-400 border-t-violet-500 rounded-full animate-spin'></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
