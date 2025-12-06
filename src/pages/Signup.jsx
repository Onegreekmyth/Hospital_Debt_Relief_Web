import React from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F7F5FF] flex items-center justify-center px-4 md:px-6 py-4 md:py-6">
      <div className="w-full max-w-xl bg-white rounded-[36px] border border-purple-200/70 shadow-[0_18px_60px_rgba(82,37,205,0.08)] px-6 md:px-8 lg:px-10 py-6 md:py-8">
        {/* Heading */}
        <h1 className="text-[24px] md:text-[30px] lg:text-[32px] font-semibold text-[#4B24C7] mb-6 text-center tracking-[0.04em]">
          Create Account <span className="font-bold">“LOGO”</span>
        </h1>

        {/* Form */}
        <form
          className="space-y-4 md:space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/otp-verification", { state: { from: "signup" } });
          }}
        >
          {/* Name Field */}
          <div className="relative pt-2">
            <div className="absolute -top-3 left-6 bg-white px-2 py-0.5 rounded-b-md">
              <span className="text-xs md:text-[13px] font-medium text-gray-900">
                Name
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-purple-200 bg-white px-3.5 md:px-4 py-2 md:py-3">
              <div className="flex items-center justify-center text-[#C9B6FF]">
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
                    d="M5.121 17.804A9 9 0 1118.88 7.5M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="flex-1 border-none bg-transparent text-sm md:text-[15px] text-gray-800 placeholder-[#D3C2FF] focus:outline-none focus:ring-0 py-0.5"
                placeholder="First & last name"
              />
            </div>
          </div>

          {/* Number Field */}
          <div className="relative pt-2">
            <div className="absolute -top-3 left-6 bg-white px-2 py-0.5 rounded-b-md">
              <span className="text-xs md:text-[13px] font-medium text-gray-900">
                Number
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-purple-200 bg-white px-3.5 md:px-4 py-2 md:py-3">
              <div className="flex items-center justify-center text-[#C9B6FF]">
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
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <input
                type="tel"
                className="flex-1 border-none bg-transparent text-sm md:text-[15px] text-gray-800 placeholder-[#D3C2FF] focus:outline-none focus:ring-0 py-0.5"
                placeholder="Enter your mobile number"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="relative pt-2">
            <div className="absolute -top-3 left-6 bg-white px-2 py-0.5 rounded-b-md">
              <span className="text-xs md:text-[13px] font-medium text-gray-900">
                Email
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-purple-200 bg-white px-3.5 md:px-4 py-2 md:py-3 md:mb-5">
              <div className="flex items-center justify-center text-[#C9B6FF]">
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
                className="flex-1 border-none bg-transparent text-sm md:text-[15px] text-gray-800 placeholder-[#D3C2FF] focus:outline-none focus:ring-0 py-0.5"
                placeholder="Enter your email address"
              />
            </div>
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            className="w-full h-11 md:h-12 rounded-full bg-gradient-to-r from-[#6C3BFF] via-[#5B2BE4] to-[#1A0B40] text-white text-sm md:text-[15px] font-semibold hover:from-[#7442FF] hover:via-[#5B2BE4] hover:to-[#241055] transition shadow-[0_14px_28px_rgba(76,39,191,0.35)] mt-5 md:mt-5"
          >
            Continue
          </button>
        </form>

        {/* Legal Text */}
        <p className="mt-4 md:mt-5 text-start text-[11px] md:text-[13px] text-gray-600 leading-relaxed">
          By continuing, you agree to our{" "}
          <a href="#" className="text-purple-700 hover:text-purple-800 font-medium underline underline-offset-2">
            Terms of Service
          </a>{" "}
          and our{" "}
          <a href="#" className="text-purple-700 hover:text-purple-800 font-medium underline underline-offset-2">
            Privacy Policy
          </a>
          .
        </p>

        {/* Login Link */}
        <p className="mt-3 md:mt-4 text-start text-sm md:text-[15px] text-[#4B24C7]">
          Already have an account?{" "}
          <a href="/login" className="font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;