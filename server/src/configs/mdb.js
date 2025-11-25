import mongoose from "mongoose";
import config from "./config.js";

if (!config?.mdbUri) {
  Error("MongoDB URI is not defined in environment variables");
  process.exit(1);
}

mongoose.connect(config?.mdbUri);

const mdb = mongoose.connection;

mdb.on("error", () => {
  console.error.bind(console, "MongoDB connection error:");
  process.exit(1);
});
mdb.on("connected", () => {
  console.log("MongoDB connected successfully");
});
mdb.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

export default mdb;
