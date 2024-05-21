import React from "react";
import GoogleSignIN from "./GoogleSignIN";

const Login = ({
  handleLogin,
  email,
  setEmail,
  password,
  setPassword,
  setAuthToken,
  setIsLogin,
}) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label className="block mb-1 text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Sign In
        </button>
      </form>
      <GoogleSignIN setAuthToken={setAuthToken} />

      <h3 className="mt-6 text-center">
        Don't have an account?{" "}
        <span
          onClick={() => setIsLogin(true)}
          className="text-blue-500 cursor-pointer hover:underline"
        >
          Signup
        </span>
      </h3>
    </div>
  );
};

export default Login;
