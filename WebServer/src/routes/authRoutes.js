const express = require("express");
const router = express.Router();
const upstoxAuthService = require("../services/upstock-service");

router.get("/login", (req, res) => {
  try {
    const authUrl = upstoxAuthService.getAuthorizationUrl();
    res.redirect(authUrl);
  } catch (error) {
    console.error("Error initiating login:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/callback", async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res.status(400).json({
        success: false,
        error: "Authorization code is required",
      });
    }

    var response = await upstoxAuthService.getAccessToken(code);
    res.json({
      success: true,
      accessToken: response,
      message: "Successfully authenticated with Upstox",
    });
  } catch (error) {
    console.error("Error in callback:", error);
    return res.status(500).send({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
