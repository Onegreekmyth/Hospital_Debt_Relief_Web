import React from "react";

const CloseIcon = () => (
  <svg
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const MegaphoneIcon = () => (
  <svg
    className="h-5 w-5 shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M3 11v2a1 1 0 0 0 1 1h2l6 4V6L6 10H4a1 1 0 0 0-1 1z" />
    <path d="M15.5 8.5a4 4 0 0 1 0 7" />
    <path d="M19 6a7 7 0 0 1 0 12" />
  </svg>
);

const FreeTrialBanner = ({ className = "", onClose }) => {
  const handleCtaClick = (e) => {
    const target = document.getElementById("savings-calculator");
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      className={`w-full bg-[#ffe566] text-gray-900 ${className}`}
      role="region"
      aria-label="90-day free trial promotion"
    >
      <div className="relative mx-auto flex max-w-6xl items-center justify-center gap-2 px-10 py-2.5 text-center sm:gap-3 sm:px-12 sm:py-3">
        <MegaphoneIcon />
        <p className="text-xs font-semibold leading-snug sm:text-sm md:text-[15px]">
          Try our service{" "}
          <a
            href="#savings-calculator"
            onClick={handleCtaClick}
            className="underline decoration-dotted decoration-gray-900 underline-offset-[3px] hover:text-purple-900"
          >
            FREE for 90 days
          </a>
          {" – "}First bill $0 (no card). Membership from $7/mo.
        </p>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-gray-800 transition hover:bg-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 sm:right-3"
            aria-label="Close promotion banner"
          >
            <CloseIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default FreeTrialBanner;
