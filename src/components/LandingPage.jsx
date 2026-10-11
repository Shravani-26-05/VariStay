import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { useApp } from "../context/AppContext";
import { 
  Building2, 
  Search, 
  ShieldCheck, 
  MapPin, 
  Users, 
  Heart, 
  Phone, 
  Zap, 
  Clock, 
  ArrowRight, 
  CheckCircle2,
  Sparkles,
  User,
  LogIn
} from "lucide-react";
import { WARI_HALTS } from "../data/shelters";

export const LandingPage = () => {
  const { lang, t } = useLanguage();
  const { 
    shelters, 
    setSelectedHalt, 
    openAuthModal, 
    loginAsVarkari, 
    loginAsHost,
    currentUser,
    setActiveTab 
  } = useApp();

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-500/10 via-orange-500/5 to-white pt-8 pb-16 px-4 sm:px-6 lg:px-8 border-b border-amber-100/60">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-orange-100/80 border border-orange-200 text-orange-900 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-2xs">
              <Sparkles className="w-4 h-4 text-orange-600 animate-pulse" />
              <span>{lang === "mr" ? "वारकऱ्यांसाठी मोफत व सुरक्षित निवारा" : "Real-Time Shelter Discovery Platform"}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight font-marathi">
              {t("heroTitle")}
            </h1>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-marathi">
              {t("heroSubtitle")}
            </p>

            {/* TWO VISUALLY DISTINCT LOGIN PORTAL CARDS */}
            <div className="pt-2 space-y-3">
              <p className="text-xs font-bold text-gray-500 font-marathi uppercase tracking-wider">
                {t("choosePortal")}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Varkari Login Choice Card */}
                <div className="bg-white p-5 rounded-2xl border-2 border-orange-300 hover:border-orange-500 shadow-md hover:shadow-lg transition-all space-y-3 flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
                        <User className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-extrabold bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full font-marathi">
                        {t("varkariRole")}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-base text-gray-900 font-marathi group-hover:text-orange-600 transition-colors">
                      {t("varkariCardTitle")}
                    </h3>

                    <p className="text-xs text-gray-600 leading-relaxed font-marathi mt-1">
                      {t("varkariCardDesc")}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if (currentUser?.role === "varkari") {
                        setActiveTab("explore");
                      } else {
                        openAuthModal("varkari");
                      }
                    }}
                    className="w-full py-2.5 px-4 bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 font-marathi"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>{t("varkariCardCta")}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Host Login Choice Card */}
                <div className="bg-white p-5 rounded-2xl border-2 border-amber-300 hover:border-amber-500 shadow-md hover:shadow-lg transition-all space-y-3 flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-extrabold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-marathi">
                        {t("hostRole")}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-base text-gray-900 font-marathi group-hover:text-amber-700 transition-colors">
                      {t("hostCardTitle")}
                    </h3>

                    <p className="text-xs text-gray-600 leading-relaxed font-marathi mt-1">
                      {t("hostCardDesc")}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if (currentUser?.role === "host") {
                        setActiveTab("host");
                      } else {
                        openAuthModal("host");
                      }
                    }}
                    className="w-full py-2.5 px-4 bg-amber-900 hover:bg-black text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 font-marathi"
                  >
                    <Building2 className="w-4 h-4" />
                    <span>{t("hostCardCta")}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Real-time Counter Pills */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-amber-200/60 max-w-lg">
              <div>
                <span className="text-2xl font-black text-orange-700">12+</span>
                <p className="text-xs text-gray-500 font-medium">Route Halts</p>
              </div>
              <div>
                <span className="text-2xl font-black text-emerald-700">1,500+</span>
                <p className="text-xs text-gray-500 font-medium">Verified Beds</p>
              </div>
              <div>
                <span className="text-2xl font-black text-amber-700">100%</span>
                <p className="text-xs text-gray-500 font-medium">Free / Fair Price</p>
              </div>
            </div>
          </div>

          {/* Hero Right Visuals - Real Wari Pilgrim Hall Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-amber-100">
              <img
                src="/images/vitthal_dindi_hall.jpg"
                alt="Vitthal Seva Mandap Pandharpur"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              {/* Floating Real-Time Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-amber-200 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">Vitthal Seva Mandap</h4>
                      <p className="text-xs text-emerald-700 font-semibold">{t("verifiedBy")}</p>
                    </div>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-2.5 py-1 rounded-full font-marathi">
                    {t("filterFree")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem & Solution Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-marathi">
            {t("problemTitle")}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-marathi">
            {t("problemDesc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white p-6 rounded-2xl border border-amber-100 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 font-marathi">
              {lang === "mr" ? "अनिश्‍चितता आणि थकवा" : "Uncertainty at Daily Halts"}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed font-marathi">
              {lang === "mr"
                ? "दिवसभर मैलोनगणती चालल्यानंतर रात्रीच्या निवाऱ्यासाठी वारीच्या मुक्कामी धावपळ करावी लागते."
                : "After walking 20+ km daily, Varkaris often reach halts late without knowing if shelters are full."}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-amber-100 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 font-marathi">
              {lang === "mr" ? "स्थानिक यजमानांशी संपर्काचा अभाव" : "Unused Local Capacity"}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed font-marathi">
              {lang === "mr"
                ? "स्थानिक नागरिक व देवस्थान ट्रस्टकडे जागा उपलब्ध असते, पण वारकऱ्यांपर्यंत ती माहिती पोहोचत नाही."
                : "Trusts and local residents have open halls & rooms, but lack a central real-time publishing tool."}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-amber-100 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 font-marathi">
              {t("trustTitle")}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed font-marathi">
              {lang === "mr"
                ? "दिंडी प्रमुख आणि स्वयंसेवकांद्वारे प्रत्येक निवाऱ्याची स्वच्छता व सुरक्षेची पडताळणी केली जाते."
                : "Every shelter has clear volunteer verification, safety rules, and direct host contacts."}
            </p>
          </div>
        </div>
      </section>

      {/* How VariStay Works */}
      <section className="bg-amber-950 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-marathi">
              {t("solutionTitle")}
            </h2>
            <p className="text-amber-200/80 text-sm font-marathi">
              {t("solutionDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-orange-600 text-white font-black text-2xl flex items-center justify-center mx-auto shadow-lg">
                1
              </div>
              <h3 className="font-bold text-lg font-marathi">{t("trustStep1")}</h3>
              <p className="text-xs text-amber-200/70 font-marathi">{t("trustDesc1")}</p>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-600 text-white font-black text-2xl flex items-center justify-center mx-auto shadow-lg">
                2
              </div>
              <h3 className="font-bold text-lg font-marathi">{t("trustStep2")}</h3>
              <p className="text-xs text-amber-200/70 font-marathi">{t("trustDesc2")}</p>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-600 text-white font-black text-2xl flex items-center justify-center mx-auto shadow-lg">
                3
              </div>
              <h3 className="font-bold text-lg font-marathi">{t("trustStep3")}</h3>
              <p className="text-xs text-amber-200/70 font-marathi">{t("trustDesc3")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Wari Route Interactive Halts Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <h2 className="text-2xl font-extrabold text-gray-900 font-marathi">
            {lang === "mr" ? "पालखी मार्ग आणि मुक्कामाची ठिकाणे" : "Palkhi Pilgrimage Route Halts"}
          </h2>
          <p className="text-xs text-gray-500 font-marathi">Select any halt along the Alandi-Dehu to Pandharpur route to explore shelters</p>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4 pt-2">
          {WARI_HALTS.filter((h) => h.id !== "all").map((halt) => (
            <button
              key={halt.id}
              onClick={() => {
                setSelectedHalt(halt.id);
                if (currentUser?.role === "varkari") {
                  setActiveTab("explore");
                } else {
                  openAuthModal("varkari");
                }
              }}
              className="flex-shrink-0 bg-white hover:bg-orange-50 border border-amber-200 hover:border-orange-400 p-4 rounded-2xl transition-all shadow-xs text-left group min-w-[160px]"
            >
              <div className="flex items-center gap-2 text-orange-600 mb-1">
                <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                  {halt.isFinal ? "DESTINATION" : "HALT"}
                </span>
              </div>
              <h4 className="font-bold text-sm text-gray-900 group-hover:text-orange-600 font-marathi">
                {lang === "mr" ? halt.nameMr : halt.name}
              </h4>
            </button>
          ))}
        </div>
      </section>

      {/* Call To Action Footer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-marathi">
              {lang === "mr" ? "वारी निवाऱ्याचा लाभ घ्या किंवा निवारा उपलब्ध करा" : "Ready to Find or Offer a Shelter?"}
            </h2>
            <p className="text-amber-100 text-sm max-w-xl font-marathi">
              VariStay is free for all Varkari pilgrims and volunteer hosts across Maharashtra.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 font-marathi">
            <button
              onClick={() => openAuthModal("varkari")}
              className="py-3 px-6 bg-white text-orange-700 hover:bg-amber-50 font-extrabold text-sm rounded-xl transition-colors shadow-md"
            >
              {t("varkariCardCta")}
            </button>
            <button
              onClick={() => openAuthModal("host")}
              className="py-3 px-6 bg-orange-950 text-white hover:bg-black font-extrabold text-sm rounded-xl transition-colors shadow-md border border-orange-400/40"
            >
              {t("hostCardCta")}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
