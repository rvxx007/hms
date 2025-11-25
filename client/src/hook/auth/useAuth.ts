export const useAuth = () => {
  const login = (token:string, role:string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    window.location.href = role === "admin" ? "/admin" : "/doctor";
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return { login, logout };
};
