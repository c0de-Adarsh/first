"use client";

import { KeyRound, ArrowRight, Phone, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { loginUser } from "@/redux/userActions";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  const [userData, setUserData] = useState({
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(userData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/modules");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-white p-4">
      <div className="w-full max-w-[420px] bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-2 border-blue-200 transform transition-all duration-300">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-blue-900">
            Welcome Back
          </h1>
          <p className="mt-2 text-gray-900 font-medium">Sign in to continue </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-700 h-5 w-5 transition-colors" />
            <input
              type="text"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-blue-200 bg-white text-gray-900 placeholder:text-gray-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 hover:border-blue-300"
              required
            />
          </div>

          <div className="relative group">
            <KeyRound className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-700 h-5 w-5 transition-colors" />
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-blue-200 bg-white text-gray-900 placeholder:text-gray-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 hover:border-blue-300"
              required
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="text-2xl font-bold text-blue-900">
              Sign in
            </div>

            <div className="flex items-center gap-6">
              <button
                type="button"
                className="text-sm font-semibold text-blue-800 hover:text-blue-900 transition-colors"
              >
                Forgot Password?
              </button>

              <button
                type="submit"
                className="bg-blue-800 hover:bg-blue-900 text-white p-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-blue-300/50"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <ArrowRight className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </form>

      
      </div>
    </div>
  );
}