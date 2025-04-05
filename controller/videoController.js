// controllers/videoController.js
const getYoutubeVideos = require("../utils/getYoutubevideo");

const getTopicVideos = async (req, res) => {
  try {
    const { topic,className } = req.params;

    if (!topic || !className) return res.status(400).json({ message: "Topic is required" });

    const videos = await getYoutubeVideos(topic,className);

    res.status(200).json({ topic, videos });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};

module.exports = { getTopicVideos };
