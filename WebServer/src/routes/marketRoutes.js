const e = require("express");
const router = e.Router();
const upstoxService = require("../services/upstock-service");
const dataService = require("../services/data-service");
const MarketFeedWS = require("../WebSocket/MarketData/MarketFeedWS");
const initWebSocket = require("../WebSocket/WebSocketServer").initMarketFeedWS;

router.get("/indices", async (req, res) => {
  const token = req?.headers?.authorization.replace("Bearer ", "");
  // Extract token from Authorization header
  try {
    const keys = await dataService.getAllIndices();
    const sortedKeys = keys.sort((a, b) => a.length - b.length);
    const firstFour = sortedKeys.slice(0, 4);
    const lastFour = sortedKeys.slice(-4);
    const filteredKeys = [...firstFour, ...lastFour];

    const indices = await upstoxService.getIndices(token, filteredKeys);

    initWebSocket(token, filteredKeys)
      .then((ws) => {
        console.log("WebSocket initialized successfully");
      })
      .catch((error) => {
        console.error("Error initializing WebSocket:", error);
      });

    res.status(200).json({ data: indices });
  } catch (error) {
    console.error("Error fetching indices:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch indices",
    });
  }
});

router.get("/quotes/:instrument", async (req, res) => {
  const { instrument } = req.params;
  try {
    if (!instrument) {
      return res.status(400).json({
        success: false,
        error: "Instrument key is required",
      });
    }
    const response = await upstoxService.getMarketQuotes(instrument);
    res.json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error("Error fetching market quotes:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch market quotes",
    });
  }
});

module.exports = router;
