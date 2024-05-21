import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import React from 'react';

const GoogleSignIN = () => {
  const googleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const res = await axios.post('http://localhost:5000/api/auth/google', {
          access_token: codeResponse.access_token,
        });
        localStorage.setItem('token', res.data.token);
        window.location.href = '/dashboard'; // Redirect to dashboard
      } catch (err) {
        console.error('Google login error', err);
      }
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <div>
      <button onClick={() => googleLogin()}>Sign in with Google 🚀</button>
    </div>
  );
};

export default GoogleSignIN;
