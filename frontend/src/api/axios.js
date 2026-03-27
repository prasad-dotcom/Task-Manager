// axios.js
import axios from "axios";

// For separate Vercel deployments:
// Frontend: https://task-manager-frontend-eight-tawny.vercel.app
// Backend:  https://task-manager-chi-two-69.vercel.app

const getBaseURL = () => {
  // If explicitly set via environment variable, use it
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // Development (local): use localhost backend
  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    return "http://localhost:5000/api";
  }
  
  // Production on Vercel: use the deployed backend URL
  // Note: Update this URL to match your backend Vercel deployment
  return "https://task-manager-chi-two-69.vercel.app/api";
};

const instance = axios.create({
  baseURL: getBaseURL(),
});

// Attach JWT token from localStorage on every request
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses (token expired/invalid)
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
