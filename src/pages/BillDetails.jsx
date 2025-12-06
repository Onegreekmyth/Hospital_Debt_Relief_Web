import React, { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import uploadImg from "../assets/upload-circle.png";
import billPlaceholder from "../assets/bill-history.png";

// Simple mock data – should match BillHistory and design for now
const MOCK_BILLS = [
  {
    id: 1,
    hospital: "Hopkins Hospital",
    amount: "$450.00",
    newAmount: "$249.22",
    savedAmount: "$200.78",
    amountPaidToUs: "$299.00",
    status: "Submitted",
    date: "11/20/2025",
    billNumber: "BH-0001",
  },
  {
    id: 2,
    hospital: "Massachusetts General Hospital",
    amount: "$450.00",
    newAmount: "$249.22",
    savedAmount: "$200.78",
    amountPaidToUs: "$299.00",
    status: "Submitted",
    date: "11/21/2025",
    billNumber: "BH-0002",
  },
  {
    id: 3,
    hospital: "Hopkins Hospital",
    amount: "$450.00",
    newAmount: "$249.22",
    savedAmount: "$200.78",
    amountPaidToUs: "$299.00",
    status: "Submitted",
    date: "11/22/2025",
    billNumber: "BH-0003",
  },
  {
    id: 4,
    hospital: "Massachusetts General Hospital",
    amount: "$450.00",
    newAmount: "$249.22",
    savedAmount: "$200.78",
    amountPaidToUs: "$299.00",
    status: "Submitted",
    date: "11/23/2025",
    billNumber: "BH-0004",
  },
];

const BillDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const bill = MOCK_BILLS.find((b) => String(b.id) === String(id));
  const fileInputRef = useRef(null);
  const [uploadedFileName, setUploadedFileName] = useState("");

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

  if (!bill) {
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
              Bill not found.
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5fb]">
      <Navbar />

      <main className="pt-28 md:pt-28 pb-16 mt-10">
        <div className="w-[92%] md:w-[90%] lg:w-[86%] mx-auto">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              View Submitted Bill
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

                    <img
                      src={billPlaceholder}
                      alt="Uploaded bill placeholder"
                      className="w-full h-full max-h-[360px] object-contain rounded-2xl"
                    />
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

            </div>
              {/* Date Submitted */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-5">
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
          </section>
        </div>
      </main>
    </div>
  );
};

export default BillDetails;


