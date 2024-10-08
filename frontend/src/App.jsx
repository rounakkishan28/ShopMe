import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import Cart from './pages/Cart.jsx';
import PlaceOrder from './pages/PlaceOrder.jsx';
import Footer from './components/Footer.jsx';
import LoginPopup from './components/LoginPopup.jsx';
import VerifyPopup from './components/VerifyPopup.jsx';
import Verify from './pages/Verify.jsx';
import MyOrders from './pages/MyOrders.jsx';
import Add from './admin/AddProduct.jsx';
import AllProduct from './admin/AllProduct.jsx';
import Product from './pages/Product.jsx';
import Item from './pages/Item.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Order from './pages/Order.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import UpdatePassword from './components/UpdatePassword.jsx';
import NewPassword from './components/NewPassword.jsx';
import AddAddress from './components/AddAddress.jsx';

function App() {

  const [showLogin, setShowLogin] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    generatedOtp: "",
    otp: "",
    password: "",
  });

  return (
    <>
      <ToastContainer />
      {showVerify ? <VerifyPopup setShowVerify={setShowVerify} data={data} setData={setData} /> : <></>}
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} setShowVerify={setShowVerify} data={data} setData={setData} setShowUpdatePassword={setShowUpdatePassword} /> : <></>}
      {showUpdatePassword ? <UpdatePassword setShowUpdatePassword={setShowUpdatePassword} setShowNewPassword={setShowNewPassword} data={data} setData={setData} /> : <></>}
      {showNewPassword ? <NewPassword setShowNewPassword={setShowNewPassword} data={data} setData={setData} /> : <></>}
      {showAddress ?  <AddAddress setShowAddress={setShowAddress} />:<></>}
      <div>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Product />} />
          <Route path='/products/:id' element={<Item />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/addproduct' element={<Add />} />
          <Route path='/allproducts' element={<AllProduct />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder setShowAddress={setShowAddress} />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path='/myorders/:id' element={<Order />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
};

export default App;
