const express = require('express');
const router = express.Router();

const {
  adminLogin,
  adminRegister,
  approveInstructor,
  approveInstructorVideo,
  getNotApprovedInstructors,
  getNotApprovedInstructorVideos
} = require('../controller/Admincontroller');
const authMiddleware = require('../Middlewares/Authmiddleware');

router.post('/register', adminRegister);
router.post('/login', adminLogin);
router.post('/approve-instructor', authMiddleware, approveInstructor);
router.post('/approve-video', authMiddleware, approveInstructorVideo);
router.get('/instructors', authMiddleware, getNotApprovedInstructors);
router.get('/instructor-videos', authMiddleware, getNotApprovedInstructorVideos);

module.exports = router;