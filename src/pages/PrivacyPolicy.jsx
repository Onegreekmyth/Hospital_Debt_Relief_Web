import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPolicyPage = () => {
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
            Privacy Policy
          </h1>
          <p className="mt-4 text-black text-[13px] md:text-[15px] lg:text-[18px] leading-relaxed px-2">
            We are committed to protecting your privacy and ensuring you have a
            positive experience on our website.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="w-full max-w-5xl mx-auto px-4 md:px-6 lg:px-10">
          <div className="prose prose-lg max-w-none">
            {/* 1. Introduction */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-[24px] md:text-[32px] font-bold text-gray-900 mb-4">
                1. Introduction
              </h2>
              <p className="text-[14px] md:text-[16px] leading-7 text-gray-700 mb-4">
                HospitalDebtRelief.com ("Company," "we," "us," or "our")
                operates the website. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information when you
                visit our website and use our services.
              </p>
              <p className="text-[14px] md:text-[16px] leading-7 text-gray-700">
                Please read this Privacy Policy carefully. If you do not agree
                with our policies and practices, please do not use our website.
              </p>
            </div>

            {/* 2. Information We Collect */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-[24px] md:text-[32px] font-bold text-gray-900 mb-4">
                2. Information We Collect
              </h2>

              <h3 className="text-[18px] md:text-[22px] font-semibold text-gray-800 mb-3 mt-6">
                Personal Information You Provide
              </h3>
              <p className="text-[14px] md:text-[16px] leading-7 text-gray-700 mb-4">
                We collect information you voluntarily provide, including:
              </p>
              <ul className="text-[14px] md:text-[16px] leading-7 text-gray-700 mb-4 list-disc list-inside space-y-2">
                <li>Name, email address, and phone number</li>
                <li>Address and demographic information</li>
                <li>Hospital bill details and medical information</li>
                <li>Household income and family size information</li>
                <li>Insurance information</li>
                <li>Account login credentials</li>
              </ul>

              <h3 className="text-[18px] md:text-[22px] font-semibold text-gray-800 mb-3 mt-6">
                Information Collected Automatically
              </h3>
              <p className="text-[14px] md:text-[16px] leading-7 text-gray-700 mb-4">
                When you visit our website, we may automatically collect:
              </p>
              <ul className="text-[14px] md:text-[16px] leading-7 text-gray-700 mb-4 list-disc list-inside space-y-2">
                <li>Log data (IP address, browser type, pages visited)</li>
                <li>Device information and operating system</li>
                <li>Cookie data and tracking information</li>
                <li>Usage patterns and behavior on our website</li>
              </ul>
            </div>

            {/* 3. How We Use Your Information */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-[24px] md:text-[32px] font-bold text-gray-900 mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-[14px] md:text-[16px] leading-7 text-gray-700 mb-4">
                We use the information we collect to:
              </p>
              <ul className="text-[14px] md:text-[16px] leading-7 text-gray-700 mb-4 list-disc list-inside space-y-2">
                <li>Process your applications and provide our services</li>
                <li>Calculate your potential savings and eligibility</li>
                <li>
                  Communicate with hospitals and billing departments on your
                  behalf
                </li>
                <li>
                  Send you account updates, service notifications, and
                  promotional materials
                </li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations and prevent fraud</li>
                <li>Analyze usage patterns to enhance user experience</li>
              </ul>
            </div>

            {/* 4. Information Sharing */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-[24px] md:text-[32px] font-bold text-gray-900 mb-4">
                4. Information Sharing and Disclosure
              </h2>
              <p className="text-[14px] md:text-[16px] leading-7 text-gray-700 mb-4">
                We may share your information in the following circumstances:
              </p>
              <ul className="text-[14px] md:text-[16px] leading-7 text-gray-700 mb-4 list-disc list-inside space-y-2">
                <li>
                  <strong>With Healthcare Institutions:</strong> We share
                  relevant bill and personal information with hospitals to
                  negotiate on your behalf
                </li>
                <li>
                  <strong>With Service Providers:</strong> We share information
                  with third parties who assist us in operating our website and
                  providing services
                </li>
                <li>
                  <strong>Legal Compliance:</strong> We disclose information
                  when required by law or to protect our rights and safety
                </li>
                <li>
                  <strong>Business Transfers:</strong> In the event of a merger
                  or acquisition, your information may be transferred
                </li>
              </ul>
              <p className="text-[14px] md:text-[16px] leading-7 text-gray-700 mb-4">
                <strong>
                  We do not sell your personal data to third parties.
                </strong>
              </p>
            </div>

            {/* 5. Data Security */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-[24px] md:text-[32px] font-bold text-gray-900 mb-4">
                5. Data Security
              </h2>
              <p className="text-[14px] md:text-[16px] leading-7 text-gray-700 mb-4">
                We implement appropriate administrative, technical, and physical
                security measures to protect your personal information from
                unauthorized access, alteration, disclosure, or destruction.
                However, no method of transmission over the Internet is
                completely secure.
              </p>
            </div>

            {/* 6. Your Privacy Rights */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-[24px] md:text-[32px] font-bold text-gray-900 mb-4">
                6. Your Privacy Rights
              </h2>
              <p className="text-[14px] md:text-[16px] leading-7 text-gray-700 mb-4">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="text-[14px] md:text-[16px] leading-7 text-gray-700 mb-4 list-disc list-inside space-y-2">
                <li>Right to access your personal information</li>
                <li>Right to correct or update your information</li>
                <li>
                  Right to delete your information (subject to legal
                  obligations)
                </li>
                <li>Right to opt-out of marketing communications</li>
                <li>Right to data portability</li>
              </ul>
              <p className="text-[14px] md:text-[16px] leading-7 text-gray-700">
                To exercise any of these rights, please contact us at{" "}
                <a
                  href="mailto:privacy@hospitaldebtrelief.com"
                  className="text-purple-600 hover:text-purple-700 font-semibold"
                >
                  privacy@hospitaldebtrelief.com
                </a>
                .
              </p>
            </div>

            {/* 7. Cookies and Tracking Technologies */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-[24px] md:text-[32px] font-bold text-gray-900 mb-4">
                7. Cookies and Tracking Technologies
              </h2>
              <p className="text-[14px] md:text-[16px] leading-7 text-gray-700 mb-4">
                We use cookies and similar tracking technologies to enhance your
                experience on our website. You can control cookie settings in
                your browser preferences, though disabling cookies may affect
                website functionality.
              </p>
            </div>

            {/* 8. Third-Party Links */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-[24px] md:text-[32px] font-bold text-gray-900 mb-4">
                8. Third-Party Links
              </h2>
              <p className="text-[14px] md:text-[16px] leading-7 text-gray-700">
                Our website may contain links to third-party websites. We are
                not responsible for the privacy practices of these external
                sites. We encourage you to review their privacy policies.
              </p>
            </div>

            {/* 9. Children's Privacy */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-[24px] md:text-[32px] font-bold text-gray-900 mb-4">
                9. Children's Privacy
              </h2>
              <p className="text-[14px] md:text-[16px] leading-7 text-gray-700">
                Our website is not intended for children under 18. We do not
                knowingly collect information from minors. If we become aware
                that we have collected information from a child, we will take
                steps to delete such information and terminate the child's
                account.
              </p>
            </div>

            {/* 10. Changes to This Privacy Policy */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-[24px] md:text-[32px] font-bold text-gray-900 mb-4">
                10. Changes to This Privacy Policy
              </h2>
              <p className="text-[14px] md:text-[16px] leading-7 text-gray-700 mb-4">
                We may update this Privacy Policy periodically. Changes will be
                effective upon posting to our website with an updated "Last
                Modified" date. Your continued use of our website constitutes
                acceptance of the updated Privacy Policy.
              </p>
            </div>

            {/* 11. Contact Us */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-[24px] md:text-[32px] font-bold text-gray-900 mb-4">
                11. Contact Us
              </h2>
              <p className="text-[14px] md:text-[16px] leading-7 text-gray-700 mb-4">
                If you have questions about this Privacy Policy or our privacy
                practices, please contact us:
              </p>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mt-4">
                <p className="text-[14px] md:text-[16px] text-gray-700 mb-2">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:privacy@hospitaldebtrelief.com"
                    className="text-purple-600 hover:text-purple-700"
                  >
                    privacy@hospitaldebtrelief.com
                  </a>
                </p>
                <p className="text-[14px] md:text-[16px] text-gray-700">
                  <strong>Address:</strong> HospitalDebtRelief.com, United
                  States
                </p>
              </div>
            </div>

            {/* Last Modified */}
            <div className="border-t border-gray-200 pt-6 md:pt-8">
              <p className="text-[12px] md:text-[14px] text-gray-500">
                <strong>Last Modified:</strong> January 13, 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
