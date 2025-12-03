import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SubmissionModal from "../components/SubmissionModal";
import BillInformationModal from "../components/BillInformationModal";
import SubscriptionModal from "../components/SubscriptionModal";
import AddFamilyMembersModal from "../components/AddFamilyMembersModal";
import ApplicationModal from "../components/ApplicationModal";
import uploadImg from "../assets/upload-img.png";
import rightArrow from "../assets/right-arrow.png";

const Dashboard = () => {
  const [isContactInfoOpen, setIsContactInfoOpen] = useState(false);
  const [isFamilyMembersOpen, setIsFamilyMembersOpen] = useState(false);
  const [isFamilyListOpen, setIsFamilyListOpen] = useState(false);
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isAddFamilyModalOpen, setIsAddFamilyModalOpen] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  // High-level onboarding and eligibility state (placeholder for backend data)
  const [subscriptionStatus, setSubscriptionStatus] = useState("active"); // "inactive" | "active"
  const [subscriptionTier, setSubscriptionTier] = useState(null); // "7" | "14" | "21" | null
  const [subscriptionDate, setSubscriptionDate] = useState("10/28/2025");
  const [eligibilityStatus, setEligibilityStatus] = useState("eligible"); // "eligible" | "ineligible"
  const [discountPercentage, setDiscountPercentage] = useState(40); // Example: calculated by backend

  // Disable scrolling when any modal is open
  useEffect(() => {
    if (
      isBillModalOpen ||
      isSubmissionModalOpen ||
      isSubscriptionModalOpen ||
      isAddFamilyModalOpen ||
      isApplicationModalOpen
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to restore scrolling
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [
    isBillModalOpen,
    isSubmissionModalOpen,
    isSubscriptionModalOpen,
    isAddFamilyModalOpen,
    isApplicationModalOpen,
  ]);

  const familyMembersListed = [
    { id: 1, label: "Account Holder", value: "John Doe" },
    { id: 2, label: "Family Member", value: "Spouse" },
    { id: 3, label: "Family Member", value: "Child" },
    { id: 4, label: "Family Member", value: "Child" },
    { id: 5, label: "Family Member", value: "Child" },
  ];

  const householdCount = familyMembersListed.length;

  const getSubscriptionInfoForHousehold = (count) => {
    if (count <= 3) {
      return {
        price: "7.00",
        tier: "7",
        type: "Household Subscription for a Family Size of up to 3 People",
      };
    }
    if (count <= 6) {
      return {
        price: "14.00",
        tier: "14",
        type: "Household Subscription for a Family Size of 4 to 6 People",
      };
    }
    return {
      price: "21.00",
      tier: "21",
      type: "Household Subscription for a Family Size of 6 or More People",
    };
  };

  const subscriptionInfo = getSubscriptionInfoForHousehold(householdCount);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onOpenAddFamilyMembers={() => setIsAddFamilyModalOpen(true)} />

      <div className="w-[92%] md:w-[92%] mx-auto px-4 md:px-6 lg:px-10 py-6 md:py-8 pt-20 md:pt-24 mt-12 md:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_0.6fr] gap-8 md:gap-16 lg:gap-32">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Contact Info Section */}
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
              <button
                onClick={() => setIsContactInfoOpen(!isContactInfoOpen)}
                className="w-full flex items-center justify-between px-4 md:px-6 py-4 md:py-5 text-left"
              >
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Account Profile</h2>
                <svg
                  className={`w-5 h-5 text-gray-600 transition-transform ${isContactInfoOpen ? '' : 'rotate-180'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>

              {isContactInfoOpen && (
                <div className="px-4 md:px-6 pb-4 md:pb-6 space-y-3 md:space-y-4">
                  {/* First Name and Second Name in a row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    {/* First Name */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-medium text-gray-500">
                        First Name
                      </label>
                      <div className="relative">
                        <svg
                          className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <input
                          type="text"
                          className="w-full h-12 rounded-full border border-gray-300 bg-white pl-12 pr-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
                          placeholder="john"
                        />
                      </div>
                    </div>

                    {/* Second Name */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-medium text-gray-500">
                        Last Name
                      </label>
                      <div className="relative">
                        <svg
                          className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <input
                          type="text"
                          className="w-full h-11 md:h-12 rounded-full border border-gray-300 bg-white pl-10 md:pl-12 pr-3 md:pr-4 text-sm md:text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
                          placeholder="Thomas"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-gray-500">
                      Mailing Address
                    </label>
                    <div className="relative">
                      <svg
                        className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <input
                        type="text"
                        className="w-full h-11 md:h-12 rounded-full border border-gray-300 bg-white pl-10 md:pl-12 pr-3 md:pr-4 text-sm md:text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
                        placeholder="address"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-gray-500">
                      Email
                    </label>
                    <div className="relative">
                      <svg
                        className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <input
                        type="email"
                        className="w-full h-11 md:h-12 rounded-full border border-gray-300 bg-white pl-10 md:pl-12 pr-3 md:pr-4 text-sm md:text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
                        placeholder="email@gmail.com"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-gray-500">
                      Phone Number
                    </label>
                    <div className="relative">
                      <svg
                        className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <input
                        type="tel"
                        className="w-full h-11 md:h-12 rounded-full border border-gray-300 bg-white pl-10 md:pl-12 pr-3 md:pr-4 text-sm md:text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
                        placeholder="+92************"
                      />
                    </div>
                  </div>

                  {/* Annual Household Income */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-gray-500">
                      Annual Household Income
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm md:text-base">$</span>
                      <input
                        type="number"
                        className="w-full h-11 md:h-12 rounded-full border border-gray-300 bg-white pl-8 md:pl-10 pr-3 md:pr-4 text-sm md:text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
                        placeholder="Enter amount"
                      />
                    </div>
                  </div>


                </div>
              )}
            </div>

            {/* Family Members Listed Section */}
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
              <button
                onClick={() => setIsFamilyListOpen(!isFamilyListOpen)}
                className="w-full flex items-center justify-between px-4 md:px-6 py-4 md:py-5 text-left"
              >
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
                  Family Members Listed
                </h2>
                <svg
                  className={`w-5 h-5 text-gray-600 transition-transform ${isFamilyListOpen ? "" : "rotate-180"
                    }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </button>

              {isFamilyListOpen && (
                <div className="px-4 md:px-6 pb-4 md:pb-6 space-y-3 md:space-y-4">
                  {familyMembersListed.map((member, index) => (
                    <div
                      key={member.id || index}
                      className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4"
                    >
                      <div className="flex-1 flex items-center gap-4 rounded-full border border-purple-200 bg-white px-4 md:px-5 py-2 md:py-3">
                        <div className="flex items-center justify-center text-gray-300">
                          <svg
                            className="w-5 h-5 md:w-6 md:h-6"
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
                        <div className="flex flex-col">
                          <span className="text-xs md:text-sm font-medium text-purple-900">
                            {member.label}
                          </span>
                          <span className="text-sm md:text-base text-gray-600">
                            {member.value}
                          </span>
                        </div>
                      </div>

                      {member.label !== "Account Holder" && (
                        <div className="flex gap-2 self-start md:self-center">
                          <button
                            type="button"
                            className="p-2 rounded-full border border-purple-200 text-purple-700 bg-white hover:bg-purple-50 transition"
                            aria-label="Edit family member"
                          >
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
                                d="M15.232 5.232l3.536 3.536M4 20h4l9.268-9.268a2 2 0 000-2.828l-2.172-2.172a2 2 0 00-2.828 0L4 16v4z"
                              />
                            </svg>
                          </button>
                          <button
                            type="button"
                            className="p-2 rounded-full border border-red-200 text-red-600 bg-white hover:bg-red-50 transition"
                            aria-label="Delete family member"
                          >
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
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2m-9 0h10"
                              />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Eligibility & Savings Overview */}
            {/* <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-200 p-4 md:p-5">
              <div className="flex items-center justify-between gap-3 mb-3">
                <h3 className="text-base md:text-lg font-bold text-gray-900">
                  Eligibility & Savings Overview
                </h3>
                <span
                  className={`px-2 py-1 rounded-full text-[10px] md:text-xs font-medium ${
                    eligibilityStatus === "eligible"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {eligibilityStatus === "eligible" ? "Eligible" : "Temporarily Ineligible"}
                </span>
              </div>
              <p className="text-xs md:text-sm text-gray-700 mb-2">
                Based on your latest income and household details, you may qualify for:
              </p>
              <p className="text-2xl md:text-3xl font-extrabold text-purple-700 mb-2">
                {discountPercentage}% discount
              </p>
              <p className="text-[11px] md:text-xs text-gray-500">
                This percentage is calculated by our backend and may update whenever your income or
                family size changes. Your account stays active even if eligibility changes.
              </p>
              {eligibilityStatus === "ineligible" && (
                <p className="mt-2 text-[11px] md:text-xs text-red-600">
                  You are currently not eligible for discounted assistance. You can still review your
                  history and update your information at any time.
                </p>
              )}
            </div> */}

            {/* Hospital & Billing Card */}
            <div className="relative bg-white rounded-[32px] md:rounded-[40px] shadow-sm border border-gray-200 overflow-hidden">
              {/* Map */}
              <div
                className="relative bg-gray-100 overflow-hidden"
                style={{ height: "200px" }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.184132576782!2d-73.98784468459418!3d40.75889597932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae4e8!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Hospital Location Map"
                ></iframe>
              </div>

              {/* Overlapping hospital badge, centered and half over map */}
              <div className="absolute left-1/2 top-[200px] -translate-x-1/2 -translate-y-1/2">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#27b652] border-[6px] border-white flex items-center justify-center shadow-lg">
                  <div className="w-11 h-11 md:w-14 md:h-14 rounded-full bg-white flex items-center justify-center">
                    {/* Four-leaf clover icon */}
                    <svg
                      className="w-7 h-7 md:w-8 md:h-8 text-[#27b652]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2.75a3.25 3.25 0 0 1 3.25 3.25c0 .46-.1.9-.29 1.3a3.23 3.23 0 0 1 1.04-.18A3.25 3.25 0 1 1 12 10.37 3.25 3.25 0 1 1 8 7.12c.37 0 .72.06 1.05.18a3.22 3.22 0 0 1-.3-1.3A3.25 3.25 0 0 1 12 2.75Z" />
                      <path d="M11.25 11.5h1.5v7.25a.75.75 0 0 1-1.5 0V11.5Z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 md:px-8 pb-8 md:pb-9 pt-8 md:pt-9 bg-white justify-start">
                {/* Hospital Info */}
                <div className="flex flex-col items-center gap-1.5 md:gap-2 mb-6">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg md:text-xl font-semibold text-black">
                      Hospital Name
                    </h3>
                    <span className="px-4 py-1 rounded-full bg-[#c9f4b8] text-[#1a8c3a] text-[11px] md:text-xs font-medium">
                      Eligible
                    </span>
                  </div>
                  <span className="text-xs md:text-sm text-[#c0bde9]">
                    1 mile away
                  </span>
                </div>

                {/* Nearby Hospitals Heading */}
                <div className="mb-5 md:mb-6">
                  <h4 className="text-xl md:text-2xl font-semibold text-black">
                    Nearby&nbsp;Hospitals
                  </h4>
                  <p className="mt-1 text-xs md:text-sm text-gray-600">
                    Based on your location and household info.
                  </p>
                </div>

                {/* Action cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-2">
                  {/* Upload Bill Card */}
                  <button
                    type="button"
                    onClick={() => setIsBillModalOpen(true)}
                    className="group h-32 md:h-36 hover:bg-[#e2dfec] w-full rounded-[26px] border-2 border-[#5225cc] bg-white px-6 py-5 flex flex-col items-center justify-between text-center hover:shadow-md transition"
                  >
                    <div>
                      <p className="text-base md:text-lg font-semibold text-[#5225cc]">
                        Upload
                      </p>
                      <p className="mt-1 text-xs md:text-sm text-[#5225cc]">
                        Bills to save money
                      </p>
                    </div>
                    <div className="flex items-center justify-center mt-2">
                      <div className="w-8 h-8 md:w-9 md:h-9 rounded-full  flex items-center justify-center transition">
                        <img
                          src={uploadImg}
                          alt="Upload"
                          className="w-4 h-4 md:w-5 md:h-5 object-contain"
                        />
                      </div>
                    </div>
                  </button>

                  {/* Sign Up Monthly Subscription Card */}
                  <button
                    type="button"
                    onClick={() => setIsSubscriptionModalOpen(true)}
                    className="group h-32 md:h-36 hover:bg-[#e2dfec] w-full rounded-[26px] border-2 border-[#5225cc] bg-white px-6 py-5 flex flex-col items-center justify-between hover:shadow-md transition"
                  >
                    {subscriptionStatus === "inactive" && (

                      <div className="text-center">
                        <p className="text-base md:text-lg font-semibold text-[#5225cc]">
                          Sign Up
                        </p>
                        <p className="mt-1 text-xs md:text-sm text-[#5225cc]">
                          Monthly Subscription
                        </p>
                      </div>
                    )}

                    <div className="mt-1 flex flex-col items-center gap-1.5">
                      <div className="flex items-center gap-1 whitespace-nowrap">
                        <span className="text-[11px] md:text-xs text-[#5225cc]">
                          Subscription Status
                        </span>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] md:text-xs font-medium ${subscriptionStatus === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-[#ffd7da] text-[#d45360]"
                            }`}
                        >
                          {subscriptionStatus === "active" ? "Active" : "Inactive"}
                        </span>
                      </div>

                      {subscriptionStatus === "active" && (
                        <>
                          <span className="text-[11px] md:text-xs  text-[#5225cc]">
                            Subscription Date: {subscriptionDate}
                          </span>
                          <button
                            type="button"
                            className="text-[11px] md:text-[12px] font-extrabold text-[#5225cc]"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSubscriptionStatus("inactive");
                              setSubscriptionTier(null);
                            }}
                          >
                            Cancel My Subscription Plan
                          </button>
                        
                        </>
                      )}

                      <div className="flex items-center justify-center">
                        <img
                          src={rightArrow}
                          alt="View subscription"
                          className="w-6 h-6 md:w-7 md:h-7 object-contain"
                        />
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bill Information Modal */}
      <BillInformationModal
        isOpen={isBillModalOpen}
        onClose={() => setIsBillModalOpen(false)}
        isSubscriptionActive={subscriptionStatus === "active"}
        onSubmitted={() => {
          setIsBillModalOpen(false);
          setIsApplicationModalOpen(true);
        }}
      />

      {/* Monthly Subscription Modal */}
      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
        householdCount={householdCount}
        subscriptionInfo={subscriptionInfo}
        onStartSubscription={() => {
          setSubscriptionStatus("active");
          setSubscriptionTier(subscriptionInfo.tier);
        }}
        onCancelSubscription={() => {
          setSubscriptionStatus("inactive");
          setSubscriptionTier(null);
        }}
      />

      {/* Submission Success Modal */}
      <SubmissionModal
        isOpen={isSubmissionModalOpen}
        onClose={() => setIsSubmissionModalOpen(false)}
      />

      {/* Add Family Members Modal */}
      <AddFamilyMembersModal
        isOpen={isAddFamilyModalOpen}
        onClose={() => setIsAddFamilyModalOpen(false)}
      />

      {/* XYZ Application Modal */}
      <ApplicationModal
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        onComplete={() => {
          setIsApplicationModalOpen(false);
          setIsSubmissionModalOpen(true);
        }}
      />
    </div>
  );
};

export default Dashboard;

