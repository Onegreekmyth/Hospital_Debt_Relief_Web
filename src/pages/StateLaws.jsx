import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InteractiveUSMap from "../components/InteractiveUSMap";

const StateLawsPage = () => {
  const [selectedState, setSelectedState] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Sample state data - will be populated with actual data from Google Doc
  const stateData = {
    "IA": {
      name: "Iowa",
      summary: "Content will be populated from Google Doc"
    },
    "CA": {
      name: "California", 
      summary: "Content will be populated from Google Doc"
    },
    // Will add all other states from the Google Doc
  };

  const handleStateClick = (stateCode) => {
    setSelectedState(stateCode);
    setShowDetails(true);
  };

  return (
    <div className="font-sans text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 md:px-6 pt-32 md:pt-40 pb-20 md:pb-28 min-h-[70vh] md:min-h-[80vh] bg-white overflow-hidden">
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
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-10">
          
          {/* Instructions */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Interactive State Map
            </h2>
            <p className="text-gray-600">
              Select a state to view specific charity care laws and financial assistance information.
            </p>
          </div>

          {/* Interactive Map Component */}
          <InteractiveUSMap 
            selectedState={selectedState}
            onStateClick={handleStateClick}
          />

          {/* State Details Panel */}
          {showDetails && selectedState && stateData[selectedState] && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {stateData[selectedState].name} Charity Care Laws
                </h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                >
                  ×
                </button>
              </div>
              
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {stateData[selectedState].summary}
                </p>
              </div>
            </div>
          )}

          {!showDetails && (
            <div className="text-center text-gray-500 italic">
              Select a state on the map above to view detailed information about charity care laws.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

           

export default StateLawsPage;