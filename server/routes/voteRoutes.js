// server/routes/voteRoutes.js
import express from "express";
import { castVote, getMyVote, getVoteStats } from "../controllers/voteController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/cast", protect, castVote);
router.get("/my-vote", protect, getMyVote);  // ✅ was missing
router.get("/stats", getVoteStats);           // ✅ was missing

export default router;