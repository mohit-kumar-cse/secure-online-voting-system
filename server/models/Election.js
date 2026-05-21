import mongoose from "mongoose";

const electionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ["Lok Sabha", "Assembly", "Municipal"], required: true },
  state: { type: String, required: true },
  constituency: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ["upcoming", "live", "ended"], default: "upcoming" },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Election = mongoose.model("Election", electionSchema);
export default Election;