require("dotenv").config();

const UPSTOX_CONFIG = {
  redirect_url: "http://localhost:5173/callback",
  ApiKey: "f7599e1b-00da-44d0-9e34-8a54b39e2cd9",
  ApiSecret: "uxnft80hu8",

  // Upstox API URLs
  SANDBOX_BASE_URL: "https://api.upstox.com",

  // API endpoints
  ENDPOINTS: {
    MARKET_QUOTE: "/v2/market-quote/quotes",
    MARKET_DATA: "/v2/market-quote/ltp",
    HISTORICAL_DATA: "/v2/historical-candle",
    PLACE_ORDER: "/v2/order/place",
    ORDER_BOOK: "/v2/order/retrieve-all",
    POSITIONS: "/v2/portfolio/long-term-holdings",
    PORTFOLIO: "/v2/portfolio/short-term-holdings",
    PROFILE: "/v2/user/profile",
    FUNDS: "/v2/user/get-funds-and-margin",
  },
};

// Nifty 50 stocks symbols
const NIFTY_50_SYMBOLS = [
  "NSE_EQ|INE002A01018", // RELIANCE
  "NSE_EQ|INE467B01029", // TCS
  "NSE_EQ|INE040A01034", // HDFCBANK
  "NSE_EQ|INE009A01021", // INFY
  "NSE_EQ|INE030A01027", // HINDUNILVR
  "NSE_EQ|INE090A01021", // ICICIBANK
  "NSE_EQ|INE237A01028", // KOTAKBANK
  "NSE_EQ|INE062A01020", // SBIN
  "NSE_EQ|INE397D01024", // BHARTIARTL
  "NSE_EQ|INE154A01025", // ITC
  // Add more symbols as needed
];

// Market indices
const MARKET_INDICES = {
  NIFTY_50: "NSE_INDEX|Nifty 50",
  SENSEX: "BSE_INDEX|SENSEX",
  BANK_NIFTY: "NSE_INDEX|Nifty Bank",
  NIFTY_IT: "NSE_INDEX|Nifty IT",
};

module.exports = {
  UPSTOX_CONFIG,
  NIFTY_50_SYMBOLS,
  MARKET_INDICES,
};
