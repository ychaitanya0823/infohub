import React, { useState } from "react";

const BASE_URL = "https://infohub-production-d579.up.railway.app";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [amount, setAmount] = useState(1);
  const [currency, setCurrency] = useState("USD");
  const [converted, setConverted] = useState(null);
  const [quote, setQuote] = useState("Click 'New Quote' to get inspired!");

  // ✅ Weather API
  const getWeather = async () => {
    if (!city) return alert("Enter a city name first!");
    const res = await fetch(`${BASE_URL}/api/weather?city=${city}`);
    const data = await res.json();
    setWeather(data);
  };

  // ✅ Currency Converter API
  const getCurrency = async () => {
    const res = await fetch(`${BASE_URL}/api/currency`);
    const data = await res.json();
    const rate = data.rates[currency];
    if (rate) {
      setConverted((amount * rate).toFixed(2));
    } else {
      setConverted("Invalid currency");
    }
  };

  // ✅ Motivational Quote API
  const getQuote = async () => {
    const res = await fetch(`${BASE_URL}/api/quote`);
    const data = await res.json();
    setQuote(data.content || "Couldn't fetch quote!");
  };

  return (
    <div style={{ fontFamily: "Arial", padding: "20px", textAlign: "center" }}>
      <h1>🌤 InfoHub</h1>

      {/* WEATHER SECTION */}
      <section style={{ marginBottom: "20px" }}>
        <h2>Weather</h2>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Get Weather</button>
        {weather && (
          <div>
            <p>City: {weather.city}</p>
            <p>Temperature: {weather.temp}°C</p>
            <p>Condition: {weather.condition}</p>
          </div>
        )}
      </section>

      {/* CURRENCY CONVERTER */}
      <section style={{ marginBottom: "20px" }}>
        <h2>💱 Currency Converter (INR → {currency})</h2>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="JPY">JPY</option>
          <option value="GBP">GBP</option>
        </select>
        <button onClick={getCurrency}>Convert</button>
        {converted && (
          <p>
            {amount} INR = {converted} {currency}
          </p>
        )}
      </section>

      {/* MOTIVATIONAL QUOTE */}
      <section>
        <h2>✨ Motivational Quote</h2>
        <p>{quote}</p>
        <button onClick={getQuote}>New Quote</button>
      </section>
    </div>
  );
}

export default App;
