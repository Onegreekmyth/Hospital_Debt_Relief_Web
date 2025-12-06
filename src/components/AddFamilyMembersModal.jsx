import React from "react";

const AddFamilyMembersModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleOverlayClick = () => {
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={handleOverlayClick}
      />

      {/* Modal card */}
      <div
        className="relative w-full max-w-xl sm:max-w-lg rounded-[32px] bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="relative px-5 sm:px-7 pt-6 pb-5 sm:pt-7 sm:pb-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <h2 className="w-full text-center text-xl sm:text-2xl font-bold text-gray-900">
              Add Family Members
            </h2>
            {/* Invisible spacer to keep title centered */}
            <span className="w-6 sm:w-8" />
          </div>

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
                    className="w-full h-12 rounded-full border border-[#ccc2ea] bg-white pl-11 pr-4 text-sm sm:text-base text-gray-800 placeholder:text-purple-200 focus:outline-none focus:ring-1 focus:ring-[#ccc2ea]"
                    placeholder="john"
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
                    className="w-full h-12 rounded-full border border-[#ccc2ea] bg-white pl-11 pr-4 text-sm sm:text-base text-gray-800 placeholder:text-purple-200 focus:outline-none focus:ring-1 focus:ring-[#ccc2ea]"
                    placeholder="Thomas"
                  />
                </div>
              </div>
            </div>

            {/* Relationship with Patient */}
            <div className="flex flex-col gap-2">
              <label className="text-xs sm:text-sm font-medium text-gray-700">
                Relationship with Patient
              </label>
              <select
                defaultValue=""
                className="w-full h-12 rounded-full border border-[#ccc2ea] bg-white px-4 pr-12 text-sm sm:text-base text-gray-800 placeholder:text-purple-200 focus:outline-none focus:ring-1 focus:ring-[#ccc2ea] appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%239C88FF%22%20d%3D%22M6%209L1%204h10z%22/%3E%3C/svg%3E')] bg-[length:10px] bg-[right_1.5rem_center] bg-no-repeat"
              >
                <option value="" disabled>
                  Select
                </option>
              </select>
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col gap-2">
              <label className="text-xs sm:text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <select
                defaultValue=""
                  className="w-full h-12 rounded-full border border-[#ccc2ea] bg-white px-4 pr-12 text-sm sm:text-base text-gray-800 placeholder:text-purple-200 focus:outline-none focus:ring-1 focus:ring-purple-300 appearance-none bg-[length:10px] bg-[right_1.5rem_center] bg-no-repeat"
              >
                <option value="" disabled>
                  Select
                </option>
              </select>
            </div>

            {/* Checkbox + Save button */}
            <div className="pt-2">
              <label className="flex items-start gap-3 text-xs sm:text-sm text-gray-700">
                <input
                  type="checkbox"
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span>I’m only providing household family members.</span>
              </label>
            </div>
          </div>

          {/* Footer button */}
          <div className="mt-6 sm:mt-8 px-2 sm:px-4 pb-2 sm:pb-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full h-12 sm:h-14 rounded-full bg-[#381989] text-white text-sm sm:text-base font-semibold shadow-[0_18px_40px_rgba(80,51,207,0.45)] hover:from-purple-800 hover:via-purple-700 hover:to-indigo-800 transition-all"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFamilyMembersModal;


