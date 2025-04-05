const mongoose = require("mongoose")

const moduleSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    resources: [{ type: mongoose.Schema.Types.ObjectId, ref: "Resource" }],
    tests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Test" }]
}, { timestamps: true });

module.exports = mongoose.model("Module", moduleSchema);