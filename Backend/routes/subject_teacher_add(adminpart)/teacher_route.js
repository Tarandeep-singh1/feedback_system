// routes/feedback.js
const express = require('express');
const router = express.Router();
const Teacher = require('../../models/teacher');

// Endpoint to get teachers and subjects based on semester
router.post('/addteacher', async (req, res) => {
  try {
    const teacher = req.body;
    const newteacher=await Teacher.create(teacher);
   
   

   
    res.status(200).json({
      result: newteacher,
      message:'teacher added',
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add subject' });
  }
});

module.exports = router;
