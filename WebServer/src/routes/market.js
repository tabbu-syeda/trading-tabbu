const e = require("express");
const router = e.Router();
const upstoxService = require("../services/upstock-service");

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
