const axios = require("axios");
const { UPSTOX_CONFIG, MARKET_INDICES } = require("../config/upstock");
const querystring = require("querystring");
const { error } = require("console");

class UpstockService {
  constructor() {
    this.access_token = null;
    this.baseUrl = UPSTOX_CONFIG.SANDBOX_BASE_URL;
    console.log(
      "UpstockService initialized with access token:",
      this.access_token
    );
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
      console.log("Response data:", response.data);
      if (response.status === 200) {
        return JSON.stringify(response.data);
      }
    } catch (error) {
      throw new Error("Failed to fetch market quotes");
    }
  }

  async logoutUpstockUser() {
    if (!this.access_token) {
      console.error("Access token not found. Please login.");
      throw new Error("Access token not found. Please login.");
    }
    const logoutURL = `${this.baseUrl}/v2/logout`;
    try {
      const response = await axios.delete(logoutURL, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${this.access_token}`,
        },
      });
      if (response.data) {
        console.log("User logged out successfully");
        this.access_token = null; // Clear the access token
        return response.data;
      }
    } catch (error) {
      console.error("Error logging out:", error);
      throw new Error("Failed to logout user");
    }
  }

  async getUserProfile(token) {
    try {
      if (!token) {
        console.error("Access token not found in request headers.");
        res.status(401).json({
          error: "Access token not found",
        });
      }
      var profileUrl = `${this.baseUrl}/v2/user/profile`;
      const response = await axios.get(profileUrl, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        console.error("Failed to fetch user profile:", response.statusText);
        throw new Error("Failed to fetch user profile" + error.message);
      }
    } catch (error) {
      throw new Error("Failed to fetch user profile" + error.message);
    }
  }

  async getIndices(token, keys) {
    try {
      const symbols = Object.values(MARKET_INDICES);
      const allkeys = [...symbols, ...keys];
      const indicesUrl = `${this.baseUrl}${UPSTOX_CONFIG.ENDPOINTS.MARKET_DATA}`;
      const response = await axios.get(indicesUrl, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          instrument_key: allkeys
            .join(",")
            .replace(/%7C/g, "|")
            .replace(/\s/g, " "),
        },
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching indices:", error);
      throw new Error("Failed to fetch indices");
    }
  }
  getAccessTokenValue() {
    return this.access_token;
  }
}

module.exports = new UpstockService();
