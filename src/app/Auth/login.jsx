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
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9ff]">
      <div className="w-full max-w-[420px] bg-white rounded-[24px] p-8 mx-4 border border-blue-400">
        <h1 className="text-[32px] font-bold text-center mb-8">Welcome</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              placeholder="Number"
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="relative">
            <KeyRound className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="text-[24px] font-semibold">Sign in</div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                className="text-sm font-semibold text-gray-600 hover:text-gray-800"
              >
                Forget Password
              </button>

              <button
                type="submit"
                className="bg-[#4c7bff] hover:bg-blue-600 text-white p-3 rounded-full transition-colors flex items-center justify-center"
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
