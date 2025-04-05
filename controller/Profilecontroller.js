const Profile = require('../models/profilemodel');
const Test = require('../models/Testmodel');
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
    const className = req.user.className;
    const profiles = await Profile.find({className}).sort({ totalScore: -1 }).limit(50);
    res.status(200).json(profiles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

const Test = require("../models/Test"); // Make sure Test model is imported

exports.testCompleted = async (req, res) => {
  try {
    const userId = req.user._id;
    const className = req.body.className || req.user.className;
    const { testId, testScore } = req.body;

    // Get test info to check if it's weekly
    const test = await Test.findById(testId);
    if (!test) return res.status(404).json({ message: "Test not found" });

    // const isWeekly = test.isWeekly;
    const isWeekly = test.testType === "weekly";

    // Find profile
    let profile = await Profile.findOne({ userId });

    if (profile) {
      // Check if test already exists
      const testIndex = profile.completedTests.findIndex(
        (t) => t.testId.toString() === testId
      );

      if (testIndex !== -1) {
        const existingScore = profile.completedTests[testIndex].testScore;

        if (testScore > existingScore) {
          profile.completedTests[testIndex].testScore = testScore;

          if (isWeekly) {
            profile.totalScore += testScore - existingScore; // Only update if weekly
          }

          await profile.save();
        }
        // Else: score not improved, do nothing
      } else {
        // New test attempt
        profile.completedTests.push({ testId, testScore });
        if (isWeekly) {
          profile.totalScore += testScore;
        }
        await profile.save();
      }
    } else {
      // First time user, create profile
      const newProfile = await Profile.create({
        userId,
        className,
        completedTests: [{ testId, testScore }],
        totalScore: isWeekly ? testScore : 0
      });
      profile = newProfile;
    }

    res.status(200).json({
      message: "Test processed successfully",
      profile
    });
  } catch (error) {
    console.error("Error in testCompleted:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};


