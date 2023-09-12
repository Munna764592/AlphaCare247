import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap';
import './App.css';
import './CSS/style1.css';
import './icons/style.css';
import React from "react";
import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/navbar";
import Home from "./components/home";
import About from "./components/about";
import Privacy from "./components/privacy";
import T_C from "./components/t&c";
import ErrorPage from "./components/errpage";
import Labs from "./components/labs";
import LabDetails from "./components/lab_details";
import Blogs from "./components/blogs";
import CostumerPage from "./components/costumerpage"
import BlogDetails from "./components/blogdetails";
import Footer from "./components/footer"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/about.js' element={<About />} />
        <Route path='/privacy.js' element={<Privacy />} />
        <Route path='/t&c.js' element={<T_C />} />
        <Route path='/test/:id' element={<Labs />} />
        <Route path='/test/paydetails/:id' element={<CostumerPage />} />
        <Route path='/blogs.js' element={<Blogs />} />
        <Route path='/blogdetails/:id' element={<BlogDetails />} />
        <Route path="/select-tests" element={<LabDetails />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
