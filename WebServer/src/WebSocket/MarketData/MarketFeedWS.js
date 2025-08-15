// Import required modules
const WebSocket = require("ws").WebSocket;
const protobuf = require("protobufjs");
const axios = require("axios");

let protobufRoot = null;

class MarketFeedWS {
  constructor() {}

  // Function to authorize the market data feed
  async getMarketFeedUrl(token) {
    if (!token) {
      throw new Error(
        "Access token is required to authorize the market data feed."
      );
    }
    const url = "https://api.upstox.com/v3/feed/market-data-feed/authorize";
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(url, { headers });
    return response.data.data.authorizedRedirectUri;
  }

  // Function to establish WebSocket connection
  async connectWebSocket(wsUrl, filteredKeys) {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(wsUrl, {
        followRedirects: true,
      });

      // WebSocket event handlers
      ws.on("open", () => {
        console.log("connected");
        resolve(ws); // Resolve the promise once connected

        // Set a timeout to send a subscription message after 1 second
        setTimeout(() => {
          const data = {
            guid: "someguid",
            method: "sub",
            data: {
              mode: "full",
              instrumentKeys: filteredKeys, //["NSE_INDEX|Nifty Bank", "NSE_INDEX|Nifty 50"],
            },
          };
          ws.send(Buffer.from(JSON.stringify(data)));
        }, 1000);
      });

      ws.on("close", () => {
        console.log("disconnected");
      });

      // ws.on("message", async (data) => {
      //   console.log(JSON.stringify(await this.decodeProfobuf(data))); // Decode the protobuf message on receiving it
      //   return JSON.stringify(await this.decodeProfobuf(data));
      // });

      ws.on("error", (error) => {
        console.log("error:", error);
        reject(error); // Reject the promise on error
      });
    });
  }

  // Function to initialize the protobuf part
  async initProtobuf() {
    protobufRoot = await protobuf.load(
      "D:/Learning/Personal Projects/Full Stack/TradingTabbu/WebServer/src/WebSocket/MarketData/v3/MarketDataFeed.proto"
    );
    console.log("Protobuf part initialization complete");
  }

  // Function to decode protobuf message
  async decodeProfobuf(buffer) {
    protobufRoot = await protobuf.load(
      "D:/Learning/Personal Projects/Full Stack/TradingTabbu/WebServer/src/WebSocket/MarketData/v3/MarketDataFeed.proto"
    );
    if (!protobufRoot) {
      console.warn("Protobuf part not initialized yet!");
      return null;
    }

    const FeedResponse = protobufRoot.lookupType(
      "com.upstox.marketdatafeederv3udapi.rpc.proto.FeedResponse"
    );
    return FeedResponse.decode(buffer);
  }

  async initWebSocket(token, filteredKeys) {
    try {
      await this.initProtobuf(); // Initialize protobuf
      const wsUrl = await this.getMarketFeedUrl(token); // Get the market feed URL
      const ws = await this.connectWebSocket(wsUrl, filteredKeys); // Connect to the WebSocket
      return ws;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  // Initialize the protobuf part and establish the WebSocket connection
  // (async () => {
  //   try {
  //     await initProtobuf(); // Initialize protobuf
  //     const wsUrl = await getMarketFeedUrl(); // Get the market feed URL
  //     const ws = await connectWebSocket(wsUrl); // Connect to the WebSocket
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //   }
  // })();
}
module.exports = MarketFeedWS; // Export the MarketFeedWS class
