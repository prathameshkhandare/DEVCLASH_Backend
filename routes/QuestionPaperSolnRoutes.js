const express = require("express");
const router = express.Router();
const { getQuestionPaperById, submitTest } = require("../controller/QuestionPaperSoln");

// GET question paper by ID
router.get("/get/:paperId", getQuestionPaperById);

// POST submit test
router.post("/submit", submitTest);

module.exports = router;
