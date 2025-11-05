import WeatherModule from "./components/WeatherModule";
import CurrencyConverter from "./components/CurrencyConverter";
import QuoteGenerator from "./components/QuoteGenerator";

function App() {
  return (
    <div style={{ 
      fontFamily: "Arial, sans-serif", 
      padding: "20px", 
      maxWidth: "600px", 
      margin: "0 auto" 
    }}>
      <h1 style={{ textAlign: "center" }}>InfoHub</h1>
      
      <section style={{ marginBottom: "30px" }}>
        <WeatherModule />
      </section>

      <section style={{ marginBottom: "30px" }}>
        <CurrencyConverter />
      </section>

      <section>
        <QuoteGenerator />
      </section>
    </div>
  );
}

export default App;
