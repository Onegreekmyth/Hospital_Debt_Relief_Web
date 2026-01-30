import React from "react";
import { Link } from "react-router-dom";
import primaryLogo from "../assets/primary-logo.png";

const Footer = () => {
  return (
    <>
      <footer className="py-6 md:py-8 text-center bg-[#F7F5FF] px-4">
        <h2 className="mx-auto max-w-5xl text-[20px] md:text-[32px] lg:text-[38px] leading-tight font-bold tracking-[0.64px] text-gray-800">
          It has never been easier to know how
          <span className="hidden md:inline">
            <br />
          </span>{" "}
          much you can save on your hospital bill.
        </h2>
        <Link
          to="/#savings-calculator"
          className="mt-6 md:mt-8 inline-flex items-center gap-2 md:gap-3 rounded-full border-2 border-purple-700 px-6 md:px-8 py-2 text-[14px] md:text-[18px] font-semibold text-purple-700 hover:bg-purple-50 transition"
        >
          Get Started Here
          <span className="-mr-1">→</span>
        </Link>
      </footer>
      <footer className="bg-gradient-to-b from-white to-[#ECE7FF] border-t border-purple-200/40">
        {/* Top row: logo + social icons */}
        <div className="w-full px-6 md:px-10 py-6 md:py-0 md:h-20 md:h-24 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 overflow-hidden">
          <div className="flex items-center h-full">
            <img
              src={primaryLogo}
              alt="Logo"
              className="h-20 w-auto object-contain object-left"
            />
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/share/1JyeDne4GP/?mibextid=wwXIfr"
              aria-label="Facebook"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border-2 border-[#3D0BBE] text-[#3D0BBE] flex items-center justify-center hover:bg-[#F4F0FF] transition"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/111537095"
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border-2 border-[#3D0BBE] text-[#3D0BBE] flex items-center justify-center hover:bg-[#F4F0FF] transition"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4.98 3.5C3.33 3.5 2 4.83 2 6.48c0 1.63 1.32 2.98 2.95 2.98h.03c1.66 0 2.98-1.35 2.98-2.98C7.96 4.83 6.64 3.5 4.98 3.5zM2.5 21h5V9.5h-5V21zM9.5 9.5V21h5v-6.2c0-1.66.32-3.27 2.38-3.27 2.03 0 2.06 1.9 2.06 3.38V21h5v-7.06c0-3.47-.74-6.14-4.8-6.14-1.95 0-3.25 1.07-3.78 2.08h-.06V9.5h-4.8z"></path>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/hospitaldebtrelief?igsh=cmpydTlkaHI1ZDBt&utm_source=qr"
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border-2 border-[#3D0BBE] text-[#3D0BBE] flex items-center justify-center hover:bg-[#F4F0FF] transition"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37a4 4 0 1 1-7.74 1.26 4 4 0 0 1 7.74-1.26z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>

        <div className="border-t border-purple-200/60" />

        {/* Bottom row: copyright + links */}
        <div className="w-full px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 text-[12px] md:text-[14px]">
          <p className="text-gray-800 text-center md:text-left">
            © 2025 Medical Financial Freedom. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4 md:gap-6 text-gray-800">
            <Link
              to="/privacy-policy"
              onClick={() => window.scrollTo(0, 0)}
              className="hover:text-[#3D0BBE]"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-400 hidden md:inline">|</span>
            <Link
              to="/terms-and-conditions"
              onClick={() => window.scrollTo(0, 0)}
              className="hover:text-[#3D0BBE]"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
