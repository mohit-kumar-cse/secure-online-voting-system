// server/routes/candidateRoutes.js
import express from "express";
import {
  getCandidates,
  getCandidateById,
  addCandidate,
  deleteCandidate,
} from "../controllers/candidateController.js";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getCandidates);
router.get("/:id", getCandidateById);
router.post("/", protect, adminOnly, upload.single("image"), addCandidate);
router.delete("/:id", protect, adminOnly, deleteCandidate);

export default router;