const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true }, // Changed from correctAnswerIndex
});

const questionPaperSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  duration: { type: Number, required: true },
  questions: [questionSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Instructor" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("QuestionPaper", questionPaperSchema);
