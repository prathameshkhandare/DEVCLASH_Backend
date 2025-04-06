const { chatWithGemini } = require("../controller/Commpracticecontroller");
const express = require('express');
const router = express.Router();

// POST route to interact with Gemini for communication help
router.post("/chat", chatWithGemini);

module.exports = router;