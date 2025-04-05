const mongoose = require("mongoose");

const StudentProfileSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    lowercase: true,
    trim: true
  },
  bio: {
    type: String,
    trim: true
  },
}, {
  timestamps: true // adds createdAt and updatedAt fields
});

module.exports = mongoose.model("StudentProfile", StudentProfileSchema);
