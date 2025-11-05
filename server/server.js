import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// ✅ Allow frontend access
app.use(cors());
app.use(express.json());

// 🔹 MOCK /api/weather
app.get("/api/weather", async (req, res) => {
  try {
    const city = req.query.city || "London";

    // Using OpenWeatherMap API (optional — if you don’t have key, use mock data)
    const apiKey = process.env.WEATHER_API_KEY;
    if (apiKey) {
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const w = weatherRes.data;
      return res.json({
        city: w.name,
        temperature: w.main.temp,
        condition: w.weather[0].description,
      });
    }

    // Fallback mock data
    res.json({
      city,
      temperature: 25,
      condition: "Clear sky",
    });
  } catch (error) {
    console.error("Weather Error:", error.message);
    res.status(500).json({ error: "Weather data unavailable" });
  }
});

// 🔹 MOCK /api/quote
app.get("/api/quote", async (req, res) => {
  try {
    // You can replace with real API like https://api.quotable.io/random
    const quoteRes = await axios.get("https://api.quotable.io/random");
    res.json(quoteRes.data);
  } catch (error) {
    console.error("Quote Error:", error.message);
    res.json({ content: "Keep going, you are doing great!" });
  }
});

// 🔹 MOCK /api/currency
app.get("/api/currency", async (req, res) => {
  try {
    const currencyRes = await axios.get(
      "https://v6.exchangerate-api.com/v6/6b28a8a02b47e8392de3081b/latest/INR"
    );
    res.json(currencyRes.data);
  } catch (error) {
    console.error("Currency Error:", error.message);
    res.json({
      conversion_rates: { USD: 0.012 },
    });
  }
});

// ✅ Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Backend running successfully 🚀" });
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
