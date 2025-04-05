const express = require('express');
const router = express.Router();

const {
  instructorLogin,
  instructorRegister,
  videoUpload
} = require('../controller/Instructorcontroller');
const authMiddleware = require('../Middlewares/Authmiddleware');

router.post('/register', instructorRegister);
router.post('/login', instructorLogin);
router.post('/video/upload', authMiddleware, videoUpload);

module.exports = router;