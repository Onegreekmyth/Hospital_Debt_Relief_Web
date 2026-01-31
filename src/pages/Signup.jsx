import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import primaryLogo from "../assets/primary-logo.png";
import { register } from "../store/user/userSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrorMessage("");

    const eligibilityRequestId = localStorage.getItem("pendingEligibilityRequestId");

    dispatch(
      register({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        eligibilityRequestId: eligibilityRequestId || undefined,
      })
    )
      .unwrap()
      .then((userData) => {
        localStorage.removeItem("pendingEligibilityRequestId");
        navigate("/otp-verification", {
          state: {
            from: "signup",
            email: formData.email.trim(),
            userData,
          },
        });
      })
      .catch((err) => {
        const message =
          typeof err === "string"
            ? err
            : err?.message || "Failed to create account. Please try again.";
        setErrorMessage(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F7F5FF] flex items-center justify-center px-4 md:px-6 py-4 md:py-6">
      <div className="w-full max-w-xl bg-white rounded-[36px] border border-purple-200/70 shadow-[0_18px_60px_rgba(82,37,205,0.08)] px-6 md:px-8 lg:px-10 py-6 md:py-8">
        {/* Heading: Welcome to + logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <h1 className="text-[24px] md:text-[30px] lg:text-[32px] font-semibold text-[#4B24C7] tracking-[0.04em]">
            Welcome to
          </h1>
          <img
            src={primaryLogo}
            alt="Medical Financial Freedom"
            className="h-7 md:h-8 lg:h-9"
          />
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
            <p className="text-sm text-red-600">{errorMessage}</p>
          </div>
        )}

        {/* Form */}
        <form className="space-y-4 md:space-y-5" onSubmit={handleSubmit}>
          {/* First Name & Last Name - side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div className="relative pt-2">
              <div className="absolute -top-3 left-6 bg-white px-2 py-0.5 rounded-b-md">
                <span className="text-xs md:text-[13px] font-medium text-gray-900">
                  First Name
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-full border border-purple-200 bg-white px-3.5 md:px-4 py-3 md:py-4">
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="flex-1 min-w-0 border-none bg-transparent text-sm md:text-[15px] text-gray-800 placeholder-[#D3C2FF] focus:outline-none focus:ring-0 py-0.5"
                  placeholder="First name"
                />
              </div>
              {errors.firstName && (
                <p className="text-xs text-red-600 mt-1 ml-6">{errors.firstName}</p>
              )}
            </div>
            <div className="relative pt-2">
              <div className="absolute -top-3 left-6 bg-white px-2 py-0.5 rounded-b-md">
                <span className="text-xs md:text-[13px] font-medium text-gray-900">
                  Last Name
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-full border border-purple-200 bg-white px-3.5 md:px-4 py-3 md:py-4">
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="flex-1 min-w-0 border-none bg-transparent text-sm md:text-[15px] text-gray-800 placeholder-[#D3C2FF] focus:outline-none focus:ring-0 py-0.5"
                  placeholder="Last name"
                />
              </div>
              {errors.lastName && (
                <p className="text-xs text-red-600 mt-1 ml-6">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Phone Number */}
          <div className="relative pt-2">
            <div className="absolute -top-3 left-6 bg-white px-2 py-0.5 rounded-b-md">
              <span className="text-xs md:text-[13px] font-medium text-gray-900">
                Phone Number
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-purple-200 bg-white px-3.5 md:px-4 py-3 md:py-4">
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
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="flex-1 border-none bg-transparent text-sm md:text-[15px] text-gray-800 placeholder-[#D3C2FF] focus:outline-none focus:ring-0 py-0.5"
                placeholder="Enter phone number"
              />
            </div>
            {errors.phone && (
              <p className="text-xs text-red-600 mt-1 ml-6">{errors.phone}</p>
            )}
          </div>

          {/* Email */}
          <div className="relative pt-2">
            <div className="absolute -top-3 left-6 bg-white px-2 py-0.5 rounded-b-md">
              <span className="text-xs md:text-[13px] font-medium text-gray-900">
                Email
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-purple-200 bg-white px-3.5 md:px-4 py-3 md:py-4">
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
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="flex-1 border-none bg-transparent text-sm md:text-[15px] text-gray-800 placeholder-[#D3C2FF] focus:outline-none focus:ring-0 py-0.5"
                placeholder="email@gmail.com"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-600 mt-1 ml-6">{errors.email}</p>
            )}
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 md:h-12 rounded-full bg-gradient-to-r from-[#6C3BFF] via-[#5B2BE4] to-[#1A0B40] text-white text-sm md:text-[15px] font-semibold hover:from-[#7442FF] hover:via-[#5B2BE4] hover:to-[#241055] transition shadow-[0_14px_28px_rgba(76,39,191,0.35)] mt-5 md:mt-5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Continue"}
          </button>
        </form>

        {/* Legal Text */}
        <p className="mt-4 md:mt-5 text-center text-[11px] md:text-[13px] text-gray-600 leading-relaxed">
          By continuing, you agree to our{" "}
          <Link to="/terms-and-conditions" className="text-purple-700 hover:text-purple-800 font-medium underline underline-offset-2">
            Terms of Service
          </Link>{" "}
          and our{" "}
          <Link to="/privacy-policy" className="text-purple-700 hover:text-purple-800 font-medium underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </p>

        {/* Login Link - bottom of card */}
        <p className="mt-4 md:mt-5 text-center text-sm md:text-[15px] text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-[#4B24C7] font-semibold hover:underline underline-offset-2">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;