import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import GoogleSignIN from "../Components/GoogleSignIN";

const Auth = ({ setAuthToken }) => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
      <div>
        <h2>Login</h2>
      </div>
      <GoogleSignIN />
    </GoogleOAuthProvider>
  );
};

export default Auth;
