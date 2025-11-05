// server/server.js
import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// ✅ Weather API
app.get("/api/weather", async (req, res) => {
  const city = req.query.city || "London";
  const apiKey = process.env.WEATHER_API_KEY;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    if (data.cod !== 200) {
      return res.status(400).json({ error: data.message });
    }

    res.json({
      city: data.name,
      temp: data.main.temp,
      condition: data.weather[0].description,
    });
  } catch (error) {
    res.status(500).json({ error: "Weather API failed" });
  }
});

// ✅ Currency API
app.get("/api/currency", async (req, res) => {
  const apiKey = process.env.CURRENCY_API_KEY;
  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/latest/INR`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Currency API failed" });
  }
});

// ✅ Quote API
app.get("/api/quote", async (req, res) => {
  try {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    res.json({ text: data.content, author: data.author });
  } catch (error) {
    res.status(500).json({ error: "Quote API failed" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
