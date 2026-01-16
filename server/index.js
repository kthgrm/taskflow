const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "TaskFlow API Running" });
});

// Port
const PORT = process.env.PORT || 5000;

// Connect to Database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
