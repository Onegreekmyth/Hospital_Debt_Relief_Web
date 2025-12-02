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

        <div className="flex-1 pt-24 md:pt-28 pb-10 mt-24">
        <div className="w-[92%] md:w-[90%] lg:w-[86%] mx-auto flex flex-col lg:flex-row items-start lg:items-start gap-8 md:gap-10 lg:gap-16">
          {/* Left: Accordion-style controls */}
          <div className="w-full max-w-xl space-y-6 mt-8 md:mt-10 lg:mt-12">
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

          {/* Right: Bill history summary panel */}
          <div className="hidden lg:flex flex-1 justify-end mt-8 md:mt-10 lg:mt-12">
            <div className="w-full max-w-xl rounded-3xl bg-gradient-to-br from-[#b9b0e9] via-[#c9c0f2] to-[#b9b0e9] shadow-xl border border-white/40 p-5 md:p-6 backdrop-blur-sm bg-opacity-90">
              {/* Current Activity */}
              <div>
                <h3 className="text-xs md:text-sm font-semibold tracking-[0.12em] text-white mb-3">
                  CURRENT ACTIVITY
                </h3>

                <div className="rounded-2xl bg-white/85 shadow-sm overflow-hidden text-[11px] md:text-xs text-gray-800">
                  <div className="grid grid-cols-4 bg-white/90 font-semibold px-4 py-2 border-b border-white/60">
                    <span>Current Activity</span>
                    <span className="text-right">$310.00</span>
                    <span className="text-right">$730.00</span>
                    <span className="text-right">$80.00</span>
                  </div>
                  <div className="grid grid-cols-4 px-4 py-2 border-b border-white/60">
                    <span>Current aaatom</span>
                    <span className="text-right">$130.00</span>
                    <span className="text-right">$100.00</span>
                    <span className="text-right">$30.00</span>
                  </div>
                  <div className="grid grid-cols-4 px-4 py-2 border-b border-white/60">
                    <span>Denept aoottons</span>
                    <span className="text-right">$150.00</span>
                    <span className="text-right">$730.00</span>
                    <span className="text-right">$60.00</span>
                  </div>
                  <div className="grid grid-cols-4 px-4 py-2">
                    <span>Current asstion</span>
                    <span className="text-right">$130.00</span>
                    <span className="text-right">$720.00</span>
                    <span className="text-right">$150.00</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="my-4 border-t border-white/60" />

              {/* Historical Data */}
              <div>
                <h3 className="text-xs md:text-sm font-semibold tracking-[0.12em] text-white mb-3">
                  HISTORICAL DATA
                </h3>

                <div className="rounded-2xl bg-white/90 shadow-sm overflow-hidden flex">
                  {/* List */}
                  <div className="flex-1 py-2 text-[11px] md:text-xs text-gray-800">
                    {[
                      { title: "Huti Fnadrst vlier", amount: "$140.00" },
                      { title: "Huti Fnelrst vlier", amount: "$190.00" },
                      { title: "Huti Fnerlstrvits", amount: "$150.00" },
                      { title: "Huti Fnerlstrvits", amount: "$210.00" },
                    ].map((row, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center justify-between px-4 py-2 ${
                          idx !== 3 ? "border-b border-gray-200/60" : ""
                        }`}
                      >
                        <div>
                          <p className="font-semibold">{row.title}</p>
                          <p className="text-[10px] text-gray-500">Teext Resria Reert</p>
                        </div>
                        <p className="font-semibold">{row.amount}</p>
                      </div>
                    ))}
                  </div>

                  {/* Simple graph placeholder + magnifier icon */}
                  <div className="w-24 md:w-28 flex flex-col justify-between items-center py-4 pr-3">
                    {/* Graph */}
                    <svg
                      viewBox="0 0 80 40"
                      className="w-16 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline
                        points="5,30 20,22 35,28 50,18 65,10 75,6"
                        className="opacity-90"
                      />
                      {["5,30", "20,22", "35,28", "50,18", "65,10", "75,6"].map((p, i) => {
                        const [x, y] = p.split(",").map(Number);
                        return <circle key={i} cx={x} cy={y} r="2.5" className="fill-white" />;
                      })}
                    </svg>

                    {/* Magnifier */}
                    <div className="mt-4 w-8 h-8 rounded-full border border-white/80 flex items-center justify-center text-white">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="11" cy="11" r="5" />
                        <line x1="16" y1="16" x2="21" y2="21" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default BillHistory;