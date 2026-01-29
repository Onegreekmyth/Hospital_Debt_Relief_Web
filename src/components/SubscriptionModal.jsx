import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCheckoutSession, clearCheckoutError } from "../store/payments/paymentsSlice";

const SubscriptionModal = ({
  isOpen,
  onClose,
  householdCount,
  subscriptionInfo,
  planId,
  onStartSubscription,
  onCancelSubscription,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { checkoutError } = useSelector((state) => state.payments);

  const handleStart = async () => {
    if (!planId) {
      setError("Invalid subscription plan. Please try again.");
      return;
    }

    setLoading(true);
    setError("");
    dispatch(clearCheckoutError());

    try {
      // Get current URL for success/cancel redirects
      // Stripe replaces {CHECKOUT_SESSION_ID} with the actual session ID on redirect
      const baseUrl = window.location.origin;
      const successUrl = `${baseUrl}/dashboard?subscription=success&session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${baseUrl}/dashboard?subscription=cancelled`;

      // Call backend to create Stripe Checkout Session
      const result = await dispatch(
        createCheckoutSession({
          planId,
          successUrl,
          cancelUrl,
        })
      ).unwrap();

      // Redirect to Stripe Checkout
      window.location.href = result;
    } catch (err) {
      console.error("Error creating checkout session:", err);
      setError(
        typeof err === "string" ? err : "Failed to start subscription. Please try again."
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    if (checkoutError) {
      setError(checkoutError);
      setLoading(false);
    }
  }, [checkoutError]);

  if (!isOpen) return null;

  const handleCancel = () => {
    if (onCancelSubscription) {
      onCancelSubscription();
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-[32px] shadow-2xl max-w-xl w-full p-6 md:p-8 lg:p-10">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Monthly Subscription
        </h2>

        <div className="space-y-5 md:space-y-6">
          {/* Number of Family Members */}
          <div className="space-y-1">
            <p className="text-xs md:text-sm font-semibold text-gray-900">
              Number of Family Household Members
            </p>
            <div className="rounded-full border border-gray-200 px-5 py-2 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 shadow-sm">
                <svg
                  className="w-5 h-5"
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
              <div className="flex-1">
                <p className="text-sm md:text-sm text-[#2e1570] ">
                  {householdCount} "This number is fed by the dashboard entries"
                </p>
              </div>
            </div>
          </div>

          {/* Monthly Subscription Amount */}
          <div className="space-y-1">
            <p className="text-xs md:text-sm font-semibold text-gray-900">
              Monthly Subscription
            </p>
            <div className="rounded-full border border-gray-200 px-5 py-3 flex items-center bg-white">
              <p className="text-base md:text-md text-[#2e1570]  pl-4 md:pl-12">
                ${subscriptionInfo?.price}
              </p>
            </div>
          </div>

          {/* Subscription Type */}
          <div className="space-y-1">
            <p className="text-xs md:text-sm font-semibold text-gray-900">
              Subscription Type
            </p>
            <div className="rounded-full border border-gray-200 px-5 py-4 flex items-center bg-white">
              <p className="text-[11px] md:text-sm font-medium text-gray-700">
                {subscriptionInfo?.type}
              </p>
            </div>
          </div>

          {/* Warning Checkbox */}
          <div className="pt-2">
            <label className="inline-flex items-start gap-2 text-[11px] md:text-xs text-gray-600">
              <input
                type="checkbox"
                className="mt-0.5 w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                defaultChecked
                readOnly
              />
              <span>
                Providing false or inaccurate information can lead to inaccurate billing and/or
                denied financial assistance applications.
              </span>
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <div className="pt-2">
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                {error}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3 pt-2">
            <button
              type="button"
              className="w-full h-11 md:h-12 rounded-full bg-[#2e1570] text-white font-semibold text-sm md:text-base hover:from-purple-600 hover:to-purple-800 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleStart}
              disabled={loading}
            >
              {loading ? "Processing..." : "Start My Subscription Plan"}
            </button>

            <button
              type="button"
              className="w-full h-11 md:h-12 rounded-full text-[#4e30a2] font-semibold text-sm md:text-base hover:from-purple-600/80 hover:to-purple-800/80 transition border-2 border-[#4e30a2]"
              onClick={handleCancel}
            >
              Cancel My Subscription Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;


