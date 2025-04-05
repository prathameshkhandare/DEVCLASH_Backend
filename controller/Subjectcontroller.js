const Subject = require("../models/subjectmodel");

exports.createSubject = async (req, res) => {
  try {
    const { name,tagline,thumbnail } = req.body;

    const newSubject = new Subject({
      name,
      tagline,thumbnail, // This should be an array of module IDs
    });

    const savedSubject = await newSubject.save();
    res.status(201).json(savedSubject);
  } catch (err) {
    console.error("Error creating subject:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().populate("modules");
    res.status(200).json(subjects);
  } catch (err) {
    console.error("Error fetching subjects:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id).populate("modules");
    if (!subject) return res.status(404).json({ message: "Subject not found" });
    res.status(200).json(subject);
  } catch (err) {
    console.error("Error fetching subject:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
