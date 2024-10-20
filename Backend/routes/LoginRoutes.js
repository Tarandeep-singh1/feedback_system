const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please fill all credentials',
    });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (user) {
      // Compare password (assuming passwords are hashed, use bcrypt to compare)
      // Replace this with bcrypt.compare if using hashed passwords
      if (password === user.password) {
        return res.status(200).json({
          success: true,
          message: 'Logged in successfully',
        });
      } else {
        return res.status(401).json({
          success: false,
          message: 'Incorrect password',
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: 'User not registeredd',
      });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

module.exports = router;
