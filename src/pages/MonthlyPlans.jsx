import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MonthlyPlansPage = () => {
  const plans = [
    {
      name: "Small Family Coverage",
      price: 7,
      description: "Household subscription for a family size up to 3 people",
      popular: false,
    },
    {
      name: "My Family Coverage",
      price: 14,
      description: "Household subscription for a family size up to 3 people",
      popular: true,
    },
    {
      name: "Big Family Coverage",
      price: 21,
      description: "Household subscription for a family size up to 3 people",
      popular: false,
    },
  ];

  return (
    <div className="font-sans text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <h1 className="text-[36px] md:text-[48px] leading-tight font-bold text-gray-900 text-center pt-5 mt-5">
            Plans that could save you<br /> thousands of dollars on future<br /> hospital bills.
          </h1>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section className="py-8 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative border-2 border-purple-800 rounded-3xl p-12 ${
                  plan.popular ? "bg-[#d3c9f2]" : "bg-white"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 right-6 bg-[#3D0BBE] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Popular
                  </div>
                )}
                <h3 className="text-[20px] md:text-[22px] font-bold text-gray-900 mb-4">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-[36px] md:text-[48px] font-bold text-[#3D0BBE]">
                    ${plan.price}
                  </span>
                  <span className="text-[14px] text-gray-600 ml-2">/ per month</span>
                </div>
                <p className="text-[14px] md:text-[16px] text-gray-900 leading-relaxed">
                  {plan.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sign Up Button */}
      <section className="py-4 bg-white mb-20">
        <div className="max-w-6xl mx-auto px-6 md:px-10 flex justify-center">
          <button className="inline-flex items-center gap-2 rounded-full border-2 border-purple-700 bg-white px-8 py-3 text-[16px] md:text-[18px] font-semibold text-purple-700 hover:bg-purple-50 transition">
            Sign Up
            <span>→</span>
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MonthlyPlansPage;

