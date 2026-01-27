import React, { useEffect, useState } from "react";

const HipaaAuthorizationModal = ({ isOpen, onClose, billData }) => {
  const [hipaaForm, setHipaaForm] = useState({
    familyMemberName: "",
    hospitalName: "",
    billDate: "",
    familyMemberSignature: "",
    guardianPrintName: "",
    guardianSignature: "",
    acknowledged: false,
  });

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
      familyMemberSignature: familyMemberName || prev.familyMemberSignature,
    }));
  }, [isOpen, billData]);

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
              <input
                type="text"
                value={hipaaForm.familyMemberSignature}
                onChange={(e) =>
                  setHipaaForm((prev) => ({
                    ...prev,
                    familyMemberSignature: e.target.value,
                  }))
                }
                className="rounded-md border border-yellow-300 bg-yellow-50 px-3 py-2 text-gray-900"
                placeholder="Type full name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Parent/Guardian Print Name
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
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Parent/Guardian Signature
              </label>
              <input
                type="text"
                value={hipaaForm.guardianSignature}
                onChange={(e) =>
                  setHipaaForm((prev) => ({
                    ...prev,
                    guardianSignature: e.target.value,
                  }))
                }
                className="rounded-md border border-yellow-300 bg-yellow-50 px-3 py-2 text-gray-900"
                placeholder="Type full name"
              />
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
            disabled={!hipaaForm.acknowledged}
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
