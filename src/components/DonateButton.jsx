import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDonationSession, clearDonationError } from "../store/payments/paymentsSlice";

const DonateButton = () => {
  const dispatch = useDispatch();
  const { donationLoading, donationError } = useSelector((state) => state.payments);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onEscape = (e) => {
      if (e.key === "Escape" && !donationLoading) setOpen(false);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [open, donationLoading]);

  const amounts = [
    { label: "$5", cents: 500 },
    { label: "$10", cents: 1000 },
    { label: "$15", cents: 1500 },
  ];

  const handleDonate = async (amountInCents) => {
    dispatch(clearDonationError());
    const base = window.location.origin + window.location.pathname;
    const successUrl = `${base}${base.includes("?") ? "&" : "?"}donation=success`;
    const cancelUrl = `${base}${base.includes("?") ? "&" : "?"}donation=cancelled`;
    try {
      const url = await dispatch(
        createDonationSession({ amountInCents, successUrl, cancelUrl })
      ).unwrap();
      if (url) window.location.href = url;
    } catch (_) {
      // Error shown via donationError
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#7a3cff] to-[#15103b] text-white shadow-lg hover:from-[#6a34e3] hover:to-[#120d33] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 md:h-16 md:w-16"
        aria-label="Donate"
        title="Donate"
      >
        <svg
          className="h-7 w-7 md:h-8 md:w-8"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
          onClick={() => !donationLoading && setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="donate-dialog-title"
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="donate-dialog-title" className="text-lg font-semibold text-gray-900">
              Support us with a donation
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Choose an amount to donate. Thank you for your generosity.
            </p>
            {donationError && (
              <p className="mt-2 text-sm text-red-600">{donationError}</p>
            )}
            <div className="mt-4 flex flex-col gap-3">
              {amounts.map(({ label, cents }) => (
                <button
                  key={cents}
                  type="button"
                  disabled={donationLoading}
                  onClick={() => handleDonate(cents)}
                  className="w-full rounded-full bg-gradient-to-r from-[#7a3cff] to-[#15103b] px-4 py-3 text-base font-semibold text-white shadow hover:from-[#6a34e3] hover:to-[#120d33] disabled:opacity-70"
                >
                  {donationLoading ? "Redirecting…" : `Donate ${label}`}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => !donationLoading && setOpen(false)}
              className="mt-4 w-full text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DonateButton;
