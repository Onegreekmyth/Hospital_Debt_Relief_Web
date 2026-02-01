import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import SubmissionModal from "../components/SubmissionModal";
import BillInformationModal from "../components/BillInformationModal";
import SubscriptionModal from "../components/SubscriptionModal";
import AddFamilyMembersModal from "../components/AddFamilyMembersModal";
import ApplicationSubmittedModal from "../components/ApplicationSubmittedModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import HospitalMap from "../components/HospitalMap";
import uploadImg from "../assets/upload-img.png";
import rightArrow from "../assets/right-arrow.png";
import { syncStripeSession } from "../store/payments/paymentsSlice";
import {
  createFamilyMember,
  updateFamilyMember,
  deleteFamilyMember,
  clearError,
  setFamilyMembers,
} from "../store/familyMembers/familyMembersSlice";
import {
  fetchProfile,
  updateProfile,
  setProfileField,
  clearUpdateSuccess,
} from "../store/user/userSlice";
import PrimaryLogo from "../assets/primary-logo.png";

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
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);

  const [householdSize, setHouseholdSize] = useState(1);
  const [editingMember, setEditingMember] = useState(null);
  const [accountHolderRemoveFromPlan, setAccountHolderRemoveFromPlan] = useState(false);
  const [familyMembersRemoveFromPlan, setFamilyMembersRemoveFromPlan] = useState([]);
  const [isProfileEditing, setIsProfileEditing] = useState(false);

  // Redux state for user profile
  const {
    profile,
    status: profileStatus,
    error: profileError,
    updateStatus: profileUpdateStatus,
    updateError: profileUpdateError,
    updateSuccess: profileUpdateSuccess,
  } = useSelector((state) => state.user);
  const profileLoading = profileStatus === "loading";
  const profileUpdateLoading = profileUpdateStatus === "loading";

  // Redux state for family members
  const { 
    items: familyMembers, 
    status: familyMembersStatus, 
    error: familyMembersError,
    operationStatus,
    operationError,
  } = useSelector((state) => state.familyMembers);
  const familyMembersLoading = familyMembersStatus === 'loading';

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
          const { userData } = await dispatch(fetchProfile()).unwrap();
          if (userData?.subscription) {
            setSubscriptionStatus(userData.subscription.status || "inactive");
            setSubscriptionTier(userData.subscription.planId || null);
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
    dispatch(fetchProfile())
      .unwrap()
      .then(({ userData }) => {
        setHouseholdSize(
          Number(userData?.eligibilityData?.householdSize) > 0
            ? Number(userData.eligibilityData.householdSize)
            : 1
        );
        if (userData?.subscription?.status) {
          setSubscriptionStatus(userData.subscription.status);
          setSubscriptionTier(userData.subscription.planId || null);
        }
        dispatch(setFamilyMembers(userData?.familyMembers || []));
      })
      .catch((err) => {
        if (err?.status === 401) navigate("/login");
      });
  }, [dispatch, navigate]);

  // Initialize remove from plan array when family members change
  useEffect(() => {
    if (familyMembers.length > 0) {
      setFamilyMembersRemoveFromPlan(familyMembers.map(() => false));
    }
  }, [familyMembers]);

  // Clear errors when component mounts or when modal closes
  useEffect(() => {
    if (familyMembersError || operationError) {
      // Auto-clear errors after 5 seconds
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [familyMembersError, operationError, dispatch]);

  // Open delete confirmation modal
  const handleDeleteFamilyMember = (member) => {
    setMemberToDelete(member);
    setIsDeleteConfirmModalOpen(true);
  };

  // Confirm and delete family member using Redux
  const handleConfirmDelete = async () => {
    if (!memberToDelete?._id) return;

    try {
      await dispatch(deleteFamilyMember(memberToDelete._id)).unwrap();
      setMemberToDelete(null);
      const { userData } = await dispatch(fetchProfile()).unwrap();
      dispatch(setFamilyMembers(userData?.familyMembers || []));
    } catch (error) {
      alert(error || "Failed to delete family member");
    }
  };

  // Close delete confirmation modal
  const handleCloseDeleteModal = () => {
    setIsDeleteConfirmModalOpen(false);
    setMemberToDelete(null);
  };

  // Handle edit family member
  const handleEditFamilyMember = (member) => {
    setEditingMember(member);
    setIsAddFamilyModalOpen(true);
  };

  // Handle add family member
  const handleAddFamilyMember = () => {
    setEditingMember(null);
    setIsAddFamilyModalOpen(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsAddFamilyModalOpen(false);
    setEditingMember(null);
  };

  // Handle modal success - refresh profile to get updated family members
  const handleModalSuccess = async () => {
    try {
      const { userData } = await dispatch(fetchProfile()).unwrap();
      dispatch(setFamilyMembers(userData?.familyMembers || []));
    } catch (error) {
      console.error("Error refreshing profile:", error);
    }
  };

  // Update profile (firstName, lastName, phone, mailing_address) via user slice
  const handleUpdateProfile = () => {
    dispatch(
      updateProfile({
        firstName: profile.firstName?.trim() ?? "",
        lastName: profile.lastName?.trim() ?? "",
        phone: profile.phone?.trim() ?? "",
        mailing_address: profile.mailingAddress?.trim() ?? "",
      })
    );
  };

  // Clear update success message and exit edit mode after 3 seconds
  useEffect(() => {
    if (!profileUpdateSuccess) return;
    setIsProfileEditing(false);
    const t = setTimeout(() => dispatch(clearUpdateSuccess()), 3000);
    return () => clearTimeout(t);
  }, [profileUpdateSuccess, dispatch]);

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
  // Subscription plan count: only people NOT excluded by "Remove from plan" checkbox
  const effectivePlanCount =
    (accountHolderRemoveFromPlan ? 0 : 1) +
    familyMembers.reduce((sum, _, i) => sum + (familyMembersRemoveFromPlan[i] ? 0 : 1), 0);
  const householdCount = Math.max(effectivePlanCount, 1);

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
              <div
                role="button"
                tabIndex={0}
                onClick={() => setIsContactInfoOpen(!isContactInfoOpen)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsContactInfoOpen((prev) => !prev);
                  }
                }}
                className="w-full flex items-center justify-between px-4 md:px-6 py-4 md:py-5 text-left cursor-pointer"
              >
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Account Profile</h2>
                <div className="flex items-center gap-1">
                  {isContactInfoOpen && !isProfileEditing && (
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setIsProfileEditing(true); }}
                      className="p-1.5 rounded-full text-purple-800 hover:text-[#5B2BE4] hover:bg-purple-50 transition"
                      aria-label="Edit profile"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  )}
                  {isContactInfoOpen && isProfileEditing && (
                    <>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleUpdateProfile(); }}
                        disabled={profileUpdateLoading || profileLoading}
                        className="p-1.5 rounded-full text-green-600 hover:bg-green-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Save"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setIsProfileEditing(false); }}
                        disabled={profileUpdateLoading}
                        className="p-1.5 rounded-full text-red-500 hover:text-red-600 hover:bg-red-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Cancel"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </>
                  )}
                  <svg
                    className={`w-5 h-5 text-gray-600 transition-transform ${isContactInfoOpen ? '' : 'rotate-180'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </div>
              </div>

              {isContactInfoOpen && (
                <div className="px-4 md:px-6 pb-4 md:pb-6 space-y-3 md:space-y-4">
                  {/* Error Message */}
                  {profileError && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                      <p className="text-sm text-red-600">{profileError}</p>
                    </div>
                  )}
                  {profileUpdateError && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                      <p className="text-sm text-red-600">{profileUpdateError}</p>
                    </div>
                  )}
                  {profileUpdateSuccess && (
                    <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                      <p className="text-sm text-green-700">Profile updated successfully.</p>
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
                          disabled={!isProfileEditing}
                          onChange={(e) => dispatch(setProfileField({ field: "firstName", value: e.target.value }))}
                          className={`w-full h-12 rounded-full border border-gray-300 pl-12 pr-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300 ${isProfileEditing ? "bg-white" : "bg-gray-100 cursor-not-allowed"}`}
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
                          disabled={!isProfileEditing}
                          onChange={(e) => dispatch(setProfileField({ field: "lastName", value: e.target.value }))}
                          className={`w-full h-11 md:h-12 rounded-full border border-gray-300 pl-10 md:pl-12 pr-3 md:pr-4 text-sm md:text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300 ${isProfileEditing ? "bg-white" : "bg-gray-100 cursor-not-allowed"}`}
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
                        disabled={!isProfileEditing}
                        onChange={(e) => dispatch(setProfileField({ field: "mailingAddress", value: e.target.value }))}
                        className={`w-full h-11 md:h-12 rounded-full border border-gray-300 pl-10 md:pl-12 pr-3 md:pr-4 text-sm md:text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300 ${isProfileEditing ? "bg-white" : "bg-gray-100 cursor-not-allowed"}`}
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
                        disabled={!isProfileEditing}
                        onChange={(e) => dispatch(setProfileField({ field: "phone", value: e.target.value }))}
                        className={`w-full h-11 md:h-12 rounded-full border border-gray-300 pl-10 md:pl-12 pr-3 md:pr-4 text-sm md:text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300 ${isProfileEditing ? "bg-white" : "bg-gray-100 cursor-not-allowed"}`}
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
                  {/* Error Messages */}
                  {(familyMembersError || operationError) && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                      <p className="text-sm text-red-600">{familyMembersError || operationError}</p>
                    </div>
                  )}

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

                  {/* Family Members from API */}
                  {familyMembersLoading ? (
                    <div className="text-center py-4">
                      <p className="text-sm text-gray-500">Loading family members...</p>
                    </div>
                  ) : familyMembers.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-sm text-gray-500">No family members added yet.</p>
                    </div>
                  ) : (
                    familyMembers.map((member, index) => {
                      const fullName = `${member.firstName || ""} ${member.lastName || ""}`.trim();
                      const relationshipLabel = member.relationship 
                        ? member.relationship.charAt(0).toUpperCase() + member.relationship.slice(1).replace(/-/g, " ")
                        : "Family Member";
                      const removeFromPlan = familyMembersRemoveFromPlan[index] ?? false;
                      return (
                        <div key={member._id || index} className="space-y-2 relative pt-2">
                          <div className="absolute -top-3 left-6 bg-white px-2 py-0.5 rounded-b-md z-10">
                            <span className="text-xs md:text-[13px] font-medium text-gray-900">{relationshipLabel}</span>
                          </div>
                          <div className="flex items-center gap-3 rounded-full border border-purple-200 bg-[#F7F5FF]/60 px-4 md:px-5 py-2.5 md:py-3">
                            <div className="flex items-center justify-center text-[#4B24C7] shrink-0">
                              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm md:text-base font-medium text-gray-900">
                                {fullName || "Unnamed"}
                              </div>
                         
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={() => handleEditFamilyMember(member)}
                                className="p-1.5 rounded-full text-[#4B24C7] hover:bg-purple-100 transition"
                                aria-label="Edit"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteFamilyMember(member)}
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
                            <span className="text-xs font-sm text-gray-500">Remove from Subscription Plan</span>
                          </label>
                        </div>
                      );
                    })
                  )}

                  {/* Add Family Member button */}
                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={handleAddFamilyMember}
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
              {/* Hospital location map - geocoded from name, city, state */}
              <HospitalMap
                hospitalInfo={profile.hospitalInfo}
                height="280px"
                className="rounded-t-[32px] md:rounded-t-[40px]"
              />

              {/* Overlapping hospital badge, centered and half over map */}
              <div className="absolute left-1/2 top-[280px] -translate-x-1/2 -translate-y-1/2">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[white] border-[px] border-white flex items-center justify-center shadow-lg">
                  <div className="w-11 h-11 md:w-14 md:h-14 rounded-full bg-white flex items-center justify-center">
                    {/* Four-leaf clover icon */}
                    <img src={PrimaryLogo} alt="" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 md:px-8 pb-8 md:pb-9 pt-8 md:pt-9 bg-white justify-start">
                {/* Hospital Info */}
                <div className="flex flex-col items-center gap-1.5 md:gap-2 mb-6 mt-5">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg md:text-xl font-semibold text-black">
                      {profile.hospitalInfo?.name || (profileLoading ? "Loading..." : "Hospital Name")}
                    </h3>
                    <span className="px-4 py-1 rounded-full bg-[#c9f4b8] text-[#1a8c3a] text-[11px] md:text-xs font-medium">
                      Eligible
                    </span>
                  </div>
                  <span className="text-xs md:text-sm text-[#c0bde9]">
                    {profile.hospitalInfo?.city && profile.hospitalInfo?.state 
                      ? `${profile.hospitalInfo.city}, ${profile.hospitalInfo.state}`
                      : profile.hospitalInfo?.city || profile.hospitalInfo?.state || "1 mile away"}
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
        profile={profile}
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
        onClose={handleModalClose}
        editingMember={editingMember}
        onSuccess={handleModalSuccess}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={isDeleteConfirmModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Delete Family Member"
        message="Are you sure you want to delete this family member? This action cannot be undone."
        memberName={memberToDelete ? `${memberToDelete.firstName || ""} ${memberToDelete.lastName || ""}`.trim() : ""}
      />

    </div>
  );
};

export default Dashboard;

