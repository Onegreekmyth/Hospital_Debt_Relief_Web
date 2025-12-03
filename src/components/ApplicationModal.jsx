import React from "react";
import uploadImg from "../assets/upload-img.png";

const ApplicationModal = ({ isOpen, onClose, onComplete, feeAmount = 299 }) => {
  if (!isOpen) return null;

  const handleOverlayClick = () => {
    if (onClose) onClose();
  };

  const handlePrimaryAction = () => {
    if (onComplete) {
      onComplete();
    } else if (onClose) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={handleOverlayClick}
    >
      <div
        className="relative w-full lg:max-w-xl sm:max-w-2xl rounded-[40px] bg-white shadow-2xl px-6 sm:px-10 pt-8 pb-10 sm:pb-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-black mb-8 sm:mb-10">
          XYZ Application
        </h2>

        {/* Top cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
          {/* View Application */}
          <button
            type="button"
            className="flex flex-col items-center justify-between h-24 sm:h-28 rounded-[26px] border-2 border-[#5225cc] px-6 py-5 text-center hover:bg-[#f7f5ff] transition"
          >
            <div>
              <p className="text-sm sm:text-base font-semibold text-[#5225cc]">
                View Application
              </p>
            </div>
            <div className="flex items-center justify-center mt-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full text-[#1d0f7b] flex items-center justify-center">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12 18 18.75 12 18.75 2.25 12 2.25 12z"
                  />
                  <circle cx="12" cy="12" r="2.25" />
                </svg>
              </div>
            </div>
          </button>

          {/* Upload Supporting Documents */}
          <button
            type="button"
            className="flex flex-col items-center justify-between h-24 sm:h-28 rounded-[26px] border-2 border-[#5225cc] px-6 py-4 text-center hover:bg-[#f7f5ff] transition"
          >
            <div>
              <p className="text-sm sm:text-base font-semibold text-[#5225cc]">
                Upload
              </p>
              <p className="mt-1 text-xs sm:text-sm text-[#5225cc]">
                Supporting Documents
              </p>
            </div>
            <div className="flex items-center justify-center mt-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center">
                <img
                  src={uploadImg}
                  alt="Upload"
                  className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
                />
              </div>
            </div>
          </button>
        </div>

        {/* Pay button */}
        <button
          type="button"
          onClick={handlePrimaryAction}
          className="w-full h-12 sm:h-14 rounded-full bg-gradient-to-r from-[#5225cc] to-[#1d0f7b] text-white text-sm sm:text-base font-semibold shadow-[0_10px_30px_rgba(60,35,190,0.5)] mb-4 sm:mb-6"
        >
          Pay ${feeAmount} Flat Fee
        </button>

        {/* Complete Application button */}
        <button
          type="button"
          onClick={handlePrimaryAction}
          className="w-full h-12 sm:h-14 rounded-full border-2 border-[#5225cc] text-[#5225cc] text-sm sm:text-base font-semibold mb-5 sm:mb-6 hover:bg-[#f7f5ff] transition"
        >
          Click to Complete Application
        </button>

        {/* Guarantee text */}
        <p className="text-center text-xs sm:text-sm text-[#1d0f7b] font-medium">
          Backed By Our Money Back Guarantee!
        </p>
      </div>
    </div>
  );
};

export default ApplicationModal;


