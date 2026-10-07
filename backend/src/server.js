import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

const PORT = 5000;

app.get("/", (req, res) => {
  res.json({
    message: "SyncDocs server is running 🚀",
  });
});

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 SyncDocs server running on port ${PORT}`);
  });
};

startServer();