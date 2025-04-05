const express = require("express");
const router = express.Router();
const {
  createTest,
  getAllTests,
  getTestById,
  getTestsBySubject,
  getTestsByModule,
  getWeeklyTests
} = require("../controller/Testcontroller");

router.post("/create", createTest);
router.get("/", getAllTests);
router.get("/by-course/:subject", getTestsBySubject);
router.get("/by-module/:moduleId", getTestsByModule);
router.get("/weekly/:className", getWeeklyTests);
router.get("/:id", getTestById);

module.exports = router;
