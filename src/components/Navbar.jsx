import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import primaryLogo from "../assets/primary-logo.png";
import uploadImg from "../assets/upload-img.png";

const Navbar = ({ onOpenAddFamilyMembers }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [resourcesTimeout, setResourcesTimeout] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname, hash } = location;
  const isDashboard =
    pathname === "/dashboard" || pathname.startsWith("/bill-history");
  const isBillHistory = pathname.startsWith("/bill-history");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    setIsMobileMenuOpen(false);
    navigate("/login");
  };

  const handleResourcesMouseEnter = () => {
    if (resourcesTimeout) {
      clearTimeout(resourcesTimeout);
      setResourcesTimeout(null);
    }
    setIsResourcesOpen(true);
  };

  const handleResourcesMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsResourcesOpen(false);
    }, 150);
    setResourcesTimeout(timeout);
  };

  const navLinkClasses = (isActive) =>
    `hover:text-purple-700 transition-colors ${
      isActive ? "text-purple-700" : "text-gray-800"
    }`;

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
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] md:w-[88%]">
        <div
          className={`flex items-center justify-between rounded-full border border-purple-300 backdrop-blur-xl px-3 md:px-8 h-16 md:h-16 shadow-lg transition-colors ${
            isScrolled ? "bg-gray-100/90" : "bg-white/90"
          }`}
        >
          <div className="flex items-center h-full overflow-hidden flex-shrink-0">
            <img
              src={primaryLogo}
              alt="Logo"
              onClick={() => navigate("/")}
              className="h-10 md:h-14  object-contain object-left cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-2 md:gap-6">
            {isDashboard ? (
              <>
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-black-800">
                  <button type="button" className="hover:text-purple-700">
                    Help
                  </button>

                  <button
                    type="button"
                    className="hover:text-purple-700"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </nav>
                {isBillHistory ? (
                  <Link
                    to="/dashboard"
                    className="hidden md:inline-flex items-center justify-center gap-2 text-[#4720b1] border border-[#4720b1] px-4 py-2 rounded-full text-sm font-bold hover:bg-purple-50"
                  >
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full">
                      <img
                        src={uploadImg}
                        alt="Upload"
                        className="w-5 h-5 object-contain"
                      />
                    </span>
                    <span>Upload New Bill</span>
                  </Link>
                ) : (
                  <Link
                    to="/bill-history"
                    className="hidden md:inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-900 to-blue-800 px-5 py-2 text-white text-sm font-medium hover:from-purple-800 hover:to-blue-700 transition"
                  >
                    View Bill History
                  </Link>
                )}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-900 to-blue-800 px-3 py-2 text-white text-xs font-medium"
                >
                  {isMobileMenuOpen ? "✕" : "☰"}
                </button>
              </>
            ) : (
              <>
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-black-800">
                  <Link
                    to="/about"
                    className={navLinkClasses(pathname === "/about")}
                  >
                    About
                  </Link>
                  <Link
                    to="/contact"
                    className={navLinkClasses(pathname === "/contact")}
                  >
                    Contact
                  </Link>
                  <Link
                    to="/faq"
                    className={navLinkClasses(pathname === "/faq")}
                  >
                    FAQ
                  </Link>
                  <div 
                    className="relative"
                    onMouseEnter={handleResourcesMouseEnter}
                    onMouseLeave={handleResourcesMouseLeave}
                  >
                    <button
                      className={`hover:text-purple-700 transition-colors text-gray-800 flex items-center gap-1`}
                    >
                      Resources
                      <svg 
                        className={`w-4 h-4 transition-transform ${isResourcesOpen ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isResourcesOpen && (
                      <div className="absolute top-full left-0 mt-1 w-56 z-[60]">
                        <div className="bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                          <Link
                            to="/resources/charity-care"
                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                          >
                            What is Charity Care?
                          </Link>
                          <Link
                            to="/resources/committed-solution"
                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                          >
                            Our Committed Solution!
                          </Link>
                          <Link
                            to="/resources/state-laws"
                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                          >
                            Summary - State Laws
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                  <Link
                    to="/plans"
                    className={navLinkClasses(pathname === "/plans")}
                  >
                    Monthly Plans
                  </Link>
                </nav>
                <Link
                  to="/login"
                  className="hidden md:inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-900 to-blue-800 px-5 py-2 text-white text-sm font-medium hover:from-purple-800 hover:to-blue-700 transition"
                >
                  Login
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-900 to-blue-800 px-3 py-2 text-white text-xs font-medium"
                >
                  {isMobileMenuOpen ? "✕" : "☰"}
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu - Regular Pages */}
      {!isDashboard && isMobileMenuOpen && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-40 w-[92%] md:hidden bg-white rounded-2xl border border-purple-300 shadow-lg p-6">
          <nav className="flex flex-col space-y-4">
            <Link
              to="/about"
              className={`text-sm font-medium py-2 ${navLinkClasses(
                pathname === "/about"
              )}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium py-2 ${navLinkClasses(
                pathname === "/contact"
              )}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/faq"
              className={`text-sm font-medium py-2 ${navLinkClasses(
                pathname === "/faq"
              )}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <div className="py-2">
              <button
                className="text-sm font-medium text-gray-800 hover:text-purple-700 flex items-center justify-between w-full"
                onClick={() => setIsResourcesOpen(!isResourcesOpen)}
              >
                Resources
                <svg 
                  className={`w-4 h-4 transition-transform ${isResourcesOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isResourcesOpen && (
                <div className="mt-2 ml-4 space-y-2">
                  <Link
                    to="/resources/charity-care"
                    className="block text-sm text-gray-600 hover:text-purple-700 py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    What is Charity Care?
                  </Link>
                  <Link
                    to="/resources/committed-solution"
                    className="block text-sm text-gray-600 hover:text-purple-700 py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Our Committed Solution!
                  </Link>
                  <Link
                    to="/resources/state-laws"
                    className="block text-sm text-gray-600 hover:text-purple-700 py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Summary - State Laws
                  </Link>
                </div>
              )}
            </div>
            <Link
              to="/plans"
              className={`text-sm font-medium py-2 ${navLinkClasses(
                pathname === "/plans"
              )}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Monthly Plans
            </Link>
            <Link
              to="/login"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-900 to-blue-800 px-5 py-2 text-white text-sm font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
          </nav>
        </div>
      )}

      {/* Mobile Menu - Dashboard */}
      {isDashboard && isMobileMenuOpen && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-40 w-[92%] md:hidden bg-white rounded-2xl border border-purple-300 shadow-lg p-6">
          <nav className="flex flex-col space-y-4">
            <a
              href="#"
              className="text-sm font-medium text-gray-800 hover:text-purple-700 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Help
            </a>
            <button
              type="button"
              className="text-left text-sm font-medium text-gray-800 hover:text-purple-700 py-2"
              onClick={handleLogout}
            >
              Logout
            </button>
            {isBillHistory ? (
              <Link
                to="/dashboard"
                className="mt-4 inline-flex items-center justify-center gap-2 text-[#4720b1] border border-[#4720b1] px-4 py-2 rounded-full text-sm font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Upload New Bill</span>
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#f3ecff]">
                  <img
                    src={uploadImg}
                    alt="Upload"
                    className="w-3.5 h-3.5 object-contain"
                  />
                </span>
              </Link>
            ) : (
              <Link
                to="/bill-history"
                className="mt-4 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-900 to-blue-800 px-5 py-2 text-white text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                View Bill History
              </Link>
            )}
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
