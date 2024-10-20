const express = require('express');
const router = express.Router();
const formData = require('../models/formData');

// Endpoint to get teachers and subjects based on semester
router.post('/feedbackgive', async (req, res) => {
    const { email } = req.body;

    try {
      // Check if the email exists in the feedbacks collection
      const feedbacks = await formData.find({ email: email });
  
      // If no feedback is found
      if (!feedbacks || feedbacks.length === 0) {
        return res.status(200).json([]); // Return an empty array
      }
  
      // Return the feedbacks found
      return res.status(200).json(feedbacks);
    } catch (error) {
      console.error('Error fetching feedback:', error);
      return res.status(500).json({ message: 'An error occurred while fetching feedback.' });
    }
  
});

module.exports = router;
