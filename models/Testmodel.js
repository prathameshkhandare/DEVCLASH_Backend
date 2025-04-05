const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
    {
        testName: {
            type: String,
            required: true,
            trim: true,
        },
        testType: {
            type: String,
            enum: ["weekly", "normal", "preassessment"],
            required: true,
        },
        subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
            required: true,
        },
        module: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Module",
            default: "",
        },
        className: {
            type: String, // "Grade 6", "Grade 7", etc.
            required: true,
        },
        questions: [
            {
                questionText: {
                    type: String,
                    required: true,
                },
                options: {
                    type: [String], // ['A', 'B', 'C', 'D']
                    required: true,
                    validate: {
                        validator: function (v) {
                            return v.length === 4;
                        },
                        message: "Exactly 4 options required.",
                    },
                },
                correctAnswer: {
                    type: String,
                    required: true,
                },
                // Optional:
                explanation: {
                    type: String,
                },
                difficulty: {
                    type: String,
                    enum: ["easy", "medium", "hard"],
                    default: "easy",
                },
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Test", testSchema);
