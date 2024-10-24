import React, { useState } from 'react';
import './App.css';
import { Route, Routes, Link } from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Signup from "./components/Signup";
import Login from './components/Login';
import Studentdashboard from './components/Studentdashboard';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import Adminlogin from './components/admin/Adminlogin';
const App = () => {
  const [isLogin, setIsLogin] = useState(() => {
    return Cookies.get("isLogin") === "true" || false;
  });

  useEffect(() => {
    Cookies.set("isLogin", isLogin); // cookie making
  }, [isLogin]);

  const Navbar = () => {
    return (
      <nav className="navbar">
        <div className="logo">
          <span>FEED</span><strong>BACKER</strong>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
        <div className="login-signup">
          <Link to="/login" className="login">Login</Link>
          <Link to="/signup" className="signup">Signup</Link>
        </div>
      </nav>
    );
  };

  return (
    <div className="app">
      {isLogin ? null : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
        <Route path="/studentdashboard" element={<Studentdashboard setIsLogin={setIsLogin} />} />
        <Route path='/adminlogin'element={<Adminlogin/>}/>
      </Routes>
    </div>
  );
};

export default App;
