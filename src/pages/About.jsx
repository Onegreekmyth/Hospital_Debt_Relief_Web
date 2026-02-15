import React from "react";
import nickKristinImg from "../assets/Nick-Kristin.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutPage = () => {
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
          Helping You Secure the Financial Relief You Deserve!
          </h1>
          <p className="mt-4 text-black text-[12px] md:text-[14px] leading-relaxed px-2">
          We believe that everyone should receive the savings they deserve. Our advanced on-line solutions will quickly determine your eligibility while offering a streamlined process to save money on your hospital bills.          </p>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Left side - Text content */}
            <div className="order-2 md:order-1">
              <p className="text-[12px] font-semibold tracking-[0.64px] text-[#3D0BBE] uppercase mb-4">
                THE FOUNDERS OF HOSPITALDEBTRELIEF.COM
              </p>
              <h2 className="text-[28px] md:text-[36px] lg:text-[48px] leading-tight font-bold text-gray-900 mb-4 md:mb-6">
                Meet Nick & Kristin
              </h2>
              <p className="text-[14px] md:text-[16px] leading-6 md:leading-7 text-gray-800">
              We know that sinking feeling when you open a hospital bill and see a number you didn’t expect. We’ve been there and that’s why we founded <a href="https://www.hospitaldebtrelief.com" target="_blank" rel="noopener noreferrer" className="text-[#3D0BBE] font-semibold hover:underline focus:underline focus:outline-none">HospitalDebtRelief.com</a>! We believe a medical crisis shouldn’t be followed by a financial one. Having navigated our own healthcare billing challenges, we’ve dedicated ourselves to being the support we wish we’d had. We’re here to take the weight off your shoulders by using our developed system to fight for the savings you deserve.
              </p>
            </div>

            {/* Right side - Image */}
            <div className="order-1 md:order-2 flex justify-center md:justify-end">
              <div className="w-full max-w-md">
                <img 
                  src={nickKristinImg} 
                  alt="Nick & Kristin" 
                  className="w-full h-auto rounded-lg object-cover shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;

