const mongoose = require("mongoose")

const moduleSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    classname: { type: String, required: true,
        enum: ["Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"],
    },
    resources: [{ type: mongoose.Schema.Types.ObjectId, ref: "Resource" }],
    tests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Test" }],
    subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" }
}, { timestamps: true });

module.exports = mongoose.model("Module", moduleSchema);