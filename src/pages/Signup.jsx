import React from "react";

const Signup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F7F5FF] flex items-center justify-center px-4 md:px-6 py-8 md:py-12">
      <div className="w-full max-w-xl bg-white rounded-2xl md:rounded-3xl border-2 border-purple-200/60 shadow-xl p-6 md:p-8 lg:p-12">
        {/* Heading */}
        <h1 className="text-[28px] md:text-[36px] lg:text-[40px] font-extrabold text-[#5225cd] mb-6 md:mb-10 text-center tracking-[0.64px]">
          Welcome to LOGO
        </h1>

        {/* Form */}
        <form className="space-y-4 md:space-y-6">
          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-medium text-gray-700">Email</label>
            <div className="relative">
              <svg
                className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-purple-400"
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
              <input
                type="email"
                className="w-full h-12 md:h-14 rounded-full border border-purple-300/50 bg-white pl-10 md:pl-12 pr-4 md:pr-6 text-sm md:text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
                placeholder="email@gmail.com"
              />
            </div>
          </div>

          {/* Phone Number Field */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-medium text-gray-700">Phone Number</label>
            <div className="relative">
              <svg
                className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-purple-400"
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
              <input
                type="tel"
                className="w-full h-12 md:h-14 rounded-full border border-purple-300/50 bg-white pl-10 md:pl-12 pr-4 md:pr-6 text-sm md:text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
                placeholder="+92**********"
              />
            </div>
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            className="w-full h-12 md:h-14 rounded-full bg-gradient-to-r from-[#5225cd] to-[#2e156f] text-white text-sm md:text-base font-semibold hover:from-purple-700 hover:to-indigo-800 transition shadow-lg mt-6 md:mt-8"
          >
            Continue
          </button>
        </form>

        {/* Legal Text */}
        <p className="mt-6 md:mt-8 text-center text-[10px] md:text-xs text-gray-600 px-2">
          By continuing, you agree to{" "}
          <a href="#" className="text-purple-700 hover:text-purple-800 font-medium">
            Terms of Service
          </a>{" "}
          and our{" "}
          <a href="#" className="text-purple-700 hover:text-purple-800 font-medium">
            Privacy Policy
          </a>
          .
        </p>

        {/* Login Link */}
        <p className="mt-4 md:mt-6 text-center text-sm md:text-base text-[#6B46C1]">
          Already have an account?{" "}
          <a href="#" className="font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;