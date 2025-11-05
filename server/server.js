import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Base route (optional sanity check)
app.get("/", (req, res) => {
  res.json({ message: "InfoHub backend running 🚀" });
});

// 🌦 Weather API
app.get("/api/weather", async (req, res) => {
  try {
    const city = req.query.city || "London";
    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "Missing WEATHER_API_KEY" });

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      { params: { q: city, appid: apiKey, units: "metric" } }
    );

    const data = response.data;
    res.json({
      city: data.name,
      temp: data.main.temp,
      condition: data.weather[0].description,
    });
  } catch (err) {
    res.status(500).json({ error: "Could not fetch weather data" });
  }
});

// 💱 Currency API
app.get("/api/currency", async (req, res) => {
  try {
    const apiKey = process.env.CURRENCY_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "Missing CURRENCY_API_KEY" });

    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${apiKey}/latest/INR`
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch currency data" });
  }
});

// ✨ Quote API (mock data)
app.get("/api/quote", (req, res) => {
  const quotes = [
    { text: "Believe you can and you’re halfway there.", author: "Theodore Roosevelt" },
    { text: "Keep going. Everything you need will come to you at the perfect time.", author: "Unknown" },
    { text: "Dream big and dare to fail.", author: "Norman Vaughan" },
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  res.json(randomQuote);
});

// ✅ Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
