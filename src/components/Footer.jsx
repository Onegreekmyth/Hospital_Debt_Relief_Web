import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-[#ECE7FF] border-t border-purple-200/40">
      {/* Top row: logo + social icons */}
      <div className="w-full px-6 md:px-10 py-8 flex items-center justify-between">
        <div className="text-[40px] font-bold tracking-[0.64px] text-[#3D0BBE]">LOGO</div>
        <div className="flex items-center gap-4">
          <a href="#" aria-label="Call" className="w-10 h-10 rounded-full border-2 border-[#3D0BBE] text-[#3D0BBE] flex items-center justify-center hover:bg-[#F4F0FF] transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </a>
          <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full border-2 border-[#3D0BBE] text-[#3D0BBE] flex items-center justify-center hover:bg-[#F4F0FF] transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </a>
          <a href="#" aria-label="X" className="w-10 h-10 rounded-full border-2 border-[#3D0BBE] text-[#3D0BBE] flex items-center justify-center hover:bg-[#F4F0FF] transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </svg>
          </a>
          <a href="#" aria-label="Email" className="w-10 h-10 rounded-full border-2 border-[#3D0BBE] text-[#3D0BBE] flex items-center justify-center hover:bg-[#F4F0FF] transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </a>
        </div>
      </div>

      <div className="border-t border-purple-200/60" />

      {/* Bottom row: copyright + links */}
      <div className="w-full px-6 md:px-10 py-6 flex items-center justify-between text-[14px]">
        <p className="text-gray-800">
          © 2025 Medical Financial Freedom. All Rights Reserved.
        </p>
        <div className="flex items-center gap-6 text-gray-800">
          <a href="#" className="hover:text-[#3D0BBE]">Privacy Policy</a>
          <span className="text-gray-400">|</span>
          <a href="#" className="hover:text-[#3D0BBE]">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


