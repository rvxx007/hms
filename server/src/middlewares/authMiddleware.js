import {send4xxClientErrorResponse, sendClientErrorResponse} from 'req-res-handlers';
import config from "../configs/config.js";
import { verifyJWTToken } from '../lib/util/commonFun.js';

export const protect = (roles = []) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return sendClientErrorResponse(res,401,"No token provided",{ message: "No token provided" });
      }

      const token = authHeader.split(" ")[1]; // Bearer token

      if (!token) {
        return sendClientErrorResponse(res,401,"Invalid token format" ,{ message: "Invalid token format" });
      }

      const verified = verifyJWTToken(token, config.jwtSecret);
      req.user = verified; // id, role

      // role-based check
      if (roles.length && !roles.includes(verified.role)) {
         send4xxClientErrorResponse(res,403,"Forbidden: Access denied",{ message: "Forbidden: Access denied" });
      }
      next();
    } catch (err) {
      return send4xxClientErrorResponse(res,403,"Invalid or expired token",{ message: "Invalid or expired token" });
    }
  };
};
