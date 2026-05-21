// server/controllers/voteController.js
import Vote from "../models/Vote.js";
import Candidate from "../models/Candidate.js";
import User from "../models/User.js";
import generateHash from "../utils/generateHash.js";

// CAST VOTE
export const castVote = async (req, res) => {
  try {
    const { candidateId } = req.body;
    const user = await User.findById(req.user._id);

    if (user.hasVoted) {
      return res.status(400).json({ message: "You have already voted" });
    }

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    const voteHash = generateHash(
      `${user._id}-${candidate._id}-${Date.now()}`
    );

    const vote = await Vote.create({
      voter: user._id,
      candidate: candidate._id,
      voteHash,
    });

    candidate.totalVotes += 1;
    await candidate.save();

    user.hasVoted = true;
    user.votedCandidate = candidate._id;
    await user.save();

    res.status(201).json({ message: "Vote Cast Successfully", vote });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET MY VOTE
export const getMyVote = async (req, res) => {
  try {
    const vote = await Vote.findOne({ voter: req.user._id }).populate("candidate");
    if (!vote) {
      return res.status(404).json({ message: "You have not voted yet" });
    }
    res.json(vote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET VOTE STATS
 export const getVoteStats = async (req, res) => {
  try {
    const totalVotes = await Vote.countDocuments();
    const totalVoters = await User.countDocuments({ role: "VOTER" });
    res.json({ totalVotes, totalVoters });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};