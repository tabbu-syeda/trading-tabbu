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

router.get("/logout", async (req, res) => {
  try {
    var response = await upstoxAuthService.logoutUpstockUser();
    if (response) {
      return res.status(200).json({
        success: true,
        message: "User logged out successfully",
      });
    }
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/verify", async (req, res) => {
  try {
    var token = req?.headers?.authorization.replace("Bearer ", "");
    const response = await upstoxAuthService.getUserProfile(token);
    if (response) {
      console.log("User profile retrieved successfully:", response);
      return res.status(200).json({
        success: true,
        profile: {
          user: response.data?.user_name,
          userId: response.data?.user_id,
          email: response.data?.email,
        },
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "User profile could not be retrieved.",
      });
    }
  } catch (error) {
    res.status(500).send("Error Verifying User: " + error.message);
  }
});

module.exports = router;
