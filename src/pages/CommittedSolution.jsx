import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CommittedSolutionPage = () => {
  return (
    <div className="font-sans text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 md:px-6 pt-32 md:pt-40 pb-16 md:pb-24 bg-white overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(circle at center, rgba(86,49,211,0.22) 0, rgba(86,49,211,0.04) 45%, rgba(86,49,211,0) 70%)",
          }}
        />
        <div className="relative max-w-3xl text-gray-900">
          <h1 className="text-[24px] md:text-[28px] leading-[1.2] md:leading-tight lg:text-[40px] font-bold">
            Our Committed Solution
          </h1>
          <p className="mt-4 text-black text-[13px] md:text-[15px] leading-relaxed px-2">
            HospitalDebtRelief.com is a dedicated digital platform designed to bridge the gap between complex hospital billing departments and the patients who qualify for financial reprieve. We demystify the &quot;hidden&quot; world of Charity Care by providing a streamlined, user-centric interface that empowers patients to identify eligibility, access required documentation, and successfully apply for the medical debt forgiveness they are legally entitled to.
          </p>
        </div>
      </section>

      {/* The Problem We Solve */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-10">
          <h2 className="text-[20px] md:text-[24px] lg:text-[28px] font-bold text-gray-900 mb-4 md:mb-6">
            The Problem We Solve
          </h2>
          <p className="text-[14px] md:text-[16px] leading-relaxed text-gray-800 mb-4">
            Navigating hospital financial assistance is notoriously difficult. Non-profit hospitals are legally required to offer help, but the process is often buried under:
          </p>
          <ul className="space-y-3 text-[14px] md:text-[16px] text-gray-800">
            <li className="flex gap-2">
              <span className="text-[#3D0BBE] font-bold shrink-0">•</span>
              <span><strong>Opaque Policies:</strong> Confusing legal jargon that discourages applicants.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#3D0BBE] font-bold shrink-0">•</span>
              <span><strong>Inaccessible Forms:</strong> Paperwork that is hard to find or difficult to submit.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#3D0BBE] font-bold shrink-0">•</span>
              <span><strong>Tight Deadlines:</strong> Strict windows for application that patients often miss while recovering.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Our Solution */}
      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-10">
          <h2 className="text-[20px] md:text-[24px] lg:text-[28px] font-bold text-gray-900 mb-4 md:mb-6">
            Our Solution
          </h2>
          <p className="text-[14px] md:text-[16px] leading-relaxed text-gray-800 mb-6">
            HospitalDebtRelief.com simplifies the path to $0 bills through three core pillars:
          </p>
          <ul className="space-y-4 text-[14px] md:text-[16px] text-gray-800">
            <li className="pl-2 border-l-4 border-[#3D0BBE]">
              <p className="font-semibold text-[#3D0BBE]">Policy Transparency</p>
              <p className="mt-1">We aggregate and translate complex hospital financial assistance policies into clear, plain-English summaries.</p>
            </li>
            <li className="pl-2 border-l-4 border-[#3D0BBE]">
              <p className="font-semibold text-[#3D0BBE]">Eligibility Screening</p>
              <p className="mt-1">Our intuitive tool allows users to input their income and household size to instantly see which discounts they qualify for based on Federal Poverty Level (FPL) benchmarks.</p>
            </li>
            <li className="pl-2 border-l-4 border-[#3D0BBE]">
              <p className="font-semibold text-[#3D0BBE]">Application Advocacy</p>
              <p className="mt-1">We provide step-by-step guidance and checklists to ensure applications are &quot;audit-proof,&quot; reducing the likelihood of a hospital denial due to missing information.</p>
            </li>
          </ul>
        </div>
      </section>

      {/* The Result */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-10">
          <h2 className="text-[20px] md:text-[24px] lg:text-[28px] font-bold text-gray-900 mb-4 md:mb-6">
            The Result
          </h2>
          <p className="text-[14px] md:text-[16px] leading-relaxed text-gray-800">
            We turn a stressful, bureaucratic hurdle into a manageable process, ensuring that medical necessity doesn&apos;t result in lifelong financial hardship.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CommittedSolutionPage;
