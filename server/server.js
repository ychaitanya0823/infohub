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

// ✅ All API routes come first

// --- WEATHER ---
app.get("/api/weather", async (req, res) => {
  const city = req.query.city || "London";
  const apiKey = process.env.WEATHER_API_KEY;

  try {
    const r = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await r.json();

    if (data.cod !== 200)
      return res.status(400).json({ error: data.message });

    res.json({
      city: data.name,
      temp: data.main.temp,
      condition: data.weather[0].description,
    });
  } catch (err) {
    res.status(500).json({ error: "Weather fetch failed" });
  }
});

// --- CURRENCY ---
app.get("/api/currency", async (req, res) => {
  const apiKey = process.env.CURRENCY_API_KEY;
  const { amount = 1, to = "USD" } = req.query;

  try {
    const r = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/latest/INR`
    );
    const data = await r.json();

    if (data.result !== "success")
      return res.status(400).json({ error: "Currency fetch failed" });

    const rate = data.conversion_rates[to];
    const converted = (amount * rate).toFixed(2);

    res.json({ amount, to, converted });
  } catch (err) {
    res.status(500).json({ error: "Currency fetch failed" });
  }
});

// --- QUOTE ---
app.get("/api/quote", async (req, res) => {
  try {
    const r = await fetch("https://api.quotable.io/random");
    const data = await r.json();
    res.json({ quote: data.content, author: data.author });
  } catch (err) {
    res.status(500).json({ error: "Quote fetch failed" });
  }
});

// ✅ Now serve the frontend *after* all /api routes
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { dirname } = path;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const clientPath = path.join(__dirname, "../client/dist");

app.use(express.static(clientPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
