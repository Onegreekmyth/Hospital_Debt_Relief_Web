import React from "react";

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

const FreeTrialBanner = ({ className = "" }) => {
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
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-2.5 text-center sm:gap-3 sm:py-3">
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
          {" – "}No credit card needed!
        </p>
      </div>
    </div>
  );
};

export default FreeTrialBanner;
