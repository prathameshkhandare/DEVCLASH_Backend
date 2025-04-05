const express = require('express');
const router = express.Router();
const upload = require('../Middlewares/upload');
const { StudentProfileHandler, GetStudentProfile } = require('../controller/StudentProfileController');

router.put('/set-student-profile/:id', StudentProfileHandler);
router.get('/get-student-profile/:id', GetStudentProfile);

// Add test route here
router.get('/test-student', (req, res) => {
  res.send("✅ Student routes working");
});

module.exports = router;
