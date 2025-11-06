import React from "react";
import partyPopperImg from "../assets/party-popper.png";

const SuccessModal = ({ isOpen, onClose, hospitalName = "xyz Hospital" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred Background Overlay */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl border-2 border-purple-200/60 shadow-2xl max-w-lg w-full p-8 md:p-10">
        {/* Party Popper Icon */}
        <div className="flex justify-center mb-6">
          <img 
            src={partyPopperImg} 
            alt="Party popper" 
            className="w-10 h-10 md:w-14 md:h-14 drop-shadow-lg"
          />
        </div>

        {/* Heading */}
        <h2 className="text-center text-[32px] md:text-[36px] font-extrabold text-gray-900 mb-4 tracking-[0.64px]">
          Congratulations
        </h2>

        {/* Message */}
        <p className="text-center text-[16px] text-gray-800 mb-6 leading-relaxed">
          Your Current or any future bill through {hospitalName} is eligible to be discounted.
        </p>

        {/* Call to Action Link */}
        <p className="text-center text-[14px] text-purple-700 mb-8">
            Create an account to upload your current hospital bill.
        </p>

        {/* Create Button */}
        <button
          onClick={() => window.location.href = "/signup"}
          className="w-full h-12 rounded-full border-2 border-purple-700 bg-white text-purple-700 text-base font-medium hover:bg-purple-50 transition flex items-center justify-center gap-2"
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

