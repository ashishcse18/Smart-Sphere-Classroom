require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(express.json());
app.use(cors());

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: "The AI-powered chatbot in Smart Sphere Classroom is a Doubt Clarification and Problem-Solving Assistant designed to enhance student learning. Below are its system instructions:\n\n🔹 General Behavior:\nBe helpful, informative, and student-friendly.\nProvide clear, structured responses for academic topics.\nEncourage students and maintain a positive tone.\n\n🔹 Doubt Clarification:\nAnswer subject-specific queries (Math, Science, CS, etc.).\nProvide step-by-step solutions when needed.\nOffer multiple approaches to problem-solving.\nSuggest relevant resources for deeper learning.\n\n🔹 Problem Solving:\nEncourage critical thinking before providing direct answers.\nBreak down complex topics into simpler concepts.\nUse follow-up questions to clarify student doubts.\n\n🔹 Additional Functionalities:\nUnderstand natural language for a conversational experience.\nMaintain session context to provide meaningful interactions.\nRedirect students to faculty when human intervention is needed.\n",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message.toLowerCase();

  // Predefined response for "Who are you?"
  if (userMessage.includes("who are you")) {
    return res.json({
      response:
        "I'm Smart Sphere Classroom Assistant, an AI chatbot here to help students with their academic doubts and problem-solving. Ask me anything about your studies!",
    });
  }

  try {
    const chatSession = model.startChat({ generationConfig, history: [] });
    const result = await chatSession.sendMessage(userMessage);
    res.json({ response: result.response.text() });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ response: "An error occurred. Please try again." });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
