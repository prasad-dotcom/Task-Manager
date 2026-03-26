// axios.js
import axios from "axios";

const instance = axios.create({
  // Uses REACT_APP_API_URL from .env — falls back to deployed backend.
  baseURL: process.env.REACT_APP_API_URL || "https://task-manager-chi-two-69.vercel.app/api",
  // withCredentials is NOT needed — this app uses JWT Bearer tokens, not cookies.
});

// Attach JWT token from localStorage on every request.
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the server returns 401 (token expired/invalid), clear the stored token.
instance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default instance;
