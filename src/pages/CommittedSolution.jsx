import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CommittedSolutionPage = () => {
  return (
    <div className="font-sans text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 md:px-6 pt-32 md:pt-40 pb-20 md:pb-28 min-h-[70vh] md:min-h-[80vh] bg-white overflow-hidden">
        {/* Soft gradient background behind the banner content */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(circle at center, rgba(86,49,211,0.22) 0, rgba(86,49,211,0.04) 45%, rgba(86,49,211,0) 70%)",
          }}
        />
        <div className="relative max-w-4xl text-gray-900">
          <h1 className="text-[24px] md:text-[28px] leading-[1.2] md:leading-tight lg:text-[40px] font-bold">
            Our Committed Solution!
          </h1>
          <p className="mt-4 text-black text-[12px] md:text-[14px] leading-relaxed px-2">
            Discover our comprehensive approach to helping you save money on hospital bills.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-10">
          <div className="prose prose-lg max-w-none">
            {/* Content will be provided by user */}
            <div className="space-y-6">
              <p className="text-[14px] md:text-[16px] leading-6 md:leading-7 text-gray-800">
                Please provide the content for this page. I'll update it with your specific content while maintaining the existing design theme.
              </p>
              
              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
                <h3 className="text-lg font-semibold text-purple-900 mb-2">Content Placeholder</h3>
                <p className="text-purple-700">
                  This section will be replaced with your committed solution content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CommittedSolutionPage;