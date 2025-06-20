const axios = require("axios");
const {
  UPSTOX_CONFIG,
  NIFTY_50_SYMBOLS,
  MARKET_INDICES,
} = require("../config/upstock");
const querystring = require("querystring");

class UpstockService {
  constructor() {
    this.access_token = null;
    this.baseUrl = UPSTOX_CONFIG.SANDBOX_BASE_URL;
  }

  getAuthorizationUrl() {
    const params = new URLSearchParams({
      response_type: "code",
      client_id: UPSTOX_CONFIG.ApiKey,
      redirect_uri: UPSTOX_CONFIG.redirect_url,
    });
    return `${this.baseUrl}/v2/login/authorization/dialog?${params.toString()}`;
  }

  async getAccessToken(code) {
    const url = `${this.baseUrl}/v2/login/authorization/token`;
    const data = {
      code: code,
      client_id: UPSTOX_CONFIG.ApiKey,
      client_secret: UPSTOX_CONFIG.ApiSecret,
      redirect_uri: UPSTOX_CONFIG.redirect_url,
      grant_type: "authorization_code",
    };
    try {
      const response = await axios.post(url, querystring.stringify(data), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      if (response.status === 200) {
        const { access_token } = response.data;
        this.access_token = access_token;
        return access_token;
      } else {
        console.error("Failed to retrieve access token:", response.statusText);
      }
    } catch (error) {
      throw new Error("Failed to get access token : " + error.message);
    }
  }

  async getMarketQuotes(instrument) {
    if (!this.access_token) {
      console.error("Access token not found. Please login.");
      throw new Error("Access token not found. Please login.");
    }
    const quoteUrl = `${this.baseUrl}${UPSTOX_CONFIG.ENDPOINTS.MARKET_QUOTE}`;
    try {
      const params = {
        instrument_key: instrument,
      };
      const response = await axios.get(quoteUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.access_token}`,
        },
        params: params,
      });
      console.log("Response status:", response.status);
      console.log("Response data:", response.data);
      if (response.status === 200) {
        console.log("Market quotes fetched successfully:", response.data);
        return JSON.stringify(response.data);
      }
    } catch (error) {
      console.error("Error fetching market quotes:", error);
      throw new Error("Failed to fetch market quotes");
    }
  }
}

module.exports = new UpstockService();
// This service provides methods to interact with the Upstox API, including generating the authorization URL.
