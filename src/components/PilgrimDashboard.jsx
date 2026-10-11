import React, { useState, useMemo } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useApp } from "../context/AppContext";
import { WariMap } from "./WariMap";
import { ShelterCard } from "./ShelterCard";
import { ShelterDetailModal } from "./ShelterDetailModal";
import { BookingFlowModal } from "./BookingFlowModal";
import { StayPassModal } from "./StayPassModal";
import { WARI_HALTS } from "../data/shelters";
import { 
  Search, 
  MapPin, 
  Filter, 
  CheckCircle2, 
  Building2, 
  Users, 
  ShieldCheck, 
  SlidersHorizontal, 
  Grid, 
  List, 
  Map as MapIcon,
  Sparkles 
} from "lucide-react";

export const PilgrimDashboard = () => {
  const { lang, t } = useLanguage();
  const { shelters, selectedHalt, setSelectedHalt } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all"); // 'all' | 'free' | 'under100' | 'under200' | 'verified' | 'available' | 'family' | 'group'
  const [mobileTab, setMobileTab] = useState("both"); // 'both' | 'map' | 'list'
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'

  // Modals state
  const [detailModalShelter, setDetailModalShelter] = useState(null);
  const [bookingModalShelter, setBookingModalShelter] = useState(null);
  const [createdRequest, setCreatedRequest] = useState(null);

  // Get selected halt coordinates
  const currentHaltObj = useMemo(() => {
    return WARI_HALTS.find((h) => h.id === selectedHalt) || WARI_HALTS[0];
  }, [selectedHalt]);

  const selectedHaltCoords = currentHaltObj.lat && currentHaltObj.lng
    ? [currentHaltObj.lat, currentHaltObj.lng]
    : [17.6775, 75.3289];

  // Filter logic
  const filteredShelters = useMemo(() => {
    return shelters.filter((shelter) => {
      // 1. Halt Filter
      if (selectedHalt !== "all" && shelter.haltLocation !== selectedHalt) {
        return false;
      }

      // 2. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = shelter.name.toLowerCase().includes(q);
        const matchNameMr = shelter.nameMr ? shelter.nameMr.toLowerCase().includes(q) : false;
        const matchAddress = shelter.address.toLowerCase().includes(q);
        const matchHalt = shelter.haltLocation.toLowerCase().includes(q);
        if (!matchName && !matchNameMr && !matchAddress && !matchHalt) {
          return false;
        }
      }

      // 3. Category Filter
      if (activeFilter === "free") return shelter.isFree;
      if (activeFilter === "under100") return shelter.isFree || shelter.price <= 100;
      if (activeFilter === "under200") return shelter.isFree || shelter.price <= 200;
      if (activeFilter === "verified") return shelter.verificationStatus === "verified";
      if (activeFilter === "available") return shelter.availableSpaces > 0;
      if (activeFilter === "family") return shelter.isFamilyFriendly;
      if (activeFilter === "group") return shelter.isGroupFriendly;

      return true;
    });
  }, [shelters, selectedHalt, searchQuery, activeFilter]);

  const totalAvailableBeds = useMemo(() => {
    return filteredShelters.reduce((acc, curr) => acc + curr.availableSpaces, 0);
  }, [filteredShelters]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
      
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white rounded-3xl p-5 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-200 bg-black/30 px-2.5 py-1 rounded-full backdrop-blur-md">
                {t("whereStaying")}
              </span>
              <h1 className="text-xl sm:text-3xl font-extrabold font-marathi mt-1">
                {lang === "mr" ? "पंढरपूर वारी रिअल-टाईम निवारा शोध" : "Varkari Real-Time Shelter Finder"}
              </h1>
            </div>

            {/* Mobile Touch-friendly Halt Selector Dropdown */}
            <div className="flex items-center justify-between sm:justify-start gap-2 bg-white text-gray-900 px-3.5 py-2.5 rounded-2xl shadow-md border border-amber-200 w-full sm:w-auto">
              <div className="flex items-center gap-1.5 min-w-0">
                <MapPin className="w-4 h-4 text-orange-600 shrink-0" />
                <span className="text-xs text-gray-500 font-medium shrink-0">Halt:</span>
              </div>
              <select
                value={selectedHalt}
                onChange={(e) => setSelectedHalt(e.target.value)}
                className="bg-transparent font-bold text-xs sm:text-sm focus:outline-none font-marathi cursor-pointer shrink"
              >
                {WARI_HALTS.map((h) => (
                  <option key={h.id} value={h.id}>
                    {lang === "mr" ? h.nameMr : h.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-2xl border border-white/20">
              <p className="text-[10px] text-amber-100">{t("currentHalt")}</p>
              <p className="text-xs sm:text-sm font-bold font-marathi mt-0.5 truncate">
                {lang === "mr" ? currentHaltObj.nameMr : currentHaltObj.name}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-2xl border border-white/20">
              <p className="text-[10px] text-amber-100">{t("nearbyAvailable")}</p>
              <p className="text-xs sm:text-sm font-extrabold text-emerald-300 mt-0.5 truncate">
                {filteredShelters.length} Shelters ({totalAvailableBeds} beds)
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-2xl border border-white/20">
              <p className="text-[10px] text-amber-100">Free Shelters</p>
              <p className="text-xs sm:text-sm font-bold text-amber-200 mt-0.5">
                {filteredShelters.filter((s) => s.isFree).length} Available
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-2xl border border-white/20">
              <p className="text-[10px] text-amber-100">Verification Rate</p>
              <p className="text-xs sm:text-sm font-bold text-white mt-0.5">100% Volunteer Checked</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Switcher Tab (Map vs List View on Small Screens) */}
      <div className="flex md:hidden items-center p-1 bg-amber-100/60 rounded-2xl border border-amber-200">
        <button
          onClick={() => setMobileTab("both")}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            mobileTab === "both" ? "bg-white text-orange-700 shadow-xs" : "text-gray-600"
          }`}
        >
          All (नकाशा + निवारे)
        </button>
        <button
          onClick={() => setMobileTab("map")}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1 ${
            mobileTab === "map" ? "bg-white text-orange-700 shadow-xs" : "text-gray-600"
          }`}
        >
          <MapIcon className="w-3.5 h-3.5" />
          Map (नकाशा)
        </button>
        <button
          onClick={() => setMobileTab("list")}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1 ${
            mobileTab === "list" ? "bg-white text-orange-700 shadow-xs" : "text-gray-600"
          }`}
        >
          <List className="w-3.5 h-3.5" />
          List ({filteredShelters.length})
        </button>
      </div>

      {/* Map Section */}
      {(mobileTab === "both" || mobileTab === "map") && (
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1.5 font-marathi">
              <MapPin className="w-4 h-4 text-orange-600" />
              <span>
                {lang === "mr" ? "पालखी मार्ग व निवारा नकाशा" : "Interactive Palkhi Route Map"}
              </span>
            </h2>
            <span className="text-[11px] text-gray-500 font-medium">Click pin for availability</span>
          </div>

          <div className="h-[320px] sm:h-[380px] w-full">
            <WariMap
              shelters={filteredShelters}
              onSelectShelter={(shelter) => setDetailModalShelter(shelter)}
              selectedHaltCoords={selectedHaltCoords}
            />
          </div>
        </div>
      )}

      {/* Search & Filter Toolbar */}
      {(mobileTab === "both" || mobileTab === "list") && (
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-amber-100 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none font-marathi"
              />
            </div>

            {/* Grid / List Toggle */}
            <div className="hidden sm:flex items-center gap-1 bg-gray-100 p-1 rounded-xl shrink-0">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg text-xs font-bold transition-colors ${
                  viewMode === "grid" ? "bg-white text-orange-700 shadow-2xs" : "text-gray-500"
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg text-xs font-bold transition-colors ${
                  viewMode === "list" ? "bg-white text-orange-700 shadow-2xs" : "text-gray-500"
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Touch Scrollable Filter Pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
            {[
              { id: "all", label: t("filterAll") },
              { id: "free", label: t("filterFree") },
              { id: "under100", label: t("filterUnder100") },
              { id: "under200", label: t("filterUnder200") },
              { id: "verified", label: t("filterVerified") },
              { id: "available", label: t("filterAvailable") },
              { id: "family", label: t("filterFamily") },
              { id: "group", label: t("filterGroup") }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setActiveFilter(btn.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 font-marathi active:scale-95 ${
                  activeFilter === btn.id
                    ? "bg-orange-600 text-white shadow-xs"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Shelter Cards List / Grid */}
      {(mobileTab === "both" || mobileTab === "list") && (
        <>
          {filteredShelters.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-amber-100 shadow-xs space-y-3">
              <Building2 className="w-12 h-12 text-orange-300 mx-auto" />
              <h3 className="text-base font-bold text-gray-800 font-marathi">
                {t("noSheltersFound")}
              </h3>
              <button
                onClick={() => {
                  setActiveFilter("all");
                  setSelectedHalt("all");
                  setSearchQuery("");
                }}
                className="px-4 py-2 bg-orange-600 text-white text-xs font-bold rounded-xl"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                  : "space-y-4"
              }
            >
              {filteredShelters.map((shelter) => (
                <ShelterCard
                  key={shelter.id}
                  shelter={shelter}
                  onSelect={(s) => setDetailModalShelter(s)}
                  onRequestStay={(s) => setBookingModalShelter(s)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Detail View Modal */}
      {detailModalShelter && (
        <ShelterDetailModal
          shelter={detailModalShelter}
          onClose={() => setDetailModalShelter(null)}
          onRequestStay={(s) => setBookingModalShelter(s)}
        />
      )}

      {/* Booking Form Modal */}
      {bookingModalShelter && (
        <BookingFlowModal
          shelter={bookingModalShelter}
          onClose={() => setBookingModalShelter(null)}
          onSuccess={(req) => {
            setBookingModalShelter(null);
            setCreatedRequest(req);
          }}
        />
      )}

      {/* Stay Pass Modal */}
      {createdRequest && (
        <StayPassModal
          request={createdRequest}
          shelter={shelters.find((s) => s.id === createdRequest.shelterId)}
          onClose={() => setCreatedRequest(null)}
        />
      )}
    </div>
  );
};
