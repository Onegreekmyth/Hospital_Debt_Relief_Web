import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import insightsImg from "../assets/insight-img.png";
import newsImg from "../assets/news-img.png";

const ResourcesPage = () => {
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
        <div className="relative max-w-3xl text-gray-900">
          <h1 className="text-[24px] md:text-[28px] leading-[1.2] md:leading-tight lg:text-[40px] font-bold">
            Resources
          </h1>
          <p className="mt-4 text-black text-[12px] md:text-[14px] lg:text-[18px] leading-relaxed px-2">
            News, insights and guides to help you maximize savings on hospital visits.
          </p>
        </div>
      </section>

      {/* Insights Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-10">
          <p className="text-[12px] font-semibold tracking-[0.64px] text-purple-600 uppercase mb-0">
            INSIGHTS
          </p>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left side - Text content */}
            <div>
              <h2 className="text-[28px] md:text-[36px] lg:text-[48px] leading-tight font-bold text-gray-900 mb-4 md:mb-6">
                It's the 'Year of Automation' for Healthcare
              </h2>
              <p className="text-[14px] md:text-[16px] leading-6 md:leading-7 text-gray-800 mb-4 md:mb-6">
                TPAs are finally leaning into the unglamorous work of streamlining internal processes.
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-[#3D0BBE] font-semibold hover:text-purple-700 transition">
                Read More <span>→</span>
              </a>
            </div>

            {/* Right side - Magazine Image */}
            <div className="flex justify-center md:justify-end">
              <div className="w-full max-w-md  rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src={insightsImg}
                  alt="Hospital News Magazine" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-12 md:py-20 bg-white mb-12 md:mb-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-10">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-[12px] font-semibold tracking-[0.64px] text-purple-600 uppercase mb-4">
              NEWS
            </p>
            <h2 className="text-[28px] md:text-[36px] lg:text-[48px] leading-tight font-bold text-gray-900 px-4">
              The latest industry and company news.
            </h2>
          </div>

          {/* Article Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white border-2 border-purple-300 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="w-full h-32 overflow-hidden">
                  <img 
                    src={newsImg}
                    alt="Healthcare news" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-[18px] md:text-[20px] lg:text-[22px] font-bold text-gray-900 mb-2 md:mb-3">
                    It's the 'Year of Automation' for Healthcare
                  </h3>
                  <p className="text-[13px] md:text-[14px] lg:text-[16px] leading-6 md:leading-7 text-gray-800 mb-3 md:mb-4">
                    TPAs are finally leaning into the unglamorous work of streamlining internal processes.
                  </p>
                  <a href="#" className="inline-flex items-center gap-2 text-[#3D0BBE] font-semibold hover:text-purple-700 transition">
                    Read More <span>→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ResourcesPage;

