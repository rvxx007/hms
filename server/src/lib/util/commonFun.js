
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../../configs/config.js";

//------------------------------------------
// JWT Token Generation
//------------------------------------------

export function generateJWTToken(payload) {
  if (!config.jwtSecret) {
    throw new Error("JWT Secret is not defined in configuration");
  }
  if (!config.jwtExpiresIn) {
    throw new Error("JWT Secret is not defined in configuration");
  }

  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
}
//------------------------------------------

//------------------------------------------
// Jwt Verification
//------------------------------------------
export function verifyJWTToken(token) {
  if (!config.jwtSecret) {
    throw new Error("JWT Secret is not defined in configuration");
  }
  return jwt.verify(token, config.jwtSecret);
}
//------------------------------------------

//------------------------------------------
// JWT Decode
//------------------------------------------
export function decodeJWTToken(token) {
  return jwt.decode(token);
}
//------------------------------------------

//------------------------------------------
// Utility functions for common operations
//------------------------------------------
export async function hashedPassword(str, saltRounds = 10) {
  if (typeof saltRounds !== "number")
    throw new Error("saltRounds must be a number");
  return await bcrypt.hash(str, Number(saltRounds));
}
//------------------------------------------


//------------------------------------------
// Password Comparison
//------------------------------------------
export async function comparePassword(plainText, hashed) {
  return await bcrypt.compare(plainText, hashed);
}
//------------------------------------------
