import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🌦️ Weather API
app.get("/api/weather", async (req, res) => {
  try {
    const city = req.query.city || "London";
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await axios.get(url);
    const data = response.data;

    res.json({
      city: data.name,
      temp: data.main.temp,
      condition: data.weather[0].description,
    });
  } catch (err) {
    console.error("Error fetching weather:", err.message);
    res.status(500).json({ error: "Failed to fetch weather" });
  }
});

// 💱 Currency API
app.get("/api/currency", async (req, res) => {
  try {
    const apiKey = process.env.CURRENCY_API_KEY;
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/INR`;

    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch currency data" });
  }
});

// 💬 Quote API
app.get("/api/quote", async (req, res) => {
  try {
    const response = await axios.get("https://api.quotable.io/random");
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch quote" });
  }
});

// ✅ Serve frontend
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
