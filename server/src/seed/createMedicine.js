import mongoose from "mongoose";
import Medicine from "../models/Medicine.js";
import dotenv from "dotenv";
dotenv.config();

const createMedicine = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected");

    const medicineData = [
      {
        name: "Paracip 500",
        genericName: "Paracetamol",
        type: "Tablet",
        company: "Cipla Pharma",
        strength: "500 mg",
      },
      {
        name: "Dolo 650",
        genericName: "Paracetamol",
        type: "Tablet",
        company: "Micro Labs",
        strength: "650 mg",
      },
      {
        name: "Cofnil Syrup",
        genericName: "Dextromethorphan",
        type: "Syrup",
        company: "Torrent Pharma",
        strength: "15 mg/5 ml",
      },
      {
        name: "Atorlip-10",
        genericName: "Atorvastatin",
        type: "Tablet",
        company: "Cipla Pharma",
        strength: "10 mg",
      },
      {
        name: "Cefixime Oral Suspension",
        genericName: "Cefixime",
        type: "Syrup",
        company: "Sun Pharma",
        strength: "100 mg/5 ml",
      },
      {
        name: "Insugen R",
        genericName: "Human Insulin",
        type: "Injection",
        company: "Biocon",
        strength: "100 IU/ml",
      },
      {
        name: "Aspirin 75",
        genericName: "Acetylsalicylic Acid",
        type: "Tablet",
        company: "Bayer",
        strength: "75 mg",
      },
    ];

    const existingMedicines = await Medicine.find(medicineData);
    if (existingMedicines.length > 0) {
      console.log("Medicine records already exist. Seeder will not run.");
      process.exit(0);
    }

    const medicineDataAdded = await Medicine.insertMany(medicineData);

    if (!medicineDataAdded || medicineDataAdded.length === 0) {
      throw new Error(
        "Medicine data insertion failed: Zero documents inserted."
      );
    }

    console.log("Medicine records created successfully!");
    console.log("Medicine Data Added : ", medicineDataAdded);

    process.exit(0);
  } catch (err) {
    console.error("Seeder Error:", err.message);
    process.exit(1);
  }
};

createMedicine();
