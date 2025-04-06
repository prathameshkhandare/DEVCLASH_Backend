const QuestionPaper = require("../models/InstructorQpaperModel");

const getQuestionPaperById = async (req, res) => {
  try {
    const { paperId } = req.params;
    const paper = await QuestionPaper.findById(paperId);
    if (!paper) return res.status(404).json({ error: "Paper not found" });
    res.json(paper);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const submitTest = async (req, res) => {
  try {
    const { answers, paperId } = req.body;
    const paper = await QuestionPaper.findById(paperId);
    if (!paper) return res.status(404).json({ error: "Paper not found" });

    let score = 0;
    paper.questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) score++;
    });

    // Optional: Save result
    // await new Result({ score, total: paper.questions.length }).save();

    res.json({ message: "Test submitted successfully", score });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


module.exports ={getQuestionPaperById,submitTest}