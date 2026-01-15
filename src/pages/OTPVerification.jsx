import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

const OTPVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from;
  const email = location.state?.email || location.state?.userData?.email;
  const isFromLogin = from === "login";
  const buttonLabel = isFromLogin ? "Login" : "Create Account";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(60); // 60 seconds countdown
  const [canResend, setCanResend] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  // Focus first input on mount
  useEffect(() => {
    const firstInput = document.getElementById("otp-0");
    if (firstInput) {
      firstInput.focus();
    }
  }, []);

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take last character
    setOtp(newOtp);
    setError("");

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      setError("");
      // Focus last input
      const lastInput = document.getElementById("otp-5");
      if (lastInput) {
        lastInput.focus();
      }
    }
  };

  // Verify OTP
  const handleVerify = async () => {
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    if (!email) {
      setError("Email not found. Please try again.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axiosClient.post("/auth/verify-otp", {
        email,
        otpCode,
      });

      if (response.data.success) {
        // Store user data and token
        localStorage.setItem("user", JSON.stringify(response.data.data));
        localStorage.setItem("token", response.data.token); // Store JWT token
        localStorage.setItem("isAuthenticated", "true");

        // Navigate to dashboard
        navigate("/dashboard");
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Invalid OTP. Please try again.";
      setError(message);

      // Clear OTP on error
      setOtp(["", "", "", "", "", ""]);
      const firstInput = document.getElementById("otp-0");
      if (firstInput) {
        firstInput.focus();
      }
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    if (!email) {
      setError("Email not found. Please try again.");
      return;
    }

    setResendLoading(true);
    setError("");

    try {
      await axiosClient.post("/auth/resend-otp", { email });

      // Reset timer and OTP
      setTimer(60);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      setError("");

      // Focus first input
      const firstInput = document.getElementById("otp-0");
      if (firstInput) {
        firstInput.focus();
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to resend OTP. Please try again.";
      setError(message);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8FC] flex items-center justify-center px-3 sm:px-4 md:px-6 py-6 md:py-12">
      <div className="w-full max-w-xl bg-white rounded-2xl md:rounded-3xl border-2 border-purple-200/60 shadow-xl p-4 sm:p-6 md:p-8 lg:p-12">
        {/* Email Icon */}
        <div className="flex justify-center mb-6 md:mb-8">
          <div className="relative">
            {/* Envelope */}
            <svg
              width="100"
              height="80"
              viewBox="0 0 120 100"
              className="drop-shadow-lg md:w-[120px] md:h-[100px]"
            >
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
              <rect
                x="25"
                y="45"
                width="70"
                height="30"
                rx="2"
                fill="#FFFFFF"
              />
              <rect
                x="25"
                y="45"
                width="70"
                height="8"
                rx="2"
                fill="#FFCCCC"
              />
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
        <p className="text-center text-[16px] md:text-[18px] lg:text-[20px] text-gray-800 mb-2 md:mb-3 font-medium px-2">
          Enter code sent to your email
        </p>
        {email && (
          <p className="text-center text-[14px] md:text-[15px] text-gray-600 mb-4 md:mb-6 px-2">
            {email}
          </p>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 md:mb-6 p-3 rounded-lg bg-red-50 border border-red-200">
            <p className="text-sm text-red-600 text-center">{error}</p>
          </div>
        )}

        {/* OTP Input Fields */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg border-2 border-gray-300 bg-white text-center text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
              />
            ))}
          </div>
        </div>

        {/* Resend OTP */}
        <div className="mb-6 md:mb-8 text-center">
          {canResend ? (
            <button
              type="button"
              onClick={handleResend}
              disabled={resendLoading}
              className="text-purple-700 hover:text-purple-800 font-medium text-sm md:text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {resendLoading ? "Sending..." : "Resend Code"}
            </button>
          ) : (
            <p className="text-gray-600 text-sm md:text-base">
              Resend code in {timer}s
            </p>
          )}
        </div>

        {/* Primary Button */}
        <button
          type="button"
          onClick={handleVerify}
          disabled={loading || otp.join("").length !== 6}
          className="w-full h-12 md:h-14 rounded-full bg-gradient-to-r from-[#5225cd] to-[#2e156f] text-white text-[16px] md:text-[18px] font-bold hover:from-[#7B2CAA] hover:to-[#5A1F9C] transition shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Verifying..." : buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default OTPVerification;
