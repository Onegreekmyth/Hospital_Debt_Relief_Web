import React from "react";

const FailureModal = ({ isOpen, onClose, hospitalName = "xyz Hospital" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Light Purple/Lavender Background Overlay */}
      <div 
        className="absolute inset-0 bg-[#F5F0F9]"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full p-10 md:p-12">
        {/* Red Error Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-full bg-[#E53935] flex items-center justify-center">
            <span className="text-white text-5xl font-bold">!</span>
          </div>
        </div>

        {/* "Sorry" Heading */}
        <h2 className="text-center text-[36px] md:text-[40px] font-bold text-[#212121] mb-8">
          Sorry
        </h2>

        {/* Descriptive Message */}
        <p className="text-center text-[17px] md:text-[18px] text-[#212121] leading-relaxed px-4">
          Your Current or any future bill through {hospitalName} is eligible to be discounted.
        </p>
      </div>
    </div>
  );
};

export default FailureModal;

