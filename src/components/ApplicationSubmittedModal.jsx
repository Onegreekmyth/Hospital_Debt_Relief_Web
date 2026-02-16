import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HipaaAuthorizationModal from "./HipaaAuthorizationModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import {
  uploadSupportingDocument,
  deleteSupportingDocument,
  completeBillApplication,
} from "../store/bills/billsSlice";
import { createCheckoutSession, clearCheckoutError } from "../store/payments/paymentsSlice";
import { DOCUMENT_TYPES } from "./BillInformationModal";

const ApplicationSubmittedModal = ({
  isOpen,
  onClose,
  billId,
  billData,
  profile,
  hasActiveSubscription = false,
  familyMembers = [],
  supportingDocuments = [],
  onBillUpdated,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    supportingDocUploadLoading: uploading,
    supportingDocUploadError: uploadErrorFromSlice,
    supportingDocDeleteLoading: deletingDoc,
    completeApplicationLoading: completeLoading,
    completeApplicationError: completeError,
  } = useSelector((state) => state.bills);
  const { checkoutLoading: flatFeeLoading, checkoutError: flatFeeError } = useSelector(
    (state) => state.payments
  );

  const [uploadError, setUploadError] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [supportingDocumentType, setSupportingDocumentType] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isHipaaOpen, setIsHipaaOpen] = useState(false);
  const [docToDelete, setDocToDelete] = useState(null);

  const displayUploadError = uploadErrorFromSlice || uploadError;

  // Only show $299 flat fee when user has no active subscription, or the bill's patient is not included in the subscription
  const accountHolderName = [profile?.firstName, profile?.lastName].filter(Boolean).join(" ").trim().toLowerCase();
  const patientNameNorm = (billData?.patientName || "").trim().toLowerCase();
  const isAccountHolder = accountHolderName && patientNameNorm && accountHolderName === patientNameNorm;
  const isBillPatientInSubscription = (() => {
    if (!billData?.patientName) return true;
    if (isAccountHolder) return profile?.withActiveSubscription !== false;
    const member = familyMembers.find(
      (m) =>
        [m?.firstName, m?.lastName].filter(Boolean).join(" ").trim().toLowerCase() === patientNameNorm
    );
    return member ? member.withActiveSubscription !== false : true;
  })();
  const showFlatFeeButton = !hasActiveSubscription || !isBillPatientInSubscription;

  const handlePayFlatFee = async () => {
    dispatch(clearCheckoutError());
    const baseUrl = window.location.origin;
    const successUrl = `${baseUrl}/dashboard?subscription=success&session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${baseUrl}/dashboard?subscription=cancelled`;
    try {
      const checkoutUrl = await dispatch(
        createCheckoutSession({
          planId: "one_time_flat",
          successUrl,
          cancelUrl,
          billId: billId || undefined,
        })
      ).unwrap();
      if (checkoutUrl) window.location.href = checkoutUrl;
    } catch (err) {
      console.error("Pay $299 flat fee error:", err);
    }
  };

  if (!isOpen) return null;

  const handleViewApplication = () => {
    navigate(`/bill-history/${billId}`);
    onClose();
  };

  const handleCompleteApplication = async () => {
    if (!billId || completeLoading) return;
    try {
      await dispatch(completeBillApplication(billId)).unwrap();
      onBillUpdated?.();
      onClose();
    } catch (err) {
      // Error is shown via completeError from slice
    }
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
    if (!supportingDocumentType) {
      setUploadError("Please select the type of document.");
      return;
    }
    setUploadError("");
    setUploadSuccess(false);
    const result = await dispatch(
      uploadSupportingDocument({
        billId,
        file: selectedFile,
        documentType: supportingDocumentType,
      })
    );
    if (uploadSupportingDocument.fulfilled.match(result)) {
      setUploadSuccess(true);
      setSelectedFile(null);
      setUploadedFileName("");
      setSupportingDocumentType("");
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
      className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-30 p-3 sm:p-4 pt-24 md:pt-28"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md sm:max-w-xl bg-white rounded-2xl md:rounded-3xl shadow-xl mt-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 sm:px-5 pt-3 sm:pt-4 pb-1">
          <h2 className="flex-1 text-center text-base md:text-2xl font-bold text-gray-900">
            Application Submitted
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 inline-flex items-center justify-center w-7 h-7 rounded-full hover:bg-gray-100 text-gray-500"
            aria-label="Close application submitted modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="px-3 sm:px-5 pb-3 sm:pb-5">

        {/* Two Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mb-3 md:mb-5">
          {/* View Application Button */}
          <button
            type="button"
            onClick={handleViewApplication}
            className="flex flex-col items-center justify-center py-3 px-3 md:p-4 rounded-2xl border-2 border-purple-200  hover:bg-purple-100 transition-colors"
          >
            <div className="mb-1.5">
              <svg
                className="w-6 h-6 md:w-8 md:h-8 text-purple-700"
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
            <span className="text-xs md:text-sm font-semibold text-purple-900">
              View Uploaded Documents
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
            className="flex flex-col items-center justify-center py-3 px-3 md:p-4 rounded-2xl border-2 border-purple-200  hover:bg-purple-100 transition-colors"
          >
            <div className="mb-1.5">
              <svg
                className="w-6 h-6 md:w-8 md:h-8 text-purple-700"
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
            <span className="text-xs md:text-sm font-semibold text-purple-900">
              Complete & Upload
            </span>
            <span className="text-[11px] md:text-sm text-purple-700 mt-0.5">
              Supporting Documents
            </span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsHipaaOpen(true)}
          className="w-full mb-4 md:mb-6 rounded-full border-2 border-purple-700 bg-white text-purple-700 font-semibold text-xs md:text-base py-2.5 md:py-4 hover:bg-purple-50 transition-colors"
        >
          HIPAA Authorization Form
        </button>

        {/* Supporting Document Upload Section */}
        <div className="mb-3 md:mb-5">
          <input
            type="file"
            id="supporting-doc-upload"
            className="hidden"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
          />
          
          {uploadedFileName && (
            <div className="mb-2.5 p-2.5 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] md:text-sm font-medium text-gray-700">
                  Selected: {uploadedFileName}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    setUploadedFileName("");
                    setSupportingDocumentType("");
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
              <div className="mb-2.5">
                <label className="block text-[11px] md:text-sm font-medium text-gray-700 mb-1">
                  Type of document
                </label>
                <select
                  value={supportingDocumentType}
                  onChange={(e) => setSupportingDocumentType(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-100"
                >
                  <option value="">Select document type</option>
                  {DOCUMENT_TYPES.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={handleUploadSupportingDocument}
                disabled={uploading || !supportingDocumentType}
                className="w-full py-2 px-3 bg-purple-700 text-white rounded-lg text-xs md:text-sm font-medium hover:bg-purple-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {uploading ? "Uploading..." : "Upload Document"}
              </button>
            </div>
          )}

          {displayUploadError && (
            <div className="mb-2.5 p-2.5 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-[11px] md:text-sm text-red-600">{displayUploadError}</p>
            </div>
          )}

          {uploadSuccess && (
            <div className="mb-2.5 p-2.5 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-[11px] md:text-sm text-green-600">
                Document uploaded successfully!
              </p>
            </div>
          )}

          {/* List of supporting documents with delete icon */}
          {supportingDocuments && supportingDocuments.length > 0 && (
            <div className="mb-3 space-y-2 max-h-40 overflow-y-auto pr-1">
              <p className="text-[11px] md:text-sm font-medium text-gray-700 mb-1.5">
                Uploaded supporting documents
              </p>
              {supportingDocuments.map((doc) => {
                const typeLabel = doc.documentType
                  ? (DOCUMENT_TYPES.find((t) => t.value === doc.documentType)?.label || doc.documentType)
                  : null;
                return (
                <div
                  key={doc._id || doc.pdfUrl}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-purple-200 bg-purple-50/50"
                >
                  <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
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
                        className="text-xs md:text-sm text-purple-700 hover:underline truncate"
                      >
                        {doc.pdfFileName || "Supporting document"}
                      </a>
                    </div>
                    {typeLabel && (
                      <span className="text-[10px] md:text-xs text-gray-500 pl-7">
                        Type: {typeLabel}
                      </span>
                    )}
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
              );
              })}
            </div>
          )}
        </div>

        {/* Payment Button - only for patients not included in active subscription */}
        {showFlatFeeButton && (
          <>
            {flatFeeError && (
              <p className="text-sm text-red-600 mb-2">{flatFeeError}</p>
            )}
            <button
              type="button"
              disabled={flatFeeLoading}
              onClick={handlePayFlatFee}
              className="w-full py-2.5 md:py-3 rounded-full bg-gradient-to-r from-purple-700 to-purple-900 text-white font-bold text-xs md:text-base mb-2.5 md:mb-4 hover:from-purple-600 hover:to-purple-800 transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {flatFeeLoading ? "Redirecting to payment..." : "Pay $299 Flat Fee"}
            </button>
          </>
        )}

        {completeError && (
          <p className="text-sm text-red-600 mb-2">{completeError}</p>
        )}
        {/* Complete Application Button - disabled until fee is paid when fee button is showing */}
        <button
          type="button"
          disabled={showFlatFeeButton || completeLoading}
          onClick={handleCompleteApplication}
          title={showFlatFeeButton ? "Pay the one-time fee above to continue" : undefined}
          className="w-full py-2.5 md:py-3 rounded-full border-2 border-purple-700 bg-white text-purple-700 font-bold text-xs md:text-base mb-2.5 md:mb-4 hover:bg-purple-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-white"
        >
          {completeLoading ? "Completing..." : "Click to Complete Application"}
        </button>

          {/* Guarantee Text */}
          <p className="text-center text-[11px] md:text-sm text-gray-600 mb-1">
            Backed By Our Money Back Guarantee!
          </p>
        </div>
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
