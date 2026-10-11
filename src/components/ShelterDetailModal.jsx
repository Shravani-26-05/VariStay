import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { 
  X, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Users, 
  Star, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  FileText, 
  Share2, 
  Droplet, 
  Zap, 
  Utensils, 
  HeartPulse, 
  Bed, 
  Flame, 
  Sparkles 
} from "lucide-react";

export const ShelterDetailModal = ({ shelter, onClose, onRequestStay }) => {
  const { lang, t } = useLanguage();
  const [selectedImg, setSelectedImg] = useState(shelter.images[0] || "");
  const [reported, setReported] = useState(false);

  const getAmenityIcon = (key) => {
    switch (key) {
      case "water":
        return <Droplet className="w-4 h-4 text-blue-600" />;
      case "toilets":
        return <Bed className="w-4 h-4 text-emerald-600" />;
      case "charging":
        return <Zap className="w-4 h-4 text-amber-500" />;
      case "meals":
        return <Utensils className="w-4 h-4 text-orange-600" />;
      case "first_aid":
        return <HeartPulse className="w-4 h-4 text-rose-500" />;
      case "hot_water":
        return <Flame className="w-4 h-4 text-amber-600" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-amber-100 flex flex-col relative animate-in fade-in zoom-in duration-200">
        
        {/* Header Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery Section */}
        <div className="relative h-64 sm:h-72 w-full bg-gray-900">
          <img
            src={selectedImg}
            alt={shelter.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

          {/* Gallery Thumbnails */}
          {shelter.images.length > 1 && (
            <div className="absolute bottom-3 left-4 right-4 flex gap-2 overflow-x-auto pb-1">
              {shelter.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImg(img)}
                  className={`w-14 h-10 rounded-lg overflow-hidden border-2 shrink-0 transition-transform ${
                    selectedImg === img ? "border-amber-400 scale-105" : "border-white/50 opacity-70"
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Floating Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span
              className={`text-xs font-black px-3 py-1.5 rounded-full text-white shadow-lg backdrop-blur-md ${
                shelter.isFree ? "bg-emerald-600" : "bg-orange-600"
              }`}
            >
              {shelter.isFree ? t("freeBadge") : `₹${shelter.price} ${t("perNight")}`}
            </span>
          </div>
        </div>

        {/* Main Details Body */}
        <div className="p-6 space-y-6">
          {/* Title & Verification */}
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900 font-marathi">
                  {lang === "mr" && shelter.nameMr ? shelter.nameMr : shelter.name}
                </h2>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1 font-marathi">
                  <MapPin className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>{lang === "mr" && shelter.addressMr ? shelter.addressMr : shelter.address}</span>
                </p>
              </div>

              <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl font-bold text-amber-900 text-sm">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>{shelter.rating}</span>
                <span className="text-xs text-gray-400">({shelter.reviewsCount})</span>
              </div>
            </div>

            {/* Volunteer Verification Stamp */}
            <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-emerald-900">
                  {t("verifiedBadge")}
                </h4>
                <p className="text-xs text-emerald-700 font-medium">
                  {lang === "mr" && shelter.verifiedByMr ? shelter.verifiedByMr : shelter.verifiedBy}
                </p>
              </div>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-3 gap-3 bg-orange-50/50 p-4 rounded-2xl border border-orange-100 text-center">
            <div>
              <p className="text-xs text-gray-500">{t("availableSpaces")}</p>
              <p className="text-lg font-extrabold text-emerald-700 mt-0.5">
                {shelter.availableSpaces}
              </p>
            </div>
            <div className="border-x border-orange-200">
              <p className="text-xs text-gray-500">{t("capacity")}</p>
              <p className="text-lg font-bold text-gray-900 mt-0.5">{shelter.totalCapacity}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Halt Location</p>
              <p className="text-sm font-bold text-orange-800 mt-1">{shelter.haltLocation}</p>
            </div>
          </div>

          {/* Host Information */}
          <div className="border-t border-gray-100 pt-4">
            <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Users className="w-4 h-4 text-orange-600" />
              {t("hostInfo")}
            </h3>
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-200/70">
              <div>
                <p className="text-sm font-bold text-gray-900">{shelter.hostName}</p>
                <p className="text-xs text-gray-500">{shelter.hostPhone}</p>
              </div>
              <a
                href={`tel:${shelter.hostPhone}`}
                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Host</span>
              </a>
            </div>
          </div>

          {/* All Amenities */}
          <div className="border-t border-gray-100 pt-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3">{t("amenities")}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {shelter.amenities.map((key) => (
                <div
                  key={key}
                  className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl border border-gray-200/60 text-xs font-medium text-gray-800"
                >
                  {getAmenityIcon(key)}
                  <span>{t(`amenity_${key}`)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Shelter Guidelines */}
          {shelter.rules && shelter.rules.length > 0 && (
            <div className="border-t border-gray-100 pt-4">
              <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-600" />
                {t("shelterRules")}
              </h3>
              <ul className="space-y-1.5">
                {shelter.rules.map((rule, idx) => (
                  <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0"></span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Report Listing */}
          <div className="border-t border-gray-100 pt-3 flex items-center justify-between text-xs">
            <button
              onClick={() => setReported(true)}
              className="text-gray-400 hover:text-rose-600 flex items-center gap-1 transition-colors"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{reported ? "Listing reported to volunteer team ✓" : t("reportListing")}</span>
            </button>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between gap-4">
          <div>
            <span className="text-xs text-gray-500">Stay Cost</span>
            <p className="text-lg font-black text-gray-900">
              {shelter.isFree ? "FREE (मोफत)" : `₹${shelter.price} / night`}
            </p>
          </div>

          <button
            onClick={() => {
              onClose();
              onRequestStay(shelter);
            }}
            disabled={shelter.availableSpaces <= 0}
            className="flex-1 py-3 px-6 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold rounded-2xl shadow-md transition-all text-sm flex items-center justify-center gap-2 disabled:bg-gray-300"
          >
            <span>{t("requestStay")}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
