// server/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet"; // ✅ FIX 5: Security headers — npm install helmet

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import candidateRoutes from "./routes/candidateRoutes.js";
import voteRoutes from "./routes/voteRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import electionRoutes from "./routes/electionRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js"; // ✅ FIX 4: global error handler

dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

 
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }, 
  })
);

 
//    In dev:        CLIENT_URL=http://localhost:5173
//    In production: CLIENT_URL=https://your-app.vercel.app
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",").map((o) => o.trim())
  : ["http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
       
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: origin ${origin} not allowed`));
      }
    },
    credentials: true,
  })
);

 
app.use(express.json({ limit: "10mb" }));

 
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

 
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ── API Routes ──────────────────────────────────────────────
app.use("/api/auth",       authRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/votes",      voteRoutes);
app.use("/api/admin",      adminRoutes);
app.use("/api/election",   electionRoutes);

 
app.get("/", (req, res) => {
  res.json({
    message: "Secure Online Voting System API Running",
    env: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

 
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT} [${process.env.NODE_ENV}]`);
});