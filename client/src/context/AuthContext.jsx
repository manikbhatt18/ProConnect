import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { loginAPI, registerAPI, getProfileAPI } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check localStorage on app load
  useEffect(() => {
    const savedUser = localStorage.getItem("proconnect_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const saveUser = (data) => {
    // data = { token, user }
    const userData = {
      ...data.user,
      token: data.token, // Include token
    };
    setUser(userData);
    localStorage.setItem("proconnect_user", JSON.stringify(userData));
  };
  

  // Register user
  const register = async (data) => {
    try {
      const res = await registerAPI(data);
      saveUser(res);
      toast.success("Registration successful!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  // Login user
  const login = async (data) => {
    try {
      const res = await loginAPI(data);
      saveUser(res);
      toast.success("Login successful!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  // Fetch profile (optional: refresh user data)
  const fetchProfile = async (id) => {
    try {
      const res = await getProfileAPI(id);
      return res;
    } catch (error) {
      toast.error("Failed to load profile");
    }
  };

  // Logout user
  const logout = () => {
    setUser(null);
    localStorage.removeItem("proconnect_user");
    //toast.success("Logged out successfully!");
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, fetchProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
