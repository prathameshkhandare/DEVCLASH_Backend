const express = require("express");
const router = express.Router();

const { createQuestionPaper } = require("../controller/InstructorQpaperController");


router.post("/create", createQuestionPaper);

module.exports = router;
