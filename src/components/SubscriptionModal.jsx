import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  subscribe,
  fetchBillingStatus,
  clearPaymentError,
} from "../store/payments/paymentsSlice";
import PaymentModal from "./PaymentModal";

const SubscriptionModal = ({
  isOpen,
  onClose,
  householdCount,
  subscriptionInfo,
  planId,
  onStartSubscription,
  onCancelSubscription,
  hasActiveSubscription = false,
}) => {
  const [error, setError] = useState("");
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const dispatch = useDispatch();
  const { paymentLoading, paymentError, billingStatus } = useSelector(
    (state) => state.payments
  );

  const freeTrialActive = billingStatus?.freeTrialActive === true;
  const displayPrice = freeTrialActive
    ? "0.00"
    : subscriptionInfo?.price;

  useEffect(() => {
    if (paymentError) setError(paymentError);
  }, [paymentError]);

  useEffect(() => {
    if (isOpen) {
      setAgreementChecked(false);
      setError("");
      dispatch(fetchBillingStatus());
    }
  }, [isOpen, dispatch]);

  const handleStartClick = async () => {
    if (householdCount < 1) {
      setError(
        'Please include at least one member in your membership plan. Uncheck "Remove from Membership Plan" for at least one member.'
      );
      return;
    }
    if (!agreementChecked) {
      setError("You must acknowledge the notice above before starting your membership.");
      return;
    }
    if (!planId) {
      setError("Invalid membership plan. Please try again.");
      return;
    }
    setError("");
    dispatch(clearPaymentError());

    if (freeTrialActive) {
      try {
        await dispatch(subscribe({ planId })).unwrap();
        if (onStartSubscription) onStartSubscription();
        if (onClose) onClose();
      } catch (err) {
        setError(typeof err === "string" ? err : "Failed to start membership.");
      }
      return;
    }

    setPaymentOpen(true);
  };

  const handlePayment = async ({ dataDescriptor, dataValue }) => {
    await dispatch(
      subscribe({ planId, dataDescriptor, dataValue })
    ).unwrap();
    setPaymentOpen(false);
    if (onStartSubscription) onStartSubscription();
    if (onClose) onClose();
  };

  if (!isOpen) return null;

  return (
  <>
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        aria-hidden
        onClick={onClose}
      />
      <div className="relative bg-white rounded-[32px] shadow-2xl max-w-md sm:max-w-xl w-full max-h-[90vh] overflow-y-auto p-5 md:p-8 lg:p-10">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 md:hidden"
          aria-label="Close membership modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6 mt-4 md:mt-0">
          Monthly Membership
        </h2>

        <div className="space-y-5 md:space-y-6">
          <div className="space-y-1">
            <p className="text-xs md:text-sm font-semibold text-gray-900">
              Number of Household Members Selected
            </p>
            <div className="rounded-full border border-gray-200 px-5 py-2 flex items-center gap-4">
              <p className="text-sm text-[#2e1570]">{householdCount}</p>
            </div>
          </div>

          {householdCount < 1 && (
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
              <p className="text-sm text-amber-800">
                Please include at least one member in your membership plan.
              </p>
            </div>
          )}

          {freeTrialActive && (
            <div className="p-3 rounded-lg bg-green-50 border border-green-200 mb-2">
              <p className="text-sm text-green-800 font-medium">
                $0/month for your first {billingStatus?.freeTrialDays || 90} days — no credit card required.
              </p>
            </div>
          )}

          <div className="space-y-1">
            <p className="text-xs md:text-sm font-semibold text-gray-900">Monthly Membership</p>
            <div className="rounded-full border border-gray-200 px-5 py-3 bg-white">
              <p className="text-base text-[#2e1570] pl-4 md:pl-12">
                ${displayPrice}
                {freeTrialActive && subscriptionInfo?.price ? (
                  <span className="text-sm text-gray-500 line-through ml-2">
                    ${subscriptionInfo.price}
                  </span>
                ) : null}
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs md:text-sm font-semibold text-gray-900">Membership Type</p>
            <div className="rounded-full border border-gray-200 px-5 py-4 bg-white">
              <p className="text-[11px] md:text-sm font-medium text-gray-700">
                {subscriptionInfo?.type}
              </p>
            </div>
          </div>

          <label className="inline-flex items-start gap-2 text-[11px] md:text-xs text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={agreementChecked}
              onChange={(e) => {
                setAgreementChecked(e.target.checked);
                if (error) setError("");
              }}
              className="mt-0.5 w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 shrink-0"
            />
            <span>
              I acknowledge that providing false or inaccurate information can lead to
              inaccurate billing and/or denied financial assistance applications.{" "}
              <span className="text-red-600">*</span>
            </span>
          </label>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
              {error}
            </p>
          )}

          <button
            type="button"
            className="w-full h-11 md:h-12 rounded-full bg-[#2e1570] text-white font-semibold text-sm md:text-base hover:bg-purple-800 transition shadow-md disabled:opacity-50"
            onClick={handleStartClick}
            disabled={paymentLoading || householdCount < 1 || !agreementChecked}
          >
            {paymentLoading
              ? "Processing..."
              : freeTrialActive
                ? "Start My Membership Plan (Free)"
                : "Start My Membership Plan"}
          </button>

          <button
            type="button"
            className="w-full h-11 md:h-12 rounded-full text-[#4e30a2] font-semibold border-2 border-[#4e30a2] hover:bg-purple-50"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>

    <PaymentModal
      isOpen={paymentOpen}
      onClose={() => setPaymentOpen(false)}
      title="Start membership"
      description="Enter your card details for the monthly membership."
      amountLabel={`$${subscriptionInfo?.price}/month`}
      loading={paymentLoading}
      error={paymentError}
      onSubmit={handlePayment}
    />
  </>
  );
};

export default SubscriptionModal;
