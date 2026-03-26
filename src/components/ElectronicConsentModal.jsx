import React, { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jsPDF } from "jspdf";
import {
  uploadElectronicConsentForm,
  clearElectronicConsentUploadError,
} from "../store/bills/billsSlice";

const CANVAS_W = 400;
const CANVAS_H = 128;

function buildElectronicConsentPdf(form, patientSigDataUrl, guardianSigDataUrl) {
  const doc = new jsPDF();
  const margin = 18;
  const pageW = doc.internal.pageSize.getWidth();
  const lineW = pageW - margin * 2;
  let y = 18;

  const addText = (text, { bold = false, size = 10, gap = 6 } = {}) => {
    doc.setFont(undefined, bold ? "bold" : "normal");
    doc.setFontSize(size);
    const lines = doc.splitTextToSize(text, lineW);
    doc.text(lines, margin, y);
    y += lines.length * 5 + gap - 5;
  };

  addText("CONSENT FOR ELECTRONIC COMMUNICATION & DISCLOSURE", { bold: true, size: 12, gap: 8 });
  addText(`Patient/Client Name: ${form.patientClientName || ""}`, { bold: true, gap: 8 });

  addText("1. PURPOSE", { bold: true, gap: 4 });
  addText(
    "This form authorizes Uncovered Solutions LLC (hospitaldebtrelief.com) to communicate with you via email regarding your account, health information, or financial records. This may include the electronic transmission of Protected Health Information (PHI) such as billing statements, treatment summaries, or other sensitive documents.",
    { gap: 7 }
  );

  addText("2. RISK ACKNOWLEDGEMENT", { bold: true, gap: 4 });
  addText("Email is a convenient but inherently unsecure communication method. By signing this form, you acknowledge and accept the following risks:", { gap: 4 });
  addText("- Interception: Emails can be intercepted, altered, or forwarded without authorization.", { gap: 3 });
  addText("- Storage: Copies of emails may exist on servers, computers, or mobile devices even after they are deleted by the sender or recipient.", { gap: 3 });
  addText("- Account Access: Anyone with access to your email account (including family members or employers) may be able to read these communications.", { gap: 3 });
  addText("- Misdirection: Emails can be sent to the wrong recipient due to clerical errors.", { gap: 7 });

  addText("3. TEXAS-SPECIFIC DISCLOSURES", { bold: true, gap: 4 });
  addText("Electronic Disclosure Notice (HB 300): Pursuant to Texas Health & Safety Code § 181.154, you are hereby notified that your protected health information is subject to electronic disclosure. The Company will obtain a separate authorization for disclosures outside of treatment, payment, or healthcare operations as required by law.", { gap: 4 });
  addText("Data Localization (SB 1188): All electronic health records containing your information are physically maintained and stored on servers located within the United States or its territories.", { gap: 3 });
  addText("Access Rights: Under Texas law, you have the right to receive an electronic copy of your records within 15 business days of a written request.", { gap: 3 });
  addText("AI Disclosure: [Optional/Delete if not applicable] The Company may use Artificial Intelligence (AI) tools to assist in the processing or analysis of your records. All AI-generated outputs are reviewed by a qualified professional.", { gap: 7 });

  addText("4. PATIENT AUTHORIZATION & E-SIGNATURE", { bold: true, gap: 4 });
  addText("I have read and understood the risks associated with email communication.", { gap: 4 });
  addText("Select One:", { bold: true, gap: 3 });
  addText(
    `${form.hipaaEmailConsent === "unencrypted_consent" ? "[X]" : "[ ]"} I CONSENT to receiving unencrypted emails containing my PHI. I understand the risks and choose to communicate this way for my convenience.`,
    { gap: 3 }
  );
  addText(
    `${form.hipaaEmailConsent === "encrypted_required" ? "[X]" : "[ ]"} I REQUIRE all emails containing PHI to be sent via a secure, encrypted portal or encrypted email service.`,
    { gap: 7 }
  );

  addText("5. RIGHT TO REVOKE", { bold: true, gap: 4 });
  addText(
    "This consent is valid until revoked in writing. You may revoke this authorization at any time by notifying the Company at support@hospitaldebtrelief.com. Revocation will not apply to information already disclosed.",
    { gap: 7 }
  );

  addText("Patient Signature Line:", { bold: true, gap: 2 });
  if (patientSigDataUrl) {
    doc.addImage(patientSigDataUrl, "PNG", margin, y, 80, 28);
  }
  y += 34;
  addText("or", { gap: 3 });
  addText(`Parent or Guardian of Patient (Print Name): ${form.guardianPrintName || ""}`, { gap: 2 });
  if (guardianSigDataUrl) {
    doc.addImage(guardianSigDataUrl, "PNG", margin, y, 80, 28);
  }
  y += 34;
  addText(`Date: ${form.date || ""}`, { bold: true, gap: 4 });

  return doc.output("blob");
}

function SignaturePad({ label, canvasRef, dataUrl, setDataUrl, error }) {
  const isDrawingRef = useRef(false);

  const getCanvasPoint = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY;
    if (clientX == null || clientY == null) return null;
    return {
      x: ((clientX - rect.left) * canvas.width) / rect.width,
      y: ((clientY - rect.top) * canvas.height) / rect.height,
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
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#1f2937";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    if (dataUrl) {
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
      img.src = dataUrl;
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [canvasRef, dataUrl]);

  return (
    <div className="space-y-1">
      <p className="text-sm font-medium text-gray-700">{label}</p>
      <div className="relative rounded-lg border-2 border-dashed border-purple-200 bg-gray-50 overflow-hidden" style={{ touchAction: "none" }}>
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          className="block w-full h-32 cursor-crosshair"
          style={{ touchAction: "none" }}
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
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

export default function ElectronicConsentModal({
  isOpen,
  onClose,
  billId,
  billData,
  profile,
  onSuccess,
}) {
  const dispatch = useDispatch();
  const { electronicConsentUploadLoading, electronicConsentUploadError } = useSelector((state) => state.bills);

  const [form, setForm] = useState({
    patientClientName: "",
    guardianPrintName: "",
    hipaaEmailConsent: "",
    acknowledged: false,
    date: "",
  });
  const [errors, setErrors] = useState({});
  const [patientSigDataUrl, setPatientSigDataUrl] = useState("");
  const [guardianSigDataUrl, setGuardianSigDataUrl] = useState("");
  const patientCanvasRef = useRef(null);
  const guardianCanvasRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const today = new Date();
    const date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    const profileName = [profile?.firstName, profile?.lastName].filter(Boolean).join(" ").trim();
    setForm({
      patientClientName: billData?.patientName || profileName || "",
      guardianPrintName: "",
      hipaaEmailConsent: billData?.hipaaEmailConsent || "",
      acknowledged: false,
      date,
    });
    setPatientSigDataUrl("");
    setGuardianSigDataUrl("");
    setErrors({});
    dispatch(clearElectronicConsentUploadError());
  }, [isOpen, billData, profile, dispatch]);

  if (!isOpen) return null;

  const validate = () => {
    const next = {};
    if (!form.patientClientName.trim()) next.patientClientName = "Patient/Client name is required.";
    if (!form.hipaaEmailConsent) next.hipaaEmailConsent = "Select one communication option.";
    if (!form.acknowledged) next.acknowledged = "Please confirm risk acknowledgement.";
    if (!patientSigDataUrl && !guardianSigDataUrl) next.signature = "Provide patient or guardian signature.";
    if (guardianSigDataUrl && !form.guardianPrintName.trim()) {
      next.guardianPrintName = "Guardian print name is required when guardian signs.";
    }
    if (!form.date) next.date = "Date is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async () => {
    if (!validate() || !billId) return;
    const pdfBlob = buildElectronicConsentPdf(form, patientSigDataUrl, guardianSigDataUrl);
    try {
      await dispatch(
        uploadElectronicConsentForm({
          billId,
          pdfBlob,
          hipaaEmailConsent: form.hipaaEmailConsent,
        })
      ).unwrap();
      onSuccess?.();
      onClose();
    } catch (_) {
      // Error handled by slice.
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-4 pt-20 md:pt-24">
      <div className="relative w-full max-w-3xl max-h-[82vh] overflow-y-auto rounded-3xl bg-white p-4 md:p-7 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          aria-label="Close consent form"
        >
          ✕
        </button>
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
          Consent for Electronic Communication & Disclosure
        </h3>

        {electronicConsentUploadError && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {electronicConsentUploadError}
          </div>
        )}

        <div className="space-y-4 text-sm text-gray-800">
          <div>
            <label className="text-sm font-medium text-gray-700">Patient/Client Name</label>
            <input
              type="text"
              value={form.patientClientName}
              onChange={(e) => setForm((prev) => ({ ...prev, patientClientName: e.target.value }))}
              className="mt-1 w-full rounded-md border border-yellow-300 bg-yellow-50 px-3 py-2 text-gray-900"
              placeholder="Enter patient/client name"
            />
            {errors.patientClientName && <p className="text-xs text-red-600 mt-1">{errors.patientClientName}</p>}
          </div>

          <div>
            <p className="font-semibold mb-1">1. PURPOSE</p>
            <p>
              This form authorizes Uncovered Solutions LLC (hospitaldebtrelief.com) to
              communicate with you via email regarding your account, health information,
              or financial records. This may include the electronic transmission of
              Protected Health Information (PHI) such as billing statements, treatment
              summaries, or other sensitive documents.
            </p>
          </div>

          <div>
            <p className="font-semibold mb-1">2. RISK ACKNOWLEDGEMENT</p>
            <p className="mb-2">
              Email is a convenient but inherently unsecure communication method. By
              signing this form, you acknowledge and accept the following risks:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Interception:</strong> Emails can be intercepted, altered, or forwarded without authorization.</li>
              <li><strong>Storage:</strong> Copies of emails may exist on servers, computers, or mobile devices even after they are deleted by the sender or recipient.</li>
              <li><strong>Account Access:</strong> Anyone with access to your email account (including family members or employers) may be able to read these communications.</li>
              <li><strong>Misdirection:</strong> Emails can be sent to the wrong recipient due to clerical errors.</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-1">3. TEXAS-SPECIFIC DISCLOSURES</p>
            <div className="space-y-1">
              <p>
                <strong>Electronic Disclosure Notice (HB 300):</strong> Pursuant to Texas
                Health &amp; Safety Code § 181.154, you are hereby notified that your
                protected health information is subject to electronic disclosure. The
                Company will obtain a separate authorization for disclosures outside of
                treatment, payment, or healthcare operations as required by law.
              </p>
              <p>
                <strong>Data Localization (SB 1188):</strong> All electronic health records
                containing your information are physically maintained and stored on servers
                located within the United States or its territories.
              </p>
              <p>
                <strong>Access Rights:</strong> Under Texas law, you have the right to
                receive an electronic copy of your records within 15 business days of a
                written request.
              </p>
              <p>
                <strong>AI Disclosure:</strong> [Optional/Delete if not applicable] The
                Company may use Artificial Intelligence (AI) tools to assist in the
                processing or analysis of your records. All AI-generated outputs are
                reviewed by a qualified professional.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-purple-200 bg-purple-50/40 p-3">
            <p className="font-semibold mb-2">4. PATIENT AUTHORIZATION &amp; E-SIGNATURE</p>
            <p className="mb-2">I have read and understood the risks associated with email communication.</p>
            <p className="font-medium mb-2">Select One:</p>
            <label className="flex items-start gap-2 text-sm text-gray-700 mb-2">
              <input
                type="checkbox"
                checked={form.hipaaEmailConsent === "unencrypted_consent"}
                onChange={() =>
                  setForm((prev) => ({ ...prev, hipaaEmailConsent: "unencrypted_consent" }))
                }
                className="mt-1 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span>
                I CONSENT to receiving unencrypted emails containing my PHI. I understand
                the risks and choose to communicate this way for my convenience.
              </span>
            </label>
            <label className="flex items-start gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={form.hipaaEmailConsent === "encrypted_required"}
                onChange={() =>
                  setForm((prev) => ({ ...prev, hipaaEmailConsent: "encrypted_required" }))
                }
                className="mt-1 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span>
                I REQUIRE all emails containing PHI to be sent via a secure, encrypted portal or encrypted email service.
              </span>
            </label>
            {errors.hipaaEmailConsent && <p className="text-xs text-red-600 mt-1">{errors.hipaaEmailConsent}</p>}

            <label className="flex items-start gap-2 text-sm text-gray-700 mt-3">
              <input
                type="checkbox"
                checked={form.acknowledged}
                onChange={(e) => setForm((prev) => ({ ...prev, acknowledged: e.target.checked }))}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span>I have read and understood the risks associated with email communication.</span>
            </label>
            {errors.acknowledged && <p className="text-xs text-red-600 mt-1">{errors.acknowledged}</p>}
          </div>

          <div>
            <p className="font-semibold mb-1">5. RIGHT TO REVOKE</p>
            <p>
              This consent is valid until revoked in writing. You may revoke this
              authorization at any time by notifying the Company at
              {" "}support@hospitaldebtrelief.com. Revocation will not apply to
              information already disclosed.
            </p>
          </div>

          <SignaturePad
            label="Patient Signature (draw below)"
            canvasRef={patientCanvasRef}
            dataUrl={patientSigDataUrl}
            setDataUrl={setPatientSigDataUrl}
            error={errors.signature && !guardianSigDataUrl ? errors.signature : null}
          />

          <div>
            <label className="text-sm font-medium text-gray-700">Parent or Guardian of Patient (Print Name)</label>
            <input
              type="text"
              value={form.guardianPrintName}
              onChange={(e) => setForm((prev) => ({ ...prev, guardianPrintName: e.target.value }))}
              className="mt-1 w-full rounded-md border border-yellow-300 bg-yellow-50 px-3 py-2 text-gray-900"
              placeholder="Print guardian name (if applicable)"
            />
            {errors.guardianPrintName && <p className="text-xs text-red-600 mt-1">{errors.guardianPrintName}</p>}
          </div>

          <SignaturePad
            label="Parent/Guardian Signature (draw below)"
            canvasRef={guardianCanvasRef}
            dataUrl={guardianSigDataUrl}
            setDataUrl={setGuardianSigDataUrl}
            error={errors.signature && !patientSigDataUrl ? errors.signature : null}
          />

          <div>
            <label className="text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
              className="mt-1 w-full rounded-md border border-yellow-300 bg-yellow-50 px-3 py-2 text-gray-900"
            />
            {errors.date && <p className="text-xs text-red-600 mt-1">{errors.date}</p>}
          </div>
        </div>

        <div className="mt-6 flex flex-col md:flex-row gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-full border-2 border-purple-700 bg-white py-3 text-purple-700 font-semibold hover:bg-purple-50"
          >
            Close
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={electronicConsentUploadLoading}
            className="flex-1 rounded-full bg-gradient-to-r from-purple-700 to-purple-900 py-3 text-white font-semibold disabled:opacity-60"
          >
            {electronicConsentUploadLoading ? "Uploading…" : "E-Sign Consent"}
          </button>
        </div>
      </div>
    </div>
  );
}
