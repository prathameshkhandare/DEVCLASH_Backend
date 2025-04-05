const Profile = require('../models/profilemodel');

exports.moduleCompleted = async (req, res) => {
  try {
    const userId = req.user._id;
    const { moduleId } = req.body;
    const module = await Profile.findOneAndUpdate(
      { _id: userId },
      { $push: { completedModules: moduleId } },
      { new: true }
    );
    res.status(500).json({ message: "Module completed successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Internal server error" });
  }
}

exports.testCompleted = async (req, res) => {
  try {
    const userId = req.user._id;
    const { testId, testScore } = req.body;
    const test = await Profile.findOneAndUpdate(
      { _id: userId },
      { $push: { completedTests: testId, testScore } },
      { new: true }
    );
    res.status(500).json({ message: "Test completed successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Internal server error" });
  }
}