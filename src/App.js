import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap';
import './App.css';
import './CSS/style1.css';
import './icons/style.css';
import React, { createContext, useReducer } from "react";
import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/navbar";
import Home from "./components/home";
import About from "./components/about";
import Privacy from "./components/privacy";
import T_C from "./components/t&c";
import Logout from "./components/logout";
import ErrorPage from "./components/errpage";
import Labs from "./components/labs";
import LabDetails from "./components/lab_details";
import Blogs from "./components/blogs";
import BlogDetails from "./components/blogdetails";
import { intialState, reducer } from "./components/reducer/UseReducer";
import Footer from "./components/footer"


export const UserContext = createContext();
function App() {
  const [state, dispatch] = useReducer(reducer, intialState)


  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/about.js' element={<About />} />
          <Route path='/privacy.js' element={<Privacy />} />
          <Route path='/t&c.js' element={<T_C />} />
          <Route path='/logout.js' element={<Logout />} />
          <Route path='/test/:id' element={<Labs />} />
          <Route path='/blogs.js' element={<Blogs />} />
          <Route path='/blogdetails/:id' element={<BlogDetails />} />
          <Route path="/select-tests" element={<LabDetails />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </UserContext.Provider>
    </>
  );
}

export default App;
