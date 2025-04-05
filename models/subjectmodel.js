const mongoose = require("mongoose")

const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    modules: [{ type: mongoose.Schema.Types.ObjectId, ref: "Module" }]
}, { timestamps: true });

module.exports = mongoose.model("Module", subjectSchema);