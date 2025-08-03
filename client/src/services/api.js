import axios from "axios";

// Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api", // Backend URL from .env
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to headers if exists
api.interceptors.request.use((config) => {
  const storedUser = localStorage.getItem("proconnect_user");
  if (storedUser) {
    const token = JSON.parse(storedUser).token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// -------- AUTH APIS --------

// Send OTP
export const sendOtpAPI = async (email) => {
  const { data } = await api.post("/auth/send-otp", { email });
  return data;
};

// Register user
export const registerAPI = async (userData) => {
  const { data } = await api.post("/auth/register", userData);
  return data;
};

// Login user
export const loginAPI = async (credentials) => {
  const { data } = await api.post("/auth/login", credentials);
  return data;
};

// Get profile by ID
export const getProfileAPI = async () => {
  const { data } = await api.get("/auth/profile");
  return data;
};

// -------- POST APIS --------

// Get all posts
export const getPostsAPI = async () => {
  const { data } = await api.get("/posts");
  return data;
};

// Create a new post
export const createPostAPI = async (postData) => {
  const { data } = await api.post("/posts", postData);
  return data;
};

// Get posts of a specific user
export const getUserPostsAPI = async (userId) => {
  const { data } = await api.get(`/posts/user/${userId}`);
  return data;
};
