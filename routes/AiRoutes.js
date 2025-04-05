// routes/chat.js
const express = require("express");
const router = express.Router();
const { chatWithGemini } = require("../controller/AiFeedbackcontroller");

// POST route to get feedback after test
router.post("/test-feedback", chatWithGemini);

module.exports = router;
