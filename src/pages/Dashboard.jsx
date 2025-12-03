import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SubmissionModal from "../components/SubmissionModal";
import BillInformationModal from "../components/BillInformationModal";
import SubscriptionModal from "../components/SubscriptionModal";
import AddFamilyMembersModal from "../components/AddFamilyMembersModal";

const Dashboard = () => {
  const [isContactInfoOpen, setIsContactInfoOpen] = useState(false);
  const [isFamilyMembersOpen, setIsFamilyMembersOpen] = useState(false);
  const [isFamilyListOpen, setIsFamilyListOpen] = useState(false);
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isAddFamilyModalOpen, setIsAddFamilyModalOpen] = useState(false);

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
      isAddFamilyModalOpen
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to restore scrolling
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isBillModalOpen, isSubmissionModalOpen, isSubscriptionModalOpen, isAddFamilyModalOpen]);

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
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Map */}
              <div
                className="relative bg-gray-100 overflow-hidden"
                style={{ height: "170px" }}
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

              {/* Content */}
              <div className="p-4 md:p-5 space-y-5">
                {/* Hospital Info */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-gray-900">
                      XYZ Hospital
                    </h3>
                    <p className="text-[13px] md:text-sm text-gray-900">Address</p>
                    <p className="text-[13px] md:text-sm text-purple-700 underline cursor-pointer">
                      Website
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-[11px] md:text-xs font-medium">
                    Available
                  </span>
                </div>

                {/* Buttons Section */}
                <div className="space-y-4">
                  {/* Upload Bill */}
                  <div className="flex justify-start">
                    <button
                      type="button"
                      onClick={() => setIsBillModalOpen(true)}
                      className="w-2/3 flex items-center justify-center rounded-full border-2 border-purple-600 text-purple-700 bg-white px-4 py-2.5 text-xs md:text-sm font-semibold"
                    >
                      Upload Hospital Bill
                    </button>
                  </div>

                  {/* Signup Monthly */}
                  <div className="flex justify-start">
                    <button
                      type="button"
                      onClick={() => setIsSubscriptionModalOpen(true)}
                      className="w-2/3 flex items-center justify-center rounded-full border-2 border-purple-600 text-purple-700 bg-white px-4 py-2.5 text-xs md:text-sm font-semibold"
                    >
                      Sign Up - Monthly Subscription
                    </button>
                  </div>

                  {/* Subscription Status */}
                  <div className="flex flex-col md:flex-row items-center md:justify-between gap-3">
                    <button
                      type="button"
                      className="w-2/3 flex items-center justify-center rounded-full border-2 border-purple-600 text-purple-700 bg-white px-4 py-2.5 text-xs md:text-sm font-semibold"
                    >
                      Subscription Status:{" "}
                      <span className="ml-1">
                        {subscriptionStatus === "active" ? "Active" : "Inactive"}
                      </span>
                    </button>

                    {/* Subscription Date */}
                    <div className="flex flex-col justify-center items-center md:items-end text-right h-full">
                      <span className="text-[11px]  md:text-xs text-purple-700 font-medium">
                        Subscription Date
                      </span>
                      <div className="px-4 py-2 rounded-full border-2 border-purple-600 text-[11px] md:text-xs text-gray-800">
                        {subscriptionStatus === "active"
                          ? subscriptionDate
                          : "10/28/2025"}
                      </div>
                    </div>
                  </div>

                  {/* Cancel Subscription */}
                  <div className="flex justify-start">
                    <button
                      type="button"
                      className="w-2/3 flex items-center justify-center rounded-full border-2 border-purple-600 text-purple-700 bg-white px-4 py-2.5 text-xs md:text-sm font-semibold"
                    >
                      Cancel my Subscription Plan
                    </button>
                  </div>
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
          setIsSubmissionModalOpen(true);
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
    </div>
  );
};

export default Dashboard;

