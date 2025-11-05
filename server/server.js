require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ====================== MOCK QUOTES ======================
const quotes = [
  "Believe in yourself!",
  "The best time to start was yesterday. The next best time is today.",
  "Dream big and dare to fail.",
  "Stay positive, work hard, make it happen.",
  "Success is not final; failure is not fatal: It is the courage to continue that counts.",
  "Your limitation—it's only your imagination.",
  "Push yourself, because no one else is going to do it for you."
];

// ====================== QUOTE API ======================
app.get("/api/quote", (req, res) => {
  try {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    res.json({ quote: quotes[randomIndex] });
  } catch (error) {
    console.error("Quote fetch error:", error.message);
    res.status(500).json({ quote: "Failed to fetch quote" });
  }
});

// ====================== WEATHER API ======================
app.get("/api/weather", async (req, res) => {
  try {
    const city = req.query.city || "London";
    const apiKey = process.env.WEATHER_API_KEY;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    const data = response.data;
    res.json({
      city: data.name,
      temperature: data.main.temp,
      condition: data.weather[0].description
    });
  } catch (error) {
    console.error("Weather fetch error:", error.message);
    res.status(500).json({ error: "Failed to fetch weather" });
  }
});

// ====================== CURRENCY API ======================
app.get("/api/currency", async (req, res) => {
  try {
    const amount = Number(req.query.amount) || 1;
    const target = (req.query.target || "USD").toUpperCase();
    const apiKey = process.env.CURRENCY_API_KEY;

    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${apiKey}/latest/INR`
    );

    const rates = response.data.conversion_rates;

    if (!rates[target]) {
      return res.status(400).json({ error: "Invalid currency code" });
    }

    res.json({
      amount: amount,
      currency: target,
      result: (amount * rates[target]).toFixed(2)
    });
  } catch (error) {
    console.error("Currency fetch error:", error.message);
    res.status(500).json({ error: "Failed to fetch currency" });
  }
});

// ====================== START SERVER ======================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
