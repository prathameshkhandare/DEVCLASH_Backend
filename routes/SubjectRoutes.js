const express = require("express");
const router = express.Router();
const { createSubject, getAllSubjects, getSubjectById } = require("../controller/Subjectcontroller");

// @route POST /api/subjects
router.post("/", createSubject);

// @route GET /api/subjects
router.get("/", getAllSubjects);

// @route GET /api/subjects/:id
router.get("/:id", getSubjectById);

module.exports = router;
