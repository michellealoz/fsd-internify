const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  chosenMentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MentorProfile'
  }
}, { timestamps: true });

module.exports = mongoose.model('StudentProfile', studentProfileSchema);