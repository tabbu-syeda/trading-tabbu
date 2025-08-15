const express = require("express");
const WebSocket = require("ws");
const MarketFeedWS = require("../WebSocket/MarketData/MarketFeedWS");
const upstockService = require("../services/upstock-service");

const wss = new WebSocket.Server({ noServer: true });
let marketFeedWS;
async function initMarketFeedWS(token, keys) {
  if (!marketFeedWS) {
    marketFeedWS = new MarketFeedWS();
  }
  try {
    if (!token) {
      throw new Error("Access token is required to initialize MarketFeedWS.");
    }
    if (!keys || keys.length === 0) {
      throw new Error(
        "Instrument keys are required to initialize MarketFeedWS."
      );
    }
    const url = await marketFeedWS.getMarketFeedUrl(token);
    const upstockWS = await marketFeedWS.connectWebSocket(url, keys);
    upstockWS.on("message", async (data) => {
      const jsonData = JSON.stringify(await marketFeedWS.decodeProfobuf(data));
      console.log("Received data from WebSocket:", jsonData);

      // Broadcast the received data to all connected WebSocket clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(jsonData);
        }
      });
    });
    upstockWS.on("error", (err) => {
      console.error("WebSocket error:", err);
      upstockWS.close();
      upstockWS = null;
    });
    upstockWS.on("close", () => {
      console.log("WebSocket connection closed");
      upstockWS = null;
    });
  } catch (error) {
    console.error("Failed to initialize MarketFeedWS:", error);
    upstockWs = null;
    throw error;
  }
  return marketFeedWS;
}

module.exports = { initMarketFeedWS, wss };
