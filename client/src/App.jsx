import React, { useState } from "react";

function App() {
  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState(null);
  const [quote, setQuote] = useState(null);
  const [currency, setCurrency] = useState(null);

  // ✅ Use your deployed backend URL here
  const backendURL = "https://infohub-production-d579.up.railway.app";

  // 🌦 Fetch Weather
  const getWeather = async () => {
    try {
      const res = await fetch(`${backendURL}/api/weather?city=${city}`);
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      console.error("Weather fetch error:", err);
      setWeather({ error: "Unable to fetch weather data" });
    }
  };

  // ✨ Fetch Random Quote
  const getQuote = async () => {
    try {
      const res = await fetch(`${backendURL}/api/quote`);
      const data = await res.json();
      setQuote(data);
    } catch (err) {
      console.error("Quote fetch error:", err);
      setQuote({ content: "Failed to load quote" });
    }
  };

  // 💱 Fetch Currency Rate
  const getCurrency = async () => {
    try {
      const res = await fetch(`${backendURL}/api/currency`);
      const data = await res.json();
      setCurrency(data.conversion_rates?.USD || "N/A");
    } catch (err) {
      console.error("Currency fetch error:", err);
      setCurrency("Error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-indigo-200 flex flex-col items-center p-10">
      <h1 className="text-4xl font-extrabold mb-8 text-blue-800 drop-shadow-md">
        🌍 InfoHub Dashboard
      </h1>

      {/* Weather Section */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-80 mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">🌦 Weather</h2>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border border-gray-300 p-2 w-full rounded mb-3 focus:ring-2 focus:ring-blue-400"
          placeholder="Enter city"
        />
        <button
          onClick={getWeather}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
        >
          Check Weather
        </button>

        {weather && (
          <div className="mt-4 text-center text-gray-800">
            {weather.error ? (
              <p>{weather.error}</p>
            ) : (
              <>
                <p className="font-bold">{weather.city}</p>
                <p>🌡 Temp: {weather.temperature}°C</p>
                <p>🌤 Condition: {weather.condition}</p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Currency Section */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-80 mb-6 text-center">
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">💱 Currency</h2>
        <button
          onClick={getCurrency}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
        >
          Get INR → USD Rate
        </button>
        {currency && (
          <p className="mt-4 text-lg font-medium text-gray-800">
            1 INR = {currency} USD
          </p>
        )}
      </div>

      {/* Quote Section */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-80 text-center">
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">✨ Quote</h2>
        <button
          onClick={getQuote}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded w-full"
        >
          New Quote
        </button>
        {quote && (
          <p className="mt-4 italic text-gray-600">“{quote.content}”</p>
        )}
      </div>
    </div>
  );
}

export default App;
