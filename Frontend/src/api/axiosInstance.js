// services/axiosInstance.js or similar
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  withCredentials: true  // ✅ this sends cookies like token
});

export default axiosInstance;
