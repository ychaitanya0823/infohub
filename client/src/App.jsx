import React, { useState } from "react";

function App() {
  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState(null);
  const [quote, setQuote] = useState(null);
  const [currency, setCurrency] = useState(null);

  const backendURL = "https://infohub-production-d579.up.railway.app"; // ✅ Use your Railway backend URL

  const getWeather = async () => {
    const res = await fetch(`${backendURL}/api/weather?city=${city}`);
    const data = await res.json();
    setWeather(data);
  };

  const getQuote = async () => {
    const res = await fetch(`${backendURL}/api/quote`);
    const data = await res.json();
    setQuote(data);
  };

  const getCurrency = async () => {
    const res = await fetch(`${backendURL}/api/currency`);
    const data = await res.json();
    setCurrency(data.conversion_rates?.USD);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-10">
      <h1 className="text-4xl font-bold mb-6 text-blue-700">InfoHub</h1>

      {/* Weather Section */}
      <div className="bg-white shadow-md p-6 rounded-xl w-80 mb-6">
        <h2 className="text-xl font-semibold mb-3">🌦 Weather</h2>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border p-2 w-full rounded mb-3"
          placeholder="Enter city"
        />
        <button
          onClick={getWeather}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Get Weather
        </button>

        {weather && (
          <div className="mt-4 text-center">
            <p>City: {weather.city}</p>
            <p>Temp: {weather.temp}°C</p>
            <p>Condition: {weather.condition}</p>
          </div>
        )}
      </div>

      {/* Currency Converter */}
      <div className="bg-white shadow-md p-6 rounded-xl w-80 mb-6 text-center">
        <h2 className="text-xl font-semibold mb-3">💱 INR → USD</h2>
        <button
          onClick={getCurrency}
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          Get Rate
        </button>
        {currency && <p className="mt-3">1 INR = {currency} USD</p>}
      </div>

      {/* Quote Section */}
      <div className="bg-white shadow-md p-6 rounded-xl w-80 text-center">
        <h2 className="text-xl font-semibold mb-3">✨ Quote</h2>
        <button
          onClick={getQuote}
          className="bg-purple-600 text-white px-4 py-2 rounded w-full"
        >
          New Quote
        </button>
        {quote && <p className="mt-3 italic">"{quote.content}"</p>}
      </div>
    </div>
  );
}

export default App;
