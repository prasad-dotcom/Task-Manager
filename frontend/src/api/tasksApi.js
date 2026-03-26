import axios from "./axios";

export const getTasks = (params) => axios.get("/tasks", { params });
export const getTaskById = (id) => axios.get(`/tasks/${id}`);
export const createTask = (payload) => axios.post("/tasks", payload);
export const updateTask = (id, payload) => axios.put(`/tasks/${id}`, payload);
export const deleteTask = (id) => axios.delete(`/tasks/${id}`);
export const completeTask = (id) => axios.patch(`/tasks/${id}/complete`);

