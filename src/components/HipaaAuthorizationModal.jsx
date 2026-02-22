import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jsPDF } from "jspdf";
import { uploadHipaaForm, clearHipaaUploadError } from "../store/bills/billsSlice";

const CANVAS_W = 400;
const CANVAS_H = 128;
const SIG_IMG_W = 80;
const SIG_IMG_H = 32;

/**
 * Build HIPAA form PDF from form data and signature data URLs.
 * @returns {Blob} PDF blob
 */
function buildHipaaPdf(hipaaForm, familySignatureDataUrl, guardianSignatureDataUrl) {
  const doc = new jsPDF();
  const margin = 20;
  const pageW = doc.internal.pageSize.getWidth();
  const lineW = pageW - margin * 2;
  let y = 20;
  const lineHeight = 5.5;
  const fontSize = 10;

  doc.setFontSize(12);
  doc.setFont(undefined, "bold");
  doc.text("HIPAA Authorization Form", margin, y);
  y += 10;
  doc.setFont(undefined, "normal");
  doc.setFontSize(fontSize);

  const addParagraph = (text) => {
    const lines = doc.splitTextToSize(text, lineW);
    doc.text(lines, margin, y);
    y += lines.length * lineHeight;
  };

  const patientName = hipaaForm.patientName || "Patient";
  addParagraph(
    `I hereby authorize the use or disclosure of ${patientName}'s protected information as described below:`
  );
  y += 3;

  doc.setFont(undefined, "bold");
  addParagraph("1. Authorized Persons To Use and Disclose Protected Health Billing Information.");
  doc.setFont(undefined, "normal");
  const hospitalLine =
    (hipaaForm.hospitalName || "[Hospital Name]") +
    " is authorized to disclose the following protected health information to my hired third party company, www.HospitalDebtRelief.com of Frisco, Texas 75036.";
  addParagraph(hospitalLine);
  y += 3;

  doc.setFont(undefined, "bold");
  addParagraph("2. Description of Information To Be Disclosed.");
  doc.setFont(undefined, "normal");
  addParagraph("The health information that may be disclosed is:");
  addParagraph("Other: Only Hospital Billing Information");
  y += 3;

  doc.setFont(undefined, "bold");
  addParagraph("3. Purpose of the Use or Disclosure.");
  doc.setFont(undefined, "normal");
  addParagraph(
    "The purpose of this use or disclosure is to provide www.HospitalDebtRelief.com / Uncovered Solutions LLC with the authorization to gather, discuss and inquire about information pertaining to hospital bills and the amounts owed on those bills."
  );
  y += 3;

  doc.setFont(undefined, "bold");
  addParagraph("4. Validity of Authorization Form.");
  doc.setFont(undefined, "normal");
  
  const today = new Date();
  const formattedDate = 
    (today.getMonth() + 1) + "/" +
    today.getDate() + "/" +
    today.getFullYear();
  
  addParagraph(
    "This Authorization Form is valid beginning on " +
      formattedDate +
      " and expires one year after the beginning date."
  );
  y += 3;
  

  doc.setFont(undefined, "bold");
  addParagraph("5. Acknowledgment.");
  doc.setFont(undefined, "normal");
  addParagraph(
    "I understand that the information used or disclosed under this Authorization Form may be subject to re-disclosure by the person(s) or facility receiving it and would then no longer be protected by federal privacy regulations."
  );
  addParagraph(
    "I have the right to refuse to sign this Authorization Form. If signed, I have the right to revoke this authorization, in writing, at any time. I understand that any action already taken in reliance on this authorization cannot be reversed, and my revocation will not affect those actions."
  );
  y += 5;

  addParagraph(`${patientName} Signature Line`);
  if (familySignatureDataUrl) {
    doc.addImage(familySignatureDataUrl, "PNG", margin, y, SIG_IMG_W, SIG_IMG_H);
    y += SIG_IMG_H + 5;
  } else {
    y += 8;
  }

  addParagraph("or");
  addParagraph("Parent or Guardian of Patient:");
  addParagraph( (hipaaForm.guardianPrintName || ""));
  if (guardianSignatureDataUrl) {
    doc.addImage(guardianSignatureDataUrl, "PNG", margin, y, SIG_IMG_W, SIG_IMG_H);
    y += SIG_IMG_H + 5;
  } else {
    y += 8;
  }

  addParagraph(
    "I will be uploading a copy of my Driver's License for verification purposes. " +
      (hipaaForm.driverLicenseAcknowledged ? "Yes" : "No")
  );
  addParagraph(
    "I confirm the information above is accurate and I authorize this disclosure. " +
      (hipaaForm.acknowledged ? "Yes" : "No")
  );

  return doc.output("blob");
}

function SignaturePad({ canvasRef, dataUrl, setDataUrl, isOpen, label, error }) {
  const isDrawingRef = useRef(false);

  const getCanvasPoint = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY;
    if (clientX == null || clientY == null) return null;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  }, [canvasRef]);

  const startDrawing = useCallback((e) => {
    const canvas = canvasRef.current;
    const pt = getCanvasPoint(e);
    if (!canvas || !pt) return;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(pt.x, pt.y);
    isDrawingRef.current = true;
  }, [canvasRef, getCanvasPoint]);

  const draw = useCallback((e) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    const pt = getCanvasPoint(e);
    if (!canvas || !pt) return;
    e.preventDefault();
    const ctx = canvas.getContext("2d");
    ctx.lineTo(pt.x, pt.y);
    ctx.stroke();
    setDataUrl(canvas.toDataURL("image/png"));
  }, [canvasRef, getCanvasPoint, setDataUrl]);

  const stopDrawing = useCallback(() => {
    isDrawingRef.current = false;
  }, []);

  const clear = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setDataUrl("");
  }, [canvasRef, setDataUrl]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isOpen) return;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#1f2937";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, [canvasRef, isOpen]);

  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm font-medium text-gray-700">{label}</p>
      <div
        className="relative border-2 border-dashed border-purple-200 rounded-lg bg-gray-50 overflow-hidden"
        style={{ touchAction: "none" }}
      >
        <canvas
          ref={canvasRef}
          className="block w-full cursor-crosshair"
          width={CANVAS_W}
          height={CANVAS_H}
          style={{ touchAction: "none", width: "100%", height: "8rem" }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        <button
          type="button"
          onClick={clear}
          className="absolute top-2 right-2 rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700 hover:bg-purple-200"
        >
          Clear
        </button>
      </div>
      {error && <p className="text-[11px] md:text-xs text-red-600">{error}</p>}
    </div>
  );
}

const HipaaAuthorizationModal = ({
  isOpen,
  onClose,
  billId,
  billData,
  profile,
  onSuccess,
}) => {
  const [hipaaForm, setHipaaForm] = useState({
    hospitalName: "",
    billDate: "",
    guardianPrintName: "",
    patientName: "",
    acknowledged: false,
    driverLicenseAcknowledged: false,
  });
  const [familySignatureDataUrl, setFamilySignatureDataUrl] = useState("");
  const [guardianSignatureDataUrl, setGuardianSignatureDataUrl] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const canvasFamilyRef = useRef(null);
  const canvasGuardianRef = useRef(null);

  const dispatch = useDispatch();
  const { hipaaUploadLoading, hipaaUploadError } = useSelector((state) => state.bills);

  const profileHospitalName = profile?.hospitalInfo?.name || "";
  const profileGuardianName = [profile?.firstName, profile?.lastName].filter(Boolean).join(" ").trim() || "";
  const patientDisplayName = (billData?.patientName || billData?.hospital || "Patient").trim() || "Patient";

  useEffect(() => {
    if (!isOpen) return;
    // Validity date: use current date (YYYY-MM-DD) for the authorization form
    const today = new Date();
    const billDate =
      today.getFullYear() +
      "-" +
      String(today.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(today.getDate()).padStart(2, "0");
    const hospitalName = billData?.hospitalName || profileHospitalName || "";
    const patientName = (billData?.patientName || billData?.hospital || "Patient").trim() || "Patient";
    setHipaaForm((prev) => ({
      ...prev,
      billDate,
      hospitalName,
      guardianPrintName: "",
      patientName,
    }));
    setFamilySignatureDataUrl("");
    setGuardianSignatureDataUrl("");
    setFormErrors({});
    dispatch(clearHipaaUploadError());
  }, [isOpen, billData, profileHospitalName, dispatch]);

  const validateForm = () => {
    const nextErrors = {};
    if (!hipaaForm.hospitalName.trim()) {
      nextErrors.hospitalName = "Hospital name is required.";
    }
    if (!hipaaForm.billDate) {
      nextErrors.billDate = "Date is required.";
    }
    const hasFamilySig = !!familySignatureDataUrl;
    const hasGuardianSig = !!guardianSignatureDataUrl;
    if (!hasFamilySig && !hasGuardianSig) {
      nextErrors.signature = "Please provide at least one signature (Patient or Parent/Guardian).";
    }
    if (hasGuardianSig && !hipaaForm.guardianPrintName.trim()) {
      nextErrors.guardianPrintName = "Parent or guardian print name is required when signing as guardian.";
    }
    if (!hipaaForm.driverLicenseAcknowledged) {
      nextErrors.driverLicense = "Please confirm you will upload your Driver's License.";
    }
    if (!hipaaForm.acknowledged) {
      nextErrors.acknowledged = "You must confirm authorization.";
    }
    setFormErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleESignSubmit = async () => {
    if (!validateForm() || !billId) return;
    const pdfBlob = buildHipaaPdf(
      { ...hipaaForm, patientName: patientDisplayName },
      familySignatureDataUrl,
      guardianSignatureDataUrl
    );
    try {
      await dispatch(
        uploadHipaaForm({ billId, pdfBlob })
      ).unwrap();
      onSuccess?.();
      onClose();
    } catch {
      // Error is stored in Redux (hipaaUploadError) and shown below
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center  p-3 sm:p-4 pt-20 md:pt-24 pb-6">
      <div className="relative w-full max-w-md sm:max-w-3xl max-h-[80vh] overflow-y-auto thin-scrollbar rounded-3xl bg-white p-4 md:p-7 shadow-2xl mt-2">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 md:hidden"
          aria-label="Close HIPAA form"
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

        <div className="flex items-start justify-between gap-4 mb-4 md:mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900">
            HIPAA Authorization Form
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="hidden md:inline-flex text-gray-500 hover:text-gray-700"
            aria-label="Close HIPAA form"
          >
            ✕
          </button>
        </div>

        {Object.keys(formErrors).length > 0 && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs md:text-sm text-red-700">
            Please complete all required fields before e-signing.
          </div>
        )}

        {hipaaUploadError && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs md:text-sm text-red-700">
            {hipaaUploadError}
          </div>
        )}

        <div className="space-y-4 text-sm md:text-base text-gray-800">
          <p>
            I hereby authorize the use or disclosure of <strong>{patientDisplayName}</strong>&apos;s protected information as described below:
          </p>

          <div>
            <p className="font-semibold">
              1. Authorized Persons To Use and Disclose Protected Health Billing Information.
            </p>
            <p>
              <input
                type="text"
                value={hipaaForm.hospitalName}
                disabled
                className="mx-2 inline-flex w-56 rounded-md border border-yellow-200 bg-gray-100 px-2 py-1 text-gray-700 text-xs md:text-sm cursor-not-allowed"
                placeholder="Hospital Name"
              />
              {" "}is authorized to disclose the following protected health information to my hired third party company, www.HospitalDebtRelief.com of Frisco, Texas 75036.
            </p>
            {formErrors.hospitalName && (
              <p className="text-[11px] md:text-xs text-red-600">{formErrors.hospitalName}</p>
            )}
          </div>

          <div>
            <p className="font-semibold">2. Description of Information To Be Disclosed.</p>
            <p>The health information that may be disclosed is:</p>
            <p>Other: Only Hospital Billing Information</p>
          </div>

          <div>
            <p className="font-semibold">3. Purpose of the Use or Disclosure.</p>
            <p>
              The purpose of this use or disclosure is to provide www.HospitalDebtRelief.com / Uncovered Solutions LLC with the authorization to gather, discuss and inquire about information pertaining to hospital bills and the amounts owed on those bills.
            </p>
          </div>

          <div>
            <p className="font-semibold">4. Validity of Authorization Form.</p>
            <p>
              This Authorization Form is valid beginning on{" "}
              <input
                type="date"
                value={hipaaForm.billDate}
                disabled
                className="mx-2 inline-flex rounded-md border border-yellow-200 bg-gray-100 px-2 py-1 text-gray-700 text-xs md:text-sm cursor-not-allowed"
              />{" "}
              and expires one year after the beginning date.
            </p>
            {formErrors.billDate && (
              <p className="text-[11px] md:text-xs text-red-600">{formErrors.billDate}</p>
            )}
          </div>

          <div>
            <p className="font-semibold">5. Acknowledgment.</p>
            <p>
              I understand that the information used or disclosed under this Authorization Form may be subject to re-disclosure by the person(s) or facility receiving it and would then no longer be protected by federal privacy regulations.
            </p>
            <p className="mt-2">
              I have the right to refuse to sign this Authorization Form. If signed, I have the right to revoke this authorization, in writing, at any time. I understand that any action already taken in reliance on this authorization cannot be reversed, and my revocation will not affect those actions.
            </p>
          </div>

          {/* Patient Signature */}
          <div className="space-y-2">
            <p className="font-medium text-gray-800">{patientDisplayName} Signature Line</p>
            <SignaturePad
              canvasRef={canvasFamilyRef}
              dataUrl={familySignatureDataUrl}
              setDataUrl={setFamilySignatureDataUrl}
              isOpen={isOpen}
              label="Draw signature below"
              error={formErrors.signature && !guardianSignatureDataUrl ? formErrors.signature : null}
            />
          </div>

          {/* Parent or Guardian */}
          <div className="space-y-2">
            <p className="font-medium text-gray-800">or</p>
            <p className="font-medium text-gray-800">Parent or Guardian of Patient:</p>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={hipaaForm.guardianPrintName}
                onChange={(e) =>
                  setHipaaForm((prev) => ({
                    ...prev,
                    guardianPrintName: e.target.value,
                  }))
                }
                className="w-full rounded-md border border-yellow-300 bg-yellow-50 px-3 py-2 text-gray-900"
                placeholder="Print name"
              />
              {formErrors.guardianPrintName && (
                <p className="text-[11px] md:text-xs text-red-600">{formErrors.guardianPrintName}</p>
              )}
            </div>
            <SignaturePad
              canvasRef={canvasGuardianRef}
              dataUrl={guardianSignatureDataUrl}
              setDataUrl={setGuardianSignatureDataUrl}
              isOpen={isOpen}
              label="Signature Line (draw below)"
              error={formErrors.signature && !familySignatureDataUrl ? formErrors.signature : null}
            />
          </div>

          {/* Driver's License checkbox */}
          <label className="inline-flex items-start gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={hipaaForm.driverLicenseAcknowledged}
              onChange={(e) =>
                setHipaaForm((prev) => ({
                  ...prev,
                  driverLicenseAcknowledged: e.target.checked,
                }))
              }
              className="mt-1 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span>
              I will be uploading a copy of my Driver&apos;s License for verification purposes.
            </span>
          </label>
          {formErrors.driverLicense && (
            <p className="text-[11px] md:text-xs text-red-600">{formErrors.driverLicense}</p>
          )}

          <label className="inline-flex items-start gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={hipaaForm.acknowledged}
              onChange={(e) =>
                setHipaaForm((prev) => ({ ...prev, acknowledged: e.target.checked }))
              }
              className="mt-1 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span>
              I confirm the information above is accurate and I authorize this disclosure.
            </span>
          </label>
          {formErrors.acknowledged && (
            <p className="text-[11px] md:text-xs text-red-600">{formErrors.acknowledged}</p>
          )}
        </div>

        <div className="mt-6 flex flex-col md:flex-row gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-full border-2 border-purple-700 bg-white py-3 text-purple-700 font-semibold hover:bg-purple-50 transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleESignSubmit}
            disabled={hipaaUploadLoading}
            className="flex-1 rounded-full bg-gradient-to-r from-purple-700 to-purple-900 py-3 text-white font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {hipaaUploadLoading ? "Uploading…" : "E-Sign Authorization"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HipaaAuthorizationModal;
