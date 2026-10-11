import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { useLanguage } from "../context/LanguageContext";
import { 
  X, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  Users, 
  Calendar, 
  QrCode, 
  Download, 
  Navigation, 
  ShieldCheck 
} from "lucide-react";

export const StayPassModal = ({ request, shelter, onClose }) => {
  const { lang, t } = useLanguage();

  const isConfirmed = request.status === "accepted";

  useEffect(() => {
    if (isConfirmed) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isConfirmed]);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-amber-100 relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Status Header */}
        <div className="text-center space-y-2 mb-6">
          <div
            className={`w-14 h-14 rounded-full mx-auto flex items-center justify-center text-white shadow-lg ${
              isConfirmed ? "bg-emerald-600" : "bg-amber-500"
            }`}
          >
            {isConfirmed ? (
              <CheckCircle2 className="w-8 h-8" />
            ) : (
              <Clock className="w-8 h-8 animate-pulse" />
            )}
          </div>

          <h3 className="text-xl font-extrabold text-gray-900 font-marathi">
            {isConfirmed ? t("stayConfirmedTitle") : t("requestSentTitle")}
          </h3>

          <p className="text-xs text-gray-500 max-w-xs mx-auto">
            {isConfirmed ? t("stayConfirmedSub") : t("requestSentSub")}
          </p>
        </div>

        {/* Digital Pass Card */}
        <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-amber-500/10 border-2 border-dashed border-amber-300 rounded-2xl p-4 space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-amber-200/80 pb-3">
            <div>
              <span className="text-[10px] font-extrabold tracking-widest text-amber-900 uppercase">
                {t("digitalPass")}
              </span>
              <p className="text-xs font-mono font-bold text-gray-700">
                {t("referenceId")}: <span className="text-orange-700">{request.id}</span>
              </p>
            </div>
            <div className="text-right">
              <span
                className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full text-white ${
                  isConfirmed ? "bg-emerald-600" : "bg-amber-600"
                }`}
              >
                {isConfirmed ? t("statusAccepted") : t("statusPending")}
              </span>
            </div>
          </div>

          {/* Shelter Info */}
          <div>
            <h4 className="font-bold text-base text-gray-900 font-marathi">
              {shelter ? (lang === "mr" && shelter.nameMr ? shelter.nameMr : shelter.name) : request.shelterName}
            </h4>
            <p className="text-xs text-gray-600 flex items-start gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
              <span>{shelter ? shelter.address : "Pandharpur Halt"}</span>
            </p>
          </div>

          {/* Pilgrims & Date Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs bg-white/80 p-2.5 rounded-xl border border-amber-200/60">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-orange-600 shrink-0" />
              <div>
                <p className="text-[10px] text-gray-500">Pilgrims</p>
                <p className="font-bold text-gray-900">{request.pilgrimCount} Varkaris</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 border-l border-amber-200 pl-2">
              <Calendar className="w-4 h-4 text-orange-600 shrink-0" />
              <div>
                <p className="text-[10px] text-gray-500">Arrival Date</p>
                <p className="font-bold text-gray-900">{request.arrivalDate}</p>
              </div>
            </div>
          </div>

          {/* Simulated QR Code */}
          <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-amber-200/80">
            <div className="flex items-center gap-3">
              <QrCode className="w-12 h-12 text-gray-800" />
              <div className="text-[11px]">
                <p className="font-bold text-gray-900">Show to Volunteer</p>
                <p className="text-gray-500">Scan code upon arrival</p>
              </div>
            </div>
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 mt-5">
          {shelter && shelter.hostPhone && (
            <a
              href={`tel:${shelter.hostPhone}`}
              className="py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{t("contactHost")}</span>
            </a>
          )}

          <a
            href={
              shelter
                ? `https://www.google.com/maps/search/?api=1&query=${shelter.coordinates.lat},${shelter.coordinates.lng}`
                : "#"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3 bg-orange-50 hover:bg-orange-100 text-orange-800 border border-orange-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
          >
            <Navigation className="w-3.5 h-3.5 text-orange-600" />
            <span>{t("directions")}</span>
          </a>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-3 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs rounded-xl transition-colors"
        >
          Close Pass
        </button>
      </div>
    </div>
  );
};
