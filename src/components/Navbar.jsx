import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import primaryLogo from "../assets/primary-logo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

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
      <div className={`flex items-center justify-between rounded-full border border-purple-300 backdrop-blur-xl px-5 md:px-8 h-20 md:h-16 shadow-lg transition-colors overflow-hidden ${
        isScrolled ? "bg-gray-100/90" : "bg-white/90"
      }`}>
        <div className="flex items-center h-full overflow-hidden">
          <img src={primaryLogo} alt="Logo" className="h-20 md:h-28 md:w-32 object-contain object-left" />
        </div>
        <div className="flex items-center gap-6">
          {isDashboard ? (
            <>
              <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-black-800">
                <a href="#" className="hover:text-purple-700">Bills</a>
                <a href="#" className="hover:text-purple-700">Help</a>
                <a href="#" className="hover:text-purple-700">Logout</a>
              </nav>
              <button className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-900 to-blue-800 px-5 py-2 text-white text-sm font-medium hover:from-purple-800 hover:to-blue-700 transition">
                View Bill History
              </button>
            </>
          ) : (
            <>
              <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-black-800">
                <Link to="/about" className="hover:text-purple-700">About</Link>
                <Link to="/resources" className="hover:text-purple-700">Resources</Link>
                <a href="#faq" className="hover:text-purple-700">FAQ</a>
                <Link to="/plans" className="hover:text-purple-700">Monthly Plans</Link>
              </nav>
              <button className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-900 to-blue-800 px-5 py-2 text-white text-sm font-medium hover:from-purple-800 hover:to-blue-700 transition">
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;