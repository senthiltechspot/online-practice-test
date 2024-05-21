import { useState } from "react";
import "./App.css";
import Auth from "./pages/Auth";
import axios from "axios";
import Dashboard from "./pages/Dashboard";

// set base url
const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`;
export const baseAPI = axios.create({
  baseURL: BASE_URL,
});

baseAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["x-auth-token"] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("token");
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-yellow-500 to-red-400">
     { authToken ? <Dashboard logout={logout} /> : <Auth setAuthToken={setAuthToken} />}
    </div>
  );
}

export default App;
