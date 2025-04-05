const axios = require("axios");
const getYoutubeVideos = require("../utils/getYoutubeVideo");
const chatWithGemini = async (req, res) => {
    try {
        const { questions } = req.body;
        if (!questions || !Array.isArray(questions)) {
            return res.status(400).json({ error: "Questions array is required" });
        }

        // Constructing feedback prompt
        let message = `
        You are an educational assistant analyzing a student's test responses.
        
        Instructions:
        1. Evaluate the student's answers and identify incorrect or partially correct responses.
        2. For each mistake, explain the correct concept in a concise and friendly tone.
        3. Suggest practical tips to help the student improve.
        4. List 2-4 key topics or concepts the student should focus on for better understanding.
        
        Response Format:
        1. ✅ Feedback Summary
        2. ❌ Mistakes & Corrections
        3. 📌 Topics to Improve (as an array of topic keywords only)
        4. 💡 Suggestions for Improvement
        
        Strictly follow this format.
        `;
        

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

console.log("🧠 Weak Topics:", weakTopics);



const youtubeResources = await Promise.all(
    weakTopics.map(async (topic) => {
      const videos = await getYoutubeVideos(topic,""); // Pass the grade here
      return {
        topic,
        videos,
      };
    })
  );
  





          // Final response
          res.json({
            feedback: reply,
           weaktopics: weakTopics,
           youtubeResources:youtubeResources,

          });
          

    } catch (error) {
        console.error("Error in Gemini API:", error?.response?.data || error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { chatWithGemini };
