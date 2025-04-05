const Test = require("../models/Testmodel");

// POST: Create test
// controllers/testController.js

exports.createTest = async (req, res) => {
  try {
    const { testName, subject, module, className, questions, testType } =
      req.body;

    if (
      !testName ||
      !subject ||
      !testType ||
      !className ||
      !questions ||
      questions.length === 0
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields." });
    }

    const newTest = new Test({
      testName,
      subject,
      module: module || null, // optional
      className,
      questions,
      testType,
    });

    const savedTest = await newTest.save();
    res
      .status(201)
      .json({ message: "Test created successfully", test: savedTest });
  } catch (error) {
    console.error("Error creating test:", error);
    res.status(500).json({ message: "Server error while creating test" });
  }
};

// GET: All tests
exports.getAllTests = async (req, res) => {
  try {
    const tests = await Test.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, tests });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch tests", error });
  }
};

// GET: By Subject (Course)
exports.getTestsBySubject = async (req, res) => {
  try {
    const { subject } = req.params;
    const tests = await Test.find({ subject });
    res.status(200).json({ success: true, tests });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch subject-wise tests",
        error,
      });
  }
};

// GET: By Module
exports.getTestsByModule = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const tests = await Test.findOne({ module: moduleId });
    res.status(200).json({ success: true, tests });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch module-wise tests",
        error,
      });
  }
};

// GET: Weekly tests
exports.getWeeklyTests = async (req, res) => {
  try {
    const tests = await Test.find({ grade, type: "weekly" });
    res.status(200).json({ success: true, tests });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch weekly tests", error });
  }
};

// GET: Single test by ID
exports.getTestById = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    if (!test)
      return res
        .status(404)
        .json({ success: false, message: "Test not found" });
    res.status(200).json({ success: true, test });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch test", error });
  }
};
