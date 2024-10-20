// subject.model.js
const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  semester: { type: Number, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }
});

module.exports = mongoose.model('Subject', SubjectSchema);
