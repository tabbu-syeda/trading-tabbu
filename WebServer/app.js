const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv"); // Load environment variables from .env file
const app = express();
const { wss } = require("./src/WebSocket/WebSocketServer");

dotenv.config();

app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

app.use(cors()); // Enable CORS
app.use(morgan("dev")); // Log requests to the console

app.use("/api/auth", require("./src/routes/authRoutes")); // Authentication routes
app.use("/api/market", require("./src/routes/marketRoutes"));

app.get("/", (req, res) => {
  res.send("Welcome to the Upstox API Integration!");
});

// Upgrade HTTP server to handle WebSocket connections
const server = require("http").createServer(app);
server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});
server.listen(3000, () => {
  console.log("WebSocket server is running on ws://localhost:3000");
});
