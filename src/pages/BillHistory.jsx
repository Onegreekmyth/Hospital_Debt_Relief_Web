import React, { useState } from "react";
import Navbar from "../components/Navbar";
import billHistoryBg from "../assets/bill-history.png";

const BillHistory = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (key) => {
    setOpenSection((prev) => (prev === key ? null : key));
  };

  const sections = [
    { key: "submitted", label: "Submitted Bills" },
    { key: "unsent", label: "Unsubmitted / Saved Bills" },
    { key: "refund", label: "Submit Refund Request" },
  ];

  return (
    <div className="min-h-screen">
      {/* Background layer */}
      <div
        className="fixed inset-0 -z-10 opacity-50 bg-cover bg-top top-[-4rem]"
        style={{
          backgroundImage: `url(${billHistoryBg})`,
        }}
      />

      {/* Content with light overlay */}
      <div className="min-h-screen bg-white/30 flex flex-col">
        <Navbar />

        <div className="flex-1 pt-28 md:pt-32 pb-10">
        <div className="w-[92%] md:w-[90%] lg:w-[86%] mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-8 md:gap-10 lg:gap-16">
          {/* Left: Accordion-style controls */}
          <div className="w-full max-w-xl space-y-6 mt-10 md:mt-16 lg:mt-32">
            {sections.map((section) => (
              <div
                key={section.key}
                className="bg-white/90 border border-purple-200 rounded-[999px] shadow-sm overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleSection(section.key)}
                  className="w-full flex items-center justify-between px-6 md:px-10 py-4 md:py-5 text-left"
                >
                  <span className="text-[16px] md:text-[20px] font-semibold text-gray-900">
                    {section.label}
                  </span>
                  <span className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-gray-700 text-lg">
                    {openSection === section.key ? "˄" : "˅"}
                  </span>
                </button>

                {/* Placeholder expanded area */}
                {openSection === section.key && (
                  <div className="px-6 md:px-10 pb-5 text-sm text-gray-700">
                    <p className="text-[12px] md:text-[13px]">
                      This section will display your {section.label.toLowerCase()}. Design and
                      content can be wired to real data later.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right: illustrative panel placeholder (matches layout in design) */}
          <div className="hidden lg:block flex-1" />
        </div>
        </div>
      </div>
    </div>
  );
};

export default BillHistory;


