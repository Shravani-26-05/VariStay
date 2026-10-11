import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { useApp } from "../context/AppContext";
import { 
  Home, 
  Search, 
  BookmarkCheck, 
  LayoutDashboard, 
  BarChart3, 
  User, 
  Building2,
  Globe,
  LogIn
} from "lucide-react";

export const MobileBottomNav = () => {
  const { lang, t } = useLanguage();
  const { 
    activeTab, 
    setActiveTab, 
    currentUser,
    openAuthModal,
    requests 
  } = useApp();

  const pendingRequestsCount = requests.filter((r) => r.status === "pending").length;
  const confirmedStaysCount = requests.filter((r) => r.status === "accepted").length;

  const isHost = currentUser?.role === "host";
  const isVarkari = currentUser?.role === "varkari";
  const isLoggedIn = Boolean(currentUser);

  // 4 Tabs based on Authentication Role
  const unauthTabs = [
    {
      id: "landing",
      label: t("home"),
      icon: Home,
      action: () => setActiveTab("landing")
    },
    {
      id: "varkariLogin",
      label: t("varkariLogin"),
      icon: User,
      action: () => openAuthModal("varkari")
    },
    {
      id: "hostLogin",
      label: t("hostLogin"),
      icon: Building2,
      action: () => openAuthModal("host")
    },
    {
      id: "profile",
      label: t("profile"),
      icon: User,
      action: () => setActiveTab("profile")
    }
  ];

  const varkariTabs = [
    {
      id: "landing",
      label: t("home"),
      icon: Home,
      action: () => setActiveTab("landing")
    },
    {
      id: "explore",
      label: t("findShelter"),
      icon: Search,
      action: () => setActiveTab("explore")
    },
    {
      id: "myStays",
      label: t("myStay"),
      icon: BookmarkCheck,
      badge: confirmedStaysCount > 0 ? confirmedStaysCount : null,
      action: () => setActiveTab("myStays")
    },
    {
      id: "profile",
      label: t("profile"),
      icon: User,
      action: () => setActiveTab("profile")
    }
  ];

  const hostTabs = [
    {
      id: "host",
      label: t("hostDashboard"),
      icon: LayoutDashboard,
      badge: pendingRequestsCount > 0 ? pendingRequestsCount : null,
      action: () => setActiveTab("host")
    },
    {
      id: "analytics",
      label: t("routeAnalysis"),
      icon: BarChart3,
      action: () => setActiveTab("analytics")
    },
    {
      id: "explore",
      label: t("findShelter"),
      icon: Search,
      action: () => setActiveTab("explore")
    },
    {
      id: "profile",
      label: t("profile"),
      icon: Building2,
      action: () => setActiveTab("profile")
    }
  ];

  const tabs = !isLoggedIn ? unauthTabs : isHost ? hostTabs : varkariTabs;

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-amber-200/80 md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.08)] pb-safe"
    >
      <div className="grid grid-cols-4 h-16 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={tab.action}
              className={`flex flex-col items-center justify-center relative py-1 transition-all active:scale-[0.96] ${
                isActive ? "text-orange-600 font-extrabold" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? "scale-110" : ""}`} />
                {tab.badge && (
                  <span className="absolute -top-1 -right-2 bg-orange-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight font-marathi">
                {tab.label}
              </span>

              {isActive && (
                <div className="absolute top-0 w-8 h-0.5 bg-orange-600 rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
