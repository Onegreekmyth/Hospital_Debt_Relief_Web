import React from "react";

/**
 * Standalone "Your bill has been received" modal.
 * Use after $299 payment return or after subscribed user completes Submit My Bill.
 */
const BillReceivedModal = ({ isOpen, onClose, billId, onViewBillDetails }) => {
  if (!isOpen) return null;

  const handleViewBillDetails = () => {
    if (billId && onViewBillDetails) {
      onViewBillDetails(billId);
    }
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50"
        aria-hidden
        onClick={onClose}
      />
      <div className="relative w-full max-w-sm sm:max-w-md bg-white rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8 text-center">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4 md:mb-6">
          <svg
            className="w-8 h-8 md:w-10 md:h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
          Your bill has been received.
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          You can view and manage your bill below.
        </p>
        <button
          type="button"
          onClick={handleViewBillDetails}
          className="w-full py-3 rounded-full bg-gradient-to-r from-purple-700 to-purple-900 text-white font-bold text-sm md:text-base hover:from-purple-600 hover:to-purple-800 transition-all shadow-lg"
        >
          View Bill Details
        </button>
        <p className="text-center text-[11px] md:text-sm text-gray-500 mt-4">
          Backed By Our Money Back Guarantee!
        </p>
      </div>
    </div>
  );
};

export default BillReceivedModal;
