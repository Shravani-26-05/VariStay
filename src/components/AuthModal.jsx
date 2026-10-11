import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useApp } from "../context/AppContext";
import { 
  X, 
  User, 
  Building2, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2 
} from "lucide-react";
import { WARI_HALTS } from "../data/shelters";

export const AuthModal = ({ onClose, defaultRole = "varkari" }) => {
  const { lang, t } = useLanguage();
  const { loginAsVarkari, loginAsHost, authModalDefaultRole } = useApp();

  const [authRole, setAuthRole] = useState(defaultRole || authModalDefaultRole || "varkari");

  // Varkari Form
  const [pilgrimName, setPilgrimName] = useState("Rahul Patil");
  const [pilgrimPhone, setPilgrimPhone] = useState("+91 98221 99001");
  const [pilgrimHalt, setPilgrimHalt] = useState("Pandharpur");

  // Host Form
  const [hostOrg, setHostOrg] = useState("Vitthal Seva Trust");
  const [hostName, setHostName] = useState("Shri Sopanrao Kadam");
  const [hostPhone, setHostPhone] = useState("+91 98220 14589");
  const [hostHalt, setHostHalt] = useState("Pandharpur");

  const handlePilgrimSubmit = (e) => {
    e.preventDefault();
    loginAsVarkari({
      name: pilgrimName || "Rahul Patil",
      phone: pilgrimPhone || "+91 98221 99001",
      halt: pilgrimHalt
    });
    if (onClose) onClose();
  };

  const handleHostSubmit = (e) => {
    e.preventDefault();
    loginAsHost({
      name: hostOrg || "Vitthal Seva Trust",
      contactPerson: hostName || "Shri Sopanrao Kadam",
      phone: hostPhone || "+91 98220 14589",
      halt: hostHalt
    });
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-amber-100 relative animate-in fade-in zoom-in duration-200">
        
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Modal Branding Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white mx-auto shadow-md shadow-orange-500/20">
            <Building2 className="w-7 h-7" />
          </div>

          <h2 className="text-2xl font-extrabold text-gray-900 font-marathi">
            {lang === "mr" ? "वारी-स्टे पोर्टल प्रवेश" : "Welcome to VariStay"}
          </h2>
          <p className="text-xs text-gray-500 font-marathi">
            {t("choosePortal")}
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-amber-50 rounded-2xl border border-amber-200 mb-6">
          <button
            onClick={() => setAuthRole("varkari")}
            className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 font-marathi ${
              authRole === "varkari"
                ? "bg-orange-600 text-white shadow-md"
                : "text-gray-700 hover:bg-amber-100/60"
            }`}
          >
            <User className="w-4 h-4 shrink-0" />
            <span>{t("varkariLogin")}</span>
          </button>

          <button
            onClick={() => setAuthRole("host")}
            className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 font-marathi ${
              authRole === "host"
                ? "bg-orange-600 text-white shadow-md"
                : "text-gray-700 hover:bg-amber-100/60"
            }`}
          >
            <Building2 className="w-4 h-4 shrink-0" />
            <span>{t("hostLogin")}</span>
          </button>
        </div>

        {/* Form A: Varkari Login */}
        {authRole === "varkari" ? (
          <form onSubmit={handlePilgrimSubmit} className="space-y-4">
            <div className="bg-orange-50/60 p-3 rounded-2xl border border-orange-100 text-xs text-orange-900 flex items-center justify-between">
              <span className="font-bold font-marathi">
                {t("varkariRole")}
              </span>
              <button
                type="button"
                onClick={() => {
                  setPilgrimName("Rahul Patil");
                  setPilgrimPhone("+91 98221 99001");
                  setPilgrimHalt("Pandharpur");
                }}
                className="text-[10px] font-extrabold bg-orange-600 text-white px-2 py-0.5 rounded-md hover:bg-orange-700"
              >
                ⚡ Demo Auto-Fill
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1 font-marathi">
                <User className="w-3.5 h-3.5 text-orange-600" />
                {lang === "mr" ? "वारकऱ्याचे नाव" : "Full Name"}
              </label>
              <input
                type="text"
                required
                value={pilgrimName}
                onChange={(e) => setPilgrimName(e.target.value)}
                placeholder="e.g. Rahul Patil"
                className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none font-marathi"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1 font-marathi">
                <Phone className="w-3.5 h-3.5 text-orange-600" />
                {lang === "mr" ? "मोबाईल नंबर" : "Mobile Number"}
              </label>
              <input
                type="tel"
                required
                value={pilgrimPhone}
                onChange={(e) => setPilgrimPhone(e.target.value)}
                placeholder="e.g. +91 98221 99001"
                className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1 font-marathi">
                <MapPin className="w-3.5 h-3.5 text-orange-600" />
                {t("currentHalt")}
              </label>
              <select
                value={pilgrimHalt}
                onChange={(e) => setPilgrimHalt(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none font-marathi"
              >
                {WARI_HALTS.filter((h) => h.id !== "all").map((h) => (
                  <option key={h.id} value={h.id}>
                    {lang === "mr" ? h.nameMr : h.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 font-marathi"
            >
              <span>{t("varkariCardCta")}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* Form B: Host Login */
          <form onSubmit={handleHostSubmit} className="space-y-4">
            <div className="bg-amber-50/80 p-3 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
              <span className="font-bold font-marathi">
                {t("hostRole")}
              </span>
              <button
                type="button"
                onClick={() => {
                  setHostOrg("Vitthal Seva Trust");
                  setHostName("Shri Sopanrao Kadam");
                  setHostPhone("+91 98220 14589");
                  setHostHalt("Pandharpur");
                }}
                className="text-[10px] font-extrabold bg-amber-700 text-white px-2 py-0.5 rounded-md hover:bg-amber-800"
              >
                ⚡ Demo Auto-Fill
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1 font-marathi">
                <Building2 className="w-3.5 h-3.5 text-orange-600" />
                {lang === "mr" ? "यजमान/संस्थेचे नाव" : "Host Trust / Shelter Name"}
              </label>
              <input
                type="text"
                required
                value={hostOrg}
                onChange={(e) => setHostOrg(e.target.value)}
                placeholder="e.g. Vitthal Seva Trust"
                className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none font-marathi"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1 font-marathi">
                <User className="w-3.5 h-3.5 text-orange-600" />
                {lang === "mr" ? "संपर्क व्यक्तीचे नाव" : "Contact Person Name"}
              </label>
              <input
                type="text"
                required
                value={hostName}
                onChange={(e) => setHostName(e.target.value)}
                placeholder="e.g. Shri Sopanrao Kadam"
                className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none font-marathi"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1 font-marathi">
                <Phone className="w-3.5 h-3.5 text-orange-600" />
                {lang === "mr" ? "मोबाईल नंबर" : "Mobile Phone Number"}
              </label>
              <input
                type="tel"
                required
                value={hostPhone}
                onChange={(e) => setHostPhone(e.target.value)}
                placeholder="e.g. +91 98220 14589"
                className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1 font-marathi">
                <MapPin className="w-3.5 h-3.5 text-orange-600" />
                {t("currentHalt")}
              </label>
              <select
                value={hostHalt}
                onChange={(e) => setHostHalt(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none font-marathi"
              >
                {WARI_HALTS.filter((h) => h.id !== "all").map((h) => (
                  <option key={h.id} value={h.id}>
                    {lang === "mr" ? h.nameMr : h.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 font-marathi"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{t("hostCardCta")}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
