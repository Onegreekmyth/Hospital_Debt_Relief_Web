import React, { useEffect, useState } from "react";

/**
 * Geocode hospital (name, city, state): first try Photon (OSM) for actual hospital/place,
 * then fall back to Open-Meteo for city/state. Show location in embedded OpenStreetMap iframe.
 */
const PHOTON_BASE = "https://photon.komoot.io/api/";
const OPENMETEO_BASE = "https://geocoding-api.open-meteo.com/v1/search";
const COUNTRY_US = "&countryCode=US";

const HospitalMap = ({ hospitalInfo, className = "", height = "280px" }) => {
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const name = (hospitalInfo?.name || "").trim();
  const city = (hospitalInfo?.city || "").trim();
  const state = (hospitalInfo?.state || "").trim();
  const hasLocation = name || city || state;

  useEffect(() => {
    if (!hasLocation) {
      setLoading(false);
      setCoords(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    const controller = new AbortController();
    const signal = controller.signal;

    // Prefer a Photon feature that looks like a hospital (amenity=hospital or name contains "hospital")
    const pickBestHospital = (features) => {
      if (!features?.length) return null;
      const hospitalLike = features.find(
        (f) =>
          f.properties?.osm_value === "hospital" ||
          (f.properties?.name && String(f.properties.name).toLowerCase().includes("hospital"))
      );
      const f = hospitalLike || features[0];
      const coordsArr = f?.geometry?.coordinates;
      if (coordsArr && coordsArr.length >= 2) return { lon: coordsArr[0], lat: coordsArr[1] };
      return null;
    };

    // 1) Try Photon with full "Hospital Name, City, State" to get actual hospital location
    const photonQuery = [name, city, state].filter(Boolean).join(", ");
    fetch(`${PHOTON_BASE}?q=${encodeURIComponent(photonQuery)}&limit=5`, { signal })
      .then((res) => res.json())
      .then((data) => {
        const c = pickBestHospital(data?.features);
        if (c) {
          setCoords({ lat: c.lat, lon: c.lon });
          setError(null);
          setLoading(false);
          return;
        }
        // 2) Fallback: Open-Meteo for city/state (city-level only)
        const queries = [
          [city, state].filter(Boolean).join(", "),
          city,
          state,
        ].filter((q) => q && q.length >= 2);
        let index = 0;
        const tryNext = () => {
          if (index >= queries.length) {
            setCoords(null);
            setError("Location not found");
            setLoading(false);
            return;
          }
          const query = queries[index];
          index += 1;
          fetch(
            `${OPENMETEO_BASE}?name=${encodeURIComponent(query)}&count=5${COUNTRY_US}`,
            { signal }
          )
            .then((r) => r.json())
            .then((d) => {
              if (d?.results?.[0]) {
                const { latitude: lat, longitude: lon } = d.results[0];
                setCoords({ lat, lon });
                setError(null);
              } else tryNext();
              setLoading(false);
            })
            .catch((err) => {
              if (err.name !== "AbortError") setError("Could not load map");
              setLoading(false);
            });
        };
        tryNext();
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError("Could not load map");
        setCoords(null);
        setLoading(false);
      });

    return () => controller.abort();
  }, [name, city, state, hasLocation]);

  if (!hasLocation) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 text-gray-500 text-sm ${className}`}
        style={{ height }}
      >
        No hospital location
      </div>
    );
  }

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 text-gray-500 text-sm ${className}`}
        style={{ height }}
      >
        Loading map…
      </div>
    );
  }

  if (error || !coords) {
    const searchQuery = [name, city, state].filter(Boolean).join(", ");
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`;
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 bg-gray-100 text-gray-600 text-sm p-4 ${className}`}
        style={{ height }}
      >
        <span>{error || "Map unavailable"}</span>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-600 hover:text-purple-800 font-medium"
        >
          View on Google Maps →
        </a>
      </div>
    );
  }

  const { lat, lon } = coords;
  const delta = 0.003; // Tighter zoom so hospital label is visible
  const bbox = `${lon - delta},${lat - delta},${lon + delta},${lat + delta}`;
  const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;

  return (
    <div
      className={`relative bg-gray-100 overflow-hidden ${className}`}
      style={{ height }}
    >
      {/* Taller iframe so bottom attribution strip is clipped by overflow-hidden */}
      <iframe
        src={embedUrl}
        width="100%"
        height="118%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Hospital location map"
      />
    </div>
  );
};

export default HospitalMap;
