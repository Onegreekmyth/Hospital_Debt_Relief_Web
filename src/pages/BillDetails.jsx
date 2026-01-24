import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import uploadImg from "../assets/upload-circle.png";
import billPlaceholder from "../assets/bill-history.png";
import axiosClient from "../api/axiosClient";

const BillDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const [uploadedFileName, setUploadedFileName] = useState("");

  // Fetch bill from API and transform to match MOCK_BILLS format
  useEffect(() => {
    const fetchBill = async () => {
      try {
        setLoading(true);
        setError("");
        
        const response = await axiosClient.get(`/bills/${id}`);
        
        if (response.data.success) {
          const apiBill = response.data.data;
          
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
            if (!amount && amount !== 0) return "$0.00";
            return `$${Number(amount).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`;
          };

          // Format date
          const formatDate = (dateString) => {
            if (!dateString) return "N/A";
            const date = new Date(dateString);
            return date.toLocaleDateString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
            });
          };

          // Transform to match MOCK_BILLS format
          const transformedBill = {
            id: apiBill._id,
            hospital: apiBill.patientName || "N/A",
            amount: formatCurrency(apiBill.billAmount),
            newAmount: formatCurrency(apiBill.billAmount * 0.55), // Placeholder calculation (45% discount)
            savedAmount: formatCurrency(apiBill.billAmount * 0.45), // Placeholder calculation
            amountPaidToUs: "$299.00", // Placeholder
            status: mapStatusToUI(apiBill.status),
            date: formatDate(apiBill.submittedAt || apiBill.createdAt),
            billNumber: `BH-${apiBill._id.toString().slice(-4).toUpperCase()}`, // Generate from ID
            pdfUrl: apiBill.pdfUrl, // Keep for PDF display
            supportingDocuments: apiBill.supportingDocuments || [], // Keep for supporting docs
          };

          setBill(transformedBill);
        } else {
          setError("Bill not found");
        }
      } catch (err) {
        console.error("Error fetching bill:", err);
        const message =
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Failed to load bill";
        setError(message);
        
        // If unauthorized, redirect to login
        if (err.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBill();
    }
  }, [id, navigate]);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5fb]">
        <Navbar />
        <main className="pt-28 md:pt-28 pb-16 mt-10">
          <div className="w-[92%] md:w-[90%] lg:w-[86%] mx-auto">
            <div className="bg-white border border-gray-200 rounded-[32px] shadow-sm p-10 text-center text-gray-700">
              Loading bill details...
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !bill) {
    return (
      <div className="min-h-screen bg-[#f5f5fb]">
        <Navbar />
        <main className="pt-28 md:pt-28 pb-16 mt-10">
          <div className="w-[92%] md:w-[90%] lg:w-[86%] mx-auto">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mb-6 inline-flex text-sm text-purple-700 hover:text-purple-900"
            >
              ← Back to Bill History
            </button>
            <div className="bg-white border border-gray-200 rounded-[32px] shadow-sm p-10 text-center text-gray-700">
              {error || "Bill not found."}
            </div>
          </div>
        </main>
      </div>
    );
  }

  const isPending = bill.status === "Pending";
  const heading =
    bill.status === "Submitted"
      ? "View Submitted Bill"
      : bill.status === "Pending"
      ? "View Pending Bill"
      : "Bill Details";

  return (
    <div className="min-h-screen bg-[#f5f5fb]">
      <Navbar />

      <main className="pt-28 md:pt-28 pb-16 mt-10">
        <div className="w-[92%] md:w-[90%] lg:w-[86%] mx-auto">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {heading}
            </h1>

            <button
              type="button"
              onClick={() => navigate("/bill-history")}
              className="hidden md:inline-flex items-center text-sm text-purple-700 hover:text-purple-900"
            >
              ← Back to Bill History
            </button>
          </div>

          <section className="bg-white border border-[#e0dcff] rounded-[32px] shadow-sm px-4 py-6 md:px-10 md:py-8">
            {isPending ? (
              <>
                {/* Pending view: only uploaded bill + basic info */}
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Uploaded Bill card */}
                  <div className="relative flex flex-col max-w-[360px] w-full">
                    {/* Floating label with actions */}
                    <div className="absolute -top-4 left-6 bg-white px-4 py-1 rounded-b-md flex items-center gap-3">
                      <span className="text-md font-medium text-gray-800">
                        Uploaded Bill
                      </span>
                      {/* Edit icon */}
                      <button
                        type="button"
                        className="text-purple-500 hover:text-purple-700"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536M4 20h4l9.268-9.268a2 2 0 000-2.828l-2.172-2.172a2 2 0 00-2.828 0L4 16v4z"
                          />
                        </svg>
                      </button>
                      {/* Delete icon */}
                      <button
                        type="button"
                        className="text-purple-500 hover:text-purple-700"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2m-9 0h10"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="border border-[#d0c5ff] rounded-[32px] px-4 pt-6 pb-6 md:px-6 md:pt-8 md:pb-7 flex flex-col min-h-[420px] md:min-h-[520px]">
                      <p className="text-sm text-[#8c86c3] mb-3 md:mb-4 text-center">
                        Image of Uploaded Bill
                      </p>
                      {bill.pdfUrl ? (
                        <iframe
                          src={bill.pdfUrl}
                          className="w-full h-full max-h-[360px] rounded-2xl"
                          title="Bill PDF"
                        />
                      ) : (
                        <img
                          src={billPlaceholder}
                          alt="Uploaded bill placeholder"
                          className="w-full h-full max-h-[360px] object-contain rounded-2xl"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Bill Amount + Date Submitted */}
                <div className="mt-8 max-w-[360px] w-full">
                  {/* Bill Amount */}
                  <div className="relative mb-4">
                    <div className="absolute -top-3 left-6 bg-white px-3 py-1 rounded-b-md">
                      <span className="text-xs font-medium text-gray-800">
                        Bill Amount
                      </span>
                    </div>
                    <div className="rounded-full border border-[#3d3654] px-6 py-4 md:py-5 flex items-center">
                      <span className="text-base md:text-lg font-semibold text-gray-900">
                        {bill.amount}
                      </span>
                    </div>
                  </div>

                  {/* Date Submitted */}
                  <div className="relative">
                    <div className="absolute -top-3 left-6 bg-white px-3 py-1 rounded-b-md">
                      <span className="text-xs font-medium text-gray-800">
                        Date Submitted
                      </span>
                    </div>
                    <div className="rounded-full border border-[#3d3654] px-6 py-4 md:py-5 flex items-center">
                      <span className="text-base md:text-lg font-semibold text-gray-900">
                        {bill.date}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Submitted / other view: full layout */}
                {/* Top 3-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                  {/* Uploaded Bill */}
                  <div className="relative flex flex-col">
                    {/* Floating label tab */}
                    <div className="absolute -top-4 left-6 bg-white px-4 py-1 rounded-b-md">
                      <span className="text-md font-medium text-gray-800">
                        Uploaded Bill
                      </span>
                    </div>

                    <div className="border border-[#d0c5ff] rounded-[32px] px-4 pt-6 pb-6 md:px-6 md:pt-8 md:pb-7 flex flex-col min-h-[420px] md:min-h-[520px] max-w-[340px] w-full mx-auto">
                      <p className="text-sm text-[#8c86c3] mb-3 md:mb-4 text-center">
                        Image of Uploaded Bill
                      </p>

                      {bill.pdfUrl ? (
                        <iframe
                          src={bill.pdfUrl}
                          className="w-full h-full max-h-[360px] rounded-2xl"
                          title="Bill PDF"
                        />
                      ) : (
                        <img
                          src={billPlaceholder}
                          alt="Uploaded bill placeholder"
                          className="w-full h-full max-h-[360px] object-contain rounded-2xl"
                        />
                      )}
                    </div>
                  </div>

                  {/* Upload New Bill */}
                  <div className="relative flex flex-col">
                    {/* Floating label tab */}
                    <div className="absolute -top-4 left-6 bg-white px-4 py-1 rounded-b-md">
                      <span className="text-md font-medium text-gray-800">
                        Upload New Bill
                      </span>
                    </div>

                    <div
                      className="flex-1 rounded-[46px] border border-[#5d3aba] flex flex-col items-center justify-center text-center px-6 py-10 md:py-14 cursor-pointer hover:shadow-lg transition min-h-[420px] md:min-h-[520px] max-w-[340px] w-full mx-auto"
                      onClick={handleUploadClick}
                    >
                      <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mb-6">
                        <img
                          src={uploadImg}
                          alt="Upload"
                          className="w-12 h-12 md:w-14 md:h-14 object-contain"
                        />
                      </div>
                      <p className="text-sm md:text-base font-medium text-gray-400">
                        {uploadedFileName || "Upload Copy of New Bill"}
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>

                  {/* Amounts & CTA */}
                  <div className="flex flex-col justify-between gap-5 md:gap-6">
                    <div className="space-y-6 md:space-y-7">
                      {/* Amount Saved */}
                      <div className="relative">
                        <div className="absolute -top-3 left-6 bg-white px-3 py-1 rounded-b-md">
                          <span className="text-xs font-medium text-gray-800">
                            Amount Saved
                          </span>
                        </div>
                        <div className="rounded-full border border-[#3d3654] px-6 py-4 md:py-5 flex items-center">
                          <span className="text-base md:text-lg font-semibold text-gray-900">
                            {bill.savedAmount}
                          </span>
                        </div>
                      </div>

                      {/* Amount Paid to Us */}
                      <div className="relative">
                        <div className="absolute -top-3 left-6 bg-white px-3 py-1 rounded-b-md">
                          <span className="text-xs font-medium text-gray-800">
                            Amount Paid to Us
                          </span>
                        </div>
                        <div className="rounded-full border border-[#3d3654] px-6 py-4 md:py-5 flex items-center">
                          <span className="text-base md:text-lg font-semibold text-gray-900">
                            {bill.amountPaidToUs}
                          </span>
                        </div>
                      </div>

                      {/* Submit button */}
                      <button
                        type="button"
                        className="w-full inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#7a3cff] to-[#15103b] px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-semibold text-white shadow-md hover:from-[#6a34e3] hover:to-[#120d33]"
                      >
                        Submit Refund Request
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom row */}
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {/* Bill Amount */}
                  <div className="relative">
                    <div className="absolute -top-3 left-6 bg-white px-3 py-1 rounded-b-md">
                      <span className="text-xs font-medium text-gray-800">
                        Bill Amount
                      </span>
                    </div>
                    <div className="rounded-full border border-[#3d3654] px-6 py-4 md:py-5 flex items-center">
                      <span className="text-base md:text-lg font-semibold text-gray-900">
                        {bill.amount}
                      </span>
                    </div>
                  </div>

                  {/* New Bill Amount */}
                  <div className="relative">
                    <div className="absolute -top-3 left-6 bg-white px-3 py-1 rounded-b-md">
                      <span className="text-xs font-medium text-gray-800">
                        New Bill Amount
                      </span>
                    </div>
                    <div className="rounded-full border border-[#3d3654] px-6 py-4 md:py-5 flex items-center">
                      <span className="text-base md:text-lg font-semibold text-gray-900">
                        {bill.newAmount}
                      </span>
                    </div>
                  </div>

                  {/* Date Submitted */}
                  <div className="relative">
                    <div className="absolute -top-3 left-6 bg-white px-3 py-1 rounded-b-md">
                      <span className="text-xs font-medium text-gray-800">
                        Date Submitted
                      </span>
                    </div>
                    <div className="rounded-full border border-[#3d3654] px-6 py-4 md:py-5 flex items-center">
                      <span className="text-base md:text-lg font-semibold text-gray-900">
                        {bill.date}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default BillDetails;


