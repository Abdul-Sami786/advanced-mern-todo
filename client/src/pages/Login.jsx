import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";
import { Rocket, LogIn, Mail, Lock, User, Sparkles } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", { email, password });
      login(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-all duration-500">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <div className="w-12 h-12 bg-linear-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Rocket className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-4xl font-black bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TODO DASH
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wider">Access Task Control</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="h-4 w-4 text-yellow-500" />
            <p className="text-sm text-gray-600 dark:text-gray-300">Secure login to your dashboard</p>
            <Sparkles className="h-4 w-4 text-yellow-500" />
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-linear-to-br from-white/90 to-blue-50/90 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-sm p-8 rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-linear-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
              <LogIn className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-linear-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
              Welcome Back
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </div>
              </label>
              <div className="relative">
                <input
                  className="w-full p-4 pl-12 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-300/50 dark:border-gray-600/50 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                />
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-8">
              <label className="block text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Password
                </div>
              </label>
              <div className="relative">
                <input
                  className="w-full p-4 pl-12 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-300/50 dark:border-gray-600/50 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="group relative w-full px-6 py-4 rounded-xl bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <LogIn className="h-5 w-5" />
                Access Task Control
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gray-300/50 dark:bg-gray-600/50"></div>
            <span className="px-4 text-sm text-gray-500 dark:text-gray-400 font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-300/50 dark:bg-gray-600/50"></div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              New to TODO Dash?
            </p>
            <Link
              to="/register"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-emerald-500 to-green-500 text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105"
            >
              <User className="h-4 w-4" />
              Create New Account
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
            </Link>
          </div>

          {/* Security Note */}
          <div className="mt-8 p-4 rounded-xl bg-linear-to-r from-blue-500/10 to-cyan-500/10 border border-blue-200/50 dark:border-blue-800/50">
            <p className="text-xs text-center text-gray-600 dark:text-gray-300">
              🔒 Secure connection • End-to-end encrypted • 24/7 monitoring
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 TODO Dash. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}