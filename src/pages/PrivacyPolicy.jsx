import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPolicyPage = () => {
  return (
    <div className="font-sans text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 md:px-6 pt-32 md:pt-40 pb-16 md:pb-24 min-h-[50vh] md:min-h-[55vh] bg-white overflow-hidden">
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
            This Privacy Policy applies to HospitalDebtRelief.com, Saving Calculator, User Account and Dashboard, and Uncovered Solutions LLC.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="w-full max-w-4xl mx-auto px-4 md:px-6 lg:px-10">
          <div className="prose prose-lg max-w-none text-gray-700">
            {/* Introduction */}
            <div className="mb-8 md:mb-12">
              <p className="text-[14px] md:text-[16px] leading-7 mb-4">
                This Privacy Policy ("Policy") applies to Website: HospitalDebtRelief.com, Saving Calculator, User Account and Dashboard, and Uncovered Solutions LLC ("Company") and governs data collection and usage. For the purposes of this Privacy Policy, unless otherwise noted, all references to the Company include www.HospitalDebtRelief.com. The Company's application is a platform designed to automatically determine hospital financial assistance eligibility while offering application processing services. By using the Company application, you consent to the data practices described in this statement.
              </p>
            </div>

            {/* California Consumer Privacy Act and CPRA */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-[20px] md:text-[26px] font-bold text-gray-900 mb-4">
                California Consumer Privacy Act and California Privacy Rights Act
              </h2>
              <p className="text-[14px] md:text-[16px] leading-7 mb-4">
                If you are a California resident, you have the following rights under the California Consumer Privacy Act ("CCPA") and California Privacy Rights Act ("CPRA"):
              </p>
              <ul className="text-[14px] md:text-[16px] leading-7 mb-4 list-disc list-inside space-y-2">
                <li><strong>Right to Know.</strong> You may request details on what personal data we collect, use, and share.</li>
                <li><strong>Right to Delete.</strong> You can request deletion of personal data, subject to certain legal exceptions.</li>
                <li><strong>Right to Correct.</strong> You may request corrections to inaccurate personal information.</li>
                <li><strong>Right to Opt-Out.</strong> You can opt out of the sale or sharing of personal data for advertising.</li>
                <li><strong>Right to Restrict Sensitive Data Use.</strong> You may limit the use of sensitive personal information.</li>
                <li><strong>Right Against Retaliation.</strong> The Company will not discriminate against you for exercising your rights.</li>
              </ul>
            </div>

            {/* Collection of your Personal Information */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-[20px] md:text-[26px] font-bold text-gray-900 mb-4">
                Collection of your Personal Information
              </h2>
              <p className="text-[14px] md:text-[16px] leading-7 mb-4">
                In order to better provide you with products and services offered, the Company may collect personally identifiable information, such as your:
              </p>
              <ul className="text-[14px] md:text-[16px] leading-7 mb-4 list-disc list-inside space-y-2">
                <li>First and last name</li>
                <li>Mailing address</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Employer</li>
                <li>Job title</li>
                <li>List of Family Members</li>
              </ul>
              <p className="text-[14px] md:text-[16px] leading-7 mb-4">
                If you purchase the Company's products and services, we may collect billing and credit card information. This information is used to complete the purchase transaction.
              </p>
              <p className="text-[14px] md:text-[16px] leading-7 mb-4">
                The Company may also collect anonymous demographic information, which is not unique to you, such as your:
              </p>
              <ul className="text-[14px] md:text-[16px] leading-7 mb-4 list-disc list-inside space-y-2">
                <li>Age</li>
                <li>Household income</li>
                <li>Number of Household Family Members</li>
              </ul>
              <p className="text-[14px] md:text-[16px] leading-7 mb-4">
                We do not collect any personal information about you unless you voluntarily provide it to us. However, you may be required to provide certain personal information to us when you elect to use certain products or services. These may include: (a) registering for an account; (b) entering a sweepstakes or contest sponsored by us or one of our partners; (c) signing up for special offers from selected third parties; (d) sending us an email message; (e) submitting your credit card or other payment information when ordering and purchasing products and services. To wit, we will use your information for, but not limited to, communicating with you in relation to services and/or products you have requested from us. We also may gather additional personal or non-personal information in the future.
              </p>
            </div>

            {/* Use of your Personal Information */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-[20px] md:text-[26px] font-bold text-gray-900 mb-4">
                Use of your Personal Information
              </h2>
              <p className="text-[14px] md:text-[16px] leading-7 mb-4">
                The Company collects and uses your personal information in the following ways:
              </p>
              <ul className="text-[14px] md:text-[16px] leading-7 mb-4 list-disc list-inside space-y-2">
                <li>to operate and deliver the services you have requested</li>
                <li>to provide you with information, products, or services that you request from us</li>
                <li>to provide you with notices about your account</li>
                <li>to carry out the Company's obligations and enforce our rights arising from any contracts entered between you and us, including for billing and collection</li>
                <li>to notify you about changes to Website: HospitalDebtRelief.com, Saving Calculator, User Account and Dashboard or any products or services we offer or provide through it</li>
                <li>in any other way we may describe when you provide the information</li>
                <li>for any other purpose with your consent.</li>
              </ul>
              <p className="text-[14px] md:text-[16px] leading-7 mb-4">
                The Company may also use your personally identifiable information to inform you of other products or services available from the Company and its affiliates.
              </p>
            </div>

            {/* Sharing Information with Third Parties */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-[20px] md:text-[26px] font-bold text-gray-900 mb-4">
                Sharing Information with Third Parties
              </h2>
              <p className="text-[14px] md:text-[16px] leading-7 mb-4">
                The Company does not sell, rent, or lease its customer lists to third parties.
              </p>
              <p className="text-[14px] md:text-[16px] leading-7 mb-4">
                The Company may share data with trusted partners to help perform statistical analysis, send you email or postal mail, provide customer support, or arrange for deliveries. All such third parties are prohibited from using your personal information except to provide these services to the Company, and they are required to maintain the confidentiality of your information.
              </p>
              <p className="text-[14px] md:text-[16px] leading-7 mb-4">
                The Company may disclose your personal information, without notice, if required to do so by law or in the good faith belief that such action is necessary to: (a) conform to the edicts of the law or comply with legal process served on the Company or the site; (b) protect and defend the rights or property of the Company; and/or (c) act under exigent circumstances to protect the personal safety of users of the Company, or the public.
              </p>
            </div>

            {/* Right to Deletion */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-[20px] md:text-[26px] font-bold text-gray-900 mb-4">
                Right to Deletion
              </h2>
              <p className="text-[14px] md:text-[16px] leading-7 mb-4">
                Subject to certain exceptions set out below, on receipt of a verifiable request from you, we will:
              </p>
              <ul className="text-[14px] md:text-[16px] leading-7 mb-4 list-disc list-inside space-y-2">
                <li>Delete your personal information from our records; and</li>
                <li>Direct any service providers to delete your personal information from their records.</li>
              </ul>
              <p className="text-[14px] md:text-[16px] leading-7 mb-4">
                Under the CCPA and CPRA, you have the right to request that the Company, and any third parties with whom your personal information is sold or shared, delete any personal information that has been collected about you. To exercise your rights, contact us at{" "}
                <a href="mailto:nicholas.kostakis@hotmail.com" className="text-purple-600 hover:text-purple-700 font-semibold">nicholas.kostakis@hotmail.com</a>.
              </p>
              <p className="text-[14px] md:text-[16px] leading-7 mb-4">
                Please note that we may not be able to comply with requests to delete your personal information if it is necessary to:
              </p>
              <ul className="text-[14px] md:text-[16px] leading-7 mb-4 list-disc list-inside space-y-2">
                <li>Complete the transaction for which the personal information was collected, fulfill the terms of a written warranty or product recall conducted in accordance with federal law, and provide a good or service requested by you, or reasonably anticipated within the context of our ongoing business relationship with you, or otherwise perform a contract between you and us;</li>
                <li>Detect security incidents, protect against malicious, deceptive, fraudulent, or illegal activity; or prosecute those responsible for that activity;</li>
                <li>Debug to identify and repair errors that impair existing intended functionality;</li>
                <li>Exercise free speech, ensure the right of another consumer to exercise his or her right of free speech, or exercise another right provided for by law;</li>
                <li>Comply with the California Electronic Communications Privacy Act;</li>
                <li>Engage in public or peer-reviewed scientific, historical, or statistical research in the public interest that adheres to all other applicable ethics and privacy laws, when our deletion of the information is likely to render impossible or seriously impair the achievement of such research, provided we have obtained your informed consent;</li>
                <li>Enable solely internal uses that are reasonably aligned with your expectations based on your relationship with us;</li>
                <li>Comply with an existing legal obligation; or</li>
                <li>Otherwise use your personal information, internally, in a lawful manner that is compatible with the context in which you provided the information.</li>
              </ul>
            </div>

            {/* Children Under Thirteen */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-[20px] md:text-[26px] font-bold text-gray-900 mb-4">
                Children Under Thirteen
              </h2>
              <p className="text-[14px] md:text-[16px] leading-7 mb-4">
                The Company follows the principles of the Children's Online Privacy Protection Act ("COPPA"), the GDPR, and any other local laws pertaining to the collection of children's data. Any accounts or memberships created for users known to be children will involve parental notification and/or consent.
              </p>
              <p className="text-[14px] md:text-[16px] leading-7 mb-4">
                The Company collects personally identifiable information from children under the age of 13.
              </p>
            </div>

            {/* Email Communications */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-[20px] md:text-[26px] font-bold text-gray-900 mb-4">
                Email Communications
              </h2>
              <p className="text-[14px] md:text-[16px] leading-7 mb-4">
                From time to time, the Company may contact you via email for the purpose of providing announcements, promotional offers, alerts, confirmations, surveys, and/or other general communication.
              </p>
            </div>

            {/* External Data Storage Sites */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-[20px] md:text-[26px] font-bold text-gray-900 mb-4">
                External Data Storage Sites
              </h2>
              <p className="text-[14px] md:text-[16px] leading-7 mb-4">
                We may store your data on servers provided by third-party hosting vendors with whom we have contracted.
              </p>
            </div>

            {/* Changes to This Statement */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-[20px] md:text-[26px] font-bold text-gray-900 mb-4">
                Changes to This Statement
              </h2>
              <p className="text-[14px] md:text-[16px] leading-7 mb-4">
                The Company reserves the right to change this Policy from time to time. For example, when there are changes in our services, changes in our data protection practices, or changes in the law. When changes to this Policy are significant, we will inform you. You may receive a notice by sending an email to the primary email address specified in your account, by placing a prominent notice on our Uncovered Solutions LLC, and/or by updating any privacy information. Your continued use of the application and/or services available after such modifications will constitute your: (a) acknowledgment of the modified Policy; and (b) agreement to abide and be bound by that Policy.
              </p>
            </div>

            {/* Contact Information */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-[20px] md:text-[26px] font-bold text-gray-900 mb-4">
                Contact Information
              </h2>
              <p className="text-[14px] md:text-[16px] leading-7 mb-4">
                The Company welcomes your questions or comments regarding this Policy. If you believe that the Company has not adhered to this Policy, please contact the Company at:
              </p>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mt-4">
                <p className="text-[14px] md:text-[16px] text-gray-700 mb-2">
                  <strong>Uncovered Solutions LLC</strong>
                </p>
                <p className="text-[14px] md:text-[16px] text-gray-700 mb-2">
                  _________________
                </p>
                <p className="text-[14px] md:text-[16px] text-gray-700 mb-2">
                  Frisco, Texas 75036
                </p>
                <p className="text-[14px] md:text-[16px] text-gray-700 mt-4">
                  <strong>Email Address:</strong>
                </p>
                <a
                  href="mailto:info@hospitaldebtrelief.com"
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  info@hospitaldebtrelief.com
                </a>
              </div>
            </div>

            {/* Effective Date */}
            <div className="border-t border-gray-200 pt-6 md:pt-8">
              <p className="text-[12px] md:text-[14px] text-gray-500">
                <strong>Effective as of January 01, 2026</strong>
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
