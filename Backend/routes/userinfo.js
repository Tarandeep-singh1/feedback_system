const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Endpoint to get teachers and subjects based on semester
router.post('/userinfo', async (req, res) => {
  const { email } = req.body;

  // Validate the input
  if (!email) {
    return res.status(200).json({ error: 'Subject and semester are required' });
  }

  try {
    // Find documents matching both subject and semester, and populate the teacher field
    const userinfo = await User.findOne({  email });

    // Check if data is found
    if (!userinfo) {
      return res.status(200).json({ message: 'No data found for the given criteria' });
    }

    // Check if teacherData.teacher is an array or a single object

    // Respond with teacher names
    res.status(200).json({
      user: userinfo
    });

  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(200).json({ error: 'Internal server error' });
  }
});

module.exports = router;
