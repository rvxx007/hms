import Cookies from "js-cookie";
import config from "../../lib/config/config";
import type { Role } from "../../lib/interface/commonTypes";

export const useAuth = () => {
  // -------------------------
  // LOGIN
  // -------------------------
  const login = (token: string, role: Role) => {
    // Store token in cookies
    Cookies.set("token", token, {
      expires: Number(config.expireTime),
      secure: true,
      sameSite: "strict",
    });

    localStorage.setItem("role", role);
    window.location.href = role === "admin" ? "/admin" : "/doctor";
  };

  // -------------------------
  // LOGOUT
  // -------------------------
  const logout = () => {
    Cookies.remove("token");

    localStorage.removeItem("role");

    window.location.href = "/login";
  };

  return { login, logout };
};

