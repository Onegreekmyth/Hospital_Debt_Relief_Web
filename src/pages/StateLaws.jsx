import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InteractiveUSMap from "../components/InteractiveUSMap";
import { stateLawsData } from "../data/stateLawsData";

const StateLawsPage = () => {
  const [selectedState, setSelectedState] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const detailsPanelRef = useRef(null);

  const stateData = stateLawsData;

  const handleStateClick = (stateCode) => {
    setSelectedState(stateCode);
    setShowDetails(true);
  };

  useEffect(() => {
    if (showDetails && selectedState && detailsPanelRef.current) {
      detailsPanelRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showDetails, selectedState]);

  return (
    <div className="font-sans text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 md:px-6 pt-32 md:pt-40 pb-10 md:pb-14 bg-white overflow-hidden">
        {/* Soft gradient background behind the banner content */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(circle at center, rgba(86,49,211,0.22) 0, rgba(86,49,211,0.04) 45%, rgba(86,49,211,0) 70%)",
          }}
        />
        <div className="relative max-w-4xl text-gray-900">
          <h1 className="text-[24px] md:text-[28px] leading-[1.2] md:leading-tight lg:text-[40px] font-bold">
            Summary - State Laws
          </h1>
          <p className="mt-4 text-black text-[12px] md:text-[14px] leading-relaxed px-2">
            Click on any state to view charity care laws and regulations specific to that state.
          </p>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="pt-4 md:pt-6 pb-12 md:pb-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-10">
          <InteractiveUSMap 
            selectedState={selectedState}
            onStateClick={handleStateClick}
          />

          {/* State Details Panel */}
          {showDetails && selectedState && (
            <div ref={detailsPanelRef} className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {stateData[selectedState]?.name || selectedState} Charity Care Laws
                </h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <div className="prose max-w-none text-gray-700 leading-relaxed">
                {stateData[selectedState]?.sections ? (
                  <div className="space-y-6">
                    {stateData[selectedState].sections.map((section, idx) => (
                      <div key={idx}>
                        {section.title && (
                          <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-2 first:mt-0">
                            {section.title}
                          </h4>
                        )}
                        <div className="space-y-2">
                          {section.body.map((paragraph, pIdx) => (
                            <p key={pIdx} className="text-[14px] md:text-[15px]">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : stateData[selectedState]?.summary ? (
                  <p>{stateData[selectedState].summary}</p>
                ) : (
                  <p className="text-gray-500 italic">Content for this state is coming soon.</p>
                )}
              </div>
            </div>
          )}

          {!showDetails && (
            <p className="text-center text-gray-500 text-sm">
              Select a state on the map to view charity care laws.
            </p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StateLawsPage;