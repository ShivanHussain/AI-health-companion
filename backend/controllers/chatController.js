const axios = require("axios");

exports.chatWithAI = async (req, res) => {
  const { message } = req.body;

  try {

    const ollamaResponse = await axios.post(
      process.env.AI_OLLAMA_URL,
      {
        model: "mistral:latest",
        prompt: `User: ${message}`,
        stream: false,
      },
    );


    const reply =
      ollamaResponse.data?.response ||
      ollamaResponse.data?.message ||
      "No response from AI";

    res.json({ reply });
  } catch (err) {

    res.status(500).json({
      error: "AI failed",
      details: err.message,
    });
  }
};
