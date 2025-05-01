const MentorProfile = require('../models/mentorProfile');
const StudentProfile = require('../models/studentProfile');

const updateMentorProfile = async (req, res) => {
  try {
    if (req.user.role !== 'mentor') {
      return res.status(403).json({ message: 'Only mentors can update profile' });
    }

    const { resumeUrl, expertise, bio } = req.body;

    const profile = await MentorProfile.findOneAndUpdate(
      { user: req.user._id },
      { resumeUrl, expertise, bio },
      { new: true, upsert: true }
    );

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateStudentStatus = async (req, res) => {
  try {
    if (req.user.role !== 'mentor') {
      return res.status(403).json({ message: 'Only mentors can approve students' });
    }

    const { studentId, status } = req.body;

    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const mentorProfile = await MentorProfile.findOne({ user: req.user._id });
    if (!mentorProfile) return res.status(404).json({ message: 'Mentor profile not found' });

    const studentEntry = mentorProfile.selectedStudents.find(
      s => s.student.toString() === studentId
    );

    if (!studentEntry) {
      return res.status(404).json({ message: 'Student not found in selection list' });
    }

    studentEntry.status = status;
    await mentorProfile.save();

    res.json({ message: `Student ${status}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  updateMentorProfile,
  updateStudentStatus
};