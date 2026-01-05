import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";
import { Rocket, UserPlus, User, Mail, Lock, Shield, Sparkles } from "lucide-react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/register", { name, email, password });
      login(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-gray-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-900/10 transition-all duration-500">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <div className="w-12 h-12 bg-linear-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Rocket className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-4xl font-black bg-linear-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
                TODO DASH
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wider">Join Task Control</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="h-4 w-4 text-emerald-500" />
            <p className="text-sm text-gray-600 dark:text-gray-300">Start your productivity journey</p>
            <Sparkles className="h-4 w-4 text-emerald-500" />
          </div>
        </div>

        {/* Register Form */}
        <div className="bg-linear-to-br from-white/90 to-emerald-50/90 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-sm p-8 rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-linear-to-r from-emerald-500 to-green-500 flex items-center justify-center">
              <UserPlus className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-linear-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
              Create Account
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name
                </div>
              </label>
              <div className="relative">
                <input
                  className="w-full p-4 pl-12 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-300/50 dark:border-gray-600/50 focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>

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
                  className="w-full p-4 pl-12 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-300/50 dark:border-gray-600/50 focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
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
                  className="w-full p-4 pl-12 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-300/50 dark:border-gray-600/50 focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                  type="password"
                  placeholder="Create a secure password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Minimum 8 characters with letters and numbers
              </p>
            </div>

            {/* Security Note */}
            <div className="mb-6 p-4 rounded-xl bg-linear-to-r from-emerald-500/10 to-green-500/10 border border-emerald-200/50 dark:border-emerald-800/50">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-emerald-500 mt-0.5" />
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Your data is protected with enterprise-grade encryption and security protocols.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="group relative w-full px-6 py-4 rounded-xl bg-linear-to-r from-emerald-600 to-green-600 text-white font-bold hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <UserPlus className="h-5 w-5" />
                Launch Your Account
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gray-300/50 dark:bg-gray-600/50"></div>
            <span className="px-4 text-sm text-gray-500 dark:text-gray-400 font-medium">ALREADY HAVE ACCESS?</span>
            <div className="flex-1 h-px bg-gray-300/50 dark:bg-gray-600/50"></div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <Link
              to="/login"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105"
            >
              <User className="h-4 w-4" />
              Return to Login
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
            </Link>
          </div>

          {/* Benefits */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-linear-to-r from-blue-500/5 to-cyan-500/5 border border-gray-200/30 dark:border-gray-700/30">
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 text-center">
                🚀 AI-Powered Tasks
              </p>
            </div>
            <div className="p-3 rounded-xl bg-linear-to-r from-purple-500/5 to-pink-500/5 border border-gray-200/30 dark:border-gray-700/30">
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 text-center">
                📊 Real-time Analytics
              </p>
            </div>
            <div className="p-3 rounded-xl bg-linear-to-r from-emerald-500/5 to-green-500/5 border border-gray-200/30 dark:border-gray-700/30">
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 text-center">
                🔒 Bank-level Security
              </p>
            </div>
            <div className="p-3 rounded-xl bg-linear-to-r from-amber-500/5 to-orange-500/5 border border-gray-200/30 dark:border-gray-700/30">
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 text-center">
                ⚡ Instant Setup
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            By joining, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}