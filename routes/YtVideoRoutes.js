// routes/videoRoutes.js
const express = require("express");
const { getTopicVideos } = require("../controller/videoController");
const router = express.Router();

router.get("/videos/:topic/:className", getTopicVideos);

module.exports = router;
