const User = require('../models/User');
const MentorProfile = require('../models/sentorProfile');
const StudentProfile = require('../models/studentProfile');

const chooseMentor = async (req, res) => {
  try {
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can choose a mentor' });
    }

    const mentorProfile = await MentorProfile.findById(req.body.mentorProfileId);
    if (!mentorProfile) {
      return res.status(404).json({ message: 'Mentor profile not found' });
    }

    const existingStudent = mentorProfile.selectedStudents.find(
      sel => sel.student.toString() === req.user._id.toString()
    );

    if (existingStudent) {
      return res.status(400).json({ message: 'Already requested this mentor' });
    }

    mentorProfile.selectedStudents.push({ student: req.user._id });
    await mentorProfile.save();

    // Also update student's profile
    await StudentProfile.findOneAndUpdate(
      { user: req.user._id },
      { chosenMentor: mentorProfile._id },
      { upsert: true }
    );

    res.json({ message: 'Mentor selection request sent' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { chooseMentor };