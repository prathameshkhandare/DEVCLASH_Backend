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
router.post("/module-completed", moduleCompleted);
router.get("/profile", getProfile);
router.get("/leaderboard", getLeaderBoardList);
router.post("/test-completed", testCompleted);

module.exports = router;
