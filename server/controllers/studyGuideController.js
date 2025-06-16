import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const generateStudyGuide = async (req, res) => {
  const { topic } = req.body;

  try {
    const response = await axios.post(
      "https://api.together.xyz/v1/chat/completions",
      {
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1", // You can change to another model
        messages: [
          {
            role: "system",
            content:
              "You're an AI tutor that generates structured study guides with key points, flashcards, and questions.",
          },
          {
            role: "user",
            content: `Generate a detailed study guide for the topic: ${topic}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TOGETHER_API_KEY || "8ce00a8616337b2a7bb30c8a2e752636257d25240edce5e6b3058f557da6ca5c"}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Add after fetching from Together API
    const rawText = response.data.choices[0].message.content;

    // Use simple regex and splitting to organize
    const sections = rawText.split("\n\n**");
    const formatted = {
      title: topic,
      sections: [],
      flashcards: [],
      questions: [],
    };

    sections.forEach((sec) => {
      if (sec.startsWith("Flashcards**")) {
        const lines = sec.split("\n").slice(1);
        formatted.flashcards = lines
          .filter((line) => line.startsWith("*") || line.startsWith("\t+"))
          .map((line) => line.replace(/^[*\t+ ]+/, "").trim());
      } else if (sec.startsWith("Questions**")) {
        const lines = sec.split("\n").slice(1);
        formatted.questions = lines
          .filter((line) => line.startsWith("*"))
          .map((line) => line.replace(/^[*\t+ ]+/, "").trim());
      } else {
        const titleMatch = sec.match(/^(.*?)\*\*\n/);
        if (titleMatch) {
          const title = titleMatch[1].trim();
          const content = sec.replace(`${title}**\n`, "").trim();
          formatted.sections.push({ title, content });
        }
      }
    });

    res.json({ success: true, data: formatted });

  } catch (err) {
    console.error("Together API error:", err.response?.data || err.message);
    res.status(500).json({ success: false, error: "AI generation failed." });
  }
};
