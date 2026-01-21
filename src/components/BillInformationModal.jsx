import React, { useState } from "react";

const BillInformationModal = ({ isOpen, onClose, onSubmitted, isSubscriptionActive = true }) => {
  const [uploadError, setUploadError] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmitted) {
      onSubmitted();
    } else if (onClose) {
      onClose();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      setUploadError("Only PDF files are allowed.");
      setUploadedFileName("");
      e.target.value = "";
      return;
    }

    setUploadError("");
    setUploadedFileName(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      try {
        localStorage.setItem("pendingBillFileName", file.name);
        if (typeof result === "string") {
          localStorage.setItem("pendingBillFileData", result);
        }
      } catch (error) {
        setUploadError("Unable to save file. Please try again.");
      }
    };
    reader.onerror = () => {
      setUploadError("File read error. Please try again.");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-4 md:p-6"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "520px",
        }}
      >
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-3 md:mb-4">
          Bill Information
        </h2>

        <form className="space-y-3 md:space-y-4" onSubmit={handleSubmit}>
          {/* Name of Patient */}
          <div className="flex flex-col gap-2">
            <label className="text-xs md:text-sm font-medium text-gray-700">
              Name of Patient
            </label>
            <div className="relative">
              <svg
                className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <select className="w-full h-11 md:h-12 rounded-full border border-gray-300 bg-white pl-10 md:pl-12 pr-16 md:pr-20 text-sm md:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-100 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%239C88FF%22%20d%3D%22M6%209L1%204h10z%22/%3E%3C/svg%3E')] bg-[length:10px] md:bg-[length:12px] bg-[right_1.5rem_center] md:bg-[right_2rem_center] bg-no-repeat">
                <option value="">Select</option>
              </select>
            </div>
          </div>

          {/* Service Date - only for active subscriptions */}
          {isSubscriptionActive && (
            <div className="flex flex-col gap-2">
              <label className="text-xs md:text-sm font-medium text-gray-700">
                Service Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  className="w-full h-11 md:h-12 rounded-full border border-gray-300 bg-white px-3 md:px-4 pr-3 md:pr-4 text-sm md:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-100"
                  placeholder="Select Date"
                />
              </div>
            </div>
          )}

          {/* Total Amount on Bill */}
          <div className="flex flex-col gap-2">
            <label className="text-xs md:text-sm font-medium text-gray-700">
              Bill Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm md:text-base">
                $
              </span>
              <input
                type="number"
                className="w-full h-11 md:h-12 rounded-full border border-gray-300 bg-white pl-8 md:pl-10 pr-3 md:pr-4 text-sm md:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-100"
                placeholder="Enter bill amount"
              />
            </div>
          </div>

          {/* Upload Bill & Supporting Documents */}
          <div className="flex flex-col gap-2">
            <label className="text-xs md:text-sm font-medium text-gray-700">
              Upload Bill
            </label>
            <div className="relative">
              <input
                type="file"
                id="bill-upload"
                className="hidden"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
              />
              <label
                htmlFor="bill-upload"
                className="w-full h-11 md:h-12 rounded-full border border-gray-300 bg-white px-3 md:px-4 pr-10 md:pr-12 flex items-center text-sm md:text-base text-gray-500 cursor-pointer hover:bg-purple-50 transition relative"
              >
                <span className="flex-1">
                  {uploadedFileName || "Upload PDF"}
                </span>
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 text-purple-400 absolute right-3 md:right-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </label>
            </div>
            {uploadError && (
              <p className="text-xs text-red-600">{uploadError}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-11 md:h-12 rounded-full bg-gradient-to-r from-purple-900 to-blue-800 text-white font-bold text-sm md:text-base hover:from-purple-600 hover:to-purple-800 transition-all shadow-lg mt-4 md:mt-6"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default BillInformationModal;