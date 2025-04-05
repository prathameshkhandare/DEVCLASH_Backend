const express = require("express");
const router = express.Router();
const {
  moduleCompleted,
  getProfile,
  getLeaderBoardList,
  testCompleted
} = require("../controller/Profilecontroller");

// Optional middleware to verify authentication (assuming it's available)
const authMiddleware = require('../Middlewares/Authmiddleware');
// Routes
router.post("/module-completed",authMiddleware, moduleCompleted);
router.get("/profile",authMiddleware, getProfile);
router.get("/leaderboard",authMiddleware, getLeaderBoardList);
router.post("/test-completed",authMiddleware ,testCompleted);

module.exports = router;
