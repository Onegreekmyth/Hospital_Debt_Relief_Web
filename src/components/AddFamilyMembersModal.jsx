import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createFamilyMember, updateFamilyMember } from "../store/familyMembers/familyMembersSlice";

const AddFamilyMembersModal = ({ isOpen, onClose, editingMember = null, onSuccess }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    relationship: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [acknowledgeOnlyHousehold, setAcknowledgeOnlyHousehold] = useState(false);

  useEffect(() => {
    if (editingMember) {
      setFormData({
        firstName: editingMember.firstName || "",
        lastName: editingMember.lastName || "",
        dateOfBirth: editingMember.dateOfBirth ? editingMember.dateOfBirth.split('T')[0] : "",
        relationship: editingMember.relationship || "",
      });
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        relationship: "",
      });
    }
    setError("");
    setAcknowledgeOnlyHousehold(false);
  }, [editingMember, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.firstName.trim()) {
      setError("First name is required");
      return;
    }
    if (!formData.lastName.trim()) {
      setError("Last name is required");
      return;
    }
    if (!formData.dateOfBirth) {
      setError("Date of birth is required");
      return;
    }
    if (!formData.relationship) {
      setError("Relationship is required");
      return;
    }
    if (!acknowledgeOnlyHousehold) {
      setError("Please acknowledge that you're only providing household family members");
      return;
    }

    setLoading(true);
    try {
      const memberData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        dateOfBirth: formData.dateOfBirth,
        relationship: formData.relationship,
      };

      if (editingMember) {
        // Update existing member using Redux
        await dispatch(updateFamilyMember({ id: editingMember._id, memberData })).unwrap();
      } else {
        // Create new member using Redux
        await dispatch(createFamilyMember(memberData)).unwrap();
      }
      
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (err) {
      const message =
        err ||
        editingMember
          ? "Failed to update family member"
          : "Failed to add family member";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Background overlay - no close on click outside */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" aria-hidden />

      {/* Modal card */}
      <div
        className="relative w-full max-w-xl sm:max-w-lg rounded-[32px] bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="relative px-5 sm:px-7 pt-6 pb-5 sm:pt-7 sm:pb-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <h2 className="w-full text-center text-xl sm:text-2xl font-bold text-gray-900">
              {editingMember ? "Edit Family Member" : "Add Family Members"}
            </h2>
            <button
              onClick={onClose}
              className="w-6 sm:w-8 h-6 sm:h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
              aria-label="Close"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>

          <div className="space-y-4 sm:space-y-5">
            {/* First & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* First Name */}
              <div className="flex flex-col gap-2">
                <label className="text-xs sm:text-sm font-medium text-gray-700">
                  First Name
                </label>
                <div className="relative">
                  <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300"
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
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full h-12 rounded-full border border-[#ccc2ea] bg-white pl-11 pr-4 text-sm sm:text-base text-gray-800 placeholder:text-purple-200 focus:outline-none focus:ring-1 focus:ring-[#ccc2ea]"
                    placeholder="First name"
                    required
                  />
                </div>
              </div>

              {/* Last Name */}
              <div className="flex flex-col gap-2">
                <label className="text-xs sm:text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <div className="relative">
                  <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300"
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
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full h-12 rounded-full border border-[#ccc2ea] bg-white pl-11 pr-4 text-sm sm:text-base text-gray-800 placeholder:text-purple-200 focus:outline-none focus:ring-1 focus:ring-[#ccc2ea]"
                    placeholder="Last name"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Relationship to Account Holder */}
            <div className="flex flex-col gap-2">
              <label className="text-xs sm:text-sm font-medium text-gray-700">
                Relationship to Account Holder
              </label>
              <select
                value={formData.relationship}
                onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                className="w-full h-12 rounded-full border border-[#ccc2ea] bg-white px-4 pr-12 text-sm sm:text-base text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#ccc2ea] appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%239C88FF%22%20d%3D%22M6%209L1%204h10z%22/%3E%3C/svg%3E')] bg-[length:10px] bg-[right_1.5rem_center] bg-no-repeat"
                required
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="spouse">Spouse</option>
                <option value="child">Child</option>
                <option value="stepchild">Stepchild</option>
                <option value="half-sibling">Half-sibling</option>
                <option value="domestic-partner">Domestic Partner</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col gap-2">
              <label className="text-xs sm:text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                className="w-full h-12 rounded-full border border-[#ccc2ea] bg-white px-4 pr-4 text-sm sm:text-base text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#ccc2ea] [color-scheme:light]"
                placeholder="Select date"
                required
              />
            </div>

            {/* Checkbox + Save button */}
            <div className="pt-2">
              <label className="flex items-start gap-3 text-xs sm:text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={acknowledgeOnlyHousehold}
                  onChange={(e) => setAcknowledgeOnlyHousehold(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span>I’m only providing household family members.</span>
              </label>
            </div>
          </div>

          {/* Footer button */}
          <div className="mt-6 sm:mt-8 px-2 sm:px-4 pb-2 sm:pb-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 sm:h-14 rounded-full bg-[#381989] text-white text-sm sm:text-base font-semibold shadow-[0_18px_40px_rgba(80,51,207,0.45)] hover:from-purple-800 hover:via-purple-700 hover:to-indigo-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : editingMember ? "Update" : "Save"}
            </button>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFamilyMembersModal;


