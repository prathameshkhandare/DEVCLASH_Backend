const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  // profileImage: {
  //   type: String, // URL to image
  //   default: ""
  // },
  phoneNumber: {
    type: String,
    trim: true
  },
  bio: {
    type: String,
    trim: true
  },
  expertise: [String], // e.g., ['Mathematics', 'Physics']
  qualifications: {
    type: String, // e.g., "PhD in Mathematics"
    trim: true
  },
  experienceYears: {
    type: Number,
    default: 0
  },
  socialLinks: {
    linkedin: String,
    github: String,
    twitter: String
  },
  isVerified: {
    type: Boolean,
    default: false
  },
}, { timestamps: true });

module.exports = mongoose.model("Instructor", instructorSchema);
