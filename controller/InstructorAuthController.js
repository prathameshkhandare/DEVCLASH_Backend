const Instructor = require("../models/InstructorAuthModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @route POST /api/instructors/signup
const registerInstructor = async (req, res) => {
  const { firstName, lastName, specialty, email, password } = req.body;

  try {
    const existing = await Instructor.findOne({ email });
    if (existing) return res.status(400).json({ message: "Instructor already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const instructor = await Instructor.create({
      firstName,
      lastName,
      specialty,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      _id: instructor._id,
      firstName: instructor.firstName,
      email: instructor.email,
      token: generateToken(instructor._id)
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// @route POST /api/instructors/login
const loginInstructor = async (req, res) => {
  const { email, password } = req.body;

  try {
    const instructor = await Instructor.findOne({ email });
    if (!instructor) return res.status(404).json({ message: "Instructor not found" });

    const isMatch = await bcrypt.compare(password, instructor.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    res.json({
      _id: instructor._id,
      firstName: instructor.firstName,
      email: instructor.email,
      token: generateToken(instructor._id)
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { registerInstructor, loginInstructor };
