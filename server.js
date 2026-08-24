const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.post("/api/chat", async (req, res) => {
    try {
        const message = req.body.message;

        if (!message) {
            return res.status(400).json({
                error: "Mesajul este gol."
            });
        }

        res.json({
            reply: "Am primit mesajul: " + message
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Eroare server."
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Nova AI rulează pe portul ${PORT}`);
});
