const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  className: {
    type: String,
    enum: ['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
    required: true
  },
  completedModules: [{ type: mongoose.Schema.Types.ObjectId, ref: "Module" }],
  completedTests: [{
    testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test" },
    testScore: { type: Number, trim: true }
  }],
  totalScore: { type: Number, default: 0 },
  progress:{
    type: Map, of: Number, default: new Map()  // Map<moduleId, percentageCompleted>
  }
}, { timestamps: true });

module.exports = mongoose.model("Profile", profileSchema);