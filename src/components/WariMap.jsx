import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import { useLanguage } from "../context/LanguageContext";
import { CheckCircle2, MapPin, Users, Phone, ArrowRight } from "lucide-react";

// Fix Leaflet default marker icon issues by creating dynamic custom HTML pins
const createCustomMarkerIcon = (shelter) => {
  const isFree = shelter.isFree;
  const isLowCapacity = shelter.availableSpaces <= 10;

  const bgClass = isFree ? "bg-emerald-600 border-white" : "bg-orange-600 border-white";
  const textLabel = isFree ? "FREE" : `₹${shelter.price}`;

  const html = `
    <div className="relative group cursor-pointer">
      <div className="flex items-center justify-center ${bgClass} text-white font-extrabold text-[11px] px-2 py-1 rounded-full shadow-lg border-2 transform transition-transform group-hover:scale-110">
        <span className="whitespace-nowrap">${textLabel}</span>
        ${
          shelter.availableSpaces > 0
            ? `<span className="ml-1 px-1 bg-white text-gray-900 rounded-full text-[9px] font-black">${shelter.availableSpaces}</span>`
            : `<span className="ml-1 text-[9px] font-black">FULL</span>`
        }
      </div>
      <div className="w-2 h-2 bg-gray-900 rotate-45 mx-auto -mt-1 shadow-xs"></div>
    </div>
  `;

  return L.divIcon({
    html,
    className: "custom-leaflet-marker",
    iconSize: [60, 30],
    iconAnchor: [30, 30]
  });
};

// Component to dynamically re-center map when location/halt changes
function MapRecenter({ center }) {
  const map = useMap();
  React.useEffect(() => {
    if (center) {
      map.flyTo(center, 12, { duration: 1.2 });
    }
  }, [center, map]);
  return null;
}

export const WariMap = ({ shelters, onSelectShelter, selectedHaltCoords }) => {
  const { lang, t } = useLanguage();

  // Palkhi Pilgrimage Route Coordinates (Alandi/Dehu -> Pune -> Saswad -> Lonand -> Phaltan -> Malshiras -> Natepute -> Wakhari -> Pandharpur)
  const palkhiRouteCoords = [
    [18.6778, 73.8978], // Alandi
    [18.5204, 73.8567], // Pune
    [18.3444, 74.0306], // Saswad
    [18.0417, 74.1861], // Lonand
    [17.9861, 74.4347], // Phaltan
    [17.8481, 74.9042], // Malshiras
    [17.9047, 74.7708], // Natepute
    [17.7210, 75.2530], // Wakhari
    [17.6775, 75.3289]  // Pandharpur
  ];

  const defaultCenter = selectedHaltCoords || [17.6775, 75.3289];

  return (
    <div className="w-full h-full min-h-[380px] rounded-2xl overflow-hidden border border-amber-200 shadow-md relative">
      <MapContainer
        center={defaultCenter}
        zoom={11}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <MapRecenter center={defaultCenter} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Palkhi Pilgrimage Route Highlight Line */}
        <Polyline
          positions={palkhiRouteCoords}
          pathOptions={{ color: "#ea580c", weight: 5, opacity: 0.8, dashArray: "8, 8" }}
        />

        {/* Shelter Markers */}
        {shelters.map((shelter) => (
          <Marker
            key={shelter.id}
            position={[shelter.coordinates.lat, shelter.coordinates.lng]}
            icon={createCustomMarkerIcon(shelter)}
          >
            <Popup className="custom-popup">
              <div className="p-1 max-w-xs font-sans">
                <div className="relative mb-2 rounded-lg overflow-hidden h-28 bg-gray-100">
                  <img
                    src={shelter.images[0]}
                    alt={shelter.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full text-white shadow-xs ${
                        shelter.isFree ? "bg-emerald-600" : "bg-orange-600"
                      }`}
                    >
                      {shelter.isFree ? t("freeBadge") : `₹${shelter.price} / night`}
                    </span>
                  </div>
                </div>

                <h4 className="font-bold text-sm text-gray-900 leading-snug">
                  {lang === "mr" && shelter.nameMr ? shelter.nameMr : shelter.name}
                </h4>

                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-orange-600 shrink-0" />
                  <span>{lang === "mr" && shelter.addressMr ? shelter.addressMr : shelter.address}</span>
                </p>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 text-xs">
                  <span className="flex items-center gap-1 text-emerald-700 font-bold">
                    <Users className="w-3.5 h-3.5" />
                    {shelter.availableSpaces} {t("availableSpaces")}
                  </span>
                  <span className="text-gray-400 font-medium">{shelter.distanceKm} km</span>
                </div>

                <button
                  onClick={() => onSelectShelter && onSelectShelter(shelter)}
                  className="w-full mt-3 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold py-1.5 px-3 rounded-lg flex items-center justify-center gap-1 transition-colors shadow-2xs"
                >
                  <span>{t("viewDetails")}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
