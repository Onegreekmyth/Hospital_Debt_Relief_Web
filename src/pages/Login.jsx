import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F7F5FF] flex items-center justify-center px-4 md:px-6 py-4 md:py-6">
      <div className="w-full max-w-xl bg-white rounded-[36px] border border-purple-200/70 shadow-[0_18px_60px_rgba(82,37,205,0.08)] px-6 md:px-8 lg:px-10 py-10 md:py-14 min-h-[400px] md:min-h-[560px]">
        {/* Heading */}
        <h1 className="text-[28px] md:text-[36px] lg:text-[40px] font-semibold text-[#4B24C7] mb-8 text-center tracking-[0.04em]">
          Login <span className="font-bold">“LOGO”</span>
        </h1>

        {/* Form */}
        <form className="space-y-5">
          {/* Email Field */}
          <div className="flex flex-col gap-1">
            <span className="text-sm md:text-[15px] font-medium text-gray-900 text-left">
              Email
            </span>
            <div className="flex items-center gap-3 rounded-full border border-purple-200 bg-white px-4 md:px-5 py-2.5 md:py-4 md:mb-5">
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
                placeholder="email@gmail.com"
              />
            </div>
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            className="w-full h-11 md:h-12 rounded-full bg-gradient-to-r from-[#6C3BFF] via-[#5B2BE4] to-[#1A0B40] text-white text-sm md:text-[15px] font-semibold hover:from-[#7442FF] hover:via-[#5B2BE4] hover:to-[#241055] transition shadow-[0_16px_32px_rgba(76,39,191,0.35)] mt-6"
          >
            Continue
          </button>
        </form>

        {/* Legal Text */}
        <p className="mt-8 text-center text-[11px] md:text-[13px] text-gray-600 leading-relaxed">
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
      </div>
    </div>
  );
};

export default Login;


