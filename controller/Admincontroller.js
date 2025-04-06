const Admin = require('../models/adminmodel');
const Instructor = require('../models/instructormodel');
const InstructorVideo = require('../models/instructorVideomodel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.adminRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already registered" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is salt rounds
    const admin = new Admin({ name, email, password: hashedPassword });
    await admin.save();
    res.status(200).json({ message: "Admin registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Internal server error" });
  }
}

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const admin = await Admin.findOne({ email })

    if (!admin) return res.status(404).json({ message: "Admin not found" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    const adminObj = admin.toObject();
    delete adminObj.password;
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Create token inline
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful",
      admin: adminObj,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.approveInstructor = async(req, res) => {
  try{
    const { instructorId } = req.body;
    const instructor = await Instructor.findOne({ _id: instructorId, isVerified: false });
    if (!instructor) return res.status(404).json({ message: "Instructor not found" });
    instructor.isVerified = true;
    await instructor.save();
    res.status(200).json({ message: "Instructor approved" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Internal server error" });
  }
}

exports.approveInstructorVideo = async(req, res) => {
  try{
    const { instructorVideoId } = req.body;
    const instructorVideo = await InstructorVideo.findOne({ _id: instructorVideoId, isVerified: false });
    if (!instructorVideo) return res.status(404).json({ message: "Video from instructor not found" });
    instructorVideo.isVerified = true;
    await instructorVideo.save();
    res.status(200).json({ message: "Instructor's Video approved" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Internal server error" });
  }
}

exports.getNotApprovedInstructors = async(req, res) => {
  try{
    const instructors = await Instructor.find({ isVerified: false }).select("-password");
    res.status(200).json(instructors);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Internal server error" });
  }
}

exports.getNotApprovedInstructorVideos = async(req, res) => {
  try{
    const instructorVideo = await InstructorVideo.find({ isVerified: false });
    res.status(200).json(instructorVideo);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Internal server error" });
  }
}