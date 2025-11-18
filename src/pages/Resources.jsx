import React from "react";
import heroImg from "../assets/hero-img.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import insightsImg from "../assets/insight-img.png";
import newsImg from "../assets/news-img.png";

const ResourcesPage = () => {
  return (
    <div className="font-sans text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-6 pt-40 pb-28 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(22, 10, 41, 0.55), rgba(22, 10, 41, 0.55)), url(${heroImg})`,
        }}
      >
        <div className="max-w-3xl text-white">
          <h1 className="text-[28px] leading-[1.2] md:text-[40px] md:leading-tight font-bold text-white">
            Resources
          </h1>
          <p className="mt-4 text-white/90 text-[12px] md:text-[18px] leading-relaxed">
            News, insights and guides to help you maximize savings on hospital visits.
          </p>
        </div>
      </section>

      {/* Insights Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <p className="text-[12px] font-semibold tracking-[0.64px] text-purple-600 uppercase mb-0">
            INSIGHTS
          </p>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div>
              <h2 className="text-[36px] md:text-[48px] leading-tight font-bold text-gray-900 mb-6">
                It's the 'Year of Automation' for Healthcare
              </h2>
              <p className="text-[16px] leading-7 text-gray-800 mb-6">
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
      <section className="py-20 bg-white mb-20">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <p className="text-[12px] font-semibold tracking-[0.64px] text-purple-600 uppercase mb-4">
              NEWS
            </p>
            <h2 className="text-[36px] md:text-[48px] leading-tight font-bold text-gray-900">
              The latest industry and company news.
            </h2>
          </div>

          {/* Article Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white border-2 border-purple-300 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="w-full h-32 overflow-hidden">
                  <img 
                    src={newsImg}
                    alt="Healthcare news" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-[20px] md:text-[22px] font-bold text-gray-900 mb-3">
                    It's the 'Year of Automation' for Healthcare
                  </h3>
                  <p className="text-[14px] md:text-[16px] leading-7 text-gray-800 mb-4">
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

