import React from "react";
import heroImg from "../assets/hero-img.png";
import nickKristinImg from "../assets/about-img.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutPage = () => {
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
            Innovative technology Driving down hospital costs.
          </h1>
          <p className="mt-4 text-white/90 text-[12px] md:text-[14px] leading-relaxed">
            We believe every health plan and patient should be billed fairly. Our advanced AI solutions detect errors, secure cost savings, and streamline hospital billing processes.
          </p>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left side - Text content */}
            <div className="order-2 md:order-1">
              <p className="text-[12px] font-semibold tracking-[0.64px] text-[#3D0BBE] uppercase mb-4">
                THE FOUNDERS OF MEDICAL FINANCIAL FREEDOM.COM
              </p>
              <h2 className="text-[36px] md:text-[48px] leading-tight font-bold text-gray-900 mb-6">
                Meet Nick & Kristin
              </h2>
              <p className="text-[16px] leading-7 text-gray-800">
                After experiencing firsthand the frustration of receiving unexpectedly high hospital bills, Nick and Kristin founded Medical Financial Freedom with a mission to help others navigate the complex world of healthcare billing. Their personal journey inspired them to create innovative solutions that empower patients to challenge unfair charges and secure the savings they deserve.
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

