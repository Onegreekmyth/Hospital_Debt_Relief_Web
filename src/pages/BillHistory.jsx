import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axiosClient from "../api/axiosClient";

const BillHistory = () => {
  const [filter, setFilter] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch bills from API
  useEffect(() => {
    const fetchBills = async () => {
      try {
        setLoading(true);
        setError("");
        
        // Build query params
        const params = new URLSearchParams();
        if (filter !== "All") {
          // Map UI filter to backend status
          const statusMap = {
            "Submitted": "submitted",
            "Pending": "pending",
            "Refunded": "approved", // Assuming refunded = approved
          };
          if (statusMap[filter]) {
            params.append("status", statusMap[filter]);
          }
        }
        params.append("limit", "100"); // Get all bills for now

        const response = await axiosClient.get(`/bills?${params.toString()}`);
        
        if (response.data.success) {
          setBills(response.data.data || []);
        }
      } catch (err) {
        console.error("Error fetching bills:", err);
        const message =
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Failed to load bills";
        setError(message);
        
        // If unauthorized, redirect to login
        if (err.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, [filter, navigate]);

  // Map backend status to UI status
  const mapStatusToUI = (backendStatus) => {
    const statusMap = {
      pending: "Pending",
      submitted: "Submitted",
      processing: "Submitted",
      approved: "Refunded",
      rejected: "Pending",
    };
    return statusMap[backendStatus] || "Pending";
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `$${Number(amount).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // Transform API data to UI format
  const transformedBills = bills.map((bill) => ({
    id: bill._id,
    hospital: bill.patientName || "N/A", // Using patientName as hospital placeholder
    amount: formatCurrency(bill.billAmount),
    saving: "$0.00", // Placeholder - can be calculated later
    status: mapStatusToUI(bill.status),
    rawStatus: bill.status, // Keep for filtering
    pdfUrl: bill.pdfUrl || bill.pdf, // Can be PDF or image from API
  }));

  const filteredBills = transformedBills.filter((bill) => {
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
                className="flex items-center gap-2 rounded-full border border-[#5d3aba] px-4 py-2 text-xs md:text-sm font-medium text-purple-800 bg-white shadow-sm hover:bg-gray-100 transition"
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
            {/* Loading State */}
            {loading && (
              <div className="p-10 text-center text-gray-500">
                Loading bills...
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="p-10 text-center text-red-600">
                {error}
              </div>
            )}

            {/* Table */}
            {!loading && !error && (
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
                              onClick={() => navigate(`/bill-history/${bill.id}`)}
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
                        colSpan={5}
                        className="px-6 md:px-10 py-10 text-center text-sm text-gray-500"
                      >
                        No bills found for this filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default BillHistory;