import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PdfEditor from "../components/PdfEditor";
import axiosClient from "../api/axiosClient";

const STATUS_LABELS = {
  application_added: "Application Added",
  application_submitted: "Application Submitted",
  application_info_requested: "Changes Requested",
};

const STATUS_COLORS = {
  application_added: "bg-blue-100 text-blue-800",
  application_submitted: "bg-green-100 text-green-800",
  application_info_requested: "bg-amber-100 text-amber-800",
};

const ApplicationForm = () => {
  const { id: billId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applicationData, setApplicationData] = useState(null);
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
  const [saveError, setSaveError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axiosClient.get(`/bills/${billId}/application-form`);
        if (response.data.success) {
          setApplicationData(response.data.data);

          // Fetch the PDF as blob through backend proxy to avoid S3 CORS
          const pdfKey = response.data.data.applicationForm?.pdfKey;
          if (pdfKey) {
            try {
              const pdfRes = await axiosClient.get(
                `/bills/${billId}/document-proxy?key=${encodeURIComponent(pdfKey)}`,
                { responseType: "blob", timeout: 60000 }
              );
              const blobUrl = URL.createObjectURL(pdfRes.data);
              setPdfBlobUrl(blobUrl);
            } catch (pdfErr) {
              console.error("Failed to fetch PDF via proxy:", pdfErr);
              setError("Failed to load the PDF file. Please try again.");
            }
          }
        } else {
          setError("Application form not found");
        }
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/login");
          return;
        }
        setError(
          err.response?.data?.error ||
          err.response?.data?.message ||
          "Failed to load application form"
        );
      } finally {
        setLoading(false);
      }
    };

    if (billId) fetchData();

    // Cleanup blob URL on unmount
    return () => {
      if (pdfBlobUrl) URL.revokeObjectURL(pdfBlobUrl);
    };
  }, [billId, navigate]);

  const handleSave = useCallback(
    async (annotationsJson) => {
      try {
        setSaveError("");
        await axiosClient.patch(`/bills/${billId}/application-form/save`, {
          annotations: annotationsJson,
        });
      } catch (err) {
        const msg = err.response?.data?.message || "Failed to save. Please try again.";
        setSaveError(msg);
        throw err;
      }
    },
    [billId]
  );

  const handleSubmit = useCallback(async () => {
    try {
      setSaveError("");
      await axiosClient.post(`/bills/${billId}/application-form/submit`);
      setSubmitSuccess(true);
      // Refetch to get updated status
      const response = await axiosClient.get(`/bills/${billId}/application-form`);
      if (response.data.success) {
        setApplicationData(response.data.data);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to submit application.";
      setSaveError(msg);
      throw err;
    }
  }, [billId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5fb]">
        <Navbar />
        <main className="pt-28 pb-16 mt-10">
          <div className="w-[94%] md:w-[90%] lg:w-[86%] mx-auto">
            <div className="bg-white border border-gray-200 rounded-[32px] shadow-sm p-10 text-center text-gray-700">
              <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
              Loading application form...
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !applicationData) {
    return (
      <div className="min-h-screen bg-[#f5f5fb]">
        <Navbar />
        <main className="pt-28 pb-16 mt-10">
          <div className="w-[94%] md:w-[90%] lg:w-[86%] mx-auto">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mb-6 inline-flex text-sm text-purple-700 hover:text-purple-900"
            >
              &larr; Back
            </button>
            <div className="bg-white border border-gray-200 rounded-[32px] shadow-sm p-10 text-center text-red-600">
              {error || "Application form not found."}
            </div>
          </div>
        </main>
      </div>
    );
  }

  const { applicationForm, status, patientName } = applicationData;
  const isReadOnly = status === "application_submitted";
  const canEdit = status === "application_added" || status === "application_info_requested";

  return (
    <div className="min-h-screen bg-[#f5f5fb]">
      <Navbar />

      <main className="pt-24 md:pt-28 pb-8 mt-8 md:mt-10">
        <div className="w-[96%] md:w-[92%] lg:w-[88%] mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-3">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => navigate(`/bill-history/${billId}`)}
                className="text-sm text-purple-700 hover:text-purple-900 flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Bill
              </button>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                  Financial Assistance Application
                </h1>
                {patientName && (
                  <p className="text-sm text-gray-500 mt-0.5">
                    Patient: <span className="font-medium text-gray-700">{patientName}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Status Badge */}
              <span
                className={`inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold ${
                  STATUS_COLORS[status] || "bg-gray-100 text-gray-700"
                }`}
              >
                {STATUS_LABELS[status] || status}
              </span>
            </div>
          </div>

          {/* Submit Success Banner */}
          {submitSuccess && (
            <div className="mb-4 bg-green-50 border border-green-200 rounded-2xl px-5 py-4 flex items-start gap-3">
              <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-green-800">Application Submitted Successfully!</p>
                <p className="text-sm text-green-700 mt-1">
                  Your application has been submitted for review. You will receive an email once it has been processed.
                </p>
              </div>
            </div>
          )}

          {/* Save Error */}
          {saveError && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-2xl px-5 py-3">
              <p className="text-sm text-red-600">{saveError}</p>
            </div>
          )}

          {/* PDF Editor */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden" style={{ minHeight: "75vh" }}>
            <PdfEditor
              pdfUrl={pdfBlobUrl || applicationForm.pdfUrl}
              annotations={applicationForm.annotations}
              onSave={canEdit ? handleSave : undefined}
              onSubmit={canEdit ? handleSubmit : undefined}
              readOnly={isReadOnly}
              status={status}
              adminNote={applicationForm.adminNote}
              showSubmitButton={canEdit}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApplicationForm;
