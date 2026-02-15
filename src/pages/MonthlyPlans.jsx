import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MonthlyPlansPage = () => {
  const memberships = [
    {
      name: "Small Family Coverage",
      price: 7,
      description: "Household Membership for a family size up to 3 people",
      popular: false,
    },
    {
      name: "My Family Coverage",
      price: 14,
      description: "Household Membership for a family size of 4 to 6 people",
      popular: true,
    },
    {
      name: "Big Family Coverage",
      price: 21,
      description: "Household Membership for a family size of 7 or more people",
      popular: false,
    },
  ];

  return (
    <div className="font-sans text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex items-center justify-center text-center px-4 md:px-6 pt-32 md:pt-40 pb-12 md:pb-16 min-h-[60vh] md:min-h-[70vh] bg-white overflow-hidden">
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
          <h1 className="text-[24px] md:text-[36px] lg:text-[48px] leading-tight font-bold text-center pt-5 mt-5">
            Memberships that could save you
            <span className="hidden md:inline">
              <br />
            </span>{" "}
            thousands of dollars on future
            <span className="hidden md:inline">
              <br />
            </span>{" "}
            hospital bills.
          </h1>
          <p className="text-[14px] md:text-[16px] text-gray-600 text-center mt-4 max-w-2xl mx-auto">
            Choose a membership that fits your family size and get expert help with hospital billing, financial relief, and credit protection.
          </p>
        </div>
      </section>

      {/* Membership Tiers Section */}
      <section className="py-6 md:py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {memberships.map((membership, index) => (
              <div
                key={index}
                className={`relative border-2 border-purple-800 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 ${
                  membership.popular ? "bg-[#d3c9f2] md:-mt-5 mb-5" : "bg-white mt-5"
                }`}
              >
             
                <h3 className="text-[18px] md:text-[20px] lg:text-[22px] font-bold text-gray-900 mb-3 md:mb-4">
                  {membership.name}
                </h3>
                <div className="mb-3 md:mb-4">
                  <span className="text-[32px] md:text-[36px] lg:text-[48px] font-bold text-[#3D0BBE]">
                    ${membership.price}
                  </span>
                  <span className="text-[12px] md:text-[14px] text-gray-600 ml-2">/ per month</span>
                </div>
                <p className="text-[13px] md:text-[14px] lg:text-[16px] text-gray-900 leading-relaxed">
                  {membership.description}
                </p>
              </div>
            ))}
          </div>

          {/* Membership Benefits */}
          <div className="mt-12 md:mt-16 max-w-3xl mx-auto">
            <h2 className="text-[18px] md:text-[20px] font-bold text-gray-900 mb-4">
              Your Membership Works Harder for You
            </h2>
            <p className="text-[14px] md:text-[16px] text-gray-700 mb-6">
              Everything below is included in your plan at no extra charge:
            </p>
            <ul className="space-y-3 text-[14px] md:text-[16px] text-gray-700">
              <li className="flex gap-2">
                <span className="text-[#3D0BBE] font-bold shrink-0">•</span>
                <span className="text-black"><strong>Household-Wide Protection:</strong> Financial relief isn't just for you—it covers future hospital bills for everyone under your membership plan.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#3D0BBE] font-bold shrink-0">•</span>
                <span className="text-black"><strong>Unlimited Bill Submissions:</strong> No need to pick and choose. Submit as many hospital bills as you need, whenever they arrive.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#3D0BBE] font-bold shrink-0">•</span>
                <span className="text-black"><strong>A Complete Paper Trail:</strong> Keep your full history at your fingertips with a secure, permanent account dashboard.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Sign Up Button */}
      {/* <section className="py-4 bg-white mb-20">
        <div className="max-w-6xl mx-auto px-6 md:px-10 flex justify-center">
          <button onClick={() => window.location.href = '/signup'} className="inline-flex items-center gap-2 rounded-full border-2 border-purple-700 bg-white px-8 py-3 text-[16px] md:text-[18px] font-semibold text-purple-700 hover:bg-purple-50 transition">
            Sign Up
            <span>→</span>
          </button>
        </div>
      </section> */}

      <Footer />
    </div>
  );
};

export default MonthlyPlansPage;

