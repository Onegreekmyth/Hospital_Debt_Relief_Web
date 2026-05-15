import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { donate, clearDonationError } from "../store/payments/paymentsSlice";
import PaymentModal from "./PaymentModal";

const DONATION_OPTIONS_CENTS = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
const MIN_INDEX = 0;
const MAX_INDEX = DONATION_OPTIONS_CENTS.length - 1;

const DonateButton = () => {
  const dispatch = useDispatch();
  const { donationLoading, donationError } = useSelector((state) => state.payments);
  const [open, setOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [amountIndex, setAmountIndex] = useState(1);

  useEffect(() => {
    if (!open) return;
    const onEscape = (e) => {
      if (e.key === "Escape" && !donationLoading) setOpen(false);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [open, donationLoading]);

  const amountCents = DONATION_OPTIONS_CENTS[amountIndex];
  const amountDollars = (amountCents / 100).toFixed(2);

  const handleDonateOpaque = async ({ dataDescriptor, dataValue }) => {
    dispatch(clearDonationError());
    await dispatch(
      donate({ amountInCents: amountCents, dataDescriptor, dataValue })
    ).unwrap();
    setPaymentOpen(false);
    setOpen(false);
    alert("Thank you for your donation!");
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
        <svg className="h-7 w-7 md:h-8 md:w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
          onClick={() => !donationLoading && setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-gray-900">Support us with a donation</h2>
            <p className="mt-1.5 text-sm text-gray-500">
              Choose an amount to donate. Thank you for your generosity.
            </p>
            {donationError && <p className="mt-3 text-sm text-red-600">{donationError}</p>}

            <div className="mt-6 flex w-full items-center gap-2">
              <button
                type="button"
                disabled={donationLoading || amountIndex >= MAX_INDEX}
                onClick={() => setAmountIndex((i) => Math.min(MAX_INDEX, i + 1))}
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-[#7a3cff] to-[#15103b] text-white shadow-md hover:opacity-95 disabled:opacity-40"
                aria-label="Increase amount"
              >
                <span className="text-2xl font-bold leading-none">+</span>
              </button>
              <div className="flex min-h-[64px] min-w-0 flex-1 items-center justify-center rounded-full bg-[#1B0D47] py-5">
                <span className="text-2xl font-bold text-white">${amountDollars}</span>
              </div>
              <button
                type="button"
                disabled={donationLoading || amountIndex <= MIN_INDEX}
                onClick={() => setAmountIndex((i) => Math.max(MIN_INDEX, i - 1))}
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-[#7a3cff] to-[#15103b] text-white shadow-md hover:opacity-95 disabled:opacity-40"
                aria-label="Decrease amount"
              >
                <span className="text-2xl font-bold leading-none">−</span>
              </button>
            </div>

            <button
              type="button"
              disabled={donationLoading}
              onClick={() => setPaymentOpen(true)}
              className="mt-6 block w-full rounded-full bg-gradient-to-r from-[#7a3cff] to-[#15103b] px-4 py-4 text-base font-semibold text-white shadow-md hover:opacity-95 disabled:opacity-70"
            >
              {donationLoading ? "Processing…" : `Confirm and Donate $${amountDollars}`}
            </button>

            <button
              type="button"
              onClick={() => !donationLoading && setOpen(false)}
              className="mt-4 block w-full text-center text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <PaymentModal
        isOpen={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        title="Complete your donation"
        amountLabel={`$${amountDollars}`}
        loading={donationLoading}
        error={donationError}
        onSubmit={handleDonateOpaque}
      />
    </>
  );
};

export default DonateButton;
