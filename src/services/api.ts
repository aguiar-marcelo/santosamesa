import axios from "axios";
import Cookies from "js-cookie";

export const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const axiosClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
