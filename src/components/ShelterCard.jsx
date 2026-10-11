import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { 
  ShieldCheck, 
  MapPin, 
  Users, 
  Star, 
  CheckCircle2, 
  Droplet, 
  Zap, 
  Utensils, 
  HeartPulse, 
  ArrowRight,
  Sparkles
} from "lucide-react";

export const ShelterCard = ({ shelter, onSelect, onRequestStay }) => {
  const { lang, t } = useLanguage();

  const isFree = shelter.isFree;
  const isAvailable = shelter.availableSpaces > 0;
  const occupancyPercent = Math.round(
    ((shelter.totalCapacity - shelter.availableSpaces) / shelter.totalCapacity) * 100
  );

  const getAmenityIcon = (key) => {
    switch (key) {
      case "water":
        return <Droplet className="w-3 h-3 text-blue-600" />;
      case "charging":
        return <Zap className="w-3 h-3 text-amber-500" />;
      case "meals":
        return <Utensils className="w-3 h-3 text-emerald-600" />;
      case "first_aid":
        return <HeartPulse className="w-3 h-3 text-rose-500" />;
      default:
        return <CheckCircle2 className="w-3 h-3 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-amber-100/80 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col group">
      {/* Photo Header */}
      <div className="relative h-44 w-full bg-amber-50 overflow-hidden">
        <img
          src={shelter.images[0]}
          alt={shelter.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

        {/* Free / Price Tag */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span
            className={`text-xs font-black px-2.5 py-1 rounded-full text-white shadow-md backdrop-blur-md ${
              isFree ? "bg-emerald-600/90" : "bg-orange-600/90"
            }`}
          >
            {isFree ? t("freeBadge") : `₹${shelter.price} ${t("perNight")}`}
          </span>
          {shelter.shelterType && (
            <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-black/50 text-amber-200 backdrop-blur-md">
              {shelter.shelterType}
            </span>
          )}
        </div>

        {/* Verified Stamp */}
        <div className="absolute top-3 right-3">
          <span className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 backdrop-blur-md shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{lang === "mr" ? "पडताळलेले" : "Verified"}</span>
          </span>
        </div>

        {/* Available Spaces Counter Bar */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
          <span className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded">
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {shelter.availableSpaces} / {shelter.totalCapacity} {t("availableSpaces")}
            </span>
          </span>
          <span className="bg-black/40 backdrop-blur-md px-2 py-0.5 rounded text-[11px] text-amber-200">
            {shelter.distanceKm} km {t("distance")}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-base text-gray-900 leading-snug group-hover:text-orange-600 transition-colors font-marathi">
              {lang === "mr" && shelter.nameMr ? shelter.nameMr : shelter.name}
            </h3>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{shelter.rating}</span>
            </div>
          </div>

          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1 font-marathi">
            <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0" />
            <span className="line-clamp-1">
              {lang === "mr" && shelter.addressMr ? shelter.addressMr : shelter.address}
            </span>
          </p>

          <p className="text-[11px] text-emerald-700 font-medium mt-1">
            {lang === "mr" && shelter.verifiedByMr ? shelter.verifiedByMr : shelter.verifiedBy}
          </p>

          {/* Occupancy Indicator Bar */}
          <div className="mt-2.5">
            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  occupancyPercent > 85
                    ? "bg-rose-500"
                    : occupancyPercent > 60
                    ? "bg-amber-500"
                    : "bg-emerald-500"
                }`}
                style={{ width: `${occupancyPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Amenities Highlights */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {shelter.amenities.slice(0, 4).map((amenityKey) => (
            <span
              key={amenityKey}
              className="inline-flex items-center gap-1 bg-gray-50 text-gray-700 text-[11px] px-2 py-0.5 rounded-md border border-gray-200/60"
            >
              {getAmenityIcon(amenityKey)}
              <span>{t(`amenity_${amenityKey}`)}</span>
            </span>
          ))}
          {shelter.amenities.length > 4 && (
            <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded font-bold">
              +{shelter.amenities.length - 4}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
          <button
            onClick={() => onSelect && onSelect(shelter)}
            className="w-full py-2 px-3 text-xs font-bold text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors flex items-center justify-center gap-1"
          >
            {t("viewDetails")}
          </button>

          <button
            onClick={() => onRequestStay && onRequestStay(shelter)}
            disabled={!isAvailable}
            className={`w-full py-2 px-3 text-xs font-bold text-white rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1 ${
              isAvailable
                ? "bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            <span>{isAvailable ? t("requestStay") : "FULL"}</span>
            {isAvailable && <ArrowRight className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
};
