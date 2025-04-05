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
    const className = req.user.className;
    const profiles = await Profile.find({className}).sort({ totalScore: -1 }).limit(50);
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

    // Find profile
    let profile = await Profile.findOne({ userId });

    if (profile) {
      // Check if test already exists
      const testIndex = profile.completedTests.findIndex(
        (test) => test.testId.toString() === testId
      );

      if (testIndex !== -1) {
        const existingScore = profile.completedTests[testIndex].testScore;

        if (testScore > existingScore) {
          // Update score
          profile.totalScore += testScore - existingScore;
          profile.completedTests[testIndex].testScore = testScore;
          await profile.save();
        } // else do nothing
      } else {
        // New test entry
        profile.completedTests.push({ testId, testScore });
        profile.totalScore += testScore;
        await profile.save();
      }
    } else {
      // Create new profile if not exists
      profile = await Profile.create({
        userId,
        completedTests: [{ testId, testScore }],
        totalScore: testScore
      });
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

