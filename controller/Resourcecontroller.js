const Resource = require('../models/resourcemodel');
const Module = require('../models/modulemodel');
const InstructorVideo = require('../models/instructorVideomodel')
// @desc    Create new resource
exports.createResource = async (req, res) => {
  try {
    const { name, articleLinks, videoLinks, imageLinks,moduleId } = req.body; 
    console.log("inside") 
      const newResource = await Resource.create({
      name,
      articleLinks,
      videoLinks,
      imageLinks,
    });
   

    
    const module =await Module.findByIdAndUpdate(
      moduleId,
      { $push: { resources: newResource._id } },
      { new: true }
    );
    res.status(201).json(newResource);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Internal server error" });
  }
};

// @desc    Get all resources
exports.getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc    Get single resource by ID
exports.getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ error: 'Resource not found' });
    res.json(resource);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc    Update resource by ID
exports.updateResource = async (req, res) => {
  try {
    const updated = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Resource not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Internal server error" });
  }
};

// @desc    Delete resource by ID
exports.deleteResource = async (req, res) => {
  try {
    const deleted = await Resource.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Resource not found' });
    res.json({ message: 'Resource deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getInstructorVideos = async(req, res) => {
  try{
    const { module } = req.body
    const instructorVideos = await InstructorVideo.find({ module, isVerified: true });
    req.status(200).json(instructorVideos);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}