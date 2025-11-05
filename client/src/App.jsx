import React, { useState } from "react";

function App() {
  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState(null);
  const [quote, setQuote] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [error, setError] = useState("");

  const backendURL = "https://infohub-production-d579.up.railway.app"; // ✅ Your backend URL

  // 🌦 Get Weather
  const getWeather = async () => {
    try {
      const res = await fetch(`${backendURL}/api/weather?city=${city}`);
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setWeather(null);
      } else {
        setWeather(data);
        setError("");
      }
    } catch (err) {
      setError("Weather service not reachable");
    }
  };

  // 💬 Get Quote
  const getQuote = async () => {
    try {
      const res = await fetch(`${backendURL}/api/quote`);
      const data = await res.json();
      setQuote(data);
    } catch (err) {
      setQuote({ text: "Could not load quote" });
    }
  };

  // 💱 Get Currency
  const getCurrency = async () => {
    try {
      const res = await fetch(`${backendURL}/api/currency`);
      const data = await res.json();
      if (data.conversion_rates?.USD) {
        setCurrency(data.conversion_rates.USD);
      } else {
        setCurrency("Unavailable");
      }
    } catch (err) {
      setCurrency("Error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center p-10">
      <h1 className="text-4xl font-bold mb-6 text-blue-700">🌐 InfoHub</h1>

      {/* Weather Section */}
      <div className="bg-white shadow-md p-6 rounded-2xl w-80 mb-6">
        <h2 className="text-xl font-semibold mb-3">🌦 Weather</h2>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border p-2 w-full rounded mb-3"
          placeholder="Enter city"
        />
        <button
          onClick={getWeather}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
        >
          Get Weather
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {weather && (
          <div className="mt-4 text-center">
            <p>🌍 City: {weather.city}</p>
            <p>🌡 Temp: {weather.temp}°C</p>
            <p>☁ Condition: {weather.condition}</p>
          </div>
        )}
      </div>

      {/* Currency Converter */}
      <div className="bg-white shadow-md p-6 rounded-2xl w-80 mb-6 text-center">
        <h2 className="text-xl font-semibold mb-3">💱 INR → USD</h2>
        <button
          onClick={getCurrency}
          className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
        >
          Get Rate
        </button>
        {currency && <p className="mt-3">1 INR = {currency} USD</p>}
      </div>

      {/* Quote Section */}
      <div className="bg-white shadow-md p-6 rounded-2xl w-80 text-center">
        <h2 className="text-xl font-semibold mb-3">✨ Motivational Quote</h2>
        <button
          onClick={getQuote}
          className="bg-purple-600 text-white px-4 py-2 rounded w-full hover:bg-purple-700"
        >
          New Quote
        </button>
        {quote && (
          <div className="mt-4 italic">
            <p>"{quote.text}"</p>
            {quote.author && (
              <p className="text-sm text-gray-500 mt-2">— {quote.author}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
