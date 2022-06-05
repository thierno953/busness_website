import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from './components/common/header/Header';
import Pages from './components/pages/Pages';
import Footer from './components/common/footer/Footer';
import About from './components/about/About';
import Services from './components/services/Services';
import Blog from './components/blog/Blog';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Pages />} />
        <Route path="/about" element={<About />} />
        <Route path='/services' element={<Services />} />
        <Route path='/blog' element={<Blog />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
