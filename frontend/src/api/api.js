import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ================= AUTH ================= */
export const login = (data) => api.post("/auth/login", data);
export const register = (data) => api.post("/auth/register", data);

/* ================= TASKS ================= */
export const fetchTasks = () => api.get("/tasks");
export const addTask = (data) => api.post("/tasks", data);
export const updateTask = (id, data) => api.put(`/tasks/${id}`, data);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);

export default api;
