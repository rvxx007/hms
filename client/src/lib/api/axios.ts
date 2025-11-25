import axios, { type AxiosInstance } from "axios";
import config from "../config/config";

const api : AxiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
