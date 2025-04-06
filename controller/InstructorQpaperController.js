const QuestionPaper = require("../models/InstructorQpaperModel");

const createQuestionPaper = async (req, res) => {
  try {
    const { title, subject, duration, questions, instructorId } = req.body;


    // Optional: Validate correctAnswer exists in options
    for (let i = 0; i < questions.length; i++) {
      const { options, correctAnswer } = questions[i];
      if (!options.includes(correctAnswer)) {
        return res.status(400).json({
          message: `❌ Correct answer must be one of the options in question ${i + 1}`,
        });
      }
    }
    const newPaper = new QuestionPaper({
        title,
        subject,
        duration,
        questions,
        createdBy: instructorId, // or whatever field you're using to track creator
      });
      

    await newPaper.save();
    res.status(201).json({ message: "✅ Question paper created!", paperId: newPaper._id });
  } catch (error) {
    console.error("Error creating paper:", error);
    res.status(500).json({ message: "❌ Failed to create question paper" });
  }
};

module.exports = { createQuestionPaper };
