// server/controllers/candidateController.js
import Candidate from "../models/Candidate.js";
import fs from "fs";

// GET ALL CANDIDATES
export const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE CANDIDATE
export const getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    res.json(candidate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD CANDIDATE (admin only, with image)
export const addCandidate = async (req, res) => {
  try {
    const { name, party, age, constituency, manifesto, education, experience } = req.body;
    const image = req.file ? req.file.filename : "";

    const candidate = await Candidate.create({
      name, party, age, constituency,
      manifesto, education, experience, image,
    });

    res.status(201).json(candidate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE CANDIDATE (admin only)
export const deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    // Delete image file
    if (candidate.image) {
      const imgPath = `uploads/candidates/${candidate.image}`;
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }
    await candidate.deleteOne();
    res.json({ message: "Candidate deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};