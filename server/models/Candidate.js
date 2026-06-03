// server/models/Candidate.js
import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Candidate name is required"],
      trim: true,
    },

    party: {
      type: String,
      required: [true, "Party name is required"],
      trim: true,
    },

    age: {
      type: Number,
      required: [true, "Age is required"],
       
      min: [25, "Candidate must be at least 25 years old"],
      max: [120, "Invalid age"],
    },

    constituency: {
      type: String,
      required: [true, "Constituency is required"],
      trim: true,
    },

    manifesto: {
      type: String,
      required: [true, "Manifesto is required"],
      trim: true,
    },

    education: {
      type: String,
      required: [true, "Education is required"],
      trim: true,
    },

    experience: {
      type: String,
      required: [true, "Experience is required"],
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    totalVotes: {
      type: Number,
      default: 0,
       
      min: [0, "Vote count cannot be negative"],
    },
  },
  { timestamps: true }
);
 
candidateSchema.index({ constituency: 1 });
candidateSchema.index({ party: 1 });
candidateSchema.index({ totalVotes: -1 }); // for results sorted by votes desc

const Candidate = mongoose.model("Candidate", candidateSchema);
export default Candidate;