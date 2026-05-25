"use client";

import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { AppData } from "../../context/AppContext";
import { redirect } from "next/navigation";
import Loading from "../../components/loading";
import Logo from "../../components/logo";

const LoginPage = () => {
  const { isAuth, setIsAuth, setUser, fetchPurchasedCodes, loading } =
    AppData();

  const [apploading, setappLoading] = useState(false);

  if (isAuth) return redirect("/");
  const handleGoogleLogin = async (authResult) => {
    setappLoading(true);
    try {
      const result = await axios.post(`/api/login`, {
        code: authResult["code"],
      });

      Cookies.set("token", result.data.token, {
        expires: 90,
        secure: true,
        path: "/",
      });
      toast.success(result.data.message);
      setUser(result.data.user);
      setIsAuth(true);
      setTimeout(() => {
        fetchPurchasedCodes();
      }, 4000);
    } catch (error) {
      console.log("error", error);
      toast.error("Problem while login you");
    } finally {
      setappLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleLogin,
    onError: handleGoogleLogin,
    flow: "auth-code",
  });

  if (loading) {
    return <Loading />;
  }

  if (apploading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4 sm:p-6">
      {/* Background Effects */}
      <div className="absolute top-10 right-10 sm:top-20 sm:right-20 w-32 h-32 sm:w-72 sm:h-72 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 sm:bottom-20 sm:left-20 w-48 h-48 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl" />

      {/* Login Card */}
      <div className="relative w-full max-w-md mx-auto">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-[40px] m-auto ">
              <Logo logo={true} />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-sm sm:text-base text-gray-300">
              Sign in to your RS-HUB account
            </p>
          </div>

          {/* Google Login Button */}
          <button
            onClick={googleLogin}
            className="w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold py-2.5 sm:py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 sm:space-x-3 mb-4 sm:mb-6 shadow-lg hover:shadow-xl transform hover:scale-[1.02] text-sm sm:text-base cursor-pointer"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
