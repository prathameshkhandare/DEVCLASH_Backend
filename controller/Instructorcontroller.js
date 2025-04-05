const Instructor = require('../models/instructormodel');
const InstructorVideo = require('../models/instructorVideomodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.instructorRegister = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, bio, expertise, qualifications, experienceYears, socialLinks } = req.body;

    if (!name || !email || !password || !phoneNumber) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const existingInstructor = await Instructor.findOne({ email });
    if (existingInstructor) {
      return res.status(400).json({ message: "Instructor already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const instructor = new Instructor({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      bio,
      expertise,
      qualifications,
      experienceYears,
      socialLinks
    });

    await instructor.save();

    res.status(200).json({ message: "Instructor registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.instructorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const instructor = await Instructor.findOne({ email });
    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }
    if(instructor.isVerified == false){
      return res.status(400).json({ message: "You're registration is not yet approved" });
    }

    const isMatch = await bcrypt.compare(password, instructor.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const instructorObj = instructor.toObject();
    delete instructorObj.password;

    const token = jwt.sign({ _id: instructor._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    res.status(200).json({
      message: "Login successful",
      instructor: instructorObj,
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.videoUpload = async(req, res) => {
  try{
    const { module, videoLink } = req.body;
    const instructorId = req.user._id;
    const instructorVideo = new InstructorVideo({ instructorId, module, videoLink });
    await instructorVideo.save();
    res.status(200).json({ message: "Video uploaded for scrutiny" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}
