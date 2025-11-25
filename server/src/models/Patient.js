import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    gender: String,
    phone: String,
    address: String,

    hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },

    complaint: String,
    registrationDate: { type: Date, default: () => new Date() },
  },
  { timestamps: true }
);

export default mongoose.model("Patient", patientSchema);
