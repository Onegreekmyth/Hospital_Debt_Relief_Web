import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] md:w-[88%]">
      <div className={`flex items-center justify-between rounded-full border border-white/40 backdrop-blur-xl px-5 md:px-8 py-3 shadow-lg transition-colors ${
        isScrolled ? "bg-gray-200/90" : "bg-white/90"
      }`}>
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-sm md:text-base">LOGO</span>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-black-800">
            <a href="#about" className="hover:text-purple-700">About</a>
            <a href="#resources" className="hover:text-purple-700">Resources</a>
            <a href="#faq" className="hover:text-purple-700">FAQ</a>
            <a href="#plans" className="hover:text-purple-700">Monthly Plans</a>
          </nav>
          <button className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-900 to-blue-800 px-5 py-2 text-white text-sm font-medium hover:from-purple-800 hover:to-blue-700 transition">
            Login
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;