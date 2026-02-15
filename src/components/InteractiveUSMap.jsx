import React, { useState, useRef, useEffect } from "react";
import mapChartSvgUrl from "../assets/MapChart_Map.svg";

// Unselected: light purple. Hover: medium purple. Selected: dark purple
const FILL = { default: "#c9b2d5", hover: "#d4c2e0", selected: "#86429c" };
const STROKE = "black";

const getFill = (stateCode, selectedState, hoveredState) => {
  if (selectedState === stateCode) return FILL.selected;
  if (hoveredState === stateCode) return FILL.hover;
  return FILL.default;
};

// Two-letter US state (and DC) codes used in MapChart SVG path ids
const STATE_CODES = new Set([
  "AK","AL","AR","AZ","CA","CO","CT","DC","DE","FL","GA","HI","IA","ID","IL","IN","KS","KY","LA","MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VA","VT","WA","WI","WV","WY"
]);

const InteractiveUSMap = ({ selectedState, onStateClick }) => {
  const [hoveredState, setHoveredState] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  const objectRef = useRef(null);
  const docRef = useRef(null);

  // When object loads, wire click/hover and hide legend/credit
  const handleMapLoad = () => {
    const doc = objectRef.current?.contentDocument;
    if (!doc) return;
    docRef.current = doc;

    // Hide legend and "Created with mapchart.net"
    const legend = doc.getElementById("legend-svg");
    const credit = doc.getElementById("credit-text-svg");
    if (legend) legend.style.display = "none";
    if (credit) credit.style.display = "none";

    // Remove focus outline/selection rectangle on state paths
    const style = doc.createElementNS("http://www.w3.org/2000/svg", "style");
    style.textContent = "path[id]:focus { outline: none; } path[id] { outline: none; }";
    const wrapper = doc.getElementById("wrapper") || doc.documentElement;
    wrapper.insertBefore(style, wrapper.firstChild);

    // Find all state paths: <g id="XX_group"> contains <path id="XX" />
    const groups = doc.querySelectorAll('g[id$="_group"]');
    groups.forEach((g) => {
      const id = g.id.replace(/_line_group$|_group$/, "");
      if (id.length !== 2 || !STATE_CODES.has(id)) return;
      const path = doc.getElementById(id);
      if (!path || path.tagName !== "path") return;

      path.style.cursor = "pointer";
      path.style.outline = "none";
      path.setAttribute("role", "button");
      path.setAttribute("tabindex", "0");
      path.setAttribute("aria-label", `${id}, click to view charity care laws`);

      path.addEventListener("click", () => onStateClick(id));
      path.addEventListener("mouseenter", () => setHoveredState(id));
      path.addEventListener("mouseleave", () => setHoveredState(null));
      path.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onStateClick(id);
        }
      });
    });

    setMapReady(true);
  };

  // Update path and label colors when selection or hover changes
  useEffect(() => {
    const doc = docRef.current;
    if (!doc || !mapReady) return;

    STATE_CODES.forEach((stateCode) => {
      const path = doc.getElementById(stateCode);
      const label = doc.getElementById(`${stateCode}_label`);
      if (path && path.tagName === "path") {
        path.style.fill = getFill(stateCode, selectedState, hoveredState);
        path.style.stroke = STROKE;
        path.style.strokeWidth = "1";
        path.style.transition = "fill 0.15s ease";
      }
      if (label) {
        label.style.fill = selectedState === stateCode ? "#ffffff" : "#1f2937";
      }
    });
  }, [selectedState, hoveredState, mapReady]);

  return (
    <div className="mb-2">
      <div className="relative max-w-5xl mx-auto">
        <object
          ref={objectRef}
          data={mapChartSvgUrl}
          type="image/svg+xml"
          className="w-full h-auto outline-none"
          style={{ minHeight: 400, outline: "none" }}
          onLoad={handleMapLoad}
          role="img"
          aria-label="Interactive map of the United States. Click a state to view its charity care laws."
        />
      </div>
    </div>
  );
};

export default InteractiveUSMap;
