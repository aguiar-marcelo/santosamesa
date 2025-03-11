import axios from "axios";
import Cookies from "js-cookie";

export const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3009";

export const axiosClient = axios.create({
  baseURL: apiBaseUrl + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    const user = Cookies.get("user");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (user) {
      config.headers.GroupId = `${JSON.parse(user || "").grupo.id}`;
      config.headers.UserId = `${JSON.parse(user || "").userId}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
