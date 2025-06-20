import React, { useEffect } from "react";
import { API_BASE_URL } from "../utils/Constant";
import axios from "axios";
const MarketQuote = () => {
  const [marketQuote, setMarketQuote] = React.useState(null);
  useEffect(() => {
    setMarketQuote(fetchMarketQuote());
    console.log("Market quote fetched : " + marketQuote);
  }, []);

  const fetchMarketQuote = async () => {
    const instrument = new URLSearchParams(window.location.search).get(
      "instrument"
    );
    if (!instrument) {
      throw new Error("Instrument parameter is missing in the URL");
    }
    await axios
      .get(`${API_BASE_URL}/market/quotes?instrument=${instrument}`)
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;
          console.log("Market Quote response Data: ", data);
          return data;
        }
      })
      .catch((error) => {
        console.error("Error fetching market quote:", error);
      });
  };
  return (
    <div className="market-quote">
      <h2>Market Quote</h2>
      {marketQuote && <pre>{JSON.stringify(marketQuote, null, 2)}</pre>}
    </div>
  );
};

export default MarketQuote;
