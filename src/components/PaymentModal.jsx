import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { loadAcceptJs, tokenizeCard } from "../utils/acceptJs";
import {
  cardDigitsOnly,
  formatCardNumberDisplay,
  formatCvvDisplay,
  formatExpMonthDisplay,
  formatExpYearDisplay,
} from "../utils/cardFormatting";

const PaymentModal = ({
  isOpen,
  onClose,
  title = "Payment",
  description,
  amountLabel,
  onSubmit,
  loading = false,
  error = "",
  showDonorFields = false,
}) => {
  const [config, setConfig] = useState(null);
  const [configError, setConfigError] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [localError, setLocalError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [donorEmail, setDonorEmail] = useState("");
  const [donorFirstName, setDonorFirstName] = useState("");
  const [donorLastName, setDonorLastName] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setLocalError("");
    setCardNumber("");
    setExpMonth("");
    setExpYear("");
    setCvv("");
    setDonorEmail("");
    setDonorFirstName("");
    setDonorLastName("");

    let cancelled = false;
    (async () => {
      try {
        const res = await axiosClient.get("/payments/config");
        const data = res.data?.data;
        if (!data?.apiLoginId || !data?.clientKey) {
          throw new Error("Payment is not configured on the server");
        }
        if (cancelled) return;
        const apiLoginId =
          data.apiLoginId ||
          import.meta.env.VITE_AUTHORIZE_NET_API_LOGIN_ID ||
          "";
        const clientKey =
          data.clientKey ||
          import.meta.env.VITE_AUTHORIZE_NET_PUBLIC_CLIENT_KEY ||
          "";
        if (!apiLoginId || !clientKey) {
          throw new Error("Payment is not configured on the server");
        }
        setConfig({ ...data, apiLoginId, clientKey });
        await loadAcceptJs(data.sandbox);
      } catch (err) {
        if (!cancelled) {
          setConfigError(err.message || "Failed to load payment form");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePay = async (e) => {
    e.preventDefault();
    setLocalError("");
    if (!config) {
      setLocalError(configError || "Payment form not ready");
      return;
    }
    if (!cardNumber || !expMonth || !expYear || !cvv) {
      setLocalError("Please enter all card details");
      return;
    }
    if (showDonorFields) {
      const email = donorEmail.trim();
      if (!email) {
        setLocalError("Email is required to send your receipt.");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setLocalError("Please enter a valid email address.");
        return;
      }
    }

    setProcessing(true);
    try {
      const opaque = await tokenizeCard({
        apiLoginId: config.apiLoginId,
        clientKey: config.clientKey,
        cardNumber,
        month: expMonth,
        year: expYear,
        cardCode: cvv,
      });
      await onSubmit({
        ...opaque,
        donorEmail: donorEmail.trim() || undefined,
        donorFirstName: donorFirstName.trim() || undefined,
        donorLastName: donorLastName.trim() || undefined,
      });
    } catch (err) {
      setLocalError(err.message || "Payment failed");
    } finally {
      setProcessing(false);
    }
  };

  const displayError = error || localError || configError;
  const busy = loading || processing;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-4"
      onClick={() => !busy && onClose()}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        {description && (
          <p className="mt-1.5 text-sm text-gray-600">{description}</p>
        )}
        {amountLabel && (
          <p className="mt-3 text-lg font-semibold text-[#2e1570]">{amountLabel}</p>
        )}

        {configError && !config ? (
          <p className="mt-4 text-sm text-red-600">{configError}</p>
        ) : (
          <form onSubmit={handlePay} className="mt-4 space-y-3">
            {showDonorFields && (
              <>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      First name (optional)
                    </label>
                    <input
                      type="text"
                      value={donorFirstName}
                      onChange={(e) => setDonorFirstName(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                      disabled={busy}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Last name (optional)
                    </label>
                    <input
                      type="text"
                      value={donorLastName}
                      onChange={(e) => setDonorLastName(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                      disabled={busy}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Email for receipt <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    autoComplete="email"
                    required
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    placeholder="you@example.com"
                    disabled={busy}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    We&apos;ll email you a payment receipt, similar to Stripe.
                  </p>
                </div>
              </>
            )}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Card number
              </label>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="cc-number"
                value={formatCardNumberDisplay(cardNumber)}
                onChange={(e) =>
                  setCardNumber(cardDigitsOnly(e.target.value).slice(0, 19))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-mono tracking-wide"
                placeholder="1234 5678 9012 3456"
                disabled={busy}
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">MM</label>
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="cc-exp-month"
                  maxLength={2}
                  value={expMonth}
                  onChange={(e) =>
                    setExpMonth(formatExpMonthDisplay(e.target.value))
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-center font-mono"
                  placeholder="MM"
                  disabled={busy}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">YY</label>
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="cc-exp-year"
                  maxLength={2}
                  value={expYear}
                  onChange={(e) =>
                    setExpYear(formatExpYearDisplay(e.target.value))
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-center font-mono"
                  placeholder="YY"
                  disabled={busy}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">CVV</label>
                <input
                  type="password"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  maxLength={4}
                  value={cvv}
                  onChange={(e) => setCvv(formatCvvDisplay(e.target.value))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-center font-mono tracking-widest"
                  placeholder="•••"
                  disabled={busy}
                />
              </div>
            </div>
            {displayError && (
              <p className="text-sm text-red-600">{displayError}</p>
            )}
            <button
              type="submit"
              disabled={busy || !config}
              className="w-full rounded-full bg-gradient-to-r from-[#7a3cff] to-[#15103b] py-3 text-sm font-semibold text-white disabled:opacity-60"
            >
              {busy ? "Processing…" : "Pay now"}
            </button>
          </form>
        )}

        <button
          type="button"
          onClick={onClose}
          disabled={busy}
          className="mt-4 w-full text-center text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;