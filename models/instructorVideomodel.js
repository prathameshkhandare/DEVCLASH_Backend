const mongoose = require('mongoose');

const instructorVideoSchema = new mongoose.Schema({
  instructorId: { type: mongoose.Schema.Types.ObjectId, required: true },
  module: { type: String, required: true },
  videoLink: { type: String, _id: false },
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("InstructorVideo", instructorVideoSchema);