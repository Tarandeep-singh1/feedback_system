import React, { useState } from 'react';
import './login.css';
import signup from './signup.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; 

const Login = ({ setIsLogin }) => {

  const [loginData, setloginData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setloginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email: loginData.email,
        password: loginData.password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log('Response:', response.data);
      if (response.data.success === true) {
        console.log('Email and password are correct');
        setIsLogin(true);
        navigate('/studentdashboard', { state: { email: loginData.email } });
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.log('Login attempt failed');
    }
  };

  const handleAdminClick = () => {
    navigate('/adminlogin'); // Adjust the route as per your admin component
  };

  return (
    <div className='login-container'>
      <img src={signup} alt='Signup' className='login-image' />
      <div className='form-container'>
        <form onSubmit={loginSubmit} className='form'>
          <input
            type='email'
            name='email'
            placeholder='Email'
            onChange={handleChange}
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            onChange={handleChange}
          />
          <button type='submit'>Login</button>
        </form>
        <p 
          className='admin-link'
          onClick={handleAdminClick}
        >
          For Admin
        </p>
      </div>
    </div>
  );
};

export default Login;
