const Profile = require('../models/profilemodel');
const Test = require('../models/Testmodel');
const Module = require('../models/modulemodel');
const Subject = require('../models/subjectmodel')
exports.moduleCompleted = async (req, res) => {
  try {
    const userId = req.user._id;
    const className = req.user.className;
    const { moduleId } = req.body;

    const module = await Module.findById(moduleId).populate("subject");
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }

    const subjectId = module.subject._id;

    const totalModules = await Module.countDocuments({ subject: subjectId ,classname:className});
    console.log("✅ Total Modules in Subject:", totalModules);

    let profile = await Profile.findOne({ userId });

    if (!profile) {
      const percentage = totalModules === 0 ? 0 : Math.round((1 / totalModules) * 100);
      console.log("🆕 New profile created with progress:", percentage);

      profile = await Profile.create({
        userId,
        completedModules: [moduleId],
        progress: { [subjectId.toString()]: percentage },
        className: className,
      });
    } else {
      if (!profile.completedModules.includes(moduleId)) {
        profile.completedModules.push(moduleId);
      }

      // ✅ Get only the completed modules in this subject
      const completedModulesInSubject = await Module.find({
        _id: { $in: profile.completedModules },
        subject: subjectId,
      }).select("_id"); // just need count

      const completedCount = completedModulesInSubject.length;
      console.log("🎯 Completed Modules in Subject:", completedCount);

      const percentage = totalModules === 0
        ? 0
        : Math.round((completedCount / totalModules) * 100);

      console.log(`📈 Progress for Subject (${subjectId}): ${percentage}%`);

      profile.progress.set(subjectId.toString(), percentage);

      await profile.save();
    }

    res.status(200).json({
      message: "Module completed successfully",
      profile,
    });

  } catch (err) {
    console.error("❌ Error completing module:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};




exports.getProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const profile = await Profile.findOne({ userId })
      .populate({
        path: "completedTests.testId",
        select: "testName"
      })
      .lean(); // lean for performance & easy object manipulation

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // ✅ Step 1: completedModules details
    const modules = await Module.find({ _id: { $in: profile.completedModules } })
      .populate("subject", "name")
      .select("name subject");

    profile.completedModules = modules.map((mod) => ({
      _id: mod._id,
      name: mod.name,
      subjectName: mod.subject?.name || "Unknown"
    }));

    // ✅ Step 2: Replace subjectId in progress with subject name
    const updatedProgress = {};
    const progressEntries = Object.entries(profile.progress || {});

    for (const [subjectId, percentage] of progressEntries) {
      const subject = await Subject.findById(subjectId).select("name");
      const subjectName = subject ? subject.name : "Unknown";
      updatedProgress[subjectName] = percentage;
    }

    profile.progress = updatedProgress;

    res.status(200).json(profile);
  } catch (err) {
    console.error("❌ Error in getProfile:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


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

// Make sure Test model is imported

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


