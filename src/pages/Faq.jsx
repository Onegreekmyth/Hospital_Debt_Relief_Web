import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const faqs = [
  {
    question: "What are the benefits of using HospitalDebtRelief.com?",
    answer: [
      "Backed Our Money Back Guarantee.",
      "Simple & Easy Process.",
      "We provide you with the right tools to save you money.",
    ],
  },
  {
    question: "How does the Money Back Guarantee work?",
    answer: [
      "Application processing times may vary, but if we are unable to save you more than what you paid us, we will refund you what you paid.",
    ],
  },
  {
    question: "How does all of this work?",
    answer: [
      "The process starts with our Savings Calculator – answer a few questions to see how much we can save you.",
      "Based on your answers, we are able to estimate your savings.",
      "The next step is easy: we will ask you to create an account with us where we will gather additional information to complete your application.",
    ],
  },
  {
    question: "How much could HospitalDebtRelief.com save me?",
    answer: [
      "People using our services could see their bill lowered by up to 100%.",
      "Keep in mind that everyone’s situation is different, so results may vary.",
      "Check out our customer feedback section to see what people are saying.",
    ],
  },
  {
    question: "What do I have to pay?",
    answer: [
      "If you allow us to help you save money, we will charge you our $299 flat fee to lower your existing hospital bill.",
      "That's it! No matter if we save you $1,000 or $10,000, a flat fee is all you pay to use our platform.",
      "You can also sign up for one of our plans to access tools to help cover you or your family against any future hospital bills at no additional cost.",
    ],
  },
  {
    question: "Why do you charge for your services?",
    answer: [
      "We use our earnings to grow our services so we can expand and help more people like you save money.",
      "We believe that everyone in America should be able to save money and avoid medical debt.",
    ],
  },
  {
    question: "What does HospitalDebtRelief.com do with my personal data?",
    answer: [
      "We only use the information you provide us to reduce your bill, including sharing your information with your healthcare institution.",
      "We will never sell your data and we take security very seriously.",
    ],
  },
  {
    question: "Do you only help with hospital bills?",
    answer: ["Yes, our services are focused on hospital bills for right now."],
  },
  {
    question:
      "Do I still need to use HospitalDebtRelief.com if I have insurance?",
    answer: [
      "Yes. Even after your insurance has been applied, you may still have out-of-pocket costs.",
      "Let us do what we can to make sure you pay as little as possible.",
    ],
  },
  {
    question: "I don’t have insurance, can you still help me?",
    answer: [
      "Yes, even if you don't have insurance, let us review your options to see how much we can save you.",
    ],
  },
  {
    question: "I already paid my bill. Can you still help?",
    answer: [
      "We only can help with unpaid hospital bills. Always check with us before making a payment.",
      "You can sign up for one of our plans to make sure that you are covered the next time you or a family member goes to the hospital.",
    ],
  },
  {
    question: "My bill is in collections, can you still lower my bill?",
    answer: [
      "Unfortunately, we are unable to assist with bills in collections. Please contact your debt collector to negotiate a balance to be paid.",
    ],
  },
  {
    question: "Who can I reach out to if I have questions?",
    answer: ["Send us an email at help@hospitaldebtrelief.com."],
  },
  {
    question: "I have a subscription, can I cancel anytime?",
    answer: [
      "Yes, subscriptions can be canceled at any time.",
      "If you cancel your subscription, you will not receive any future billing from us.",
    ],
  },
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="font-sans text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 md:px-6 pt-32 md:pt-40 pb-16 md:pb-24 min-h-[60vh] md:min-h-[70vh] bg-white overflow-hidden">
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
          <h1 className="text-[24px] md:text-[32px] lg:text-[40px] leading-tight font-bold">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-black text-[13px] md:text-[15px] lg:text-[18px] leading-relaxed px-2">
            Here you can learn more about us.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-20">
        <div className="w-full max-w-5xl mx-auto px-4 md:px-6 lg:px-10">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-[24px] md:text-[32px] lg:text-[40px] font-semibold text-gray-900 tracking-[0.64px] leading-tight">
              Frequently asked questions
            </h2>
            <p className="mt-3 text-[13px] md:text-[15px] text-gray-700">
              Find answers to common questions about how HospitalDebtRelief.com
              works.
            </p>
          </div>

          <div className="bg-white rounded-2xl md:rounded-3xl shadow-[0_16px_40px_rgba(79,40,232,0.08)] border border-purple-100">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="border-b last:border-b-0 border-gray-100"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full flex items-center gap-4 px-5 md:px-8 py-4 md:py-5 text-left"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-purple-300 flex items-center justify-center bg-white">
                    {openIndex === index ? (
                      <span className="text-gray-900 font-bold text-lg leading-none">
                        −
                      </span>
                    ) : (
                      <span className="text-gray-900 font-bold text-lg leading-none">
                        +
                      </span>
                    )}
                  </div>
                  <span className="flex-1 text-[14px] md:text-[16px] lg:text-[18px] font-semibold text-gray-900 tracking-[0.02em]">
                    {faq.question}
                  </span>
                </button>
                {openIndex === index && faq.answer.length > 0 && (
                  <div className="px-10 md:px-12 pb-4 md:pb-6">
                    <ul className="space-y-2 md:space-y-3 text-[13px] md:text-[15px] text-gray-800 list-none">
                      {faq.answer.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-3 mt-2 w-1.5 h-1.5 rounded-full bg-gray-900 flex-shrink-0" />
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

      <Footer />
    </div>
  );
};

export default FAQPage;


