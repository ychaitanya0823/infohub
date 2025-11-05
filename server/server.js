import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// 🌦 Weather API Route
app.get("/api/weather", async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.WEATHER_API_KEY;

  if (!city) {
    return res.status(400).json({ error: "City parameter is required" });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = response.data;
    res.json({
      city: data.name,
      temp: data.main.temp,
      condition: data.weather[0].description,
    });
  } catch (err) {
    console.error("Weather API Error:", err.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

// 💱 Currency Conversion API
app.get("/api/currency", async (req, res) => {
  const apiKey = process.env.CURRENCY_API_KEY;
  try {
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${apiKey}/latest/INR`
    );
    res.json(response.data);
  } catch (err) {
    console.error("Currency API Error:", err.message);
    res.status(500).json({ error: "Failed to fetch currency data" });
  }
});

// ✨ Motivational Quote API
app.get("/api/quote", async (req, res) => {
  try {
    const response = await axios.get("https://api.quotable.io/random");
    res.json(response.data);
  } catch (err) {
    console.error("Quote API Error:", err.message);
    res.status(500).json({ error: "Failed to fetch quote" });
  }
});

// 🌍 Default route
app.get("/", (req, res) => {
  res.send("✅ InfoHub Backend is running successfully!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
