const Module = require('../models/modulemodel');

// @desc    Create new module
exports.createModule = async (req, res) => {
  try {
    const module = new Module(req.body);
    const saved = await module.save();
    res.status(201).json(saved);
  } catch (err) {
    console.log("error creaing module", err);
    res.status(500).json({ message: "Internal server error" })
  }
};

// @desc    Get all modules
exports.getAllModules = async (req, res) => {
  try {
    const modules = await Module.find()
      .populate('resources')
      .populate('tests')
      .populate('subject');
    res.json(modules);
  } catch (err) {
    console.log("error creaing module", err);
    res.status(500).json({ message: "Internal server error" })
  }
};

// @desc    Get single module by ID
exports.getModuleById = async (req, res) => {
  try {
    const module = await Module.findById(req.params.id)
      .populate('resources')
      .populate('tests')
      .populate('subject');

    if (!module) return res.status(404).json({ error: 'Module not found' });
    res.json(module);
  } catch (err) {
    console.log("error module", err);
    res.status(500).json({ message: "Internal server error" })
  }
};

// @desc    Update module by ID
exports.updateModule = async (req, res) => {
  try {
    const updated = await Module.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Module not found' });
    res.json(updated);
  } catch (err) {
    console.log("error updating module", err);
    res.status(500).json({ message: "Internal server error" })
  }
};

// @desc    Delete module by ID
exports.deleteModule = async (req, res) => {
  try {
    const deleted = await Module.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Module not found' });
    res.json({ message: 'Module deleted successfully' });
  } catch (err) {
    console.log("error deleting module", err);
    res.status(500).json({ message: "Internal server error" })
  }
};
