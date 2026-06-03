// server/routes/authRoutes.js
import express from "express";
import rateLimit from "express-rate-limit";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

 
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,                   
  standardHeaders: true,     
  legacyHeaders: false,
  message: { message: "Too many attempts. Please try again in 15 minutes." },
});

router.post("/register", authLimiter, registerUser);
router.post("/login",    authLimiter, loginUser);

export default router;