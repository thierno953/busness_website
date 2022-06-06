import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from './components/common/header/Header';
import Pages from './components/pages/Pages';
import Footer from './components/common/footer/Footer';
import About from './components/about/About';
import Services from './components/services/Services';
import Blog from './components/blog/Blog';
import Cart from './components/pages/cart/Cart';
import Register from './components/pages/auth/Register';
import Login from './components/pages/auth/Login';
import CheckoutSuccess from './components/pages/auth/CheckoutSuccess';


function App() {

  return (
    <BrowserRouter>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Pages />} />
        <Route path="/about" element={<About />} />
        <Route path='/services' element={<Services />} />
        <Route path='/blog' element={<Blog />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
