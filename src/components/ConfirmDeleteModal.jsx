import React from "react";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, title, message, memberName }) => {
  if (!isOpen) return null;

  const handleOverlayClick = () => {
    if (onClose) onClose();
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={handleOverlayClick}
      />

      {/* Modal card */}
      <div
        className="relative w-full max-w-md max-h-[90vh] rounded-[32px] bg-white shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
      

        <div className="relative px-5 sm:px-7 pt-9 pb-5 sm:pt-7 sm:pb-6">
          {/* Header */}
          <div className="flex items-center justify-center mb-4 sm:mb-5">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-center text-xl sm:text-2xl font-bold text-gray-900 mb-3">
            {title || "Confirm Deletion"}
          </h2>

          {/* Message */}
          <p className="text-center text-sm sm:text-base text-gray-600 mb-6">
            {message || "Are you sure you want to delete this item?"}
            {memberName && (
              <span className="block mt-2 font-semibold text-gray-900">
                {memberName}
              </span>
            )}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-12 sm:h-14 px-4 rounded-full border-2 border-gray-300 bg-white text-gray-700 text-sm sm:text-base font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="flex-1 h-12 sm:h-14 px-4 rounded-full bg-red-600 text-white text-sm sm:text-base font-semibold shadow-lg hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
