import React, { useState } from "react";
import heroImg from "../assets/hero-img.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SuccessModal from "../components/SuccessModal";

const HomePage = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState("xyz Hospital");

  const faqs = [
    {
      question: "What are the benefits of using Medical Financial Freedom?",
      answer: [
        "Backed Our Money Back Guarantee",
        "You May Qualify to Get 100% of Your Bill Adjusted",
        "Lowered Bills Can Help Avoid Debt Collection"
      ]
    },
    {
      question: "How does the Money Back Guarantee Work?",
      answer: ['lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.']
    },
    {
      question: "How does all of this work?",
      answer: ['lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.']
    },
    {
      question: "What would I have to pay?",
      answer: ['lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.']
    }
  ];

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
          <h1 className="text-[28px] leading-[1.2] md:text-[40px] md:leading-tight font-bold">
            Have an existing hospital bill? <br />
            We work on those too!
          </h1>
          <p className="mt-4 text-white/90 text-[12px] md:text-[14px] leading-relaxed">
            Receive up to a 100% reduction on your current or future hospital bills, whether you have insurance or not.
            Explore our incredible monthly subscription plans starting at just $7/month or use our One-Time payment option
            of $399. Backed by our money back guarantee.
          </p>
          <button className="mt-7 inline-flex items-center rounded-full bg-white text-purple-800 hover:bg-purple-50 px-6 py-3 text-sm font-semibold shadow">
            Check qualification
          </button>
        </div>
      </section>

      {/* Qualification Form */}
      <section className="py-20 bg-[#F7F5FF] text-center">
        <h2 className="mb-12 text-[40px] md:text-[40px] leading-tight font-bold text-gray-900 tracking-[0.64px]">
          See If You Qualify
        </h2>
        <form 
          className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto text-left px-6"
          onSubmit={(e) => {
            e.preventDefault();
            setIsModalOpen(true);
          }}
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-900">Hospital Name</label>
            <select 
              className="h-12 w-full rounded-[40px] border border-purple-300/50 bg-white px-6 text-base text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23999%22%20d%3D%22M6%209L1%204h10z%22/%3E%3C/svg%3E')] bg-[length:12px] bg-[right_1.5rem_center] bg-no-repeat" 
              defaultValue=""
              onChange={(e) => setSelectedHospital(e.target.value || "xyz Hospital")}
            >
              <option value="" disabled>Select</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-900">Hospital City</label>
            <select className="h-12 w-full rounded-[40px] border border-purple-300/50 bg-white px-6 text-base text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23999%22%20d%3D%22M6%209L1%204h10z%22/%3E%3C/svg%3E')] bg-[length:12px] bg-[right_1.5rem_center] bg-no-repeat" defaultValue="">
              <option value="" disabled>Select</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-900">Original Bill Date</label>
            <select className="h-12 w-full rounded-[40px] border border-purple-300/50 bg-white px-6 text-base text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23999%22%20d%3D%22M6%209L1%204h10z%22/%3E%3C/svg%3E')] bg-[length:12px] bg-[right_1.5rem_center] bg-no-repeat" defaultValue="">
              <option value="" disabled>Select</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-900">Total Owned to Hospital</label>
            <div className="relative">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-base">$</span>
              <input
                type="number"
                className="h-12 w-full rounded-[40px] border border-purple-300/50 bg-white pl-10 pr-6 text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-300"
                placeholder=""
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-900">Household Annual Income</label>
            <div className="relative">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-base">$</span>
              <input
                type="number"
                className="h-12 w-full rounded-[40px] border border-purple-300/50 bg-white pl-10 pr-6 text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-300"
                placeholder=""
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-900">Size of Household</label>
            <input
              type="text"
              className="h-12 w-full rounded-[40px] border border-purple-300/50 bg-white px-6 text-base text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
              placeholder="Enter total members"
            />
          </div>
          <div className="md:col-span-2 flex justify-center">
            <button 
              type="submit"
              className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-purple-700 bg-white px-8 py-2 text-base font-bold text-purple-800 hover:bg-purple-50 transition"
            >
              Get Results <span className="text-purple-800">→</span>
            </button>
          </div>
        </form>
      </section>

      {/* Success Modal */}
      <SuccessModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        hospitalName={selectedHospital}
      />

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-b from-white to-[#EFEAFE]">
        <div className="text-center mb-10">
          <h2 className="text-[36px] md:text-[48px] leading-tight font-extrabold text-gray-900 tracking-[0.64px]">
            How it Works
          </h2>
        </div>
        <div className="relative max-w-[1200px] mx-auto">
          {/* Connector line */}
          <div className="pointer-events-none absolute left-0 right-0 top-[40px] h-[4px] bg-white/80 z-10"></div>

          {/* Card container */}
          <div className="overflow-hidden rounded-[28px] shadow-xl grid md:grid-cols-3">
            {/* Step 1 */}
            <div className="relative bg-[#4F28E8] text-white pt-28 p-16 md:p-20 min-h-[320px] flex flex-col justify-end">
              <div className="absolute top-3 right-6 z-30 w-[68px] h-[68px] rounded-full border-4 border-white/90 flex items-center justify-center text-3xl font-extrabold">
                <span className="absolute inset-1 rounded-full bg-[#4F28E8]"></span>
                <span className="relative">1</span>
              </div>
              <h3 className="text-white text-[22px] md:text-[24px] font-extrabold tracking-[0.64px]">
                Calculate Your Savings
              </h3>
              <p className="mt-2 text-white/90 text-[15px] leading-7 max-w-[520px]">
                Answer a few questions and that will tell us how much we will be able to save you.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative bg-[#1B0D47] text-white pt-28 p-16 md:p-20 min-h-[320px] flex flex-col justify-end">
              <div className="absolute top-3 right-6 z-30 w-[68px] h-[68px] rounded-full border-4 border-white/90 flex items-center justify-center text-3xl font-extrabold">
                <span className="absolute inset-1 rounded-full bg-[#1B0D47]"></span>
                <span className="relative">2</span>
              </div>
              <h3 className="text-white text-[22px] md:text-[24px] font-extrabold tracking-[0.64px]">
                Register your account
              </h3>
              <p className="mt-2 text-white/90 text-[15px] leading-7 max-w-[520px]">
                By registering your account with us, you will be able to upload an existing bill or sign up for one of our plans.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative bg-[#EFEAFE] text-[#1B0D47] pt-28 p-16 md:p-20 min-h-[320px] flex flex-col justify-end">
              <div className="absolute top-3 right-6 z-30 w-[68px] h-[68px] rounded-full border-4 border-[#C9B9FF] flex items-center justify-center text-3xl font-extrabold text-[#4F28E8]">
                <span className="absolute inset-1 rounded-full bg-[#EFEAFE]"></span>
                <span className="relative">3</span>
              </div>
              <h3 className="text-[#4F28E8] text-[22px] md:text-[24px] font-extrabold tracking-[0.64px]">
                Start saving
              </h3>
              <p className="mt-2 text-[#1B0D47] text-[15px] leading-7 max-w-[520px]">
                We will find the best way to have you pay as little as possible. Backed by our “Money Back Guarantee”.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-b from-[#F7F5FF] to-white">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16 items-start px-6">
          {/* Left copy */}
          <div>
            <p className="uppercase tracking-[0.64px] text-[12px] font-semibold text-purple-700 mb-4">Testimonials</p>
            <h2 className="text-[44px] md:text-[44px] font-bold leading-tight mb-6">
              Our clients appreciate what we do.
            </h2>
            <p className="text-[16px] text-gray-800 mb-2">Don’t just believe what we say.</p>
            <p className="text-[16px] text-gray-800 mb-8">Learn what our clients are saying about us.</p>
            <div className="flex gap-4">
              <button className="w-12 h-12 rounded-full border-2 border-purple-600 text-purple-700 flex items-center justify-center hover:bg-purple-700 hover:text-white transition">←</button>
              <button className="w-12 h-12 rounded-full border-2 border-purple-600 text-purple-700 flex items-center justify-center hover:bg-purple-700 hover:text-white transition">→</button>
            </div>
          </div>

          {/* Testimonial card */}
          <div className="rounded-[24px] border-2 border-purple-300/70 bg-white shadow-[0_20px_40px_rgba(79,40,232,0.08)] p-8 md:p-12">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="text-yellow-400 text-xl leading-none">★★★★★</div>
                <h3 className="mt-3 text-[22px] md:text-[24px] font-extrabold">Stephen Brekke</h3>
                <p className="text-gray-500 text-[14px]">From Washington State</p>
              </div>
              <img className="w-16 h-16 rounded-full object-cover" src="https://i.pravatar.cc/100?img=15" alt="avatar" />
            </div>
            <p className="text-[16px] leading-7 text-gray-700 mb-8">
              My husband has his own business with no insurance coverage. His appendix burst and he had emergency surgery.
            </p>
            <p className="text-[18px] font-extrabold text-gray-900">
              Saved Over <span className="text-purple-700">$4k</span>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-gradient-to-b from-[#F7F5FF] to-white">
        <div className="text-center mb-12">
          <h2 className="text-[40px] md:text-[56px] font-bold text-gray-900 tracking-[0.64px] leading-tight">
            Frequently Asked <br /> Questions
          </h2>
        </div>
        <div className="w-full px-6 md:px-16">
          <div className="space-y-0">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 last:border-b-0">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center gap-4 py-6 text-start"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-purple-300 flex items-center justify-center bg-white">
                    {openIndex === index ? (
                      <span className="text-gray-900 font-bold text-lg leading-none">−</span>
                    ) : (
                      <span className="text-gray-900 font-bold text-lg leading-none">+</span>
                    )}
                  </div>
                  <span className="flex-1 text-[18px] md:text-[20px] font-bold text-gray-900 tracking-[0.64px]">
                    {faq.question}
                  </span>
                </button>
                {openIndex === index && faq.answer.length > 0 && (
                  <div className="pl-12 pb-6">
                    <ul className="space-y-3 text-[16px] text-gray-900 list-none">
                      {faq.answer.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-3 mt-2.5 w-2 h-2 rounded-full bg-gray-900 flex-shrink-0"></span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="py-24 text-center bg-gradient-to-b from-white to-[#F7F5FF]">
        <h2 className="mx-auto max-w-5xl text-[36px] md:text-[38px] leading-tight font-bold tracking-[0.64px] text-gray-800">
          It has never been easier to
          <br />
          save money on your hospital bill.
        </h2>
        <button className="mt-8 inline-flex items-center gap-3 rounded-full border-2 border-purple-700 px-8 py-2 text-[18px] font-semibold text-purple-700 hover:bg-purple-50 transition">
          Get Started Here
          <span className="-mr-1">→</span>
        </button>
      </footer>

      <Footer />
    </div>
  );
};

export default HomePage;