const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");

// @route   POST /api/auth/register

const register = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      phone,
      className,
      parentEmail,
    } = req.body;

    // Check if student already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Student already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is salt rounds

    // Create student
    const student = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      phone,
      className,
      parentEmail,
      Role: "student",
    });

    await student.save();

    // If parentEmail is provided, add parent as user
    if (parentEmail) {
      const existingParent = await User.findOne({ email: parentEmail });

      if (!existingParent) {
        const parent = new User({
          firstname: `Parent of ${firstname}`,
          lastname,
          email: parentEmail,
          password: hashedPassword, // same hashed password
          phone,
          Role: "Parent",
        });

        await parent.save();
      }
    }

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @route   POST /api/auth/login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email })

    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    const userObj = user.toObject();
    delete userObj.password;
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Create token inline
    const token = jwt.sign({ _id: user._id, className: user.className }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful",
      user:userObj,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

module.exports = { register, login };
