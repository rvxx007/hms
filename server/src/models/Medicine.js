import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    name: String,
    genericName: String,
    strength: String,
    type: { type: String, enum: ["Tablet", "Syrup", "Injection"] },
    company: String
  },
  { timestamps: true }
);

export default mongoose.model("Medicine", medicineSchema);
