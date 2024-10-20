// routes/feedback.js
const express = require('express');
const router = express.Router();
const Subject = require('../../models/subject');
const Teacher = require('../../models/teacher'); // Import the Teacher model

// Endpoint to add a subject and create a teacher if not exist
router.post('/addsubjectandteacher', async (req, res) => {
  try {
    const { name, semester, teacherName } = req.body; // Extract subject and teacher details from request body

    // Check if the teacher exists based on the provided teacher details
    let teacher = await Teacher.findOne({ name: teacherName});

    // If the teacher does not exist, create a new teacher
    if (!teacher) {
      teacher = await Teacher.create({
        name: teacherName,
        semester:semester,
        
      });
    }

    // Create the new subject with the associated teacher's ID
    const newSubject = await Subject.create({
      name,
      semester,
      teacher: teacher._id, // Associate the subject with the newly created or existing teacher
    });

    // Add the subject ID to the teacher's subjects array
    teacher.subjects.push(newSubject._id);
    await teacher.save(); // Save the updated teacher document
    
    res.status(200).json({
      result: newSubject,
      message: 'Subject and teacher added successfully',
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add subject and teacher' });
  }
});

module.exports = router;
