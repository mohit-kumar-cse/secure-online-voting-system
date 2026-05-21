// server/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    voterId: {
      type: String,
      required: true,
      unique: true,
    },

    aadhaarNumber: {
      type: String,
      required: true,
      unique: true,
    },

    role: {
      type: String,
      enum: ["VOTER", "ADMIN"],
      default: "VOTER",
    },

    hasVoted: {
      type: Boolean,
      default: false,
    },

    votedCandidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      default: null,
    },

  },
  {
    timestamps: true,
  }
);

const User = mongoose.model(
  "User",
  userSchema
);

export default User;