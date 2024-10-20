const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Endpoint to update user information
router.post('/updateuser', async (req, res) => {
  const { Name, email, phoneNumber, rollNumber, department, semester } = req.body;
 
  // Validate the input
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // Find the user by email and update their information
    const updatedUser = await User.findOneAndUpdate(
      { email },  // Find the user by email
      {  // Update the user's fields with new values from formData
        name:Name, 
        phonenumber:phoneNumber, 
        rollno:rollNumber, 
        department, 
        semester
      },
      { new: true }  // Return the updated document
    );

    // Check if user is found and updated
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with success message and updated user info
    res.status(200).json({
      message: "User info updated successfully",
      user: updatedUser  // Optional: Return the updated user info
    });

  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
