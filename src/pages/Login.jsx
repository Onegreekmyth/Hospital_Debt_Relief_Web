import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import primaryLogo from "../assets/primary-logo.png";
import axiosClient from "../api/axiosClient";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axiosClient.post("/auth/send-otp", { email: email.trim() });

      if (response.data?.success === false) {
        const message =
          response.data?.message ||
          response.data?.error ||
          "No account found with this email. Please sign up first.";
        setError(message);
        setLoading(false);
        return;
      }

      navigate("/otp-verification", {
        state: {
          from: "login",
          email: email.trim(),
        },
      });
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Failed to send OTP. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen min-h-[100dvh] bg-gradient-to-b from-white to-[#F7F5FF] flex items-center justify-center px-3 sm:px-4 md:px-6 py-4 md:py-6 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] overflow-y-auto">
      <div className="w-full max-w-xl bg-white rounded-2xl sm:rounded-[28px] md:rounded-[36px] border border-purple-200/70 shadow-[0_18px_60px_rgba(82,37,205,0.08)] px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-10 md:py-14 min-h-0 my-4 sm:my-0">
        {/* Logo + Heading inline */}
        <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
          <h1 className="text-[22px] sm:text-[24px] md:text-[32px] lg:text-[36px] font-semibold text-[#4B24C7] tracking-[0.04em]">
            Login
          </h1>
          <img
            src={primaryLogo}
            alt="2026 Hospital Debt Relief"
            className="h-6 sm:h-7 md:h-8 lg:h-9"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-3 sm:mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
            <p className="text-xs sm:text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Form */}
        <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="relative pt-2">
            <div className="absolute -top-3 left-4 sm:left-6 bg-white px-2 py-0.5 rounded-b-md">
              <span className="text-xs md:text-[13px] font-medium text-gray-900">
                Email
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-purple-200 bg-white px-4 md:px-5 py-3 sm:py-2.5 md:py-4">
              <div className="flex items-center justify-center text-[#C9B6FF] shrink-0">
                <svg
                  className="w-4 h-4 md:w-5 md:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 min-w-0 border-none bg-transparent text-sm md:text-[15px] text-gray-800 placeholder-[#D3C2FF] focus:outline-none focus:ring-0 py-0.5"
                placeholder="email@gmail.com"
                autoComplete="email"
              />
            </div>
          </div>

          {/* Continue Button - touch-friendly min height */}
          <button
            type="submit"
            disabled={loading}
            className="w-full min-h-[44px] sm:h-11 md:h-12 rounded-full bg-gradient-to-r from-[#6C3BFF] via-[#5B2BE4] to-[#1A0B40] text-white text-sm md:text-[15px] font-semibold hover:from-[#7442FF] hover:via-[#5B2BE4] hover:to-[#241055] transition shadow-[0_16px_32px_rgba(76,39,191,0.35)] mt-4 sm:mt-6 disabled:opacity-60 disabled:cursor-not-allowed active:opacity-90"
          >
            {loading ? "Sending OTP..." : "Continue"}
          </button>
        </form>

        {/* Legal Text */}
        <p className="mt-6 sm:mt-8 text-center text-[11px] sm:text-[12px] md:text-[13px] text-gray-600 leading-relaxed px-1">
          By continuing, you agree to our{" "}
          <a
            href="#"
            className="text-purple-700 hover:text-purple-800 font-medium underline underline-offset-2"
          >
            Terms of Service
          </a>{" "}
          and our{" "}
          <a
            href="#"
            className="text-purple-700 hover:text-purple-800 font-medium underline underline-offset-2"
          >
            Privacy Policy
          </a>
          .
        </p>

        {/* No account - Savings Calculator CTA */}
        <p className="mt-3 sm:mt-4 md:mt-5 text-center text-xs sm:text-sm md:text-[15px] text-gray-700 px-1">
          Don&apos;t have an Account?{" "}
          <Link to="/" className="text-[#4B24C7] font-semibold hover:underline underline-offset-2">
            Visit our Savings Calculator to determine eligibility.
          </Link>
        </p>

        {/* Back to Home - bottom of card */}
        <div className="mt-4 sm:mt-6 flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-[#F7F5FF]/80 px-4 py-2.5 sm:py-2 min-h-[44px] sm:min-h-0 text-[13px] md:text-[14px] font-medium text-[#4B24C7] hover:bg-purple-50 hover:border-purple-300 transition-colors justify-center"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;


