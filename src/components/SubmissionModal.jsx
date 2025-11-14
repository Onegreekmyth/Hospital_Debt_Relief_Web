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
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 md:p-10">
        {/* Green Circle with Checkmark */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-green-500 flex items-center justify-center">
            <svg
              className="w-10 h-10 md:w-12 md:h-12 text-white"
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
        <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Congratulations
        </h2>

        {/* Application Completed Message */}
        <p className="text-center text-base md:text-lg text-black mb-6 font-medium">
          Application Completed.
        </p>

        {/* Instructions */}
        <p className="text-center text-sm md:text-base text-black leading-relaxed">
          Please wait 30 to 25 days for an updated bill or further communication from hospital xyz.
        </p>
      </div>
    </div>
  );
};

export default SubmissionModal;

