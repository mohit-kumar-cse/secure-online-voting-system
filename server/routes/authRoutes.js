import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// ✅ Users list — Statistics ke liye
router.get("/users", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find({ role: "VOTER" }).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;