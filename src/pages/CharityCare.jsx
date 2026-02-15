import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CharityCarePage = () => {
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
            What is Charity Care?
          </h1>
          <p className="mt-4 text-black text-[13px] md:text-[15px] leading-relaxed px-2">
            Hospital Charity Care (often called Financial Assistance) is a program mandated by federal and state laws that requires non-profit hospitals to provide free or discounted medical care to people who cannot afford to pay their bills.
          </p>
          <p className="mt-3 text-black text-[13px] md:text-[15px] leading-relaxed px-2">
            Think of it as a safety net designed to prevent medical debt from ruining your financial life. Since most hospitals enjoy tax-exempt status, the government requires them to give back to the community through these programs.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-10">
          <h2 className="text-[20px] md:text-[24px] lg:text-[28px] font-bold text-gray-900 mb-4 md:mb-6">
            How It Works
          </h2>
          <p className="text-[14px] md:text-[16px] leading-relaxed text-gray-800 mb-4">
            Charity care isn&apos;t just for people without insurance; it also helps those with high deductibles or out-of-pocket costs that exceed their income.
          </p>
          <ul className="space-y-3 text-[14px] md:text-[16px] text-gray-800">
            <li className="flex gap-2">
              <span className="text-[#3D0BBE] font-bold shrink-0">•</span>
              <span><strong>Eligibility:</strong> It is almost always based on your household income relative to the Federal Poverty Level (FPL).</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#3D0BBE] font-bold shrink-0">•</span>
              <span><strong>The Threshold:</strong> Many hospitals offer 100% free care if you earn less than 200% of the FPL, and sliding-scale discounts for those earning up to 400%.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#3D0BBE] font-bold shrink-0">•</span>
              <span><strong>Coverage:</strong> It typically covers &quot;medically necessary&quot; services (ER visits, surgeries, lab tests). It usually does not cover elective or cosmetic procedures.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Key Factors to Know - Table */}
      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-10">
          <h2 className="text-[20px] md:text-[24px] lg:text-[28px] font-bold text-gray-900 mb-4 md:mb-6">
            Key Factors to Know
          </h2>
          <div className="overflow-x-auto rounded-xl border border-purple-200">
            <table className="min-w-full text-left text-[13px] md:text-[15px]">
              <thead>
                <tr className="bg-purple-50 border-b border-purple-200">
                  <th className="px-4 py-3 md:px-5 md:py-4 font-semibold text-gray-900">Feature</th>
                  <th className="px-4 py-3 md:px-5 md:py-4 font-semibold text-gray-900">Description</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3 md:px-5 md:py-4 font-medium text-[#3D0BBE]">Federal Law</td>
                  <td className="px-4 py-3 md:px-5 md:py-4">Under the Affordable Care Act (Section 501(r)), non-profit hospitals must have a written financial assistance policy.</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3 md:px-5 md:py-4 font-medium text-[#3D0BBE]">Timing</td>
                  <td className="px-4 py-3 md:px-5 md:py-4">You can often apply before treatment, while you are in the hospital, or even months after you&apos;ve received a bill (sometimes even if it&apos;s in collections).</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 md:px-5 md:py-4 font-medium text-[#3D0BBE]">Application</td>
                  <td className="px-4 py-3 md:px-5 md:py-4">You usually have to provide proof of income, such as tax returns, pay stubs, or bank statements.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* The "Hidden" Nature */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-10">
          <h2 className="text-[20px] md:text-[24px] lg:text-[28px] font-bold text-gray-900 mb-4 md:mb-6">
            The &quot;Hidden&quot; Nature of Charity Care
          </h2>
          <p className="text-[14px] md:text-[16px] leading-relaxed text-gray-800">
            Hospitals are legally required to publicize these programs, but they don&apos;t always make them obvious. You might find the information buried on their website under &quot;Financial Assistance&quot; or printed in tiny text on the back of your medical bill.
          </p>
        </div>
      </section>

      {/* Common Misconceptions */}
      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-10">
          <h2 className="text-[20px] md:text-[24px] lg:text-[28px] font-bold text-gray-900 mb-4 md:mb-6">
            Common Misconceptions
          </h2>
          <ul className="space-y-5 text-[14px] md:text-[16px] text-gray-800">
            <li className="pl-2 border-l-4 border-purple-200">
              <p className="italic text-gray-700">&quot;I have a job, so I won&apos;t qualify.&quot;</p>
              <p className="mt-1"><strong className="text-green-700">Incorrect.</strong> Many families earning $50,000–$100,000 (depending on family size) still qualify for partial discounts.</p>
            </li>
            <li className="pl-2 border-l-4 border-purple-200">
              <p className="italic text-gray-700">&quot;It&apos;s too late because my bill went to collections.&quot;</p>
              <p className="mt-1"><strong className="text-green-700">Not necessarily.</strong> Federal rules give you a 240-day window from the first billing statement to apply for assistance, and some state laws extend this.</p>
            </li>
          </ul>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CharityCarePage;
