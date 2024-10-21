import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,  // Ensure this is set
  withCredentials: true,  // Ensures cookies are sent with requests
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.response.use(
    response => response,
    error => {
      console.error("API Error:", error);
      return Promise.reject(error);
    }
  );
  