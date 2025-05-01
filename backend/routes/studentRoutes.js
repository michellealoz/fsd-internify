const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { checkRole } = require('../middleware/roleCheck');
const { chooseMentor } = require('../controllers/studentController');

router.post('/choose-mentor', protect, checkRole('student'), chooseMentor);

module.exports = router;