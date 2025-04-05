const Profile = require('../models/profilemodel');

exports.moduleCompleted = async (req, res) => {
  try {
    const userId = req.user._id;
    const { moduleId } = req.body;
    const updatedProfile = await Profile.findOneAndUpdate(
      { _id: userId },
      { $push: { completedModules: moduleId } },
      { new: true }
    );
    res.status(200).json({ message: "Module completed successfully", profile: updatedProfile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

exports.getProfile = async(req, res) => {
  try{
    const userId = req.user._id;
    const profile = await Profile.findOne({ userId });
    res.status(200).json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

exports.getLeaderBoardList = async(req, res) => {
  try{
    const profiles = await Profile.find().sort({ totalScore: -1 }).limit(50);
    res.status(200).json(profiles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

exports.testCompleted = async (req, res) => {
  try {
    const userId = req.user._id;
    const { testId, testScore } = req.body;
    const updatedProfile = await Profile.findOneAndUpdate(
      { _id: userId },
      { $push: { completedTests: { testId, testScore } },
        $inc: { totalScore: testScore } },
      { new: true }
    );
    res.status(200).json({ message: "Test completed successfully", profile: updatedProfile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}