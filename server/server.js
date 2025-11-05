import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🌍 Serve frontend (React build)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientPath = path.join(__dirname, "../client/dist");

app.use(express.static(clientPath));

// ✅ WEATHER API
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
  } catch (err) {
    res.status(500).json({ error: "Weather fetch failed" });
  }
});

// ✅ CURRENCY API
app.get("/api/currency", async (req, res) => {
  const apiKey = process.env.CURRENCY_API_KEY;
  const { amount = 1, to = "USD" } = req.query;

  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/latest/INR`
    );
    const data = await response.json();

    if (data.result !== "success") {
      return res.status(400).json({ error: "Currency fetch failed" });
    }

    const rate = data.conversion_rates[to];
    const converted = (amount * rate).toFixed(2);

    res.json({ amount, to, converted });
  } catch (err) {
    res.status(500).json({ error: "Currency conversion failed" });
  }
});

// ✅ QUOTE API
app.get("/api/quote", async (req, res) => {
  try {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    res.json({ quote: data.content, author: data.author });
  } catch (err) {
    res.status(500).json({ error: "Quote fetch failed" });
  }
});

// ✅ Fallback — send frontend for any other route
app.get("*", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

// ✅ Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
