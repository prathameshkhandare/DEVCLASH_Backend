const mongoose = require("mongoose")

const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
  
    thumbnail: { type: String, required: true},
    tagline:{ type: String, required: true}
}, { timestamps: true });

module.exports = mongoose.model("Subject", subjectSchema);