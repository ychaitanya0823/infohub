import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// ✅ Base route
app.get("/", (req, res) => {
  res.json({ message: "InfoHub API is running successfully!" });
});

// ✅ Weather API
app.get("/api/weather", async (req, res) => {
  try {
    const city = req.query.city || "London";
    const apiKey = process.env.WEATHER_API_KEY;

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    if (data.cod !== 200) {
      return res.status(400).json({ error: "City not found or API error" });
    }

    res.json({
      city: data.name,
      temp: data.main.temp,
      condition: data.weather[0].description,
    });
  } catch (error) {
    console.error("Weather API error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Currency API
app.get("/api/currency", async (req, res) => {
  try {
    const apiKey = process.env.CURRENCY_API_KEY;
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/latest/INR`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Currency API error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Quote API
app.get("/api/quote", async (req, res) => {
  try {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    res.json({ quote: data.content, author: data.author });
  } catch (error) {
    console.error("Quote API error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
