import React from "react";

const SubmissionModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl md:rounded-3xl shadow-2xl max-w-lg w-full p-6 md:p-8 lg:p-10 mx-4">
        {/* Green Circle with Checkmark */}
        <div className="flex justify-center mb-4 md:mb-6">
          <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-green-500 flex items-center justify-center">
            <svg
              className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Application Completed Message */}
        <h1 className="text-center text-lg md:text-lg lg:text-xl text-black mb-4 md:mb-6 font-bold">
          Your Application has been submitted.
        </h1>

        {/* Instructions */}
        <p className="text-center text-xs md:text-sm lg:text-base text-black leading-relaxed px-2 mb-6">
          Please allow up to 30 days for a updated bill
          from XYZ Hospital as processing times may vary.
        </p>
        <div className="flex justify-center mb-4 sm:mb-6">
          <button className="h-10 sm:h-12 px-8 rounded-full text-[#5225cc] border border-[#5225cc] text-sm sm:text-base font-semibold">
            <p className="text-sm sm:text-base font-semibold text-[#5225cc] px-4 py-3">
              View Bill History
            </p>
          </button><br />
        </div>
        <p className="text-center text-xs md:text-sm lg:text-base text-[#1d0f7b] leading-relaxed px-2">Backed By Our Money Back Guarantee!</p>
      </div>
    </div>
  );
};



export default SubmissionModal;