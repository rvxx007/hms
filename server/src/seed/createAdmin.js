import mongoose from "mongoose";
import User from "../models/User.js";
import config from "../configs/config.js";
import bcrypt from "bcrypt";


const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected");

    const email = config.adminEmail;
    const password = config.adminPassword;

    const existing = await User.findOne({ email });

    if (existing) {
      console.log("Admin already exists");
      process.exit(0);
    }

    // const hashedPassword = await hashedPassword(password, 10);
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name: "Super Admin",
      email,
      password: hashedPassword,
      role: "admin"
    });

    console.log("Admin user created successfully!");
    console.log("Email:", email);
    console.log("Password:", password);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

createAdmin();
