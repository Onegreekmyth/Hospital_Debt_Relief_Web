import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HipaaAuthorizationModal from "./HipaaAuthorizationModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import {
  uploadSupportingDocument,
  deleteSupportingDocument,
} from "../store/bills/billsSlice";

const ApplicationSubmittedModal = ({
  isOpen,
  onClose,
  billId,
  billData,
  profile,
  supportingDocuments = [],
  onBillUpdated,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    supportingDocUploadLoading: uploading,
    supportingDocUploadError: uploadErrorFromSlice,
    supportingDocDeleteLoading: deletingDoc,
  } = useSelector((state) => state.bills);

  const [uploadError, setUploadError] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isHipaaOpen, setIsHipaaOpen] = useState(false);
  const [docToDelete, setDocToDelete] = useState(null);

  const displayUploadError = uploadErrorFromSlice || uploadError;

  if (!isOpen) return null;

  const handleViewApplication = () => {
    navigate(`/bill-history/${billId}`);
    onClose();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setSelectedFile(null);
      setUploadedFileName("");
      return;
    }

    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      setUploadError("Only PDF files are allowed.");
      setUploadedFileName("");
      setSelectedFile(null);
      e.target.value = "";
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setUploadError("File size must be less than 50MB.");
      setUploadedFileName("");
      setSelectedFile(null);
      e.target.value = "";
      return;
    }

    setUploadError("");
    setUploadedFileName(file.name);
    setSelectedFile(file);
  };

  const handleUploadSupportingDocument = async () => {
    if (!selectedFile || !billId) {
      setUploadError("Please select a PDF file to upload.");
      return;
    }
    setUploadError("");
    setUploadSuccess(false);
    const result = await dispatch(
      uploadSupportingDocument({ billId, file: selectedFile })
    );
    if (uploadSupportingDocument.fulfilled.match(result)) {
      setUploadSuccess(true);
      setSelectedFile(null);
      setUploadedFileName("");
      const fileInput = document.getElementById("supporting-doc-upload");
      if (fileInput) fileInput.value = "";
      setTimeout(() => setUploadSuccess(false), 3000);
      onBillUpdated?.();
    } else if (result.payload) {
      setUploadError(result.payload);
    }
  };

  const handleDeleteSupportingDocClick = (doc) => {
    setDocToDelete(doc);
  };

  const handleConfirmDeleteSupportingDoc = async () => {
    if (!docToDelete?._id || !billId) return;
    const result = await dispatch(
      deleteSupportingDocument({ billId, docId: docToDelete._id })
    );
    setDocToDelete(null);
    if (deleteSupportingDocument.fulfilled.match(result)) {
      onBillUpdated?.();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-4 md:p-6 max-w-xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-4 md:mb-6">
          Application Submitted
        </h2>

        {/* Two Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
          {/* View Application Button */}
          <button
            type="button"
            onClick={handleViewApplication}
            className="flex flex-col items-center justify-center p-4 md:p-5 rounded-2xl border-2 border-purple-200  hover:bg-purple-100 transition-colors"
          >
            <div className="mb-2">
              <svg
                className="w-7 h-7 md:w-8 md:h-8 text-purple-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <span className="text-sm md:text-base font-semibold text-purple-900">
              View Application
            </span>
          </button>

          {/* Upload Supporting Documents Button */}
          <button
            type="button"
            onClick={() => {
              const fileInput = document.getElementById("supporting-doc-upload");
              if (fileInput) {
                fileInput.click();
              }
            }}
            className="flex flex-col items-center justify-center p-4 md:p-5 rounded-2xl border-2 border-purple-200  hover:bg-purple-100 transition-colors"
          >
            <div className="mb-2">
              <svg
                className="w-7 h-7 md:w-8 md:h-8 text-purple-700"
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
            </div>
            <span className="text-sm md:text-base font-semibold text-purple-900">
              Complete & Upload
            </span>
            <span className="text-xs md:text-sm text-purple-700 mt-1">
              Supporting Documents
            </span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsHipaaOpen(true)}
          className="w-full mb-6 md:mb-8 rounded-full border-2 border-purple-700 bg-white text-purple-700 font-semibold text-sm md:text-base py-3 md:py-4 hover:bg-purple-50 transition-colors"
        >
          HIPAA Authorization Form
        </button>

        {/* Supporting Document Upload Section */}
        <div className="mb-4 md:mb-6">
          <input
            type="file"
            id="supporting-doc-upload"
            className="hidden"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
          />
          
          {uploadedFileName && (
            <div className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs md:text-sm font-medium text-gray-700">
                  Selected: {uploadedFileName}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    setUploadedFileName("");
                    const fileInput = document.getElementById("supporting-doc-upload");
                    if (fileInput) {
                      fileInput.value = "";
                    }
                  }}
                  className="text-red-600 hover:text-red-800"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <button
                type="button"
                onClick={handleUploadSupportingDocument}
                disabled={uploading}
                className="w-full py-2 px-4 bg-purple-700 text-white rounded-lg text-sm font-medium hover:bg-purple-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {uploading ? "Uploading..." : "Upload Document"}
              </button>
            </div>
          )}

          {displayUploadError && (
            <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-xs md:text-sm text-red-600">{displayUploadError}</p>
            </div>
          )}

          {uploadSuccess && (
            <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-xs md:text-sm text-green-600">
                Document uploaded successfully!
              </p>
            </div>
          )}

          {/* List of supporting documents with delete icon */}
          {supportingDocuments && supportingDocuments.length > 0 && (
            <div className="mb-4 space-y-2">
              <p className="text-xs md:text-sm font-medium text-gray-700 mb-2">
                Uploaded supporting documents
              </p>
              {supportingDocuments.map((doc) => (
                <div
                  key={doc._id || doc.pdfUrl}
                  className="flex items-center justify-between p-3 rounded-lg border border-purple-200 bg-purple-50/50"
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <svg
                      className="w-5 h-5 text-purple-600 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                    <a
                      href={doc.pdfUrl}
                      download={doc.pdfFileName || "supporting-doc.pdf"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-purple-700 hover:underline truncate"
                    >
                      {doc.pdfFileName || "Supporting document"}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteSupportingDocClick(doc)}
                    disabled={deletingDoc}
                    className="text-red-600 hover:text-red-800 p-1 disabled:opacity-50 flex-shrink-0"
                    title="Remove document"
                  >
                    <svg
                      className="w-5 h-5"
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
              ))}
            </div>
          )}
        </div>

        {/* Payment Button */}
        <button
          type="button"
          className="w-full py-3 md:py-4 rounded-full bg-gradient-to-r from-purple-700 to-purple-900 text-white font-bold text-sm md:text-base mb-3 md:mb-5 hover:from-purple-600 hover:to-purple-800 transition-all shadow-lg"
        >
          Pay $299 Flat Fee
        </button>

        {/* Complete Application Button */}
        <button
          type="button"
          className="w-full py-3 md:py-4 rounded-full border-2 border-purple-700 bg-white text-purple-700 font-bold text-sm md:text-base mb-3 md:mb-5 hover:bg-purple-50 transition-colors"
        >
          Click to Complete Application
        </button>

        {/* Guarantee Text */}
        <p className="text-center text-xs md:text-sm text-gray-600">
          Backed By Our Money Back Guarantee!
        </p>
      </div>

      <HipaaAuthorizationModal
        isOpen={isHipaaOpen}
        onClose={() => setIsHipaaOpen(false)}
        billId={billId}
        billData={billData}
        profile={profile}
        onSuccess={() => {
          onBillUpdated?.();
        }}
      />

      <ConfirmDeleteModal
        isOpen={!!docToDelete}
        onClose={() => setDocToDelete(null)}
        onConfirm={handleConfirmDeleteSupportingDoc}
        title="Remove supporting document"
        message="Remove this supporting document from the bill? You can upload it again later."
        memberName={docToDelete?.pdfFileName ? `"${docToDelete.pdfFileName}"` : undefined}
      />
    </div>
  );
};

export default ApplicationSubmittedModal;
