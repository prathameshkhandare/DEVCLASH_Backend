const StudentProfile = require("../models/StudentprofileModel"); // adjust path as needed
const usermodel = require("../models/usermodel");

// POST controller to create a student profile
const StudentProfileHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, email, bio } = req.body;

    const updatedProfile = await StudentProfile.findByIdAndUpdate(
      id,
      { firstname, lastname, email, bio },
      { new: true }
    );

    //
    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error while updating profile" });
  }
};

// GET controller to fetch student profiles
const GetStudentProfile= async (req, res) => {
  try {
    const { id } = req.params;

    const profile = await usermodel.findById(id);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error("Error fetching profile by ID:", error);
    res.status(500).json({ message: "Server error while fetching profile" });
  }
};

module.exports = {
  StudentProfileHandler,
  GetStudentProfile,
};
