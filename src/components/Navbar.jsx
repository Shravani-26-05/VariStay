import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useApp } from "../context/AppContext";
import { 
  Building2, 
  MapPin, 
  Globe, 
  WifiOff, 
  Home, 
  Search, 
  BookmarkCheck, 
  LayoutDashboard, 
  BarChart3, 
  Menu, 
  X,
  Sparkles,
  User,
  LogIn,
  LogOut
} from "lucide-react";

export const Navbar = () => {
  const { lang, toggleLanguage, t } = useLanguage();
  const { 
    currentUser,
    openAuthModal,
    logoutUser,
    lowBandwidth, 
    setLowBandwidth, 
    activeTab, 
    setActiveTab, 
    requests 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const confirmedCount = requests.filter((r) => r.status === "accepted").length;

  const isHost = currentUser?.role === "host";
  const isVarkari = currentUser?.role === "varkari";
  const isLoggedIn = Boolean(currentUser);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-xs">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white text-xs py-1 px-4 text-center font-medium flex items-center justify-between">
        <div className="flex items-center gap-2 mx-auto">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span className="font-marathi">
            {lang === "mr"
              ? "पंढरपूर आषाढी वारी २०२६ • वारकऱ्यांसाठी रिअल-टाईम निवारा शोध व्यासपीठ"
              : "Pandharpur Ashadhi Wari 2026 • Real-Time Pilgrim Shelter Network"}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => setLowBandwidth(!lowBandwidth)}
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
              lowBandwidth ? "bg-red-500 text-white" : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            <WifiOff className="w-3 h-3" />
            {lowBandwidth ? t("lowBandwidth") : t("normalBandwidth")}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Branding */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("landing")}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-gray-900 font-marathi">
                  {t("appName")}
                </span>
                <span className="bg-orange-100 text-orange-800 text-[10px] font-bold px-1.5 py-0.5 rounded border border-orange-200">
                  MVP
                </span>
              </div>
              <p className="text-[11px] text-gray-500 hidden sm:block font-marathi">
                {lang === "mr" ? "आषाढी वारी निवारा प्लॅटफॉर्म" : "Pandharpur Wari Shelter Discovery"}
              </p>
            </div>
          </div>

          {/* Desktop Navigation - STRICT ROLE SEPARATION */}
          <nav className="hidden md:flex items-center gap-1 font-marathi">
            {/* Home tab visible for everyone */}
            <button
              onClick={() => setActiveTab("landing")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === "landing" ? "bg-orange-50 text-orange-700 font-semibold" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Home className="w-4 h-4" />
              {t("home")}
            </button>

            {/* VARKARI NAVIGATION LINKS */}
            {isVarkari && (
              <>
                <button
                  onClick={() => setActiveTab("explore")}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    activeTab === "explore" ? "bg-orange-50 text-orange-700 font-semibold" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Search className="w-4 h-4" />
                  {t("findShelter")}
                </button>

                <button
                  onClick={() => setActiveTab("myStays")}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 relative ${
                    activeTab === "myStays" ? "bg-orange-50 text-orange-700 font-semibold" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <BookmarkCheck className="w-4 h-4" />
                  {t("myStay")}
                  {confirmedCount > 0 && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping absolute top-1 right-1"></span>
                  )}
                </button>
              </>
            )}

            {/* HOST NAVIGATION LINKS */}
            {isHost && (
              <>
                <button
                  onClick={() => setActiveTab("host")}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    activeTab === "host" ? "bg-amber-100 text-amber-900 font-extrabold" : "text-amber-800 hover:bg-amber-50"
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 text-orange-600" />
                  <span>{t("hostDashboard")}</span>
                  {pendingCount > 0 && (
                    <span className="bg-orange-600 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ml-1">
                      {pendingCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab("analytics")}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    activeTab === "analytics" ? "bg-orange-50 text-orange-700 font-semibold" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  {t("routeAnalysis")}
                </button>
              </>
            )}
          </nav>

          {/* Right Action Tools: Language, Login & Logout Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Global Language Selector Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-2xs font-marathi"
              title="Toggle Language / भाषा बदला"
            >
              <Globe className="w-3.5 h-3.5 text-amber-700" />
              <span>{t("languageToggle")}</span>
            </button>

            {/* Authenticated User & Logout Options */}
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <span className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-xl bg-orange-100/80 text-orange-900 border border-orange-200 font-marathi">
                  {isHost ? <Building2 className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                  <span>{currentUser.name}</span>
                </span>

                <button
                  onClick={logoutUser}
                  className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 px-3 py-1.5 rounded-xl text-xs font-bold transition-all font-marathi"
                  title="Logout and return to Home Page"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-600" />
                  <span>{t("logout")}</span>
                </button>
              </div>
            ) : (
              /* Unauthenticated Login Choices in Header */
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal("varkari")}
                  className="flex items-center gap-1 bg-orange-600 hover:bg-orange-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs font-marathi"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{t("varkariLogin")}</span>
                </button>

                <button
                  onClick={() => openAuthModal("host")}
                  className="hidden sm:flex items-center gap-1 bg-amber-900 hover:bg-black text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs font-marathi"
                >
                  <Building2 className="w-3.5 h-3.5 text-amber-300" />
                  <span>{t("hostLogin")}</span>
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu - Role Scoped */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-2 pb-4 space-y-2">
          {isLoggedIn ? (
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {isHost ? <Building2 className="w-4 h-4 text-amber-700" /> : <User className="w-4 h-4 text-orange-600" />}
                <div>
                  <p className="text-xs font-bold text-gray-900 font-marathi">
                    {currentUser.name}
                  </p>
                  <span className="text-[10px] text-amber-800 font-semibold uppercase">
                    {isHost ? t("hostRole") : t("varkariRole")}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  logoutUser();
                  setMobileMenuOpen(false);
                }}
                className="text-xs font-bold text-rose-700 bg-white px-2.5 py-1 rounded-lg border border-rose-200 flex items-center gap-1 font-marathi"
              >
                <LogOut className="w-3 h-3" />
                <span>{t("logout")}</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 mb-2 font-marathi">
              <button
                onClick={() => {
                  openAuthModal("varkari");
                  setMobileMenuOpen(false);
                }}
                className="py-2 px-3 bg-orange-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{t("varkariLogin")}</span>
              </button>
              <button
                onClick={() => {
                  openAuthModal("host");
                  setMobileMenuOpen(false);
                }}
                className="py-2 px-3 bg-amber-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>{t("hostLogin")}</span>
              </button>
            </div>
          )}

          <button
            onClick={() => {
              setActiveTab("landing");
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 text-gray-700 hover:bg-orange-50 font-marathi"
          >
            <Home className="w-4 h-4 text-orange-600" />
            {t("home")}
          </button>

          {isVarkari && (
            <>
              <button
                onClick={() => {
                  setActiveTab("explore");
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 text-gray-700 hover:bg-orange-50 font-marathi"
              >
                <Search className="w-4 h-4 text-orange-600" />
                {t("findShelter")}
              </button>

              <button
                onClick={() => {
                  setActiveTab("myStays");
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 text-gray-700 hover:bg-orange-50 font-marathi"
              >
                <BookmarkCheck className="w-4 h-4 text-orange-600" />
                {t("myStay")}
              </button>
            </>
          )}

          {isHost && (
            <>
              <button
                onClick={() => {
                  setActiveTab("host");
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 text-amber-900 bg-amber-50 font-marathi"
              >
                <LayoutDashboard className="w-4 h-4 text-orange-600" />
                {t("hostDashboard")} ({pendingCount} pending)
              </button>

              <button
                onClick={() => {
                  setActiveTab("analytics");
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 text-gray-700 hover:bg-orange-50 font-marathi"
              >
                <BarChart3 className="w-4 h-4 text-orange-600" />
                {t("routeAnalysis")}
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};
