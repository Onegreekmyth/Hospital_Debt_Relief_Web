import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OTPVerification = () => {
  const location = useLocation();
  const from = location.state?.from;
  const isFromLogin = from === "login";
  const buttonLabel = isFromLogin ? "Login" : "Create Account";

  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F8F8FC] flex items-center justify-center px-4 md:px-6 py-8 md:py-12">
      <div className="w-full max-w-xl bg-white rounded-2xl md:rounded-3xl border-2 border-purple-200/60 shadow-xl p-6 md:p-8 lg:p-12">
        {/* Email Icon */}
        <div className="flex justify-center mb-6 md:mb-8">
          <div className="relative">
            {/* Envelope */}
            <svg width="100" height="80" viewBox="0 0 120 100" className="drop-shadow-lg md:w-[120px] md:h-[100px]">
              {/* Envelope body - orange */}
              <path
                d="M10 30 L60 60 L110 30 L110 80 L10 80 Z"
                fill="#FF9933"
                stroke="#FF9933"
                strokeWidth="1"
              />
              {/* Envelope flap - lighter orange */}
              <path
                d="M10 30 L60 60 L110 30 L60 10 Z"
                fill="#FFB366"
                stroke="#FFB366"
                strokeWidth="1"
              />
              {/* Document/Letter - white with pinkish top */}
              <rect x="25" y="45" width="70" height="30" rx="2" fill="#FFFFFF" />
              <rect x="25" y="45" width="70" height="8" rx="2" fill="#FFCCCC" />
              {/* Green circle with checkmark */}
              <circle cx="60" cy="60" r="12" fill="#66CC99" />
              <path
                d="M55 60 L58 63 L65 56"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
        </div>

        {/* Label */}
        <p className="text-center text-[14px] md:text-[16px] lg:text-[18px] text-gray-800 mb-4 md:mb-6 font-medium px-2">
          Enter code sent to your email
        </p>

        {/* OTP Input Field */}
        <div className="mb-6 md:mb-8">
          <div className="relative">
            <svg
              className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400"
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
              type="text"
              maxLength="4"
              className="w-full h-12 md:h-14 rounded-full border border-gray-200 bg-white pl-10 md:pl-12 pr-4 md:pr-6 text-center text-xl md:text-2xl font-semibold tracking-widest text-gray-400 placeholder:text-left placeholder:text-xs md:placeholder:text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
              placeholder="****"
            />
          </div>
        </div>

        {/* Primary Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full h-12 md:h-14 rounded-full bg-gradient-to-r from-[#5225cd] to-[#2e156f] text-white text-[16px] md:text-[18px] font-bold hover:from-[#7B2CAA] hover:to-[#5A1F9C] transition shadow-lg"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default OTPVerification;