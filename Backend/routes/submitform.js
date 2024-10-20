const express = require('express');
const form = require('../models/formData');
const router = express.Router();

form.syncIndexes().then(() => {
    console.log('Indexes synchronized');
}).catch(err => {
    console.error('Error synchronizing indexes', err);
});

router.post('/submitform', async (req, res) => {
    const { subject, teacher, knowledge, communication, sincerity, interest, integration, accessibility, initiative, fairness, regularity, completion, overallRating, comments } = req.body.feedbackData;
    const { email } = req.body;

    try {
        // Create a new form object containing the extracted data
        const newFormData = {
            email, subject, teacher, knowledge, communication, sincerity, interest, integration, accessibility, initiative, fairness, regularity, completion, overallRating, comments,
        };

        // Use the new form object when creating the form entry in the database
        const formData = await form.create(newFormData);

        return res.status(200).json({
            success: true,
            message: 'Form created successfully',
            formData
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            err
        });
    }
});

module.exports = router;
