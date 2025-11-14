import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SubmissionModal from "../components/SubmissionModal";

const Dashboard = () => {
  const [isContactInfoOpen, setIsContactInfoOpen] = useState(false);
  const [isFamilyMembersOpen, setIsFamilyMembersOpen] = useState(true);
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);

  // Disable scrolling when any modal is open
  useEffect(() => {
    if (isBillModalOpen || isSubmissionModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to restore scrolling
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isBillModalOpen, isSubmissionModalOpen]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="w-[92%] md:w-[92%] mx-auto px-6 md:px-10 py-8 pt-24 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_0.6fr] gap-32">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Contact Info Section */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
              <button
                onClick={() => setIsContactInfoOpen(!isContactInfoOpen)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Contact Info</h2>
                <svg
                  className={`w-5 h-5 text-gray-600 transition-transform ${isContactInfoOpen ? '' : 'rotate-180'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
              
              {isContactInfoOpen && (
                <div className="px-6 pb-6 space-y-4">
                  {/* First Name and Second Name in a row */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* First Name */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-medium text-gray-500">
                        First Name
                      </label>
                      <div className="relative">
                        <svg
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <input
                          type="text"
                          className="w-full h-12 rounded-full border border-gray-300 bg-white pl-12 pr-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
                          placeholder="john"
                        />
                      </div>
                    </div>

                    {/* Second Name */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-medium text-gray-500">
                        Second Name
                      </label>
                      <div className="relative">
                        <svg
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <input
                          type="text"
                          className="w-full h-12 rounded-full border border-gray-300 bg-white pl-12 pr-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
                          placeholder="Thomas"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-gray-500">
                      Email
                    </label>
                    <div className="relative">
                      <svg
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <input
                        type="email"
                        className="w-full h-12 rounded-full border border-gray-300 bg-white pl-12 pr-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
                        placeholder="email@gmail.com"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-gray-500">
                      Phone
                    </label>
                    <div className="relative">
                      <svg
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <input
                        type="tel"
                        className="w-full h-12 rounded-full border border-gray-300 bg-white pl-12 pr-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
                        placeholder="+92************"
                      />
                    </div>
                  </div>

                  {/* Annual Household Income */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-gray-500">
                      Annual Household Income
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base">$</span>
                      <input
                        type="number"
                        className="w-full h-12 rounded-full border border-gray-300 bg-white pl-10 pr-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
                        placeholder="Enter amount"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Add Family Members Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <button
                onClick={() => setIsFamilyMembersOpen(!isFamilyMembersOpen)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Add Family Members</h2>
                <svg
                  className={`w-5 h-5 text-gray-600 transition-transform ${isFamilyMembersOpen ? '' : 'rotate-180'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
              
              {isFamilyMembersOpen && (
                <div className="px-6 pb-6 space-y-4">
                  {/* First Name and Second Name in a row */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* First Name */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-medium text-gray-500">
                        First Name
                      </label>
                      <div className="relative">
                        <svg
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <input
                          type="text"
                          className="w-full h-12 rounded-full border border-gray-300 bg-white pl-12 pr-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
                          placeholder="john"
                        />
                      </div>
                    </div>

                    {/* Second Name */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-medium text-gray-500">
                        Second Name
                      </label>
                      <div className="relative">
                        <svg
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <input
                          type="text"
                          className="w-full h-12 rounded-full border border-gray-300 bg-white pl-12 pr-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
                          placeholder="Thomas"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Relationship with Patient */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-gray-500">
                      Relationship with Patient
                    </label>
                    <select className="w-full h-12 rounded-full border border-gray-300 bg-white px-4 text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-300 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23999%22%20d%3D%22M6%209L1%204h10z%22/%3E%3C/svg%3E')] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat">
                      <option value="" disabled>Select</option>
                    </select>
                  </div>

                  {/* Date of Birth */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-gray-500">
                      Date of Birth
                    </label>
                    <select className="w-full h-12 rounded-full border border-gray-300 bg-white px-4 text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-300 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23999%22%20d%3D%22M6%209L1%204h10z%22/%3E%3C/svg%3E')] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat">
                      <option value="" disabled>Select</option>
                    </select>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-gray-500">
                      Email
                    </label>
                    <div className="relative">
                      <svg
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <input
                        type="email"
                        className="w-full h-12 rounded-full border border-gray-300 bg-white pl-12 pr-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
                        placeholder="email@gmail.com"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-gray-500">
                      Phone Number
                    </label>
                    <div className="relative">
                      <svg
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <input
                        type="tel"
                        className="w-full h-12 rounded-full border border-gray-300 bg-white pl-12 pr-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
                        placeholder="+92************"
                      />
                    </div>
                  </div>

                  {/* Checkbox */}
                  <div className="flex items-start gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="email-agreement"
                      className="mt-1 w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <label htmlFor="email-agreement" className="text-sm text-gray-700">
                      I agree to receive emails to get help about this case
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Hospital Information Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Map Component - No padding */}
              <div className="relative bg-gray-100 overflow-hidden" style={{ height: '180px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.184132576782!2d-73.98784468459418!3d40.75889597932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae4e8!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Hospital Location Map"
                ></iframe>
              </div>

              {/* Content with padding */}
              <div className="p-4">
                {/* Clover Icon and Hospital Info */}
                <div className="text-center mb-4">
                  <div className="mb-2">
                    <span className="text-4xl">🍀</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-gray-900">Hospital Name</h3>
                    <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                      Available
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs text-center">1 mile away</p>
                </div>

                {/* Nearby Hospitals Section */}
                <div className=" pt-4">
                  <h3 className="text-base text-xl font-bold text-gray-900 mb-1">Nearby Hospitals</h3>
                  <p className="text-sm text-gray-800 mb-3">Based on your location and household info.</p>
                  <button 
                    onClick={() => setIsBillModalOpen(true)}
                    className="w-half mt-5 flex items-center justify-center gap-2 rounded-full border-2 border-purple-300 bg-white text-purple-700 px-4 py-2 text-sm font-medium hover:bg-purple-50 transition"
                  >
                    Upload bills to save money
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bill Information Modal */}
      {isBillModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsBillModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl shadow-xl p-6"
            onClick={(e) => e.stopPropagation()}
            style={{ 
              width: '520px',
              maxWidth: '90vw'
            }}
          >
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">Bill Information</h2>
            
            <form 
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setIsBillModalOpen(false);
                setIsSubmissionModalOpen(true);
              }}
            >
              {/* Name of Patient */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Name of Patient</label>
                <div className="relative">
                  <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <select className="w-full h-12 rounded-full border border-gray-300 bg-white pl-12 pr-10 text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-100 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%239C88FF%22%20d%3D%22M6%209L1%204h10z%22/%3E%3C/svg%3E')] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat">
                    <option value="">Select</option>
                  </select>
                </div>
              </div>

              {/* Hospital Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Hospital Name</label>
                <select className="w-full h-12 rounded-full border border-gray-300 bg-white px-4 pr-10 text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-100 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%239C88FF%22%20d%3D%22M6%209L1%204h10z%22/%3E%3C/svg%3E')] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat">
                  <option value="">Select hospital name</option>
                </select>
              </div>

              {/* Date of Services */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Date of Services</label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full h-12 rounded-full border border-gray-300 bg-white px-4 pr-4 text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-100"
                    placeholder="Select Date"
                  />
                </div>
              </div>

              {/* Upload Bill */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Upload Bill</label>
                <div className="relative">
                  <input
                    type="file"
                    id="bill-upload"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <label
                    htmlFor="bill-upload"
                    className="w-full h-12 rounded-full border border-gray-300 bg-white px-4 pr-12 flex items-center text-base text-gray-500 cursor-pointer hover:bg-purple-50 transition relative"
                  >
                    <span className="flex-1">Upload</span>
                    <svg
                      className="w-5 h-5 text-purple-400 absolute right-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-12 rounded-full bg-gradient-to-r from-purple-900 to-blue-800 text-white font-bold text-base hover:from-purple-600 hover:to-purple-800 transition-all shadow-lg mt-6"
              >
                Submit
              </button>

              {/* Supporting Documents Text */}
              <p className="text-sm text-purple-900 text-left mt-4">
                Supporting Documents may be Needed
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Submission Success Modal */}
        <SubmissionModal
        isOpen={isSubmissionModalOpen}
        onClose={() => setIsSubmissionModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;

