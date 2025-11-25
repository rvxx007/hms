import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcrypt";


const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected");

    const email = "doctor123@hms.com";
    const password = "doctor123";

    const existing = await User.findOne({ email });

    if (existing) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name: "Doctor User",
      email,
      password: hashedPassword,
      role: "doctor"
    });

    console.log("Doctor user created successfully!");
    console.log("Email:", email);
    console.log("Password:", password);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

createAdmin();
