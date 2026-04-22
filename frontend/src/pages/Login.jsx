import React, { useState } from "react";
import api from "../api";

export function Login({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const payload = isLogin
        ? { email, password }
        : { email, password, name };

      const res = await api.post(endpoint, payload);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      onLoginSuccess(res.data.user, res.data.token);
    } catch (err) {
      setError(err.response?.data?.message || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-50 to-white px-4">

      <div className="absolute w-80 h-80 bg-blue-100 rounded-full opacity-10 blur-3xl top-10 left-10"></div>
      <div className="absolute w-80 h-80 bg-teal-100 rounded-full opacity-10 blur-3xl bottom-20 right-10"></div>

      <div className="relative z-10 w-full max-w-md p-10 rounded-xl 
        bg-white shadow-lg border border-gray-200
        transition-all duration-500">

        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {isLogin ? "Sign In" : "Create Account"}
        </h2>
        <p className="text-base text-gray-600 mb-8">
          {isLogin ? "Welcome back" : "Join our platform"}
        </p>

        {error && (
          <div className="mb-6 text-red-600 text-sm bg-red-50 p-4 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              required
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg text-base font-semibold
            bg-blue-600 text-white
            hover:bg-blue-700 active:bg-blue-800
            transition duration-300 shadow-sm mt-6 disabled:opacity-60"
          >
            {loading ? "Loading..." : isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-700 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-blue-600 font-semibold hover:text-blue-700"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>

      </div>
    </div>
  );
}