const axios = require("axios");

const getYoutubeVideos = async (topic, grade) => {
  const apiKey = process.env.YOUTUBE_API_KEY;

  const searchUrl = `https://www.googleapis.com/youtube/v3/search`;
  const videosUrl = `https://www.googleapis.com/youtube/v3/videos`;

  try {
    // 1. Search relevant videos (relevance default sort)
    const searchResponse = await axios.get(searchUrl, {
      params: {
        key: apiKey,
        q: `${topic} ${grade}`,
        part: "snippet",
        type: "video",
        maxResults: 50, // Top 10 based on relevance
      },
    });

    const videoIds = searchResponse.data.items
      .map((item) => item.id.videoId)
      .filter(Boolean)
      .join(",");

    if (!videoIds) return [];

    // 2. Get detailed stats of those videos
    const detailsResponse = await axios.get(videosUrl, {
      params: {
        key: apiKey,
        id: videoIds,
        part: "snippet,statistics",
      },
    });

    const videos = detailsResponse.data.items.map((video) => ({
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.medium.url,
      channelTitle: video.snippet.channelTitle,
      videoId: video.id,
      views: parseInt(video.statistics.viewCount || 0),
      likes: parseInt(video.statistics.likeCount || 0),
    }));

    console.log("Videos fetched:", videos);
    // 3. Filter Top 5 by Views
    const top5ByViews = [...videos]
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);

    // 4. From those 5, take Top 3 by Likes
    const top3ByLikes = [...top5ByViews]
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 3);

    return top3ByLikes; // Final result to frontend
  } catch (error) {
    console.error("YouTube API Error:", error.message);
    return [];
  }
};

module.exports = getYoutubeVideos;
