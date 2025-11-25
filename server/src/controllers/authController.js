import {
  send2xxSuccessResponse,
  send4xxClientErrorResponse,
} from "req-res-handlers";
import User from "../models/User.js";
import { comparePassword, generateJWTToken } from "../lib/util/commonFun.js";

export const loginHandler = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return send4xxClientErrorResponse(res, 400, "Email and password are required.");
  }

  const user = await User.findOne({ email }).select('+password').lean();

  const match = await comparePassword(password, user.password);
  
  if (!match) {
    return send4xxClientErrorResponse(res, 401, "Invalid credentials.");
  }

  const token = generateJWTToken({ id: user._id, role: user.role });

  return send2xxSuccessResponse(res, 200, "Login successful", {
    token,
    role: user.role,
    userId: user._id,
  });
};


export const logoutHandler = async (req, res) => {

  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure in production
    sameSite: 'Strict', // Recommended setting for security
  }); 
  
  return send2xxSuccessResponse(res, 200, "Logout successful", {
    message: "User logged out successfully (cookie cleared)",
  });
};