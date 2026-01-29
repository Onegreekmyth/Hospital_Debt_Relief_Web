import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import SubmissionModal from "../components/SubmissionModal";
import BillInformationModal from "../components/BillInformationModal";
import SubscriptionModal from "../components/SubscriptionModal";
import AddFamilyMembersModal from "../components/AddFamilyMembersModal";
import ApplicationSubmittedModal from "../components/ApplicationSubmittedModal";
import axiosClient from "../api/axiosClient";
import uploadImg from "../assets/upload-img.png";
import rightArrow from "../assets/right-arrow.png";
import { syncStripeSession } from "../store/payments/paymentsSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [isContactInfoOpen, setIsContactInfoOpen] = useState(false);
  const [isFamilyMembersOpen, setIsFamilyMembersOpen] = useState(false);
  const [isFamilyListOpen, setIsFamilyListOpen] = useState(false);
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isAddFamilyModalOpen, setIsAddFamilyModalOpen] = useState(false);
  const [isApplicationSubmittedModalOpen, setIsApplicationSubmittedModalOpen] = useState(false);
  const [submittedBillId, setSubmittedBillId] = useState(null);
  const [submittedBillData, setSubmittedBillData] = useState(null);
  const [isCancelSubscriptionOpen, setIsCancelSubscriptionOpen] = useState(false);

  // Profile state
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    mailingAddress: "",
    email: "",
    phone: "",
    annualHouseholdIncome: "",
  });
  const [householdSize, setHouseholdSize] = useState(1);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [accountHolderRemoveFromPlan, setAccountHolderRemoveFromPlan] = useState(false);
  const [familyMembersRemoveFromPlan, setFamilyMembersRemoveFromPlan] = useState([]);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState("");

  // High-level onboarding and eligibility state (placeholder for backend data)
  const [subscriptionStatus, setSubscriptionStatus] = useState("inactive"); // "inactive" | "active"
  const [subscriptionTier, setSubscriptionTier] = useState(null); // "7" | "14" | "21" | null
  const [subscriptionDate, setSubscriptionDate] = useState("10/28/2025");
  const [eligibilityStatus, setEligibilityStatus] = useState("eligible"); // "eligible" | "ineligible"
  const [discountPercentage, setDiscountPercentage] = useState(40); // Example: calculated by backend

  // Handle Stripe redirect: sync subscription status when user returns from Stripe success
  useEffect(() => {
    const subscriptionParam = searchParams.get("subscription");
    const sessionId = searchParams.get("session_id");

    if (subscriptionParam === "success" && sessionId) {
      // Sync subscription status from Stripe (works in dev when webhook can't reach localhost)
      const syncSession = async () => {
        try {
          await dispatch(syncStripeSession({ sessionId })).unwrap();
          // Refresh profile to get updated subscription status
          const profileRes = await axiosClient.get("/auth/profile");
          if (profileRes.data?.success && profileRes.data?.data?.subscription) {
            setSubscriptionStatus(profileRes.data.data.subscription.status || "inactive");
            setSubscriptionTier(profileRes.data.data.subscription.planId || null);
          }
        } catch (err) {
          console.error("Failed to sync subscription:", err);
        } finally {
          searchParams.delete("subscription");
          searchParams.delete("session_id");
          setSearchParams(searchParams, { replace: true });
        }
      };
      syncSession();
    } else if (subscriptionParam === "success") {
      searchParams.delete("subscription");
      setSearchParams(searchParams, { replace: true });
    } else if (subscriptionParam === "cancelled") {
      searchParams.delete("subscription");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setProfileLoading(true);
        setProfileError("");
        
        const response = await axiosClient.get("/auth/profile");
        
        if (response.data.success) {
          const userData = response.data.data;
          
          // Split name into first and last name
          const nameParts = (userData.name || "").trim().split(" ");
          const firstName = nameParts[0] || "";
          const lastName = nameParts.slice(1).join(" ") || "";
          
          // Get annual household income from eligibility data
          const annualHouseholdIncome = userData.eligibilityData?.householdIncome;
          const fetchedHouseholdSize = userData.eligibilityData?.householdSize;
          
          setProfile({
            firstName,
            lastName,
            mailingAddress: userData.mailingAddress || "",
            email: userData.email || "",
            phone: userData.phone || "",
            annualHouseholdIncome: annualHouseholdIncome 
              ? annualHouseholdIncome.toLocaleString('en-US') 
              : "",
          });
          setHouseholdSize(Number(fetchedHouseholdSize) > 0 ? Number(fetchedHouseholdSize) : 1);
          if (userData.subscription?.status) {
            setSubscriptionStatus(userData.subscription.status);
            setSubscriptionTier(userData.subscription.planId || null);
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        const message =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Failed to load profile";
        setProfileError(message);
        
        // If unauthorized, redirect to login
        if (error.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  useEffect(() => {
    const memberCount = Math.max(householdSize - 1, 0);
    setFamilyMembers((prev) => {
      if (prev.length === memberCount) {
        return prev;
      }
      const next = [...prev].slice(0, memberCount);
      while (next.length < memberCount) {
        next.push("");
      }
      return next;
    });
    setFamilyMembersRemoveFromPlan((prev) => {
      if (prev.length === memberCount) return prev;
      const next = [...prev].slice(0, memberCount);
      while (next.length < memberCount) next.push(false);
      return next;
    });
  }, [householdSize]);

  // Disable scrolling when any modal is open
  useEffect(() => {
    if (
      isBillModalOpen ||
      isSubmissionModalOpen ||
      isSubscriptionModalOpen ||
      isAddFamilyModalOpen ||
      isApplicationSubmittedModalOpen
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
  ]);

  const accountHolderName = [profile.firstName, profile.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  const householdCount = Math.max(householdSize, 1);

  const getSubscriptionInfoForHousehold = (count) => {
    if (count <= 3) {
      return {
        price: "7.00",
        tier: "7",
        type: "Household Subscription for a Family Size of up to 3 People",
        planId: "monthly_basic",
      };
    }
    if (count <= 6) {
      return {
        price: "14.00",
        tier: "14",
        type: "Household Subscription for a Family Size of 4 to 6 People",
        planId: "monthly_standard",
      };
    }
    return {
      price: "21.00",
      tier: "21",
      type: "Household Subscription for a Family Size of 6 or More People",
      planId: "monthly_premium",
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
                  {/* Error Message */}
                  {profileError && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                      <p className="text-sm text-red-600">{profileError}</p>
                    </div>
                  )}
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
                          value={profile.firstName}
                          readOnly
                          className="w-full h-12 rounded-full border border-gray-300 bg-gray-100 pl-12 pr-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
                          placeholder={profileLoading ? "Loading..." : "john"}
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
                          value={profile.lastName}
                          readOnly
                          className="w-full h-11 md:h-12 rounded-full border border-gray-300 bg-gray-100 pl-10 md:pl-12 pr-3 md:pr-4 text-sm md:text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
                          placeholder={profileLoading ? "Loading..." : "Thomas"}
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
                        value={profile.mailingAddress}
                        readOnly
                        className="w-full h-11 md:h-12 rounded-full border border-gray-300 bg-gray-100 pl-10 md:pl-12 pr-3 md:pr-4 text-sm md:text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
                        placeholder={profileLoading ? "Loading..." : "address"}
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
                        value={profile.email}
                        readOnly
                        className="w-full h-11 md:h-12 rounded-full border border-gray-300 bg-gray-100 pl-10 md:pl-12 pr-3 md:pr-4 text-sm md:text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
                        placeholder={profileLoading ? "Loading..." : "email@gmail.com"}
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
                        value={profile.phone}
                        readOnly
                        className="w-full h-11 md:h-12 rounded-full border border-gray-300 bg-gray-100 pl-10 md:pl-12 pr-3 md:pr-4 text-sm md:text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
                        placeholder={profileLoading ? "Loading..." : "+92************"}
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
                        type="text"
                        value={profile.annualHouseholdIncome}
                        readOnly
                        className="w-full h-11 md:h-12 rounded-full border border-gray-300 bg-gray-100 pl-8 md:pl-10 pr-3 md:pr-4 text-sm md:text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
                        placeholder={profileLoading ? "Loading..." : "Enter amount"}
                      />
                    </div>
                  </div>


                </div>
              )}
            </div>

            {/* Family Members Section */}
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
              <button
                onClick={() => setIsFamilyListOpen(!isFamilyListOpen)}
                className="w-full flex items-center justify-between px-4 md:px-6 py-4 md:py-5 text-left"
              >
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
                  Family Members
                </h2>
                <svg
                  className={`w-5 h-5 text-gray-600 transition-transform ${isFamilyListOpen ? "" : "rotate-180"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>

              {isFamilyListOpen && (
                <div className="px-4 md:px-6 pb-4 md:pb-6 space-y-5 md:space-y-6">
                  {/* Account Holder */}
                  <div className="space-y-2 relative pt-2">
                    <div className="absolute -top-3 left-6 bg-white px-2 py-0.5 rounded-b-md z-10">
                      <span className="text-xs md:text-[13px] font-medium text-gray-900">Account Holder</span>
                    </div>
                    <div className="flex items-center gap-3 rounded-full border border-purple-200 bg-[#F7F5FF]/60 px-4 md:px-5 py-2.5 md:py-3">
                      <div className="flex items-center justify-center text-[#4B24C7] shrink-0">
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <span className="text-sm md:text-base font-medium text-[#4B24C7]">
                        {accountHolderName || (profileLoading ? "Loading..." : "—")}
                      </span>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={accountHolderRemoveFromPlan}
                        onChange={(e) => setAccountHolderRemoveFromPlan(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-xs font-sm text-gray-500">Remove from Subscription Plan</span>
                    </label>
                  </div>

                  {/* Family Member_Spouse / Family Member_Child */}
                  {familyMembers.map((memberName, index) => {
                    const label = index === 0 ? "Family Member_Spouse" : "Family Member_Child";
                    const removeFromPlan = familyMembersRemoveFromPlan[index] ?? false;
                    return (
                      <div key={`family-member-${index}`} className="space-y-2 relative pt-2">
                        <div className="absolute -top-3 left-6 bg-white px-2 py-0.5 rounded-b-md z-10">
                          <span className="text-xs md:text-[13px] font-medium text-gray-900">{label}</span>
                        </div>
                        <div className="flex items-center gap-3 rounded-full border border-purple-200 bg-[#F7F5FF]/60 px-4 md:px-5 py-2.5 md:py-3">
                          <div className="flex items-center justify-center text-[#4B24C7] shrink-0">
                            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <input
                            type="text"
                            value={memberName}
                            onChange={(e) => {
                              const value = e.target.value;
                              setFamilyMembers((prev) => {
                                const next = [...prev];
                                next[index] = value;
                                return next;
                              });
                            }}
                            className="flex-1 min-w-0 border-none bg-transparent text-sm md:text-base text-gray-900 placeholder-gray-400 focus:outline-none"
                            placeholder={index === 0 ? "Spouse name" : "Child name"}
                          />
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              className="p-1.5 rounded-full text-[#4B24C7] hover:bg-purple-100 transition"
                              aria-label="Edit"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setFamilyMembers((prev) => prev.filter((_, i) => i !== index));
                                setFamilyMembersRemoveFromPlan((prev) => prev.filter((_, i) => i !== index));
                                setHouseholdSize((prev) => Math.max(1, prev - 1));
                              }}
                              className="p-1.5 rounded-full text-[#4B24C7] hover:bg-red-50 hover:text-red-600 transition"
                              aria-label="Delete"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={removeFromPlan}
                            onChange={(e) => {
                              setFamilyMembersRemoveFromPlan((prev) => {
                                const next = [...prev];
                                next[index] = e.target.checked;
                                return next;
                              });
                            }}
                            className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                          <span className="text-sm font-medium text-gray-300">Remove from Subscription Plan</span>
                        </label>
                      </div>
                    );
                  })}

                  {/* Add Family Member button */}
                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddFamilyModalOpen(true)}
                      className="inline-flex items-center gap-2 rounded-full bg-white border-2 border-[#4B24C7] px-4 py-2.5 text-sm font-semibold text-[#4B24C7] hover:bg-[#F7F5FF] transition shadow-sm"
                    >
                      <span className="text-lg leading-none">+</span>
                      Add Family Member
                    </button>
                  </div>
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
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setIsSubscriptionModalOpen(true)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setIsSubscriptionModalOpen(true);
                      }
                    }}
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
                              setIsCancelSubscriptionOpen(true);
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
        accountHolderName={[profile.firstName, profile.lastName].filter(Boolean).join(" ").trim()}
        familyMembers={familyMembers}
        onSubmitted={(billData) => {
          setIsBillModalOpen(false);
          // Store bill ID and data for the submitted modal
          setSubmittedBillId(billData._id);
          setSubmittedBillData(billData);
          setIsApplicationSubmittedModalOpen(true);
        }}
      />

      {/* Application Submitted Modal */}
      <ApplicationSubmittedModal
        isOpen={isApplicationSubmittedModalOpen}
        onClose={() => {
          setIsApplicationSubmittedModalOpen(false);
          setSubmittedBillId(null);
          setSubmittedBillData(null);
        }}
        billId={submittedBillId}
        billData={submittedBillData}
      />

      {/* Monthly Subscription Modal */}
      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
        householdCount={householdCount}
        subscriptionInfo={subscriptionInfo}
        planId={subscriptionInfo?.planId}
        hasActiveSubscription={subscriptionStatus === "active"}
        onStartSubscription={() => {
          // This will be called after successful redirect from Stripe
          // The webhook will update the subscription status in the database
        }}
        onCancelSubscription={() => {
          // User cancelled - just close the modal
        }}
      />

      {/* Cancel Subscription Confirmation Modal */}
      {isCancelSubscriptionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsCancelSubscriptionOpen(false)}
          />
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
              Cancel Subscription?
            </h3>
            <p className="text-sm md:text-base text-gray-600 mb-6">
              Are you sure you want to cancel your subscription plan? You can
              re-subscribe anytime.
            </p>
            <div className="flex flex-col md:flex-row gap-3">
              <button
                type="button"
                onClick={() => setIsCancelSubscriptionOpen(false)}
                className="flex-1 rounded-full border-2 border-[#4e30a2] py-2.5 text-sm md:text-base font-semibold text-[#4e30a2] hover:bg-purple-50 transition"
              >
                Keep Subscription
              </button>
              <button
                type="button"
                onClick={() => {
                  setSubscriptionStatus("inactive");
                  setSubscriptionTier(null);
                  setIsCancelSubscriptionOpen(false);
                }}
                className="flex-1 rounded-full bg-[#2e1570] py-2.5 text-sm md:text-base font-semibold text-white hover:bg-[#241053] transition"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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

