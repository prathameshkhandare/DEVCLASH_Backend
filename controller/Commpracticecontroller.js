const axios = require("axios");
const getYoutubeVideos = require("../utils/getYoutubeVideo");
const chatWithGemini = async (req, res) => {
    try {
        const { question } = req.body;
        if (!question) {
            return res.status(400).json({ error: "Questions array is required" });
        }

        // Constructing feedback prompt
        let message = `
        You are a friendly language and communication coach who helps students practice and improve their communication skills in English, Hindi, and Marathi.

Instructions:
1. Respond to the user's communication-related questions or doubts.
2. If the user asks in Hindi or Marathi, reply in the same language.
3. Help the user with grammar, sentence formation, pronunciation, and vocabulary.
4. If the user makes a mistake, gently correct it and explain why.
5. Give alternative ways to say things in different tones (formal/informal/casual).
6. Encourage the user to try speaking or writing sentences, and guide them with improvements.
7. If asked, provide tips for public speaking, confidence-building, and body language.
8. Always keep a friendly and patient tone like a mentor.

Your goal is to make the user feel comfortable and motivated while improving their communication.

        `;
        

     

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

// Use regex to extract the topics array section
const topicsMatch = reply.match(/Topics to Improve\s*\n\s*(\[.*?\])/s);

let weakTopics = [];
if (topicsMatch) {
  try {
    weakTopics = JSON.parse(topicsMatch[1]);
  } catch (err) {
    console.error("❌ Error parsing topics array:", err);
  }
}






  





          // Final response
          res.json({
            feedback: reply,
        

          });
          

    } catch (error) {
        console.error("Error in Gemini API:", error?.response?.data || error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { chatWithGemini };
