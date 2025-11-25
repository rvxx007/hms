import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },

    medicines: [
      {
        medicine: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine" },
        dosage: String,
        duration: String,
        notes: String
      }
    ],

    date: { type: Date, default: () => new Date() }
  },
  { timestamps: true }
);

export default mongoose.model("Prescription", prescriptionSchema);
