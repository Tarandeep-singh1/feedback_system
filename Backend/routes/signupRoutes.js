// signup route code (e.g., in `routes/signup.js`)
const express = require('express');
const User = require('../models/User');
const { sendOtpEmail } = require('../utils/emailService');
const router = express.Router();

// Send OTP
router.post('/sendotp', async (req, res) => {
  const { email } = req.body;

  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log('Generated OTP:', otp);

  try {
    // Find the user with the given email
    let user = await User.findOne( { email  });

    if (!user) { 
        // User not found, create new
        user = await User.create({ email, otp });
        console.log('OTP saved for new user');
    } else {
        // User found, update OTP
        user.otp = otp;
        await user.save(); 
        console.log('OTP updated for existing user');
    }
    // Send OTP email
    try {
      await sendOtpEmail(email, otp);
      res.json({ success: true, message: 'OTP saved and email sent successfully' });
    } catch (emailError) {
      console.error('Error sending OTP email:', emailError);
      // If sending email fails, handle it but still respond with a success message for saving OTP
      res.status(500).json({ success: false, message: 'OTP saved but failed to send email' });
    }
  } catch (dbError) {
    console.error('Error saving OTP:', dbError);
    res.status(500).json({ success: false, message: 'Failed to save OTP' });
  }
});





// Verify OTP and Sign Up
router.post('/verifyotp', async (req, res) => {
  const { email, otp } = req.body;

  try {
      // Fetch the user from the database
      let user = await User.findOne({ email });
      
      // Check if the user was found and if the OTP matches
      if (user) {
          console.log('Stored OTP:', user.otp);
          console.log('Provided OTP:', otp);
  
          if (user.otp === otp) {
              // OTP verified, clear OTP
              await User.updateOne({ email }, { otp: null });
              console.log('OTP successfully verified and cleared.');
              return res.json({ success: true });
          } else {
              console.log('Invalid OTP provided.');
              return res.status(400).json({ success: false, message: 'Invalid OTP' });
          }
      } else {
          console.log('User not found.');
          return res.status(404).json({ success: false, message: 'User not found' });
      }
  } catch (error) {
      console.error('Error verifying OTP:', error);
      return res.status(500).json({ success: false, message: 'Failed to verify OTP' });
  }
  
});

// Handle User Sign Up
router.post('/signup', async (req, res) => {
  const { name, email, password, rollno, phonenumber, department, semester } = req.body;

  const user = await User.findOneAndUpdate(
    {email}, // Query to find the user by email
    {
      name,
      password, // Ensure you hash this password before saving in a real application
      rollno,
      phonenumber,
      department,
      semester
    },
    {
      new: true, // Return the updated user
      upsert: true // Create a new user if one doesn't exist
    }
  );

  try {
    await user.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to sign up' });
  }
});

module.exports = router;
