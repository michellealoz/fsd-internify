const Application = require('../models/application');
const Internship = require('../models/internship');

const applyForInternship = async (req, res) => {
  try {
    // Only students can apply
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can apply for internships' });
    }

    const { internshipId, resumeUrl, coverLetter } = req.body;

    // Check if internshipId is provided
    if (!internshipId) {
      return res.status(400).json({ message: 'Internship ID is required' });
    }

    // Validate that internship exists
    const internship = await Internship.findById(internshipId);
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    // Prevent duplicate applications
    const alreadyApplied = await Application.findOne({
      student: req.user._id,
      internship: internshipId
    });

    if (alreadyApplied) {
      return res.status(400).json({ message: 'You have already applied for this internship' });
    }

    // Create and save application
    const application = await Application.create({
      student: req.user._id,
      internship: internshipId,
      resumeUrl,
      coverLetter
    });

    res.status(201).json(application);
  } catch (error) {
    console.error("Error in applyForInternship:", error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

const getMyApplications = async (req, res) => {
  try {
    // Fetch all applications of the logged-in student
    const applications = await Application.find({ student: req.user._id })
      .populate('internship') // Populate internship details
      .populate('student', 'name email'); // Optionally include student's name & email

    res.status(200).json(applications);
  } catch (error) {
    console.error("Error in getMyApplications:", error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

module.exports = {
  applyForInternship,
  getMyApplications
};