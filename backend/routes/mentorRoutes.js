const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { checkRole } = require('../middleware/roleCheck');
const { updateMentorProfile, updateStudentStatus } = require('../controllers/mentorController');

router.put('/profile', protect, checkRole('mentor'), updateMentorProfile);
router.patch('/students/status', protect, checkRole('mentor'), updateStudentStatus);

module.exports = router;