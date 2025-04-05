const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    articleLinks: [{ type: String }],
    videoLinks: [{ type: String }],
    imageLinks: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model("Resource", resourceSchema);