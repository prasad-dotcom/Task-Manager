import axios from "./axios";

export const authSignup = (payload) => axios.post("/auth/signup", payload);
export const authLogin = (payload) => axios.post("/auth/login", payload);
export const authMe = () => axios.get("/auth/me");

