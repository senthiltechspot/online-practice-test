import React, { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleSignIN from "../Components/Auth/GoogleSignIN";
import SignUp from "../Components/Auth/SignUp";
import Login from "../Components/Auth/Login";
import axios from "axios";
import { baseAPI } from "../App";

const Auth = ({ setAuthToken }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await baseAPI.post("auth/login", {
        email,
        password,
      });
      setAuthToken(res.data.token);
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      console.error("Login error", err);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/signup", {
        name,
        email,
        password,
      });
      setAuthToken(res.data.token);
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      console.error("Signup error", err);
    }
  };
  
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
      <div className="flex flex-col justify-center items-center gap-7 w-full">
        <h2 className="text-3xl font-bold">Welcome to EduChamp</h2>
        {isLogin ? (
          <SignUp
            handleLogin={handleLogin}
            handleSignup={handleSignup}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            setIsLogin={setIsLogin}
          />
        ) : (
          <Login
            handleLogin={handleLogin}
            handleSignup={handleSignup}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            setIsLogin={setIsLogin}
            setAuthToken={setAuthToken}
          />
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default Auth;
