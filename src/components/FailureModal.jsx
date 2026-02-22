import React from "react";

const FailureModal = ({ isOpen, onClose, hospitalName = "xyz Hospital" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Light Purple/Lavender Background Overlay */}
      <div 
        className="absolute inset-0 bg-[#F5F0F9]"
        aria-hidden
      />
      
      {/* Modal Container */}
      <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 md:p-8 lg:p-12 mx-4">
        {/* Close button */}
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
        {/* Red Error Icon */}
        <div className="flex justify-center mb-6 md:mb-8">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#E53935] flex items-center justify-center">
            <span className="text-white text-4xl md:text-5xl font-bold">!</span>
          </div>
        </div>

        {/* "Sorry" Heading */}
        <h2 className="text-center text-[28px] md:text-[36px] lg:text-[40px] font-bold text-[#212121] mb-6 md:mb-8">
          Sorry
        </h2>

        {/* Descriptive Message */}
        <p className="text-center text-[14px] md:text-[17px] lg:text-[18px] text-[#212121] leading-relaxed px-2 md:px-4">
          Your Current or any future bill through {hospitalName} is eligible to be discounted.
        </p>
      </div>
    </div>
  );
};

export default FailureModal;

