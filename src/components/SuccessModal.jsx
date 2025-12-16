import React from "react";
import partyPopperImg from "../assets/party-popper.png";

const SuccessModal = ({
  isOpen,
  onClose,
  hospitalName,
  eligibilityResponse,
  eligibilityError,
}) => {
  if (!isOpen) return null;

  const details =
    eligibilityResponse && eligibilityResponse.data
      ? eligibilityResponse.data
      : eligibilityResponse || null;

  const isEligible = details?.eligible;
  const eligibilityType = details?.eligibilityType;
  const hospitalInfo = details?.hospitalInfo;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred Background Overlay */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl border-2 border-purple-200/60 shadow-2xl max-w-lg w-full p-6 md:p-8 lg:p-10 mx-4">
        {/* Party Popper Icon */}
        <div className="flex justify-center mb-4 md:mb-6">
          <img 
            src={partyPopperImg} 
            alt="Party popper" 
            className="w-10 h-10 md:w-14 md:h-14 drop-shadow-lg"
          />
        </div>

        {/* Heading */}
        <h2 className="text-center text-[24px] md:text-[32px] lg:text-[36px] font-extrabold text-gray-900 mb-3 md:mb-4 tracking-[0.64px]">
          {isEligible ? "You May Qualify for Help" : "Eligibility Result"}
        </h2>

        {/* Short message: only show if they qualify or not */}
        {details && (
          <p className="text-center text-[13px] md:text-[14px] text-gray-800 mb-4 md:mb-6 leading-relaxed px-2">
            {isEligible
              ? `Based on your information, you may qualify for ${
                  eligibilityType === "free_care"
                    ? "FREE CARE (100% discount)"
                    : eligibilityType === "discounted_care"
                    ? "discounted care"
                    : "financial assistance"
                } at ${
                  hospitalInfo?.name || hospitalName || "the selected hospital"
                }.`
              : `Based on your information, you may not qualify for financial assistance at ${
                  hospitalInfo?.name || hospitalName || "this hospital"
                }. You can still contact the hospital's financial assistance office to review your options.`}
          </p>
        )}

        {eligibilityError && (
          <p className="text-center text-[13px] md:text-[14px] text-red-600 mb-4 md:mb-6 leading-relaxed px-2">
            {eligibilityError}
          </p>
        )}

        {/* Call to Action Link */}
        <p className="text-center text-[12px] md:text-[14px] text-purple-700 mb-6 md:mb-8 px-2">
            Create an account to upload your current hospital bill.
        </p>

        {/* Create Button */}
        <button
          onClick={() => window.location.href = "/signup"}
          className="w-full h-11 md:h-12 rounded-full border-2 border-purple-700 bg-white text-purple-700 text-sm md:text-base font-medium hover:bg-purple-50 transition flex items-center justify-center gap-2"
        >
          Create
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

