const express = require('express');
const router = express.Router();
const Subject = require('../models/subject');

// Endpoint to get teachers and subjects based on semester
router.get('/teachergive', async (req, res) => {
  const { subject, semester } = req.query;

  // Validate the input
  if (!subject || !semester) {
    return res.status(400).json({ error: 'Subject and semester are required' });
  }

  try {
    // Find documents matching both subject and semester, and populate the teacher field
    const teacherData = await Subject.findOne({ name: subject, semester }).populate('teacher');

    // Check if data is found
    if (!teacherData) {
      return res.status(400).json({ message: 'No data found for the given criteria' });
    }

    // Check if teacherData.teacher is an array or a single object
    let teacherNames;

    if (Array.isArray(teacherData.teacher)) {
      // If it's an array, map over the array to extract the names
      teacherNames = teacherData.teacher.map((teacher) => teacher.name);
    } else {
      // If it's a single object, directly extract the name
      teacherNames = [teacherData.teacher.name]; // Wrap it in an array to maintain consistent structure
    }

    // Respond with teacher names
    res.status(200).json({
      teachergive: teacherNames
    });

  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
