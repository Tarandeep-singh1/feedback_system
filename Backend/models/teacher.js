// teacher.model.js
const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  semester: { type: Number, required: true },
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }]
});

module.exports = mongoose.model('Teacher', TeacherSchema);
