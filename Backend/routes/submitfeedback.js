// routes/feedback.js
const express = require('express');
const router = express.Router();
const Subject = require('../models/subject');

// Endpoint to get teachers and subjects based on semester
router.get('/teachers/:semester', async (req, res) => {
  try {
    const semester = parseInt(req.params.semester);
    const subjects = await Subject.find({ semester });

    // Structure the response
    const result = subjects.map((subject) => ({
      subjectName: subject.name,
    }));

   
    res.status(200).json({
      result: result,
      message:'teacher data sent',
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

module.exports = router;
