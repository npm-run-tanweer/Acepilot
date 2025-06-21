import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const generateStudyGuide = async (req, res) => {
  const { topic, syllabus } = req.body;

  try {
    const response = await axios.post(
      "https://api.together.xyz/v1/chat/completions",
      {
        model: "deepseek-ai/DeepSeek-V3",
        messages: [
          {
            role: "system",
            content:
              "You are an AI educator assistant helping students learn complex topics in a structured and trackable format. Don't add any text or anything, ONLY GIVE JSON and GENERATE AT MAX 30 nodes at first",
          },
          {
            role: "user",
            content: `Generate a nested topic breakdown for the subject ${topic} and syllabus ${syllabus} in a tree-like JSON structure.
            Each node in the JSON should contain:
              1)id: a unique string identifier
              2)title: name of the topic or subtopic
              3)data: an object containing "completed": false
              4)children: an array of similar nodes (for subtopics)

            Use this exact JSON schema recursively for all subtopics:
            {
              "id": "unique-id",
              "title": "Topic Title",
              "data": {
                "completed": false
              },
              "children": [ /* repeat this structure here */ ]
            }

            The output should be wrapped like this:
            {
              "result": {
                ...your topic tree root...
              },
              "error": {},
              "context": {}
            }

          ### Rules:
          - Give the root node a "position": { x: 50, y: 200 }, ONLY TO THE ROOT NODE,
          - Always nest subtopics logically up to 3–5 levels deep.
          - Use simple, readable titles.
          - Each subtopic should be relevant to its parent.
          - The number of children per node should vary realistically (1–6).
          - You can include microtopics like definitions, explanations, walkthroughs, real-world use, etc.
          - If there are no more topics to nest then give completed as true else false
          - Populate the children array in the same manner
          - Make sure the entire structure is returned in one JSON object like shown.`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`, // Or replace with hardcoded key if needed
          "Content-Type": "application/json",
        },
      }
    );

    const rawText = response.data.choices[0].message.content;
    const cleanedJson = rawText.replace(/```json|```/g, "").trim();
    // Assuming the response is the raw JSON array — safely parse it
    let parsedMindMap;
    try {
      parsedMindMap = JSON.parse(cleanedJson);
    } catch (parseError) {
      console.error("JSON parsing error:", parseError.message);
      return res.status(500).json({ success: false, error: "Invalid JSON format in AI response." });
    } 

    res.json({ success: true, data: { title: topic, nodes: parsedMindMap } });
  } catch (err) {
    console.error("Together API error:", err.response?.data || err.message);
    res.status(500).json({ success: false, error: "AI generation failed." });
  }
};
