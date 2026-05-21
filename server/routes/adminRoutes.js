// server/routes/adminRoutes.js
import express from "express";
import User from "../models/User.js";
import Vote from "../models/Vote.js";
import Candidate from "../models/Candidate.js";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();

// GET all voters
router.get("/voters", protect, adminOnly, async (req, res) => {
  try {
    const voters = await User.find({ role: "VOTER" }).select("-password");
    res.json(voters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET dashboard stats
router.get("/stats", protect, adminOnly, async (req, res) => {
  try {
    const [totalVoters, totalVotes, totalCandidates, voters] = await Promise.all([
      User.countDocuments({ role: "VOTER" }),
      Vote.countDocuments(),
      Candidate.countDocuments(),
      User.countDocuments({ role: "VOTER", hasVoted: true }),
    ]);
    res.json({
      totalVoters,
      totalVotes,
      totalCandidates,
      votedCount: voters,
      turnout: totalVoters > 0 ? Math.round((voters / totalVoters) * 100) : 0,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Reset all votes (dangerous — admin only)
router.post("/reset-votes", protect, adminOnly, async (req, res) => {
  try {
    await Vote.deleteMany();
    await User.updateMany({}, { hasVoted: false, votedCandidate: null });
    await Candidate.updateMany({}, { totalVotes: 0 });
    res.json({ message: "All votes reset successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;