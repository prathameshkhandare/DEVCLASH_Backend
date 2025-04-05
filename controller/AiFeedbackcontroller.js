const axios = require("axios");

const chatWithGemini = async (req, res) => {
    try {
        const { questions } = req.body;
        if (!questions || !Array.isArray(questions)) {
            return res.status(400).json({ error: "Questions array is required" });
        }

        // Constructing feedback prompt
        let message = `I have given a test and here are my responses. Please analyze my answers and give personalized feedback.
        
Give feedback in a friendly and educational tone. Highlight my mistakes, explain correct concepts if needed, and suggest improvement tips. Format the output in bullet points or structured manner.\n\n`;

        questions.forEach((q, index) => {
            message += `Q${index + 1}: ${q.question}\n`;
            message += `User Answer: ${q.userAnswer}\n`;
            message += `Correct Answer: ${q.correctAnswer}\n\n`;
        });

        // API request to Gemini
        const response = await axios.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent",
            {
                contents: [{ parts: [{ text: message }] }]
            },
            {
                headers: { "Content-Type": "application/json" },
                params: { key: process.env.GEMINI_API_KEY },
                timeout: 30000
            }
        );

        const reply = response.data.candidates[0]?.content?.parts[0]?.text || "No feedback received.";
        res.json({ feedback: reply });

    } catch (error) {
        console.error("Error in Gemini API:", error?.response?.data || error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { chatWithGemini };
