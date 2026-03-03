import React from "react";

const SubscriptionDetailsModal = ({
  isOpen,
  onClose,
  effectiveStatus,
  subscriptionDate,
  subscriptionEndDate,
  subscriptionWillCancel,
  subscriptionInfo,
  onCancelClick,
}) => {
  if (!isOpen) return null;

  const statusLabel =
    effectiveStatus === "active"
      ? "Active"
      : effectiveStatus === "cancelled"
      ? "Cancelled"
      : "Inactive";

  const statusClass =
    effectiveStatus === "active"
      ? "bg-green-100 text-green-700"
      : effectiveStatus === "cancelled"
      ? "bg-amber-100 text-amber-800"
      : "bg-[#ffd7da] text-[#d45360]";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" aria-hidden />
      <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
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

        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Membership Details</h3>

        <div className="space-y-4">
          {subscriptionInfo && (
            <div>
              <p className="text-xs text-gray-600">Membership Type</p>
              <p className="font-medium text-gray-900">{subscriptionInfo.type}</p>
            </div>
          )}

          <div>
            <p className="text-xs text-gray-600">Status</p>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] md:text-xs font-medium ${statusClass}`}
            >
              {statusLabel}
            </span>
          </div>

          {effectiveStatus === "active" && (
            <div>
              <p className="text-xs text-gray-600">Start Date</p>
              <p className="font-medium text-gray-900">{subscriptionDate}</p>
            </div>
          )}

          {(subscriptionWillCancel || effectiveStatus === "cancelled") && (
            <div>
              <p className="text-xs text-gray-600">End Date</p>
              <p className="font-medium text-gray-900">
                {subscriptionEndDate || "the end of the current billing period"}
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-col gap-3">
          {effectiveStatus === "active" && !subscriptionWillCancel && onCancelClick && (
            <button
              type="button"
              onClick={onCancelClick}
              className="w-full rounded-full bg-[#2e1570] py-2.5 text-sm md:text-base font-semibold text-white hover:bg-[#241053] transition"
            >
              Cancel Membership
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-full border-2 border-[#4e30a2] py-2.5 text-sm md:text-base font-semibold text-[#4e30a2] hover:bg-purple-50 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDetailsModal;
