import React from "react";
import GoogleSignIN from "./GoogleSignIN";

const SignUp = ({
  handleSignup,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  setIsLogin,
  setAuthToken
}) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSignup} className="space-y-6">
      <div>
          <label className="block mb-1 text-gray-700">Name</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
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
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Signup
        </button>
      </form>
      <h3 className="mt-6 text-center">
        Already have an account?{" "}
        <span
          onClick={() => setIsLogin(false)}
          className="text-blue-500 cursor-pointer hover:underline"
        >
          Login
        </span>
      </h3>
     
    </div>
  );
};

export default SignUp;
