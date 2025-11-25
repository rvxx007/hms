import Cookies from "js-cookie";

export const headers = {
    headers: { Authorization: `Bearer ${Cookies.get("token")}` }
  };