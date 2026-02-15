import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import primaryLogo from "../assets/primary-logo.png";
import uploadImg from "../assets/upload-img.png";

const Navbar = ({ onOpenAddFamilyMembers }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);
  const resourcesCloseTimeoutRef = useRef(null);
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

  useEffect(() => {
    return () => {
      if (resourcesCloseTimeoutRef.current) {
        clearTimeout(resourcesCloseTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] md:w-[88%]">
        <div
          className={`flex items-center justify-between rounded-full border border-purple-300 backdrop-blur-xl px-3 md:px-8 h-16 md:h-16 shadow-lg transition-colors overflow-visible ${
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
                  <div
                    className="relative"
                    onMouseEnter={() => {
                      if (resourcesCloseTimeoutRef.current) {
                        clearTimeout(resourcesCloseTimeoutRef.current);
                        resourcesCloseTimeoutRef.current = null;
                      }
                      setResourcesDropdownOpen(true);
                    }}
                    onMouseLeave={() => {
                      resourcesCloseTimeoutRef.current = setTimeout(() => {
                        setResourcesDropdownOpen(false);
                      }, 150);
                    }}
                  >
                    <button
                      type="button"
                      className={navLinkClasses(pathname.startsWith("/resources"))}
                      aria-expanded={resourcesDropdownOpen}
                      aria-haspopup="true"
                    >
                      Resources
                    </button>
                    {resourcesDropdownOpen && (
                      <div className="absolute left-0 top-full pt-1 z-[100]">
                        <div className="w-56 rounded-xl border border-purple-200 bg-white py-2 shadow-xl">
                          <Link
                            to="/resources/charity-care"
                            className="block px-4 py-2 text-sm text-gray-800 hover:bg-purple-50 hover:text-purple-700"
                          >
                            What is Charity Care?
                          </Link>
                          <Link
                            to="/resources/committed-solution"
                            className="block px-4 py-2 text-sm text-gray-800 hover:bg-purple-50 hover:text-purple-700"
                          >
                            Our Committed Solution
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                  <Link
                    to="/faq"
                    className={navLinkClasses(pathname === "/faq")}
                  >
                    FAQ
                  </Link>
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
            <div className="py-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Resources</p>
              <div className="flex flex-col space-y-1 pl-2">
                <Link
                  to="/resources/charity-care"
                  className={`text-sm font-medium py-1.5 ${navLinkClasses(
                    pathname === "/resources/charity-care"
                  )}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  What is Charity Care?
                </Link>
                <Link
                  to="/resources/committed-solution"
                  className={`text-sm font-medium py-1.5 ${navLinkClasses(
                    pathname === "/resources/committed-solution"
                  )}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Our Committed Solution
                </Link>
              </div>
            </div>
            <Link
              to="/faq"
              className={`text-sm font-medium py-2 ${navLinkClasses(
                pathname === "/faq"
              )}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQ
            </Link>
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
