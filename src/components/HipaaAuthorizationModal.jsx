import React, { useEffect, useState } from "react";

const HipaaAuthorizationModal = ({ isOpen, onClose, billData }) => {
  const [hipaaForm, setHipaaForm] = useState({
    familyMemberName: "",
    hospitalName: "",
    billDate: "",
    guardianPrintName: "",
    acknowledged: false,
  });
  const [familySignatureFile, setFamilySignatureFile] = useState(null);
  const [guardianSignatureFile, setGuardianSignatureFile] = useState(null);
  const [familySignaturePreview, setFamilySignaturePreview] = useState("");
  const [guardianSignaturePreview, setGuardianSignaturePreview] = useState("");
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (!isOpen) return;
    const billDate = billData?.serviceDate
      ? new Date(billData.serviceDate).toISOString().slice(0, 10)
      : "";
    const familyMemberName = billData?.patientName || "";
    setHipaaForm((prev) => ({
      ...prev,
      familyMemberName,
      billDate,
    }));
    setFormErrors({});
  }, [isOpen, billData]);

  useEffect(() => {
    if (familySignatureFile) {
      const url = URL.createObjectURL(familySignatureFile);
      setFamilySignaturePreview(url);
      return () => URL.revokeObjectURL(url);
    }
    setFamilySignaturePreview("");
  }, [familySignatureFile]);

  useEffect(() => {
    if (guardianSignatureFile) {
      const url = URL.createObjectURL(guardianSignatureFile);
      setGuardianSignaturePreview(url);
      return () => URL.revokeObjectURL(url);
    }
    setGuardianSignaturePreview("");
  }, [guardianSignatureFile]);

  const validateForm = () => {
    const nextErrors = {};
    if (!hipaaForm.familyMemberName.trim()) {
      nextErrors.familyMemberName = "Family member name is required.";
    }
    if (!hipaaForm.hospitalName.trim()) {
      nextErrors.hospitalName = "Hospital name is required.";
    }
    if (!hipaaForm.billDate) {
      nextErrors.billDate = "Date of hospital bill is required.";
    }
    if (!hipaaForm.guardianPrintName.trim()) {
      nextErrors.guardianPrintName = "Parent/guardian name is required.";
    }
    if (!familySignatureFile) {
      nextErrors.familySignature = "Family member signature is required.";
    }
    if (!guardianSignatureFile) {
      nextErrors.guardianSignature = "Parent/guardian signature is required.";
    }
    if (!hipaaForm.acknowledged) {
      nextErrors.acknowledged = "You must confirm authorization.";
    }
    setFormErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-3xl overflow-y-auto thin-scrollbar rounded-3xl bg-white p-5 md:p-7 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900">
            HIPAA Authorization Form
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
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

        <div className="space-y-4 text-sm md:text-base text-gray-800">
          <p>
            I,{" "}
            <input
              type="text"
              value={hipaaForm.familyMemberName}
              onChange={(e) =>
                setHipaaForm((prev) => ({
                  ...prev,
                  familyMemberName: e.target.value,
                }))
              }
              className="mx-2 inline-flex w-48 rounded-md border border-yellow-300 bg-yellow-50 px-2 py-1 text-gray-900"
              placeholder="Family Member Name"
            />
            , Family Members, hereby authorize the use or disclosure of my
            protected information as described below:
          </p>
          {formErrors.familyMemberName && (
            <p className="text-[11px] md:text-xs text-red-600">
              {formErrors.familyMemberName}
            </p>
          )}

          <div>
            <p className="font-semibold">
              1. Authorized Persons To Use and Disclose Protected Health
              Billing Information.
            </p>
            <p>
              <input
                type="text"
                value={hipaaForm.hospitalName}
                onChange={(e) =>
                  setHipaaForm((prev) => ({
                    ...prev,
                    hospitalName: e.target.value,
                  }))
                }
                className="mx-2 inline-flex w-56 rounded-md border border-yellow-300 bg-yellow-50 px-2 py-1 text-gray-900"
                placeholder="Hospital Name"
              />
              is authorized to disclose the following protected health
              information to my hired third party company,
              www.HospitalDebtRelief.com of Frisco, Texas 75036.
            </p>
            {formErrors.hospitalName && (
              <p className="text-[11px] md:text-xs text-red-600">
                {formErrors.hospitalName}
              </p>
            )}
          </div>

          <div>
            <p className="font-semibold">
              2. Description of Information To Be Disclosed.
            </p>
            <p>Other: Only Hospital Billing Information</p>
          </div>

          <div>
            <p className="font-semibold">
              3. Purpose of the Use or Disclosure.
            </p>
            <p>
              The purpose of this use or disclosure is to provide
              www.HospitalDebtRelief.com / Uncovered Solutions LLC with the
              authorization to gather, discuss and inquire about information
              pertaining to hospital bills and the amounts owed on those bills.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              4. Validity of Authorization Form.
            </p>
            <p>
              This Authorization Form is valid beginning on{" "}
              <input
                type="date"
                value={hipaaForm.billDate}
                onChange={(e) =>
                  setHipaaForm((prev) => ({
                    ...prev,
                    billDate: e.target.value,
                  }))
                }
                className="mx-2 inline-flex rounded-md border border-yellow-300 bg-yellow-50 px-2 py-1 text-gray-900"
              />{" "}
              and expires one year after the beginning date.
            </p>
            {formErrors.billDate && (
              <p className="text-[11px] md:text-xs text-red-600">
                {formErrors.billDate}
              </p>
            )}
          </div>

          <div>
            <p className="font-semibold">5. Acknowledgment.</p>
            <p>
              I understand that the information used or disclosed under this
              Authorization Form may be subject to re-disclosure by the
              person(s) or facility receiving it and would then no longer be
              protected by federal privacy regulations.
            </p>
            <p className="mt-2">
              I have the right to refuse to sign this Authorization Form. If
              signed, I have the right to revoke this authorization, in writing,
              at any time. I understand that any action already taken in
              reliance on this authorization cannot be reversed, and my
              revocation will not affect those actions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Signature on behalf of Family Member
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFamilySignatureFile(e.target.files?.[0] || null)
                  }
                  className="w-full rounded-md border border-yellow-300 bg-yellow-50 px-3 py-2 text-gray-900 file:mr-3 file:rounded-full file:border-0 file:bg-purple-100 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-purple-700 hover:file:bg-purple-200"
                />
                {familySignaturePreview && (
                  <img
                    src={familySignaturePreview}
                    alt="Family member signature preview"
                    className="h-12 w-24 rounded-md border border-purple-200 object-contain"
                  />
                )}
              </div>
              {formErrors.familySignature && (
                <p className="text-[11px] md:text-xs text-red-600">
                  {formErrors.familySignature}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Parent/Guardian Name
              </label>
              <input
                type="text"
                value={hipaaForm.guardianPrintName}
                onChange={(e) =>
                  setHipaaForm((prev) => ({
                    ...prev,
                    guardianPrintName: e.target.value,
                  }))
                }
                className="rounded-md border border-yellow-300 bg-yellow-50 px-3 py-2 text-gray-900"
                placeholder="Print name"
              />
              {formErrors.guardianPrintName && (
                <p className="text-[11px] md:text-xs text-red-600">
                  {formErrors.guardianPrintName}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Parent/Guardian Signature
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setGuardianSignatureFile(e.target.files?.[0] || null)
                  }
                  className="w-full rounded-md border border-yellow-300 bg-yellow-50 px-3 py-2 text-gray-900 file:mr-3 file:rounded-full file:border-0 file:bg-purple-100 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-purple-700 hover:file:bg-purple-200"
                />
                {guardianSignaturePreview && (
                  <img
                    src={guardianSignaturePreview}
                    alt="Guardian signature preview"
                    className="h-12 w-24 rounded-md border border-purple-200 object-contain"
                  />
                )}
              </div>
              {formErrors.guardianSignature && (
                <p className="text-[11px] md:text-xs text-red-600">
                  {formErrors.guardianSignature}
                </p>
              )}
            </div>
          </div>

          <label className="inline-flex items-start gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={hipaaForm.acknowledged}
              onChange={(e) =>
                setHipaaForm((prev) => ({
                  ...prev,
                  acknowledged: e.target.checked,
                }))
              }
              className="mt-1 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span>
              I confirm the information above is accurate and I authorize this
              disclosure.
            </span>
          </label>
          {formErrors.acknowledged && (
            <p className="text-[11px] md:text-xs text-red-600">
              {formErrors.acknowledged}
            </p>
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
            onClick={validateForm}
            className="flex-1 rounded-full bg-gradient-to-r from-purple-700 to-purple-900 py-3 text-white font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
          >
            E-Sign Authorization
          </button>
        </div>
      </div>
    </div>
  );
};

export default HipaaAuthorizationModal;
