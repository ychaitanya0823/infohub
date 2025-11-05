import { useState } from "react";
import axios from "axios";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [currency, setCurrency] = useState("USD");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const fetchCurrency = async () => {
    setError("");
    try {
      const response = await axios.get("/api/currency", {
        params: { amount, target: currency }
      });
      setResult(`${response.data.amount} INR → ${response.data.result} ${response.data.currency}`);
    } catch (err) {
      console.error("Currency fetch error:", err);
      setError("Failed to fetch currency");
      setResult("");
    }
  };

  return (
    <div>
      <h2>Currency Converter (INR → Selected Currency)</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount in INR"
      />
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="JPY">JPY</option>
        <option value="GBP">GBP</option>
        <option value="AUD">AUD</option>
        <option value="CAD">CAD</option>
        <option value="CHF">CHF</option>
        <option value="CNY">CNY</option>
        <option value="INR">INR</option>
      </select>
      <button onClick={fetchCurrency}>Convert</button>
      <p style={{ marginTop: "10px", fontStyle: "italic" }}>{error || result}</p>
    </div>
  );
}
