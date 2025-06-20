const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv"); // Load environment variables from .env file
const app = express();
dotenv.config();

app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

app.use(cors()); // Enable CORS
app.use(morgan("dev")); // Log requests to the console

app.use("/api/auth", require("./src/routes/authRoutes")); // Authentication routes
app.use("/api/market", require("./src/routes/market"));

app.get("/", (req, res) => {
  res.send("Welcome to the Upstox API Integration!");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
