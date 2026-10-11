import React from "react";
import { LanguageProvider } from "./context/LanguageContext";
import { AppProvider, useApp } from "./context/AppContext";
import { useLanguage } from "./context/LanguageContext";
import { Navbar } from "./components/Navbar";
import { MobileBottomNav } from "./components/MobileBottomNav";
import { LandingPage } from "./components/LandingPage";
import { PilgrimDashboard } from "./components/PilgrimDashboard";
import { PilgrimMyStays } from "./components/PilgrimMyStays";
import { HostDashboard } from "./components/HostDashboard";
import { AdminAnalyticsDashboard } from "./components/AdminAnalyticsDashboard";
import { LowBandwidthView } from "./components/LowBandwidthView";
import { DemoControlBar } from "./components/DemoControlBar";
import { AuthModal } from "./components/AuthModal";
import { ProfileModal } from "./components/ProfileModal";
import { Building2, Lock, ArrowRight, User } from "lucide-react";

const MainContent = () => {
  const { lang, t } = useLanguage();
  const { 
    activeTab, 
    setActiveTab, 
    lowBandwidth, 
    currentUser,
    authModalOpen, 
    setAuthModalOpen,
    openAuthModal,
    authModalDefaultRole
  } = useApp();

  if (lowBandwidth) {
    return <LowBandwidthView />;
  }

  const isHost = currentUser?.role === "host";
  const isVarkari = currentUser?.role === "varkari";

  return (
    <main className="min-h-[calc(100vh-4rem)] pb-24 md:pb-12">
      {/* Home / Landing Page */}
      {activeTab === "landing" && <LandingPage />}

      {/* Varkari Shelter Finder */}
      {activeTab === "explore" && <PilgrimDashboard />}

      {/* Varkari My Stay Requests */}
      {activeTab === "myStays" && (
        isVarkari ? (
          <PilgrimMyStays onExplore={() => setActiveTab("explore")} />
        ) : (
          <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4 font-marathi">
            <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center mx-auto shadow-md">
              <User className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900">
              {t("varkariCardTitle")}
            </h2>
            <p className="text-sm text-gray-600">
              {t("varkariCardDesc")}
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => openAuthModal("varkari")}
                className="py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-sm rounded-xl shadow-md flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                <span>{t("varkariCardCta")}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveTab("landing")}
                className="py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-sm rounded-xl"
              >
                {t("home")}
              </button>
            </div>
          </div>
        )
      )}

      {/* Host Dashboard - Role Protected */}
      {activeTab === "host" && (
        isHost ? (
          <HostDashboard />
        ) : (
          <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4 font-marathi">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900">
              {t("hostAccessRestrictedTitle")}
            </h2>
            <p className="text-sm text-gray-600">
              {t("hostAccessRestrictedDesc")}
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => openAuthModal("host")}
                className="py-3 px-6 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-extrabold text-sm rounded-xl shadow-md flex items-center gap-2"
              >
                <Building2 className="w-4 h-4" />
                <span>{t("hostCardCta")}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveTab("landing")}
                className="py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-sm rounded-xl"
              >
                {t("home")}
              </button>
            </div>
          </div>
        )
      )}

      {/* Route Analysis Page */}
      {activeTab === "analytics" && <AdminAnalyticsDashboard />}

      {/* User Profile & Account Page */}
      {activeTab === "profile" && <ProfileModal />}

      {/* Login Portal Modal */}
      {authModalOpen && (
        <AuthModal 
          onClose={() => setAuthModalOpen(false)} 
          defaultRole={authModalDefaultRole}
        />
      )}
    </main>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <div className="min-h-screen bg-[#FFFDF7] text-gray-900 font-sans antialiased selection:bg-orange-500 selection:text-white flex flex-col relative">
          <Navbar />
          
          <div className="flex-1">
            <MainContent />
          </div>

          {/* Floating Mobile Bottom Navigation Bar (< md screens) */}
          <MobileBottomNav />

          {/* Floating Hackathon Demo Control Bar */}
          <DemoControlBar />

          {/* Footer */}
          <footer className="bg-amber-950 text-white border-t border-amber-900 py-8 px-4 sm:px-6 lg:px-8 text-xs mb-16 md:mb-0">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white font-bold shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm font-marathi">VariStay (वारी-स्टे)</h4>
                  <p className="text-amber-300 text-[11px]">Real-Time Pilgrim Discovery Platform for Pandharpur Wari</p>
                </div>
              </div>

              <div className="text-center md:text-right space-y-1">
                <p className="text-amber-200">
                  Mobile-First PWA • Android & iOS Native Experience
                </p>
                <p className="text-amber-400 font-marathi">
                  "जय जय राम कृष्ण हरी • सर्व वारकऱ्यांच्या सेवेसाठी सदैव तत्पर"
                </p>
              </div>
            </div>
          </footer>
        </div>
      </AppProvider>
    </LanguageProvider>
  );
}
