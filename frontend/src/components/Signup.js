import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom'; // Import useNavigate
import './signup.css';
import signup from './signup.png';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SignUp = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rollno: '',
    phonenumber: '',
    department: '',
    semester: '',
  });
  
  const [otpSent, setOtpSent] = useState(false);
  // const [otp, setOtp] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate
const[otp,setOtp]=useState('');
  const otpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleOtpChange = (e) => {
  //   setOtp(e.target.value);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/sendotp', {
        email: formData.email,
       
      });
      console.log('Response:', response.data);
      if(response.data.success===true){
         toast.success('OTP sent successfully!');
         setOtpSent(true);
       
      }
      else{
           console.log('Error sending OTP:');
      toast.error('Failed to send OTP. Please try again.');
      }
     
        } catch (error) {
          console.error('Error sending OTP:',error);
          toast.error('Failed to send OTP. Please try again.');
    }

  }

  const verifySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/verifyotp', {
        email: formData.email,
        otp: otp,
      });  console.log('otp:', otp);
        console.log('Response:', response.data);
      if(response.data.success === true) {
        console.log("verified successfully");
        try {
          await axios.post('http://localhost:5000/api/signup', {
            name:formData.name,
            email:formData.email,
            password:formData.password,
            rollno:formData.rollno,
            phonenumber:formData.phonenumber,
            department:formData.department,
            semester:formData.semester,
            
          });
         } catch (error) {
          console.log("error occured while sending final signup data /signup route")
         }
        navigate('/verifyotp');
     } else {
        console.log("error in navigating or response data line 77");
     }
     
    } catch (error) {
      console.log("error while verifying email from front end line 80 of signup component");
    }
    
  }
  return (
    <div className='signuupp'>
      <img src={signup} alt='not found' />

      {otpSent ? (
        <div>
        
        <form onSubmit={verifySubmit} className='form1'>
        <h2>OTP sent to {formData.email}</h2>
        <h2>Enter your otp</h2>
         <input type="text" name="otp" placeholder="otp" onChange={otpChange} />
         <p className="incorrect-email" onClick={() =>  setOtpSent(false)}>
         Incorrect Email
       </p>
       
         <button type="submit">{ 'verify otp'}</button>
       </form>
         
        </div>
      ) : (
        <div>
        <form onSubmit={handleSubmit} className='form2'>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <input type="text" name="rollno" placeholder="Roll No" onChange={handleChange} />
        <input type="text" name="phonenumber" placeholder="Phone Number" onChange={handleChange} />

        <select id="department" name="department" required onChange={handleChange}>
          <option value="" disabled hidden>Department</option>
          <option value="civil">Civil</option>
          <option value="Mechanical">Mechanical</option>
          <option value="CSE">CSE</option>
          <option value="Electrical">Electrical</option>
        </select>

        <select id="semester" name="semester" required onChange={handleChange}>
          <option value="" disabled hidden>Semester</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>

  {/* {otpSent && (
          <div>
            <input type="text" name="otp" placeholder="Enter OTP" value={otp} onChange={handleOtpChange} />
          </div>
  )}*/}

        <button type="submit">{ 'Send OTP'}</button>
      </form>
         
         
        </div>
      )}
    
     
    </div>
  );
};

export default SignUp;
