// C:\secure-online-voting-system\server\models\Candidate.js
import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {

    name: {
      type: String,
      required: true,
    },

    party: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    constituency: {
      type: String,
      required: true,
    },

    manifesto: {
      type: String,
      required: true,
    },

    education: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    totalVotes: {
      type: Number,
      default: 0,
    },

  },
  {
    timestamps: true,
  }
);

const Candidate = mongoose.model(
  "Candidate",
  candidateSchema
);

export default Candidate;