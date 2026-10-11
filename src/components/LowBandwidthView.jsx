import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useApp } from "../context/AppContext";
import { WARI_HALTS } from "../data/shelters";
import { WifiOff, Phone, MapPin, Users, CheckCircle2, ShieldCheck, RefreshCw } from "lucide-react";

export const LowBandwidthView = ({ onSelectShelter }) => {
  const { lang, t } = useLanguage();
  const { shelters, selectedHalt, setSelectedHalt, setLowBandwidth } = useApp();
  const [selectedHaltFilter, setSelectedHaltFilter] = useState("all");

  const filtered = shelters.filter(
    (s) => selectedHaltFilter === "all" || s.haltLocation === selectedHaltFilter
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      
      {/* Low Bandwidth Banner */}
      <div className="bg-red-900 text-white p-4 rounded-2xl flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <WifiOff className="w-6 h-6 text-red-300 shrink-0" />
          <div>
            <h2 className="font-extrabold text-sm font-marathi">
              {lang === "mr" ? "कमी नेटवर्क मोड (Low-Bandwidth Mode Active)" : "Low Network Mode Active"}
            </h2>
            <p className="text-xs text-red-200">
              Text-only, low-data view optimized for 2G/3G network conditions along the Wari route.
            </p>
          </div>
        </div>

        <button
          onClick={() => setLowBandwidth(false)}
          className="px-3 py-1.5 bg-white text-red-900 text-xs font-extrabold rounded-xl shrink-0"
        >
          {t("normalBandwidth")}
        </button>
      </div>

      {/* Emergency Volunteer Helpline Phone Numbers */}
      <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 space-y-2">
        <h3 className="font-bold text-sm text-amber-900 flex items-center gap-2 font-marathi">
          <Phone className="w-4 h-4 text-orange-600" />
          <span>{lang === "mr" ? "आणीबाणी/स्वयंसेवक हेल्पलाईन (24x7 Emergency Contact)" : "24x7 Wari Emergency Helplines"}</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <a href="tel:+919822014589" className="p-2 bg-white rounded-lg border border-amber-300 font-bold text-amber-900 flex justify-between">
            <span>Pandharpur Volunteer Cell:</span>
            <span className="text-orange-700">+91 98220 14589</span>
          </a>
          <a href="tel:+919422388120" className="p-2 bg-white rounded-lg border border-amber-300 font-bold text-amber-900 flex justify-between">
            <span>Alandi Temple Helpline:</span>
            <span className="text-orange-700">+91 94223 88120</span>
          </a>
        </div>
      </div>

      {/* Compact Halt Filter */}
      <div className="flex items-center gap-2 text-xs">
        <span className="font-bold text-gray-700">Select Halt:</span>
        <select
          value={selectedHaltFilter}
          onChange={(e) => setSelectedHaltFilter(e.target.value)}
          className="bg-white border border-gray-300 px-3 py-1.5 rounded-xl font-bold font-marathi"
        >
          {WARI_HALTS.map((h) => (
            <option key={h.id} value={h.id}>
              {lang === "mr" ? h.nameMr : h.name}
            </option>
          ))}
        </select>
      </div>

      {/* Lightweight Shelter Text List */}
      <div className="space-y-3">
        {filtered.map((s) => (
          <div
            key={s.id}
            className="bg-white p-4 rounded-xl border border-gray-200 space-y-2"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded text-white ${s.isFree ? "bg-emerald-600" : "bg-orange-600"}`}>
                  {s.isFree ? "FREE" : `₹${s.price}/night`}
                </span>
                <h4 className="font-bold text-base text-gray-900 font-marathi mt-1">
                  {lang === "mr" && s.nameMr ? s.nameMr : s.name}
                </h4>
              </div>

              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                {s.availableSpaces} spaces open
              </span>
            </div>

            <p className="text-xs text-gray-600">
              📍 {s.address} ({s.haltLocation})
            </p>

            <p className="text-xs text-gray-500">
              Host: {s.hostName} ({s.hostPhone})
            </p>

            <div className="pt-2 flex items-center justify-between border-t border-gray-100">
              <span className="text-[11px] text-emerald-700 font-semibold">
                ✓ {s.verifiedBy}
              </span>

              <a
                href={`tel:${s.hostPhone}`}
                className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-lg"
              >
                Call Host
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
