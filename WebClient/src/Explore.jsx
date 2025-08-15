import IndicesHome from "./components/IndicesHome";
import { useEffect, useRef, useState } from "react";
import MarketDataContext from "./context/IndicesContext";

const Explore = () => {
  const [marketDataWS, setMarketDataWS] = useState(null);
  const wsRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");
    wsRef.current = ws;
    wsRef.current.onopen = () => {
      wsRef.current.send("Welcome to the WebSocket client!");
    };

    wsRef.current.onmessage = (event) => {
      console.log("Message from server:", event.data);
      setMarketDataWS(event.data);
    };

    wsRef.current.onerror = (error) => {
      console.log("Error occurred :", error);
    };
    wsRef.current.onclose = () => {
      console.log("WebSocket connection closed");
    };
  }, [marketDataWS]);

  return (
    <MarketDataContext.Provider value={marketDataWS}>
      <div className="mx-[200px]">
        <IndicesHome />
      </div>
      <div>
        <hr className="border-1 border-amber-300 w-full" />
      </div>
    </MarketDataContext.Provider>
  );
};

export default Explore;
