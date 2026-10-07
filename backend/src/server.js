import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import documentRoutes from "./routes/documentRoutes.js";

dotenv.config();

const app = express();

const PORT = 5000;

app.use(express.json());

app.use((req, res, next) => {
  console.log("Content-Type:", req.headers["content-type"]);
  console.log("Body:", req.body);
  next();
});

app.use("/api/documents", documentRoutes);

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