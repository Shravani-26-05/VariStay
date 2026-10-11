import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { useApp } from "../context/AppContext";
import { 
  User, 
  Building2, 
  Globe, 
  Phone, 
  MapPin, 
  LogOut, 
  ShieldCheck, 
  Heart, 
  LogIn, 
  ArrowRight,
  Sparkles
} from "lucide-react";

export const ProfileModal = () => {
  const { lang, toggleLanguage, t } = useLanguage();
  const { 
    currentUser, 
    logoutUser, 
    openAuthModal, 
    setActiveTab 
  } = useApp();

  const isHost = currentUser?.role === "host";
  const isLoggedIn = Boolean(currentUser);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6 font-marathi pb-20">
      {/* Header Title */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full">
              {t("appName")} Account
            </span>
            <h2 className="text-2xl font-extrabold mt-1">{t("accountTitle")}</h2>
            <p className="text-xs text-amber-100 mt-1">{t("accountSub")}</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white shrink-0">
            {isHost ? <Building2 className="w-8 h-8" /> : <User className="w-8 h-8" />}
          </div>
        </div>
      </div>

      {/* Profile Details Card */}
      <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-md space-y-5">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-600" />
            <span>{t("activeSession")}</span>
          </h3>
          <span className={`text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
            isHost ? "bg-amber-100 text-amber-900 border border-amber-200" : "bg-orange-100 text-orange-900 border border-orange-200"
          }`}>
            {isLoggedIn ? (isHost ? t("hostRole") : t("varkariRole")) : "Guest User"}
          </span>
        </div>

        {isLoggedIn ? (
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500 text-xs font-semibold flex items-center gap-1.5">
                <User className="w-4 h-4 text-orange-600" /> Name
              </span>
              <span className="font-bold text-gray-900">{currentUser.name}</span>
            </div>

            {currentUser.phone && (
              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <span className="text-gray-500 text-xs font-semibold flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-orange-600" /> {t("phone")}
                </span>
                <span className="font-bold text-gray-900">{currentUser.phone}</span>
              </div>
            )}

            {currentUser.halt && (
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-500 text-xs font-semibold flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-orange-600" /> {t("haltLocation")}
                </span>
                <span className="font-bold text-gray-900">{currentUser.halt}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-4 space-y-3">
            <p className="text-xs text-gray-500">You are currently using VariStay as a Guest.</p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => openAuthModal("varkari")}
                className="py-2.5 px-4 bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-xs"
              >
                {t("varkariLogin")}
              </button>
              <button
                onClick={() => openAuthModal("host")}
                className="py-2.5 px-4 bg-amber-900 text-white font-extrabold text-xs rounded-xl shadow-xs"
              >
                {t("hostLogin")}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Language Switcher Setting */}
      <div className="bg-white p-5 rounded-3xl border border-amber-100 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-gray-900">App Language / भाषा बदल</h4>
            <p className="text-xs text-gray-500">Current language: {lang === "mr" ? "मराठी" : "English"}</p>
          </div>
        </div>

        <button
          onClick={toggleLanguage}
          className="py-2 px-4 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-extrabold transition-all"
        >
          {t("languageToggle")}
        </button>
      </div>

      {/* Emergency Volunteer Helpline Directory */}
      <div className="bg-rose-50/60 p-5 rounded-3xl border border-rose-100 space-y-3">
        <h4 className="font-extrabold text-sm text-rose-900 flex items-center gap-2">
          <Phone className="w-4 h-4 text-rose-600" />
          <span>{t("helplineTitle")}</span>
        </h4>
        <p className="text-xs text-rose-700">{t("helplineDesc")}</p>

        <div className="space-y-2 pt-1 text-xs">
          <a
            href="tel:+919822014589"
            className="flex items-center justify-between p-3 bg-white rounded-2xl border border-rose-200 text-gray-900 font-bold hover:bg-rose-100/50 transition-colors"
          >
            <span>{t("volunteerHelpline")}</span>
            <span className="text-rose-700 font-mono">+91 98220 14589</span>
          </a>

          <a
            href="tel:112"
            className="flex items-center justify-between p-3 bg-white rounded-2xl border border-rose-200 text-gray-900 font-bold hover:bg-rose-100/50 transition-colors"
          >
            <span>{t("policeHelpline")}</span>
            <span className="text-rose-700 font-mono">112 / +91 2186 223333</span>
          </a>
        </div>
      </div>

      {/* PROMINENT LOGOUT BUTTON */}
      {isLoggedIn && (
        <button
          onClick={() => {
            logoutUser();
            setActiveTab("landing");
          }}
          className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span>{t("logout")}</span>
        </button>
      )}
    </div>
  );
};
