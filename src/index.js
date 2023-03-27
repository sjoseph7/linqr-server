require("dotenv").config();
const cors = require("cors");

const express = require("express");
const app = express();

const LinkingService = require("./services/LinkingService");

// Setup mongodb connection
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

// Protect express app
app.use(cors());

// 'Link' routes
app.use("/link", LinkingService.init());

// Health endpoint
app.get("/health", (req, res) => res.sendStatus(200));

// Final error handler
app.use((err, req, res, next) => {
  return res.status(500).json({ success: false, err: "Something went wrong." });
});

// Listen
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.info(`Listening on port ${port}`);
});
