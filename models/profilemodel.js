const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Module", required: true },
  completedModules: [{ type: mongoose.Schema.Types.ObjectId, ref: "Module" }],
  completedTests: [{
    testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test" },
    testScore: { type: String, trim: true }
  }],
  totalScore: Number
}, { timestamps: true });

module.exports = mongoose.model("Profile", profileSchema);