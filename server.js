const express = require("express");
const path = require("path");
const OpenAI = require("openai");

const app = express();

const PORT = process.env.PORT || 3000;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(express.json());

app.use(
  express.static(
    path.join(__dirname, "public")
  )
);

app.post("/api/chat", async (req, res) => {
  try {

    const message = req.body.message;

    if (!message) {
      return res.status(400).json({
        error: "Mesajul este gol."
      });
    }

    const response = await client.responses.create({
      model: "gpt-5",
      input: message
    });

    res.json({
      reply: response.output_text
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Eroare la conectarea cu AI-ul."
    });

  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `Nova AI rulează pe portul ${PORT}`
  );
});
