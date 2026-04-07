import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import ApplicationSubmittedModal from "../components/ApplicationSubmittedModal";
import uploadImg from "../assets/upload-circle.png";
import uploadArrow from "../assets/upload_arrow.png";
import billPlaceholder from "../assets/bill-history.png";
import axiosClient from "../api/axiosClient";
import {
  deleteHipaaForm,
  deleteElectronicConsentForm,
  deleteSupportingDocument,
  uploadSupportingDocument,
  requestRefund,
  clearRefundRequestError
} from "../store/bills/billsSlice";
import { DOCUMENT_TYPES } from "../components/BillInformationModal";
import { fetchProfile } from "../store/user/userSlice";

const BillDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { 
    hipaaDeleteLoading: deletingHipaa, 
    hipaaDeleteError: hipaaDeleteErrorFromSlice,
    electronicConsentDeleteLoading: deletingElectronicConsent,
    electronicConsentDeleteError: electronicConsentDeleteErrorFromSlice,
    supportingDocDeleteLoading: deletingDoc,
    supportingDocUploadLoading: uploadingSupportingDoc,
    supportingDocUploadError: supportingDocUploadErrorFromSlice,
    refundRequestLoading: refundLoading,
    refundRequestError: refundError,
  } = useSelector((state) => state.bills);
  const profile = useSelector((state) => state.user?.profile) || {};
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [showHipaaDeleteConfirm, setShowHipaaDeleteConfirm] = useState(false);
  const [showElectronicConsentDeleteConfirm, setShowElectronicConsentDeleteConfirm] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [docToDelete, setDocToDelete] = useState(null);
  const [revisedUploadError, setRevisedUploadError] = useState("");
  const [uploadingRevisedBill, setUploadingRevisedBill] = useState(false);
  const [revisedBillAmount, setRevisedBillAmount] = useState("");
  const revisedBillInputRef = useRef(null);
  const [previewDoc, setPreviewDoc] = useState(null); // { url, title }

  // Check if pdfUrl is an image by extension (API can return PDF or image in pdfUrl)
  const isImageUrl = (url) => {
    if (!url || typeof url !== "string") return false;
    const path = url.split("?")[0].toLowerCase();
    return /\.(png|jpg|jpeg|webp|heic)$/.test(path);
  };

  // Use Google Docs viewer so PDF displays inline instead of triggering download (S3 often sends Content-Disposition: attachment)
  const getPdfViewerUrl = (url) => {
    if (!url || typeof url !== "string") return "";
    return `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;
  };

  // Map backend bill to UI format
  const transformApiBill = (apiBill) => {
    const mapStatusToUI = (backendStatus) => {
      const statusMap = {
        inactive: "Pending",
        pending: "Pending",
        submitted: "Submitted",
        processing: "Submitted",
        approved: "Refunded",
        rejected: "Pending",
        application_added: "Application Added",
        application_submitted: "Application Submitted",
        application_info_requested: "Changes Requested",
      };
      return statusMap[backendStatus] || "Pending";
    };
    const formatCurrency = (amount) => {
      if (!amount && amount !== 0) return "$0.00";
      return `$${Number(amount).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    };
    const formatDate = (dateString) => {
      if (!dateString) return "N/A";
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      });
    };
    const documentTypeLabel = apiBill.documentType
      ? (DOCUMENT_TYPES.find((t) => t.value === apiBill.documentType)?.label || apiBill.documentType)
      : null;
    const hospitalName =
      apiBill.hospitalName ||
      apiBill.hospital?.name ||
      apiBill.hospitalInfo?.name ||
      null;
    return {
      id: apiBill._id,
      patientName: apiBill.patientName || null,
      hospitalName,
      hospital: hospitalName || "N/A",
      documentType: apiBill.documentType || null,
      documentTypeLabel,
      serviceDate: apiBill.serviceDate || apiBill.submittedAt || apiBill.createdAt || null,
      amount: formatCurrency(apiBill.billAmount),
      displayAmount: apiBill.revisedAmount != null ? formatCurrency(apiBill.revisedAmount) : formatCurrency(apiBill.billAmount),
      newAmount: formatCurrency(apiBill.billAmount * 0.55),
      savedAmount: formatCurrency(apiBill.billAmount * 0.45),
      amountPaidToUs: "$299.00",
      status: mapStatusToUI(apiBill.status),
      date: formatDate(apiBill.submittedAt || apiBill.createdAt),
      billNumber: `BH-${apiBill._id.toString().slice(-4).toUpperCase()}`,
      pdfUrl: apiBill.pdfUrl || apiBill.pdf,
      supportingDocuments: apiBill.supportingDocuments || [],
      hipaaForm: apiBill.hipaaForm || null,
      electronicConsentForm: apiBill.electronicConsentForm || null,
      hipaaEmailConsent: apiBill.hipaaEmailConsent || null,
      flatFeePaid: apiBill.flatFeePaid === true,
      refundRequested: apiBill.refundRequested === true,
      refundStatus: apiBill.refundStatus || "none",
      rawStatus: apiBill.status,
      revisedAmount: apiBill.revisedAmount != null ? apiBill.revisedAmount : undefined,
      applicationForm: apiBill.applicationForm || null,
    };
  };

  const refetchBill = async () => {
    if (!id) return;
    try {
      const response = await axiosClient.get(`/bills/${id}`);
      if (response.data.success) {
        setBill(transformApiBill(response.data.data));
      }
    } catch (err) {
      if (err.response?.status === 401) navigate("/login");
    }
  };

  // Lock background scroll when bill modals are open
  useEffect(() => {
    if (showHipaaDeleteConfirm || showApplicationModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showHipaaDeleteConfirm, showApplicationModal]);

  // Ensure profile (including hospitalInfo) is loaded so HIPAA form has hospital name
  useEffect(() => {
    if (!profile?.hospitalInfo) {
      dispatch(fetchProfile()).catch(() => {});
    }
  }, [dispatch, profile?.hospitalInfo]);

  useEffect(() => {
    const fetchBill = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setError("");
        const response = await axiosClient.get(`/bills/${id}`);
        if (response.data.success) {
          const data = response.data.data;
          setBill(transformApiBill(data));
          setRevisedBillAmount(data.revisedAmount != null ? String(data.revisedAmount) : "");
        } else {
          setError("Bill not found");
        }
      } catch (err) {
        const message =
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Failed to load bill";
        setError(message);
        if (err.response?.status === 401) navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchBill();
  }, [id, navigate]);

  // When bill is inactive (user didn't complete second modal), open the application modal so they can continue
  useEffect(() => {
    if (!loading && bill?.rawStatus === "inactive") {
      setShowApplicationModal(true);
    }
  }, [loading, bill?.rawStatus]);

  const handleEditBillClick = () => {
    setShowApplicationModal(true);
  };

  const handleRequestRefund = async () => {
    if (!bill?.id || refundLoading) return;
    dispatch(clearRefundRequestError());
    try {
      await dispatch(requestRefund({
        billId: bill.id,
        revisedAmount: revisedBillAmount || undefined
      })).unwrap();
      setRevisedBillAmount("");
      await refetchBill();
    } catch (_) {
      // Error shown via refundError from slice
    }
  };

  const handleCloseApplicationModal = () => {
    setShowApplicationModal(false);
    refetchBill();
  };

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

  const handleDeleteHipaaFormClick = () => {
    setShowHipaaDeleteConfirm(true);
  };

  const handleDeleteElectronicConsentFormClick = () => {
    setShowElectronicConsentDeleteConfirm(true);
  };

  const handleConfirmDeleteHipaaForm = async () => {
    if (!bill?.id || !bill.hipaaForm?.pdfUrl) return;
    const result = await dispatch(deleteHipaaForm(bill.id));
    if (deleteHipaaForm.fulfilled.match(result)) {
      setBill((prev) => (prev ? { ...prev, hipaaForm: null } : null));
    }
  };

  const handleConfirmDeleteElectronicConsentForm = async () => {
    if (!bill?.id || !bill.electronicConsentForm?.pdfUrl) return;
    const result = await dispatch(deleteElectronicConsentForm(bill.id));
    if (deleteElectronicConsentForm.fulfilled.match(result)) {
      setBill((prev) => (
        prev
          ? { ...prev, electronicConsentForm: null, hipaaEmailConsent: null }
          : null
      ));
    }
  };

  const handleDeleteSupportingDocClick = (doc) => {
    setDocToDelete(doc);
  };

  const handleConfirmDeleteSupportingDoc = async () => {
    if (!docToDelete?._id || !bill?.id) return;
    const result = await dispatch(
      deleteSupportingDocument({ billId: bill.id, docId: docToDelete._id })
    );
    setDocToDelete(null);
    if (deleteSupportingDocument.fulfilled.match(result)) {
      refetchBill();
    }
  };

  const handleDeleteRevisedBill = async () => {
    const revisedBillDoc = (bill?.supportingDocuments || []).find(
      (doc) => doc.documentType === "revised_hospital_bill"
    );
    if (!revisedBillDoc?._id || !bill?.id) return;
    const result = await dispatch(
      deleteSupportingDocument({ billId: bill.id, docId: revisedBillDoc._id })
    );
    if (deleteSupportingDocument.fulfilled.match(result)) {
      refetchBill();
    }
  };

  const handleRevisedBillUploadClick = () => {
    if (uploadingRevisedBill || uploadingSupportingDoc) return;
    if (revisedBillInputRef.current) {
      revisedBillInputRef.current.click();
    }
  };

  const handleRevisedBillFileChange = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || !bill?.id) return;

    const allowedFileTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/heic",
    ];
    const allowedExtensions = [".pdf", ".jpg", ".jpeg", ".png", ".webp", ".heic"];
    const isTypeValid =
      allowedFileTypes.includes(file.type) ||
      allowedExtensions.some((ext) => file.name.toLowerCase().endsWith(ext));

    if (!isTypeValid) {
      setRevisedUploadError("Please upload a PDF or image (JPEG, PNG, WebP, HEIC).");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setRevisedUploadError("File size must be less than 50MB.");
      return;
    }

    setRevisedUploadError("");
    setUploadingRevisedBill(true);
    const result = await dispatch(
      uploadSupportingDocument({
        billId: bill.id,
        file,
        documentType: "revised_hospital_bill",
      })
    );

    if (uploadSupportingDocument.fulfilled.match(result)) {
      await refetchBill();
      setUploadingRevisedBill(false);
      return;
    }

    setUploadingRevisedBill(false);
    if (result.payload) {
      setRevisedUploadError(result.payload);
    } else {
      setRevisedUploadError("Failed to upload revised hospital bill.");
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

  const heading =
    bill.status === "Submitted" 
      ? "View Submitted Bill"
      : bill.status === "Pending"
      ? "Bill Submission Details"
      : "Bill Details";
  const revisedHospitalBill = (bill.supportingDocuments || []).find(
    (doc) => doc.documentType === "revised_hospital_bill"
  );
  const filteredSupportingDocuments = (bill.supportingDocuments || []).filter(
    (doc) => doc.documentType !== "revised_hospital_bill"
  );

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
            {hipaaDeleteErrorFromSlice && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
                <p className="text-sm text-red-600">{hipaaDeleteErrorFromSlice}</p>
              </div>
            )}
            {electronicConsentDeleteErrorFromSlice && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
                <p className="text-sm text-red-600">{electronicConsentDeleteErrorFromSlice}</p>
              </div>
            )}
            {(revisedUploadError || supportingDocUploadErrorFromSlice) && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
                <p className="text-sm text-red-600">
                  {revisedUploadError || supportingDocUploadErrorFromSlice}
                </p>
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-8">
                  {/* Uploaded Bill card */}
                  <div className="relative flex flex-col max-w-[360px] w-full">
                    {/* Floating label with actions */}
                    <div className="absolute -top-4 left-6 bg-white px-4 py-1 rounded-b-md flex items-center gap-3 flex-wrap">
                      <span className="text-md font-medium text-gray-800">
                        Uploaded Bill
                      </span>
                      {bill.documentTypeLabel && (
                        <span className="text-xs text-gray-500 border-l border-gray-200 pl-3">
                          Type: {bill.documentTypeLabel}
                        </span>
                      )}
                      {/* Edit icon - opens Application Submitted modal */}
                      <button
                        type="button"
                        onClick={handleEditBillClick}
                        className="text-purple-500 hover:text-purple-700"
                        title="Edit / upload documents"
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
                    
                    </div>

                    <div className="border border-[#d0c5ff] rounded-[32px] px-4 pt-6 pb-6 md:px-6 md:pt-8 md:pb-7 flex flex-col min-h-[420px] md:min-h-[520px]">
                      {bill.pdfUrl ? (
                        <>
                          <div className="w-full h-full min-h-[280px] max-h-[560px] mt-4 md:mt-5 pt-4 md:pt-5 flex flex-col items-center justify-center overflow-auto px-3 md:px-4">
                            {isImageUrl(bill.pdfUrl) ? (
                              <img
                                src={bill.pdfUrl}
                                alt="Uploaded bill"
                                className="w-full max-h-[500px] object-contain rounded-lg cursor-zoom-in"
                                onClick={() =>
                                  setPreviewDoc({
                                    url: bill.pdfUrl,
                                    title: "Uploaded Bill",
                                  })
                                }
                              />
                            ) : (
                              <iframe
                                src={getPdfViewerUrl(bill.pdfUrl)}
                                title="Uploaded bill"
                                className="w-full min-h-[400px] flex-1 rounded-lg border-0 cursor-zoom-in"
                                onClick={() =>
                                  setPreviewDoc({
                                    url: bill.pdfUrl,
                                    title: "Uploaded Bill",
                                  })
                                }
                              />
                            )}
                          </div>
                        </>
                      ) : (
                        <img
                          src={billPlaceholder}
                          alt="Uploaded bill placeholder"
                          className="w-full h-full max-h-[360px] object-contain rounded-2xl"
                        />
                      )}
                    </div>
                  </div>

                  {/* HIPAA Authorization Form - same style as uploaded bill */}
                  {bill.hipaaForm?.pdfUrl && (
                    <div className="relative flex flex-col max-w-[360px] w-full mt-8 md:mt-0">
                      <div className="absolute -top-4 left-6 bg-white px-4 py-1 rounded-b-md flex items-center gap-3">
                        <span className="text-md font-medium text-gray-800">
                          HIPAA Authorization Form
                        </span>
                        <button
                          type="button"
                          onClick={handleDeleteHipaaFormClick}
                          disabled={deletingHipaa}
                          className="text-purple-500 hover:text-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Remove HIPAA form"
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
                        <div
                          className="w-full mt-4 md:mt-5 flex flex-col overflow-hidden rounded-lg bg-gray-100"
                          style={{ minHeight: "380px" }}
                        >
                          {isImageUrl(bill.hipaaForm.pdfUrl) ? (
                            <img
                              src={bill.hipaaForm.pdfUrl}
                              alt="HIPAA Authorization Form"
                              className="w-full max-h-[420px] object-contain rounded-lg cursor-zoom-in"
                              onClick={() =>
                                setPreviewDoc({
                                  url: bill.hipaaForm.pdfUrl,
                                  title: "HIPAA Authorization Form",
                                })
                              }
                            />
                          ) : (
                            <iframe
                              src={getPdfViewerUrl(bill.hipaaForm.pdfUrl)}
                              title="HIPAA Authorization Form"
                              width="100%"
                              height="420"
                              className="rounded-lg border-0 bg-white cursor-zoom-in"
                              onClick={() =>
                                setPreviewDoc({
                                  url: bill.hipaaForm.pdfUrl,
                                  title: "HIPAA Authorization Form",
                                })
                              }
                              style={{ minHeight: "380px" }}
                            />
                          )}
                        </div>
                        <a
                          href={bill.hipaaForm.pdfUrl}
                          download={bill.hipaaForm.pdfFileName || "hipaa-form.pdf"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border-2 border-purple-200 px-4 py-2.5 text-sm font-medium text-purple-700 hover:text-purple-900 hover:border-purple-300 hover:bg-purple-50 transition"
                        >
                          <span>Download HIPAA form</span>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Electronic Consent Form */}
                  {bill.electronicConsentForm?.pdfUrl && (
                    <div className="relative flex flex-col max-w-[360px] w-full mt-8 md:mt-0">
                      <div className="absolute -top-4 left-6 bg-white px-4 py-1 rounded-b-md flex items-center gap-3">
                        <span className="text-md font-medium text-gray-800">
                          Electronic Consent Form
                        </span>
                        <button
                          type="button"
                          onClick={handleDeleteElectronicConsentFormClick}
                          disabled={deletingElectronicConsent}
                          className="text-purple-500 hover:text-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Remove consent form"
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
                        <div
                          className="w-full mt-4 md:mt-5 flex flex-col overflow-hidden rounded-lg bg-gray-100"
                          style={{ minHeight: "380px" }}
                        >
                          {isImageUrl(bill.electronicConsentForm.pdfUrl) ? (
                            <img
                              src={bill.electronicConsentForm.pdfUrl}
                              alt="Electronic Consent Form"
                              className="w-full max-h-[420px] object-contain rounded-lg cursor-zoom-in"
                              onClick={() =>
                                setPreviewDoc({
                                  url: bill.electronicConsentForm.pdfUrl,
                                  title: "Electronic Consent Form",
                                })
                              }
                            />
                          ) : (
                            <iframe
                              src={getPdfViewerUrl(bill.electronicConsentForm.pdfUrl)}
                              title="Electronic Consent Form"
                              width="100%"
                              height="420"
                              className="rounded-lg border-0 bg-white cursor-zoom-in"
                              onClick={() =>
                                setPreviewDoc({
                                  url: bill.electronicConsentForm.pdfUrl,
                                  title: "Electronic Consent Form",
                                })
                              }
                              style={{ minHeight: "380px" }}
                            />
                          )}
                        </div>
                        <a
                          href={bill.electronicConsentForm.pdfUrl}
                          download={bill.electronicConsentForm.pdfFileName || "electronic-consent-form.pdf"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border-2 border-purple-200 px-4 py-2.5 text-sm font-medium text-purple-700 hover:text-purple-900 hover:border-purple-300 hover:bg-purple-50 transition"
                        >
                          <span>Download consent form</span>
                        </a>
                      </div>
                    </div>
                  )}


                  {/* Revised Hospital Bill */}
                  {revisedHospitalBill && (
                    <div className="relative flex flex-col max-w-[360px] w-full mt-8 md:mt-0">
                      <div className="absolute -top-4 left-6 bg-white px-4 py-1 rounded-b-md flex items-center gap-3">
                        <span className="text-md font-medium text-gray-800">
                          Revised Hospital Bill
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteRevisedBill()}
                          disabled={uploadingRevisedBill}
                          className="text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Delete revised bill"
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
                        <div className="w-full h-full min-h-[280px] max-h-[560px] mt-4 md:mt-5 pt-4 md:pt-5 flex flex-col items-center justify-center overflow-auto px-3 md:px-4">
                          {isImageUrl(revisedHospitalBill.pdfUrl) ? (
                            <img
                              src={revisedHospitalBill.pdfUrl}
                              alt="Revised bill"
                              className="w-full max-h-[500px] object-contain rounded-lg cursor-zoom-in"
                              onClick={() =>
                                setPreviewDoc({
                                  url: revisedHospitalBill.pdfUrl,
                                  title: "Revised Hospital Bill",
                                })
                              }
                            />
                          ) : (
                            <iframe
                              src={getPdfViewerUrl(revisedHospitalBill.pdfUrl)}
                              title="Revised bill"
                              className="w-full min-h-[400px] flex-1 rounded-lg border-0 cursor-zoom-in"
                              onClick={() =>
                                setPreviewDoc({
                                  url: revisedHospitalBill.pdfUrl,
                                  title: "Revised Hospital Bill",
                                })
                              }
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Supporting Documents */}
                  {filteredSupportingDocuments.length > 0 && (
                    <div className="relative flex flex-col max-w-[360px] w-full mt-8 md:mt-0">
                      <div className="absolute -top-4 left-6 bg-white px-4 py-1 rounded-b-md">
                        <span className="text-md font-medium text-gray-800">
                          Supporting Documents
                        </span>
                      </div>
                      <div className="border border-[#d0c5ff] rounded-[32px] px-4 pt-6 pb-6 md:px-6 md:pt-8 md:pb-7 flex flex-col min-h-[420px] md:min-h-[520px]">
                        <div className="w-full h-full max-h-[400px] overflow-y-auto thin-scrollbar mt-4 md:mt-5 space-y-3">
                          {filteredSupportingDocuments.map((doc) => {
                            const supportingTypeLabel = doc.documentType
                              ? (DOCUMENT_TYPES.find((t) => t.value === doc.documentType)?.label || doc.documentType)
                              : null;
                            return (
                            <div
                              key={doc._id || doc.pdfUrl}
                              className="flex items-center justify-between p-3 rounded-lg border border-purple-200 bg-purple-50/50"
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
                                    className="text-sm text-purple-700 hover:underline truncate"
                                  >
                                    {doc.pdfFileName || "Supporting document"}
                                  </a>
                                </div>
                                {supportingTypeLabel && (
                                  <span className="text-xs text-gray-500 pl-7">Type: {supportingTypeLabel}</span>
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
                      </div>
                    </div>
                  )}
                  {/* Application Form Card */}
                  {bill.applicationForm?.pdfUrl && (
                    <div className="relative flex flex-col max-w-[360px] w-full mt-8 md:mt-0">
                      <div className="absolute -top-4 left-6 bg-white px-4 py-1 rounded-b-md flex items-center gap-3">
                        <span className="text-md font-medium text-gray-800">
                          Application Form
                        </span>
                        {bill.rawStatus === "application_info_requested" && (
                          <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-medium">
                            Changes Requested
                          </span>
                        )}
                        {bill.rawStatus === "application_submitted" && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
                            Submitted
                          </span>
                        )}
                      </div>
                      <div className="border border-[#d0c5ff] rounded-[32px] px-4 pt-6 pb-6 md:px-6 md:pt-8 md:pb-7 flex flex-col min-h-[420px] md:min-h-[520px]">
                        <div className="w-full h-full min-h-[280px] max-h-[560px] mt-4 md:mt-5 pt-4 md:pt-5 flex flex-col items-center justify-center overflow-auto px-3 md:px-4">
                          {isImageUrl(bill.applicationForm.pdfUrl) ? (
                            <img
                              src={bill.applicationForm.pdfUrl}
                              alt="Application form"
                              className="w-full max-h-[500px] object-contain rounded-lg"
                            />
                          ) : (
                            <iframe
                              src={getPdfViewerUrl(bill.applicationForm.pdfUrl)}
                              title="Application form"
                              className="w-full min-h-[400px] flex-1 rounded-lg border-0"
                            />
                          )}
                        </div>
                        {/* Admin Note */}
                        {bill.applicationForm.adminNote && bill.rawStatus === "application_info_requested" && (
                          <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                            <p className="text-xs font-semibold text-amber-800">Note from team:</p>
                            <p className="text-xs text-amber-700 mt-1">{bill.applicationForm.adminNote}</p>
                          </div>
                        )}
                        {/* Action Button */}
                        <button
                          type="button"
                          onClick={() => navigate(`/bill-history/${bill.id}/application-form`)}
                          className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#7a3cff] to-[#15103b] px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:from-[#6a34e3] hover:to-[#120d33] transition"
                        >
                          {bill.rawStatus === "application_added" || bill.rawStatus === "application_info_requested" ? (
                            <>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              Fill Out Application
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              View Application
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bill Info and Refund Section */}
                <div className="mt-8 flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                  {/* Left: Bill Amount + Date Submitted */}
                  <div className="max-w-[800px] w-full">
                  {/* Bill Amount + Revised Bill Amount Row */}
                  <div className="flex gap-4 mb-4">
                    {/* Bill Amount - show revised when set, else original */}
                    <div className="relative flex-1 max-w-[400px]">
                      <div className="absolute -top-3 left-6 bg-white px-3 py-1 rounded-b-md">
                        <span className="text-xs font-medium text-gray-800">
                          {bill.revisedAmount != null ? "Bill amount (revised)" : "Bill Amount"}
                        </span>
                      </div>
                      <div className="rounded-full border border-[#3d3654] px-6 py-4 md:py-5 flex flex-col items-center justify-center">
                        <span className="text-base md:text-lg font-semibold text-gray-900">
                          {bill.displayAmount ?? bill.amount}
                        </span>
                        {bill.revisedAmount != null && (
                          <span className="text-xs text-gray-500 mt-0.5">Original: {bill.amount}</span>
                        )}
                      </div>
                    </div>

                    {/* Revised Bill Amount - Only show when revised bill is uploaded and no refund yet */}
                    {revisedHospitalBill && !(bill.refundRequested || bill.refundStatus === "requested") && (
                      <div className="relative flex-1">
                        <div className="absolute -top-3 left-6 bg-white px-3 py-1 rounded-b-md">
                          <span className="text-xs font-medium text-gray-800">
                            Revised Bill Amount
                          </span>
                        </div>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={revisedBillAmount}
                          onChange={(e) => setRevisedBillAmount(e.target.value)}
                          placeholder="Enter amount"
                          className="w-full rounded-full border border-[#3d3654] px-6 py-4 md:py-5 text-base md:text-lg font-semibold text-gray-900 placeholder-gray-400"
                        />
                      </div>
                    )}
                  </div>

                  {/* Date Submitted */}
                  <div className="relative max-w-[400px]">
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

                  {/* Right: Refund Section - only for flat-fee-paid bills */}
                  {bill.flatFeePaid && (
                    <div className="flex items-start md:justify-end w-full md:w-auto">
                      <div className="w-full md:max-w-[700px]">
                        {refundError && (
                          <p className="text-sm text-red-600 mb-2">{refundError}</p>
                        )}
                        {bill.refundStatus === "requested" || bill.refundRequested ? (
                          <div className="w-full inline-flex items-center justify-center rounded-full border-2 border-green-500 bg-green-50 px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-semibold text-green-700">
                            Refund request sent
                          </div>
                        ) : bill.refundStatus === "approved" || bill.refundStatus === "rejected" ? (
                          <div className="text-sm text-gray-600">
                            Refund {bill.refundStatus === "approved" ? "approved" : "rejected"}.
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={handleRequestRefund}
                            disabled={refundLoading || !revisedHospitalBill || !revisedBillAmount}
                            className="w-full inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#7a3cff] to-[#15103b] px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-semibold text-white shadow-md hover:from-[#6a34e3] hover:to-[#120d33] disabled:opacity-70"
                          >
                            {refundLoading ? "Sending…" : "Submit Refund Request"}
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
            
          </section>
        </div>
      </main>

      <ConfirmDeleteModal
        isOpen={showHipaaDeleteConfirm}
        onClose={() => setShowHipaaDeleteConfirm(false)}
        onConfirm={handleConfirmDeleteHipaaForm}
        title="Remove HIPAA form"
        message="Remove HIPAA Authorization Form from this bill? You can upload a new one later."
      />

      <ConfirmDeleteModal
        isOpen={showElectronicConsentDeleteConfirm}
        onClose={() => setShowElectronicConsentDeleteConfirm(false)}
        onConfirm={handleConfirmDeleteElectronicConsentForm}
        title="Remove consent form"
        message="Remove Consent for Electronic Communication form from this bill? You can upload a new one later."
      />

      <ConfirmDeleteModal
        isOpen={!!docToDelete}
        onClose={() => setDocToDelete(null)}
        onConfirm={handleConfirmDeleteSupportingDoc}
        title="Remove supporting document"
        message="Remove this supporting document from the bill? You can upload it again later."
        memberName={docToDelete?.pdfFileName ? `"${docToDelete.pdfFileName}"` : undefined}
      />

      <input
        ref={revisedBillInputRef}
        type="file"
        className="hidden"
        accept=".pdf,application/pdf,image/jpeg,image/jpg,image/png,image/webp,image/heic"
        onChange={handleRevisedBillFileChange}
      />

      {bill && (
        <ApplicationSubmittedModal
          isOpen={showApplicationModal}
          onClose={handleCloseApplicationModal}
          billId={bill.id}
          billData={bill}
          profile={profile}
          supportingDocuments={bill.supportingDocuments || []}
          onBillUpdated={refetchBill}
        />
      )}

      {/* Fullscreen document preview (bills, HIPAA form, revised bill) */}
      {previewDoc?.url && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-2xl shadow-2xl p-4 md:p-6">
            <button
              type="button"
              onClick={() => setPreviewDoc(null)}
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 text-gray-600"
              aria-label="Close preview"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {previewDoc.title && (
              <h2 className="pr-10 mb-3 md:mb-4 text-lg md:text-xl font-semibold text-gray-900">
                {previewDoc.title}
              </h2>
            )}
            <div className="w-full max-h-[75vh] flex items-center justify-center overflow-auto bg-gray-50 rounded-lg">
              {isImageUrl(previewDoc.url) ? (
                <img
                  src={previewDoc.url}
                  alt={previewDoc.title || "Document preview"}
                  className="max-h-[72vh] w-auto object-contain"
                />
              ) : (
                <iframe
                  src={getPdfViewerUrl(previewDoc.url)}
                  title={previewDoc.title || "Document preview"}
                  className="w-full h-[72vh] rounded-lg border-0 bg-white"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillDetails;


