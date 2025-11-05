import { useState } from "react";
import axios from "axios";

export default function QuoteGenerator() {
  const [quote, setQuote] = useState("");
  const [error, setError] = useState("");

  const fetchQuote = async () => {
    setError("");
    try {
      const response = await axios.get("/api/quote"); // relative path to backend
      setQuote(response.data.quote);
    } catch (err) {
      console.error("Quote fetch error:", err);
      setError("Failed to fetch quote");
    }
  };

  return (
    <div>
      <h2>Motivational Quote</h2>
      <button onClick={fetchQuote}>New Quote</button>
      <p style={{ marginTop: "10px", fontStyle: "italic" }}>
        {error || quote || "Click 'New Quote' to get inspired!"}
      </p>
    </div>
  );
}
