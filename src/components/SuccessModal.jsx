import React from "react";
import partyPopperImg from "../assets/party-popper.png";

const SuccessModal = ({
  isOpen,
  onClose,
  hospitalName,
  eligibilityResponse,
  eligibilityError,
  hasExistingBill = false,
  billAmount,
}) => {
  if (!isOpen) return null;

  const details =
    eligibilityResponse && eligibilityResponse.data
      ? eligibilityResponse.data
      : eligibilityResponse || null;

  const isEligible = details?.eligible;
  const eligibilityType = details?.eligibilityType;
  const hospitalInfo = details?.hospitalInfo;
  const hospitalDisplayName =
    hospitalInfo?.name || hospitalName || "the selected hospital";
  const discountPercent =
    typeof details?.estimatedDiscount === "number"
      ? details.estimatedDiscount
      : eligibilityType === "free_care"
      ? 100
      : null;
  // Dollar savings: from API or computed from bill amount and discount
  const savingsAmount =
    typeof details?.estimatedSavings === "number"
      ? details.estimatedSavings
      : typeof details?.savingsAmount === "number"
      ? details.savingsAmount
      : hasExistingBill &&
        typeof billAmount === "number" &&
        typeof discountPercent === "number"
      ? Math.round((billAmount * discountPercent) / 100 * 100) / 100
      : null;
  const showExistingBillMessage =
    hasExistingBill && isEligible && savingsAmount != null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred Background Overlay */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        aria-hidden
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl border-2 border-purple-200/60 shadow-2xl max-w-lg w-full p-6 md:p-8 lg:p-10 mx-4">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 text-gray-500"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {/* Icon */}
        <div className="flex justify-center mb-4 md:mb-6">
          {isEligible ? (
            <img
              src={partyPopperImg}
              alt="Celebration"
              className="w-10 h-10 md:w-14 md:h-14 drop-shadow-lg"
            />
          ) : (
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-red-500 flex items-center justify-center shadow-lg">
              <span className="text-white text-3xl md:text-4xl font-bold">!</span>
            </div>
          )}
        </div>

        {/* Heading */}
        <h2 className="text-center text-[24px] md:text-[32px] lg:text-[36px] font-extrabold text-gray-900 mb-3 md:mb-4 tracking-[0.64px]">
          {showExistingBillMessage ||
          (isEligible &&
            (eligibilityType === "free_care" ||
              eligibilityType === "discounted_care"))
            ? "Congratulations"
            : isEligible
            ? "Eligibility Result"
            : "Determination Notice"}
        </h2>

        {/* Short message based on eligibility */}
        {details && !eligibilityError && (
          <p className="text-center text-[13px] md:text-[14px] text-gray-800 mb-4 md:mb-6 leading-relaxed px-2">
            {showExistingBillMessage
              ? `Your current bill from ${hospitalDisplayName} is eligible for a savings of $${Number(savingsAmount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}.`
              : isEligible
              ? eligibilityType === "free_care" ||
                eligibilityType === "discounted_care"
                ? `You qualify! You will save ${discountPercent ?? 0}% on future out-of-pocket expenses billed by ${hospitalDisplayName}.`
                : `Based on your information, you may qualify for financial assistance at ${hospitalDisplayName}.`
              : `Based on the information provided, it appears you do not qualify for financial assistance from ${hospitalDisplayName}.`}
          </p>
        )}

        {eligibilityError && (
          <p className="text-center text-[13px] md:text-[14px] text-red-600 mb-4 md:mb-6 leading-relaxed px-2">
            {eligibilityError}
          </p>
        )}

        {/* Call to Action */}
        <p className="text-center text-[12px] md:text-[14px] text-purple-700 mb-6 md:mb-8 px-2">
          {showExistingBillMessage
            ? "Create an account to upload your current hospital bill."
            : isEligible
            ? "Create an account to Subscribe."
            : ""}
        </p>

        {/* Primary Button */}
        <button
          onClick={() => {
            window.location.href = isEligible ? "/signup" : "/";
          }}
          className="w-full h-11 md:h-12 rounded-full border-2 border-purple-700 bg-white text-purple-700 text-sm md:text-base font-medium hover:bg-purple-50 transition flex items-center justify-center gap-2"
        >
          {isEligible ? "Create" : "Home"}
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;

