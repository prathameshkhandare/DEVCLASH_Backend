const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: String,
  specialty: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  Role: {
    type: String,
    default: "instructor",
  }
});

const Instructor = mongoose.model("Instructor", instructorSchema);
module.exports = Instructor;
