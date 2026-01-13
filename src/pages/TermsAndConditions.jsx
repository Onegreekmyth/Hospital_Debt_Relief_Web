import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TermsAndConditionsPage = () => {
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
            Terms and Conditions
          </h1>
          <p className="mt-4 text-black text-[13px] md:text-[15px] lg:text-[18px] leading-relaxed px-2">
            Please read these terms and conditions carefully before using our
            website and services.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="w-full max-w-5xl mx-auto px-4 md:px-6 lg:px-10">
          <div className="prose prose-lg max-w-none">
            {/* 1. Acceptance of Terms */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-[24px] md:text-[32px] font-bold text-gray-900 mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-[14px] md:text-[16px] leading-7 text-gray-700 mb-4">
                By accessing and using HospitalDebtRelief.com, you accept and
                agree to be bound by the terms and provision of this agreement.
                If you do not agree to abide by the above, please do not use
                this service.
              </p>
            </div>

            {/* 2. Use License */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-[24px] md:text-[32px] font-bold text-gray-900 mb-4">
                2. Use License
              </h2>
              <p className="text-[14px] md:text-[16px] leading-7 text-gray-700 mb-4">
                Permission is granted to temporarily download one copy of the
                materials (information or software) on HospitalDebtRelief.com
                for personal, non-commercial transitory viewing only. This is
                the grant of a license, not a transfer of title, and under this
                license you may not:
              </p>
              <ul className="text-[14px] md:text-[16px] leading-7 text-gray-700 mb-4 list-disc list-inside space-y-2">
                <li>Modify or copy the materials</li>
                <li>
                  Use the materials for any commercial purpose or for any public
                  display
                </li>
                <li>
                  Attempt to decompile or reverse engineer any software
                  contained on the website
                </li>
                <li>
                  Remove any copyright or other proprietary notations from the
                  materials
                </li>
                <li>
                  Transfer the materials to another person or "mirror" the
                  materials on any other server
                </li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </div>

            {/* 3. Disclaimer of Warranties */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-[24px] md:text-[32px] font-bold text-gray-900 mb-4">
                3. Disclaimer of Warranties
              </h2>
              <p className="text-[14px] md:text-[16px] leading-7 text-gray-700 mb-4">
                The materials on HospitalDebtRelief.com are provided on an "as
                is" basis. HospitalDebtRelief.com makes no warranties, expressed
                or implied, and hereby disclaims and negates all other
                warranties including, without limitation, implied warranties or
                conditions of merchantability, fitness for a particular purpose,
                or non-infringement of intellectual property or other violation
                of rights.
              </p>
            </div>

            {/* 4. Limitations of Liability */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-[24px] md:text-[32px] font-bold text-gray-900 mb-4">
                4. Limitations of Liability
              </h2>
              <p className="text-[14px] md:text-[16px] leading-7 text-gray-700 mb-4">
                In no event shall HospitalDebtRelief.com or its suppliers be
                liable for any damages (including, without limitation, damages
                for loss of data or profit, or due to business interruption)
                arising out of the use or inability to use the materials on
                HospitalDebtRelief.com, even if we or an authorized
                representative has been notified of the possibility of such
                damage.
              </p>
            </div>

            {/* 5. Accuracy of Materials */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-[24px] md:text-[32px] font-bold text-gray-900 mb-4">
                5. Accuracy of Materials
              </h2>
              <p className="text-[14px] md:text-[16px] leading-7 text-gray-700 mb-4">
                The materials appearing on HospitalDebtRelief.com could include
                technical, typographical, or photographic errors.
                HospitalDebtRelief.com does not warrant that any of the
                materials on our website are accurate, complete, or current. We
                may make changes to the materials contained on our website at
                any time without notice.
              </p>
            </div>

            {/* 6. Materials and Services */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-[24px] md:text-[32px] font-bold text-gray-900 mb-4">
                6. Materials and Services
              </h2>
              <p className="text-[14px] md:text-[16px] leading-7 text-gray-700 mb-4">
                HospitalDebtRelief.com has not reviewed all of the sites linked
                to our website and is not responsible for the contents of any
                such linked site. The inclusion of any link does not imply
                endorsement by us of the site. Use of any such linked website is
                at the user's own risk.
              </p>
            </div>

            {/* 7. Modifications */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-[24px] md:text-[32px] font-bold text-gray-900 mb-4">
                7. Modifications
              </h2>
              <p className="text-[14px] md:text-[16px] leading-7 text-gray-700 mb-4">
                HospitalDebtRelief.com may revise these terms of service for our
                website at any time without notice. By using this website you
                are agreeing to be bound by the then current version of these
                terms of service.
              </p>
            </div>

            {/* 8. Governing Law */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-[24px] md:text-[32px] font-bold text-gray-900 mb-4">
                8. Governing Law
              </h2>
              <p className="text-[14px] md:text-[16px] leading-7 text-gray-700 mb-4">
                These terms and conditions are governed by and construed in
                accordance with the laws of the United States, and you
                irrevocably submit to the exclusive jurisdiction of the courts
                in that location.
              </p>
            </div>

            {/* 9. User Accounts */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-[24px] md:text-[32px] font-bold text-gray-900 mb-4">
                9. User Accounts
              </h2>
              <p className="text-[14px] md:text-[16px] leading-7 text-gray-700 mb-4">
                If you create an account on our website, you are responsible for
                maintaining the confidentiality of your account information and
                password. You agree to accept responsibility for all activities
                that occur under your account. You must notify us immediately of
                any unauthorized use of your account.
              </p>
            </div>

            {/* 10. User Conduct */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-[24px] md:text-[32px] font-bold text-gray-900 mb-4">
                10. User Conduct
              </h2>
              <p className="text-[14px] md:text-[16px] leading-7 text-gray-700 mb-4">
                You agree not to:
              </p>
              <ul className="text-[14px] md:text-[16px] leading-7 text-gray-700 mb-4 list-disc list-inside space-y-2">
                <li>
                  Post or transmit unlawful, threatening, abusive, defamatory,
                  obscene, or otherwise objectionable material
                </li>
                <li>Harass, threaten, or intimidate other users</li>
                <li>
                  Post or transmit any material that violates any laws or
                  regulations
                </li>
                <li>Disrupt the normal flow of dialogue within our platform</li>
                <li>
                  Engage in any form of automated data collection or scraping
                </li>
              </ul>
            </div>

            {/* 11. Money Back Guarantee */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-[24px] md:text-[32px] font-bold text-gray-900 mb-4">
                11. Money Back Guarantee
              </h2>
              <p className="text-[14px] md:text-[16px] leading-7 text-gray-700 mb-4">
                HospitalDebtRelief.com offers a Money Back Guarantee. If we are
                unable to save you more than what you paid us for our services,
                we will refund your service fee. Please refer to the detailed
                Money Back Guarantee terms for specific conditions and
                requirements.
              </p>
            </div>

            {/* 12. Service Fees */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-[24px] md:text-[32px] font-bold text-gray-900 mb-4">
                12. Service Fees
              </h2>
              <p className="text-[14px] md:text-[16px] leading-7 text-gray-700 mb-4">
                Our service fees are clearly disclosed before you commit to
                using our services. By proceeding with an application, you
                acknowledge and agree to pay the stated service fee.
                Subscription plans can be canceled at any time without further
                charges.
              </p>
            </div>

            {/* 13. Medical Disclaimer */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-[24px] md:text-[32px] font-bold text-gray-900 mb-4">
                13. Medical Disclaimer
              </h2>
              <p className="text-[14px] md:text-[16px] leading-7 text-gray-700 mb-4">
                HospitalDebtRelief.com is not a medical provider and does not
                provide medical advice. We assist with hospital billing and
                payment matters only. For medical concerns, please consult with
                your healthcare provider.
              </p>
            </div>

            {/* 14. Indemnification */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-[24px] md:text-[32px] font-bold text-gray-900 mb-4">
                14. Indemnification
              </h2>
              <p className="text-[14px] md:text-[16px] leading-7 text-gray-700 mb-4">
                You agree to indemnify, defend, and hold harmless
                HospitalDebtRelief.com and its officers, directors, employees,
                and agents from any claims, damages, losses, liabilities, and
                expenses (including attorney's fees) arising out of your use of
                the website or violation of these terms.
              </p>
            </div>

            {/* 15. Contact Information */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-[24px] md:text-[32px] font-bold text-gray-900 mb-4">
                15. Contact Information
              </h2>
              <p className="text-[14px] md:text-[16px] leading-7 text-gray-700 mb-4">
                If you have any questions about these Terms and Conditions,
                please contact us:
              </p>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mt-4">
                <p className="text-[14px] md:text-[16px] text-gray-700 mb-2">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:support@hospitaldebtrelief.com"
                    className="text-purple-600 hover:text-purple-700"
                  >
                    support@hospitaldebtrelief.com
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

export default TermsAndConditionsPage;
