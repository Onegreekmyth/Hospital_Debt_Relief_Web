import React, { useEffect, useMemo, useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import heroImg from "../assets/hero-img.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SuccessModal from "../components/SuccessModal";
import axiosClient from "../api/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHospitals,
  resetHospitals,
} from "../store/hospitals/hospitalsSlice";
import usStates from "../data/usStates.json";
import usStateNameToCode from "../data/usStateNameToCode.json";

const HomePage = () => {
  const navigate = useNavigate();

  const [openIndex, setOpenIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedHospitalId, setSelectedHospitalId] = useState("");
  const [hospitalInputActive, setHospitalInputActive] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [householdIncome, setHouseholdIncome] = useState("");
  const [householdSize, setHouseholdSize] = useState("");
  const [notInCollections, setNotInCollections] = useState(false);
  const [eligibilityLoading, setEligibilityLoading] = useState(false);
  const [eligibilityError, setEligibilityError] = useState("");
  const [eligibilityResponse, setEligibilityResponse] = useState(null);
  const [hospitalError, setHospitalError] = useState("");
  const [incomeError, setIncomeError] = useState("");
  const [sizeError, setSizeError] = useState("");
  const [existingBill, setExistingBill] = useState("");
  const [billAmount, setBillAmount] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [recaptchaError, setRecaptchaError] = useState("");
  const formSectionRef = useRef(null);
  const existingBillRef = useRef(null);

  const dispatch = useDispatch();
  const {
    items: hospitals,
    page,
    totalPages,
    status,
  } = useSelector((state) => state.hospitals);
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  // Build dropdown options for states and cities
  const stateOptions = useMemo(() => {
    if (!usStates || usStates.length === 0) return [];
    return [...usStates].sort();
  }, []);

  // Map selected state name to API state code (e.g. "New York" -> "NY")
  const apiStateCode = useMemo(() => {
    if (!selectedState) return undefined;
    return usStateNameToCode[selectedState] || selectedState;
  }, [selectedState]);

  // Derive available cities for the selected state from hospitals API data
  const cityOptions = useMemo(() => {
    if (!hospitals || hospitals.length === 0) return [];
    const set = new Set();
    hospitals.forEach((h) => {
      if (!h.City) return;
      if (apiStateCode && h.State !== apiStateCode) return;
      set.add(h.City);
    });
    return Array.from(set).sort();
  }, [hospitals, apiStateCode]);

  // Load hospitals whenever filters change (including initial load with no filters)
  useEffect(() => {
    dispatch(resetHospitals());
    dispatch(
      fetchHospitals({
        page: 1,
        state: apiStateCode,
        city: selectedCity || undefined,
      })
    );
  }, [dispatch, apiStateCode, selectedCity]);

  const hospitalOptions = useMemo(() => hospitals || [], [hospitals]);

  // Clear selected hospital when state or city changes
  useEffect(() => {
    setSelectedHospital("");
    setSelectedHospitalId("");
    setHospitalInputActive(false);
  }, [selectedState, selectedCity]);

  const handleSelectHospital = (hospital) => {
    setSelectedHospital(hospital.Name);
    setSelectedHospitalId(hospital._id);
    setHospitalInputActive(false);
  };

  const handleHospitalScroll = (e) => {
    if (!hospitalInputActive) return;
    if (status === "loading") return;
    if (page >= totalPages) return;

    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    // Prefetch next page a bit earlier so scrolling feels smoother
    if (distanceFromBottom < 120) {
      dispatch(
        fetchHospitals({
          page: page + 1,
          state: apiStateCode,
          city: selectedCity || undefined,
        })
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure modal is not shown when there are validation errors
    setIsModalOpen(false);

    // Reset field errors
    setHospitalError("");
    setIncomeError("");
    setSizeError("");
    setRecaptchaError("");

    let hasError = false;

    if (!selectedHospitalId) {
      setHospitalError("Please select a local hospital.");
      hasError = true;
    }

    if (!householdIncome) {
      setIncomeError("Please enter your annual household income.");
      hasError = true;
    } else if (Number(householdIncome) <= 0) {
      setIncomeError("Income must be greater than 0.");
      hasError = true;
    }

    if (!householdSize) {
      setSizeError("Please enter your household family size.");
      hasError = true;
    } else if (Number(householdSize) <= 0) {
      setSizeError("Family size must be at least 1.");
      hasError = true;
    }

    // Validate state and city (required by backend)
    if (!selectedState) {
      setEligibilityError("Please select a state.");
      hasError = true;
    }

    if (!selectedCity) {
      setEligibilityError("Please select a city.");
      hasError = true;
    }

    // Validate billAmount if existingBill is "yes"
    if (existingBill === "yes" && (!billAmount || Number(billAmount) <= 0)) {
      setEligibilityError("Please enter a valid bill amount.");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    if (!recaptchaToken) {
      setRecaptchaError("Please complete the CAPTCHA.");
      return;
    }

    setEligibilityLoading(true);
    setEligibilityError("");
    setEligibilityResponse(null);

    try {
      const payload = {
        hospitalId: selectedHospitalId,
        householdIncome: Number(householdIncome),
        householdSize: Number(householdSize),
        isInCollections: !notInCollections,
        hasExistingBill: existingBill === "yes",
        state: selectedState,
        city: selectedCity,
        billAmount: existingBill === "yes" ? Number(billAmount) : undefined,
      };

      const response = await axiosClient.post(
        "/hospitals/calculate-eligibility",
        payload
      );

      setEligibilityResponse(response.data);
      
      // Save eligibility request ID to localStorage for linking to user account
      if (response.data?.data?.eligibilityRequestId) {
        localStorage.setItem('pendingEligibilityRequestId', response.data.data.eligibilityRequestId);
      }
      
      setIsModalOpen(true);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Unable to calculate eligibility right now.";
      setEligibilityError(message);
      setIsModalOpen(true);
    } finally {
      setEligibilityLoading(false);
    }
  };

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
        "Keep in mind that everyone's situation is different, so results may vary.",
        "Check out our customer feedback section to see what people are saying.",
      ],
    },
  ];

  return (
    <div className="font-sans text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-4 md:px-6 pt-32 md:pt-40 pb-20 md:pb-28 min-h-[90vh] md:min-h-[90vh] bg-no-repeat bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(136, 126, 156, 0.55), rgba(191, 184, 207, 0.55)), url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-3xl text-black">
          <h1 className="text-[20px] md:text-[28px] leading-[1.2] md:leading-tight lg:text-[42px] font-bold text-black">
            We provide the tools to help you save money on your hospital bills.
          </h1>
          <br />
          <h6 className="text-[14px] md:text-[20px] leading-[1.4] md:leading-tight lg:text-[18px]">
            Receive up to a 100% reduction on your current hospital bills,
            whether you have insurance or not. You can also explore our low
            monthly subscription plans starting at just $7/month to be prepared
            for future hospital bills.
          </h6>
          <p className="mt-4 text-black/90 text-[11px] md:text-[14px] leading-relaxed px-2">
            All backed by our money back Guarantee
          </p>
          <button
            type="button"
            onClick={() => {
              formSectionRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
              setTimeout(() => {
                existingBillRef.current?.focus();
              }, 300);
            }}
            className="mt-6 md:mt-7 inline-flex items-center border-2 border-purple-700 rounded-full bg-white text-purple-700 hover:bg-purple-50 px-5 md:px-6 py-2.5 md:py-3 text-xs md:text-sm font-semibold shadow"
          >
            Check qualification
          </button>
        </div>
      </section>

      {/* Qualification Form */}
      <section
        ref={formSectionRef}
        className="py-16 md:py-24 bg-[#F7F5FF] text-center"
      >
        <h2 className="mb-10 md:mb-14 text-[32px] md:text-[44px] leading-tight font-semibold text-gray-900 tracking-[0.04em] px-4">
          Savings Calculator
        </h2>
        <form
          className="max-w-6xl mx-auto text-left px-4 md:px-6 space-y-8"
          onSubmit={handleSubmit}
        >
          {/* Row 1 */}
          <div className="grid gap-4 md:gap-6 md:grid-cols-4">
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm md:text-base font-medium text-gray-900">
                Existing Hospital Bill?
              </label>
              <select
                ref={existingBillRef}
                className="h-14 w-full rounded-full border border-purple-200 bg-white px-6 text-sm md:text-base text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23999%22%20d%3D%22M6%209L1%204h10z%22/%3E%3C/svg%3E')] bg-[length:12px] bg-[right_1.5rem_center] bg-no-repeat"
                value={existingBill}
                onChange={(e) => setExistingBill(e.target.value)}
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm md:text-base font-medium text-gray-900">
                State
              </label>
              <select
                className="h-14 w-full rounded-full border border-purple-200 bg-white px-6 text-sm md:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-300 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23999%22%20d%3D%22M6%209L1%204h10z%22/%3E%3C/svg%3E')] bg-[length:12px] bg-[right_1.5rem_center] bg-no-repeat"
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedCity("");
                }}
              >
                <option value="">Select</option>
                {stateOptions.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm md:text-base font-medium text-gray-900">
                City
              </label>
              <select
                className="h-14 w-full rounded-full border border-purple-200 bg-white px-6 text-sm md:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-300 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23999%22%20d%3D%22M6%209L1%204h10z%22/%3E%3C/svg%3E')] bg-[length:12px] bg-[right_1.5rem_center] bg-no-repeat"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                disabled={cityOptions.length === 0}
              >
                <option value="">Select</option>
                {cityOptions.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid gap-4 md:gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm md:text-base font-medium text-gray-900">
                Local Hospital
              </label>
              <div className="relative">
                <button
                  type="button"
                  className="h-14 w-full rounded-full border border-purple-200 bg-white px-6 text-sm md:text-base text-gray-700 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-purple-300"
                  onClick={() => setHospitalInputActive((prev) => !prev)}
                >
                  <span
                    className={
                      selectedHospital ? "text-gray-700" : "text-gray-500"
                    }
                  >
                    {selectedHospital ||
                      (status === "loading" && hospitalOptions.length === 0
                        ? "Loading hospitals..."
                        : "Select hospital")}
                  </span>
                  <span className="ml-2 text-gray-400 text-xs">▼</span>
                </button>

                {hospitalInputActive && (
                  <div
                    className="absolute z-20 mt-2 w-full rounded-xl border border-purple-200 bg-white shadow-lg max-h-60 overflow-y-auto"
                    onScroll={handleHospitalScroll}
                  >
                    {hospitalOptions.map((hospital) => (
                      <button
                        type="button"
                        key={hospital._id}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-purple-50"
                        onClick={() => handleSelectHospital(hospital)}
                      >
                        {hospital.Name} ({hospital.City}, {hospital.State})
                      </button>
                    ))}

                    {status === "succeeded" && hospitalOptions.length === 0 && (
                      <div className="px-4 py-2 text-sm text-gray-500">
                        No hospital found for the selected state or city.
                      </div>
                    )}

                    {status === "failed" && (
                      <div className="px-4 py-2 text-sm text-red-500">
                        Unable to load hospitals. Please try again.
                      </div>
                    )}

                    {status === "loading" && (
                      <div className="px-4 py-2 text-xs text-gray-400">
                        Loading hospitals...
                      </div>
                    )}
                  </div>
                )}
              </div>
              {hospitalError && (
                <p className="mt-1 text-xs text-red-600">{hospitalError}</p>
              )}
            </div>
            {existingBill === "yes" && (
              <div className="flex flex-col gap-2">
                <label className="text-sm md:text-base font-medium text-gray-900">
                  Bill Amount
                </label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-base">
                    $
                  </span>
                  <input
                    type="number"
                    className="h-14 w-full rounded-full border border-purple-200 bg-white pl-10 pr-6 text-sm md:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-300"
                    placeholder="Enter bill amount"
                    value={billAmount}
                    onChange={(e) => setBillAmount(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Row 3 */}
          <div className="grid gap-4 md:gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm md:text-base font-medium text-gray-900">
                Annual Household Income
              </label>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-base">
                  $
                </span>
                <input
                  type="number"
                  className="h-14 w-full rounded-full border border-purple-200 bg-white pl-10 pr-6 text-sm md:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  placeholder=""
                  value={householdIncome}
                  onChange={(e) => setHouseholdIncome(e.target.value)}
                />
              </div>
              {incomeError && (
                <p className="mt-1 text-xs text-red-600">{incomeError}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm md:text-base font-medium text-gray-900">
                Household Family Size
              </label>
              <input
                type="number"
                className="h-14 w-full rounded-full border border-purple-200 bg-white px-6 text-sm md:text-base text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
                placeholder="Enter total members"
                value={householdSize}
                onChange={(e) => setHouseholdSize(e.target.value)}
              />
              {sizeError && (
                <p className="mt-1 text-xs text-red-600">{sizeError}</p>
              )}
            </div>
          </div>

          {/* Checkbox Row */}
          {existingBill === "yes" && (
            <div className="flex justify-start pt-2">
              <label className="inline-flex items-center text-xs md:text-sm text-gray-700">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                  checked={notInCollections}
                  onChange={(e) => setNotInCollections(e.target.checked)}
                />
                <span className="ml-2">
                  My hospital bill is not in collections
                </span>
              </label>
            </div>
          )}

          {/* CAPTCHA Row - required, left-aligned */}
          <div className="pt-4">
            <p className="text-sm font-medium text-gray-900 mb-2">
              Verification <span className="text-red-600">*</span>
            </p>
            <div className="flex justify-start pt-1">
              {recaptchaSiteKey ? (
                <ReCAPTCHA
                  sitekey={recaptchaSiteKey}
                  onChange={(token) => {
                    setRecaptchaToken(token || "");
                    setRecaptchaError("");
                  }}
                  onExpired={() => {
                    setRecaptchaToken("");
                    setRecaptchaError("CAPTCHA expired. Please retry.");
                  }}
                  onErrored={() => {
                    setRecaptchaToken("");
                    setRecaptchaError("CAPTCHA failed to load. Please retry.");
                  }}
                />
              ) : (
                <div className="w-full max-w-md rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  Set `VITE_RECAPTCHA_SITE_KEY` to enable CAPTCHA.
                </div>
              )}
            </div>
            {recaptchaError && (
              <p className="mt-2 text-left text-xs text-red-600">
                {recaptchaError}
              </p>
            )}
          </div>

          {/* Button Row */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={eligibilityLoading}
              className="inline-flex items-center gap-2 rounded-full border-2 border-purple-700 bg-transparent px-10 py-3 text-sm md:text-base font-semibold text-purple-800 hover:bg-purple-50 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {eligibilityLoading ? "Checking..." : "Get Results"}{" "}
              <span className="text-purple-800">→</span>
            </button>
          </div>
        </form>
      </section>

      {/* Success Modal */}
      <SuccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        hospitalName={selectedHospital}
        eligibilityResponse={eligibilityResponse}
        eligibilityError={eligibilityError}
        hasExistingBill={existingBill === "yes"}
        billAmount={existingBill === "yes" ? Number(billAmount) : undefined}
      />

      {/* How It Works */}
      <section className="py-12 md:py-24 bg-gradient-to-b from-white to-[#EFEAFE] px-4 md:px-0">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-[28px] md:text-[36px] lg:text-[48px] leading-tight font-extrabold text-gray-900 tracking-[0.64px]">
            How it Works
          </h2>
        </div>
        <div className="relative max-w-[1200px] mx-auto">
          {/* Connector line - hidden on mobile */}
          <div className="hidden md:block pointer-events-none absolute left-0 right-0 top-[40px] h-[4px] bg-white/80 z-10"></div>

          {/* Card container */}
          <div className="overflow-hidden rounded-[20px] md:rounded-[28px] shadow-xl grid md:grid-cols-3">
            {/* Step 1 */}
            <div className="relative bg-[#4F28E8] text-white pt-20 md:pt-28 p-8 md:p-16 lg:p-20 min-h-[280px] md:min-h-[320px] flex flex-col justify-end">
              <div className="absolute top-3 right-4 md:right-6 z-30 w-12 h-12 md:w-[68px] md:h-[68px] rounded-full border-2 md:border-4 border-white/90 flex items-center justify-center text-xl md:text-3xl font-extrabold">
                <span className="absolute inset-1 rounded-full bg-[#4F28E8]"></span>
                <span className="relative">1</span>
              </div>
              <h3 className="text-white text-[18px] md:text-[22px] lg:text-[24px] font-extrabold tracking-[0.64px]">
                Calculate Your Savings
              </h3>
              <p className="mt-2 text-white/90 text-[14px] md:text-[15px] leading-6 md:leading-7 max-w-[520px]">
                Answer a few questions and that will tell us how much we will be
                able to save you.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative bg-[#1B0D47] text-white pt-20 md:pt-28 p-8 md:p-16 lg:p-20 min-h-[280px] md:min-h-[320px] flex flex-col justify-end">
              <div className="absolute top-3 right-4 md:right-6 z-30 w-12 h-12 md:w-[68px] md:h-[68px] rounded-full border-2 md:border-4 border-white/90 flex items-center justify-center text-xl md:text-3xl font-extrabold">
                <span className="absolute inset-1 rounded-full bg-[#1B0D47]"></span>
                <span className="relative">2</span>
              </div>
              <h3 className="text-white text-[18px] md:text-[22px] lg:text-[24px] font-extrabold tracking-[0.64px]">
                Register your account
              </h3>
              <p className="mt-2 text-white/90 text-[14px] md:text-[15px] leading-6 md:leading-7 max-w-[520px]">
                By registering your account with us, you will be able to upload
                an existing bill or sign up for one of our plans.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative bg-[#EFEAFE] text-[#1B0D47] pt-20 md:pt-28 p-8 md:p-16 lg:p-20 min-h-[280px] md:min-h-[320px] flex flex-col justify-end">
              <div className="absolute top-3 right-4 md:right-6 z-30 w-12 h-12 md:w-[68px] md:h-[68px] rounded-full border-2 md:border-4 border-[#C9B9FF] flex items-center justify-center text-xl md:text-3xl font-extrabold text-[#4F28E8]">
                <span className="absolute inset-1 rounded-full bg-[#EFEAFE]"></span>
                <span className="relative">3</span>
              </div>
              <h3 className="text-[#4F28E8] text-[18px] md:text-[22px] lg:text-[24px] font-extrabold tracking-[0.64px]">
                Start saving
              </h3>
              <p className="mt-2 text-[#1B0D47] text-[14px] md:text-[15px] leading-6 md:leading-7 max-w-[520px]">
                We will find the best way to have you pay as little as possible.
                Backed by our "Money Back Guarantee".
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-24 bg-gradient-to-b from-[#F7F5FF] to-white">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-8 md:gap-16 items-start px-4 md:px-6">
          {/* Left copy */}
          <div>
            <p className="uppercase tracking-[0.64px] text-[12px] font-semibold text-purple-700 mb-4">
              Testimonials
            </p>
            <h2 className="text-[28px] md:text-[36px] lg:text-[44px] font-bold leading-tight mb-4 md:mb-6">
              Our clients appreciate what we do.
            </h2>
            <p className="text-[14px] md:text-[16px] text-gray-800 mb-2">
              Don't just believe what we say.
            </p>
            <p className="text-[14px] md:text-[16px] text-gray-800 mb-6 md:mb-8">
              Learn what our clients are saying about us.
            </p>
            <div className="flex gap-4">
              <button className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-purple-600 text-purple-700 flex items-center justify-center hover:bg-purple-700 hover:text-white transition">
                ←
              </button>
              <button className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-purple-600 text-purple-700 flex items-center justify-center hover:bg-purple-700 hover:text-white transition">
                →
              </button>
            </div>
          </div>

          {/* Testimonial card */}
          <div className="rounded-[20px] md:rounded-[24px] border-2 border-purple-300/70 bg-white shadow-[0_20px_40px_rgba(79,40,232,0.08)] p-6 md:p-8 lg:p-12 max-w-[480px] min-h-[400px] mx-auto md:mx-auto">
            <div className="mb-6">
              <div className="text-yellow-400 text-xl leading-none">★★★★★</div>
              <h3 className="mt-3 text-[22px] md:text-[24px] font-extrabold">
                Sarah O.
              </h3>
              <p className="text-gray-500 text-[14px]">From Michigan</p>
            </div>
            <p className="text-[16px] leading-7 text-gray-700 mb-8">
              My husband owns his own company and our insurance is kind of
              expensive for what we have. We have a high deductible plan which
              means we have higher out of pocket expenses. Overall, I was very
              happy that we saved over $8000 on our hospital bill.
            </p>
            <p className="text-[18px] font-extrabold text-gray-900">
              Saved Over <span className="text-purple-700">$8k</span>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-12 md:py-24 bg-white overflow-hidden">
        {/* Left-side oval gradient background */}
        <div
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-2/3 md:-left-1/4 md:w-1/2"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(86,49,211,0.20) 0, rgba(86,49,211,0.06) 45%, rgba(86,49,211,0) 75%)",
          }}
        />
        <div className="relative">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-[28px] md:text-[40px] lg:text-[56px] font-semibold text-gray-900 tracking-[0.64px] leading-tight px-4">
              Frequently Asked <br /> Questions
            </h2>
          </div>
          <div className="w-full px-4 md:px-6 lg:px-16">
            <div className="space-y-0">
              {faqs.slice(0, 4).map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 last:border-b-0"
                >
                  <button
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                    className="w-full flex items-center gap-4 py-6 text-start"
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
                    <span className="flex-1 text-[14px] md:text-[18px] lg:text-[20px] font-bold text-gray-900 tracking-[0.64px]">
                      {faq.question}
                    </span>
                  </button>
                  {openIndex === index && faq.answer.length > 0 && (
                    <div className="pl-10 md:pl-12 pb-4 md:pb-6">
                      <ul className="space-y-2 md:space-y-3 text-[14px] md:text-[16px] text-gray-900 list-none">
                        {faq.answer.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="mr-3 mt-2.5 w-2 h-2 rounded-full bg-gray-900 flex-shrink-0"></span>
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8 md:mt-12">
              <button
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate("/faq");
                }}
                className="inline-flex items-center gap-2 rounded-full border-2 border-purple-700 bg-transparent px-8 md:px-10 py-3 md:py-3.5 text-sm md:text-base font-semibold text-purple-700 hover:bg-purple-50 transition"
              >
                View More <span className="text-purple-700">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
