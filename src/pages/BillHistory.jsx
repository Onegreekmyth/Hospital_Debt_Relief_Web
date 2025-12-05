import React, { useState } from "react";
import Navbar from "../components/Navbar";

const MOCK_BILLS = [
  {
    id: 1,
    hospital: "Hopkins Hospital",
    amount: "$450",
    saving: "$100",
    status: "Submitted",
  },
  {
    id: 2,
    hospital: "Massachusetts General Hospital",
    amount: "$450",
    saving: "$100",
    status: "Pending",
  },
  {
    id: 3,
    hospital: "Hopkins Hospital",
    amount: "$450",
    saving: "$100",
    status: "Submitted",
  },
  {
    id: 4,
    hospital: "Massachusetts General Hospital",
    amount: "$450",
    saving: "$100",
    status: "Refunded",
  },
];

const BillHistory = () => {
  const [filter, setFilter] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredBills = MOCK_BILLS.filter((bill) => {
    if (filter === "Submitted") return bill.status === "Submitted";
    if (filter === "Pending") return bill.status === "Pending";
    if (filter === "Refunded") return bill.status === "Refunded";
    return true;
  });

  const getStatusBadgeClasses = (status) => {
    if (status === "Submitted") {
      return "bg-[#C7F5C4] text-[#1B8F3A]";
    }
    if (status === "Pending") {
      return "bg-[#FFD6DA] text-[#D35662]";
    }
    return "bg-[#FFD6DA] text-[#D35662]";
  };

  return (
    <div className="min-h-screen bg-[#f5f5fb]">
      <Navbar />

      <main className="pt-28 md:pt-28 pb-16 mt-10">
        <div className="w-[92%] md:w-[90%] lg:w-[86%] mx-auto">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Bill History
            </h1>

            {/* Filter dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsFilterOpen((open) => !open)}
                className="flex items-center gap-2 rounded-full border border-purple-800 px-4 py-2 text-xs md:text-sm font-medium text-purple-800 bg-white shadow-sm hover:bg-purple-50 transition"
              >
                {/* Simple icon */}
                <span className="flex h-7 w-8 text-3xl items-center justify-center rounded-full text-purple-800 text-base">
                  ≡
                </span>
                <span>Filter</span>
              </button>

              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-2xl border border-purple-800 bg-white shadow-lg py-2 text-sm z-10">
                  <button
                    type="button"
                    onClick={() => {
                      setFilter("Submitted");
                      setIsFilterOpen(false);
                    }}
                    className="block w-full text-left px-5 py-2 hover:bg-purple-50 text-gray-800"
                  >
                    Submitted Bills
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFilter("Pending");
                      setIsFilterOpen(false);
                    }}
                    className="block w-full text-left px-5 py-2 hover:bg-purple-50 text-gray-800"
                  >
                    Pending Bills
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFilter("All");
                      setIsFilterOpen(false);
                    }}
                    className="block w-full text-left px-5 py-2 hover:bg-purple-50 text-gray-800"
                  >
                    Show All
                  </button>
                </div>
              )}
            </div>
          </div>

          <section className="bg-white border border-gray-300 rounded-[32px] shadow-sm overflow-hidden">
          

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm md:text-base">
                <thead>
                  <tr className="border-b border-gray-300 text-xs md:text-lg text-black">
                    <th className="px-6 md:px-10 py-4 font-large">Hospital Name</th>
                    <th className="px-4 py-4 font-large">Bill Amount</th>
                    <th className="px-4 py-4 font-large">Calculated Saving</th>
                    <th className="px-6 py-4 font-large text-right pr-8 md:pr-10">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-800">
                  {filteredBills.map((bill) => (
                    <tr
                      key={bill.id}
                      className="border-b border-gray-100 last:border-0 hover:bg-[#faf9ff] transition"
                    >
                      <td className="px-6 md:px-10 py-4">
                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            className="text-xs md:text-sm font-semibold text-purple-700 hover:text-purple-900"
                          >
                            View
                          </button>
                          <span className="text-sm md:text-base font-medium">
                            {bill.hospital}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm md:text-base">{bill.amount}</td>
                      <td className="px-4 py-4 text-sm md:text-base">{bill.saving}</td>
                      <td className="px-6 py-4 text-right pr-8 md:pr-10">
                        <span
                          className={`inline-flex items-center rounded-full px-4 py-1 text-xs md:text-sm font-medium ${getStatusBadgeClasses(
                            bill.status
                          )}`}
                        >
                          {bill.status}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {filteredBills.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 md:px-10 py-10 text-center text-sm text-gray-500"
                      >
                        No bills found for this filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default BillHistory;