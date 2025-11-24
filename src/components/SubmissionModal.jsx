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

        {/* Congratulations Heading */}
        <h2 className="text-center text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
          Congratulations
        </h2>

        {/* Application Completed Message */}
        <p className="text-center text-sm md:text-base lg:text-lg text-black mb-4 md:mb-6 font-medium">
          Application Completed.
        </p>

        {/* Instructions */}
        <p className="text-center text-xs md:text-sm lg:text-base text-black leading-relaxed px-2">
          Please wait 30 to 25 days for an updated bill or further communication from hospital xyz.
        </p>
      </div>
    </div>
  );
};



export default SubmissionModal;