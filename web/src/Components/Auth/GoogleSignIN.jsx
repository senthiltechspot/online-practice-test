import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import React from 'react';

const GoogleSignIN = ({setAuthToken}) => {
  const googleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const res = await axios.post('http://localhost:5000/api/v1/auth/google', {
          access_token: codeResponse.access_token,
        });

        localStorage.setItem('token', res.data.token);
        setAuthToken(res.data.token);
        // window.location.href = '/dashboard'; // Redirect to dashboard
      } catch (err) {
        console.error('Google login error', err);
      }
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <div className='flex flex-col justify-center items-center gap-2 mt-2'>
      <p className="text-center">Or</p>

      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full' onClick={() => googleLogin()}>Sign in with Google 🚀</button>
    </div>
  );
};

export default GoogleSignIN;
