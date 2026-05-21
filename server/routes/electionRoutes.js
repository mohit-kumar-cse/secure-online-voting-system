// server/routes/electionRoutes.js

import express from "express";
import Election from "../models/Election.js";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();


// GET active election (public)
router.get("/active", async (req, res) => {

  try {

    const election = await Election.findOne({
      isActive: true,
    });

    // Return null instead of 404
    if (!election) {

      return res.json(null);
    }

    res.json(election);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });
  }
});


// GET all elections (admin)
router.get("/", protect, adminOnly, async (req, res) => {

  try {

    const elections = await Election.find()
      .sort({ createdAt: -1 });

    res.json(elections);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });
  }
});


// CREATE election (admin)
router.post("/", protect, adminOnly, async (req, res) => {

  try {

    // Deactivate previous elections
    await Election.updateMany(
      {},
      { isActive: false }
    );

    const election = await Election.create(
      req.body
    );

    res.status(201).json(election);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });
  }
});


// UPDATE election (admin)
router.put("/:id", protect, adminOnly, async (req, res) => {

  try {

    const election =
      await Election.findByIdAndUpdate(

        req.params.id,

        req.body,

        { new: true }
      );

    res.json(election);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });
  }
});


// DELETE election (admin)
router.delete("/:id", protect, adminOnly, async (req, res) => {

  try {

    await Election.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Election deleted",
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });
  }
});

export default router;