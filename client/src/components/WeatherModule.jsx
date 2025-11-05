import React, { useState } from "react";
import axios from "axios";

const WeatherModule = () => {
  const [city, setCity] = useState("London");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`/api/weather?city=${city}`);
      setData(res.data);
    } catch (err) {
      setError("Failed to fetch weather");
    }
    setLoading(false);
  };

  return (
    <div>
      <input value={city} onChange={(e) => setCity(e.target.value)} />
      <button onClick={fetchWeather}>Get Weather</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && (
        <div>
          <p>City: {data.city}</p>
          <p>Temperature: {data.temperature} °C</p>
          <p>Condition: {data.condition}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherModule;
