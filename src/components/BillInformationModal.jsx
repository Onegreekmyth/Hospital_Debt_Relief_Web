import React, { useState } from "react";
import axiosClient from "../api/axiosClient";

const BillInformationModal = ({ 
  isOpen, 
  onClose, 
  onSubmitted, 
  isSubscriptionActive = true,
  accountHolderName = "",
  familyMembers = []
}) => {
  const [uploadError, setUploadError] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [patientName, setPatientName] = useState("");
  const [serviceDate, setServiceDate] = useState("");
  const [billAmount, setBillAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  if (!isOpen) return null;

  // Build patient options from account holder and family members
  const patientOptions = [];
  if (accountHolderName) {
    patientOptions.push({ value: accountHolderName, label: `Account Holder: ${accountHolderName}` });
  }
  familyMembers.forEach((member) => {
    const name = typeof member === "string"
      ? (member || "").trim()
      : [member?.firstName, member?.lastName].filter(Boolean).join(" ").trim();
    if (name) {
      // Use relationship from API (e.g. spouse, child, brother) or fallback for string members
      const relationship = typeof member === "object" && member?.relationship
        ? member.relationship.charAt(0).toUpperCase() + member.relationship.slice(1).replace(/-/g, " ")
        : "Family Member";
      patientOptions.push({ value: name, label: `${relationship}: ${name}` });
    }
  });

  const ALLOWED_FILE_TYPES = [
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/heic",
  ];
  const ALLOWED_EXTENSIONS = [".pdf", ".jpg", ".jpeg", ".png", ".webp", ".heic"];

  const isValidFileType = (file) => {
    const typeOk = ALLOWED_FILE_TYPES.some((t) => file.type === t);
    const extOk = ALLOWED_EXTENSIONS.some((ext) =>
      file.name.toLowerCase().endsWith(ext)
    );
    return typeOk || extOk;
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setSelectedFile(null);
      setUploadedFileName("");
      return;
    }

    if (!isValidFileType(file)) {
      setUploadError("Please upload a PDF or image (JPEG, PNG, WebP, HEIC).");
      setUploadedFileName("");
      setSelectedFile(null);
      e.target.value = "";
      return;
    }

    // Check file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError("File size must be less than 10MB.");
      setUploadedFileName("");
      setSelectedFile(null);
      e.target.value = "";
      return;
    }

    setUploadError("");
    setUploadedFileName(file.name);
    setSelectedFile(file);
  };

  const clearFileInputs = () => {
    ["bill-upload", "bill-camera"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.value = "";
    });
  };

  // Compress large images (e.g. from camera) so uploads succeed on mobile/slow networks
  const MAX_IMAGE_SIZE_BEFORE_COMPRESS = 1.5 * 1024 * 1024; // 1.5MB
  const COMPRESSED_MAX_WIDTH = 1920;
  const COMPRESSED_JPEG_QUALITY = 0.85;

  const compressImageIfNeeded = (file) => {
    return new Promise((resolve) => {
      const isImage = file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png" || file.type === "image/webp";
      if (!isImage || file.size <= MAX_IMAGE_SIZE_BEFORE_COMPRESS) {
        resolve(file);
        return;
      }
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        const canvas = document.createElement("canvas");
        let { width, height } = img;
        if (width > COMPRESSED_MAX_WIDTH || height > COMPRESSED_MAX_WIDTH) {
          if (width > height) {
            height = Math.round((height * COMPRESSED_MAX_WIDTH) / width);
            width = COMPRESSED_MAX_WIDTH;
          } else {
            width = Math.round((width * COMPRESSED_MAX_WIDTH) / height);
            height = COMPRESSED_MAX_WIDTH;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressed = new File([blob], file.name.replace(/\.[^.]+$/, ".jpg"), { type: "image/jpeg", lastModified: Date.now() });
              resolve(compressed);
            } else {
              resolve(file);
            }
          },
          "image/jpeg",
          COMPRESSED_JPEG_QUALITY
        );
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(file);
      };
      img.src = url;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setUploadError("");

    // Validation
    if (!patientName) {
      setSubmitError("Please select a patient name.");
      return;
    }

    if (!serviceDate && isSubscriptionActive) {
      setSubmitError("Please select a service date.");
      return;
    }

    if (!billAmount || parseFloat(billAmount) <= 0) {
      setSubmitError("Please enter a valid bill amount.");
      return;
    }

    if (!selectedFile) {
      setSubmitError("Please upload an image or PDF of the bill.");
      return;
    }

    setLoading(true);

    try {
      // Compress large images (e.g. from camera) so uploads work on mobile/slow networks
      const fileToUpload = await compressImageIfNeeded(selectedFile);

      // Create FormData for multipart/form-data upload
      const formData = new FormData();
      formData.append("patientName", patientName);
      formData.append("serviceDate", serviceDate || new Date().toISOString().split('T')[0]);
      formData.append("billAmount", parseFloat(billAmount));
      formData.append("pdf", fileToUpload);

      // Longer timeout for uploads (mobile/slow networks and large files)
      const response = await axiosClient.post("/bills", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 60000, // 60 seconds for camera/large uploads
      });

      if (response.data.success) {
        // Reset form
        setPatientName("");
        setServiceDate("");
        setBillAmount("");
        setSelectedFile(null);
        setUploadedFileName("");
        
        clearFileInputs();

        // Call success callback
        if (onSubmitted) {
          onSubmitted(response.data.data);
        } else if (onClose) {
          onClose();
        }
      }
    } catch (error) {
      console.error("Error submitting bill:", error);
      const isTimeout = error.code === "ECONNABORTED" || error.message?.toLowerCase().includes("timeout");
      const isNetworkError = error.message === "Network Error" || !error.response;
      let message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to upload bill. Please try again.";
      if (isTimeout || isNetworkError) {
        message = "Upload failed. Try Wi‑Fi, a smaller image, or try again in a moment.";
      }
      setSubmitError(message);
    } finally {
      setLoading(false);
    }
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
              <select
                value={patientName}
                onChange={(e) => {
                  const value = e.target.value;
                  setPatientName(value);
                }}
                className="w-full h-11 md:h-12 rounded-full border border-gray-300 bg-white pl-10 md:pl-12 pr-16 md:pr-20 text-sm md:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-100 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%239C88FF%22%20d%3D%22M6%209L1%204h10z%22/%3E%3C/svg%3E')] bg-[length:10px] md:bg-[length:12px] bg-[right_1.5rem_center] md:bg-[right_2rem_center] bg-no-repeat"
              >
                <option value="">Select</option>
                {patientOptions.length > 0 ? (
                  patientOptions.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="Account Holder">Account Holder</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Child">Child</option>
                  </>
                )}
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
                  value={serviceDate}
                  onChange={(e) => {
                    const value = e.target.value;
                    setServiceDate(value);
                  }}
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
                value={billAmount}
                onChange={(e) => {
                  const value = e.target.value;
                  setBillAmount(value);
                }}
                className="w-full h-11 md:h-12 rounded-full border border-gray-300 bg-white pl-8 md:pl-10 pr-3 md:pr-4 text-sm md:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-100"
                placeholder="Enter bill amount"
              />
            </div>
          </div>

          {/* Upload Bill – Image or PDF */}
          <div className="flex flex-col gap-2">
            <label className="text-xs md:text-sm font-medium text-gray-700">
              Upload Bill
            </label>
           
            <div className="flex flex-col sm:flex-row gap-2">
              {/* File picker – gallery / files */}
              <input
                type="file"
                id="bill-upload"
                className="hidden"
                accept=".pdf,application/pdf,image/jpeg,image/jpg,image/png,image/webp,image/heic"
                onChange={handleFileChange}
              />
              <label
                htmlFor="bill-upload"
                className="flex-1 min-h-[52px] py-3.5 md:min-h-0 md:py-0 md:h-12 rounded-full border border-gray-300 bg-white px-3 md:px-4 pr-10 md:pr-12 flex items-center text-sm md:text-base text-gray-600 cursor-pointer hover:bg-purple-50 transition relative"
              >
                <span className="flex-1 truncate">
                  {uploadedFileName || "Upload Image or PDF"}
                </span>
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 text-purple-400 absolute right-3 md:right-4 shrink-0"
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

          {/* Error Message */}
          {submitError && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200">
              <p className="text-xs text-red-600">{submitError}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 md:h-12 rounded-full bg-gradient-to-r from-purple-900 to-blue-800 text-white font-bold text-sm md:text-base hover:from-purple-600 hover:to-purple-800 transition-all shadow-lg mt-4 md:mt-6 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Uploading..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BillInformationModal;