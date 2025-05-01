const mongoose = require('mongoose');

const mentorProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  resumeUrl: { type: String, required: true },
  expertise: [String],
  bio: String,
  selectedStudents: [{
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
  }]
}, { timestamps: true });

module.exports = mongoose.model('MentorProfile', mentorProfileSchema);