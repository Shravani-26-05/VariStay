import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { useApp } from "../context/AppContext";
import { WARI_HALTS } from "../data/shelters";
import { BarChart3, PieChart, ShieldCheck, MapPin, Users, Building2, TrendingUp, CheckCircle2 } from "lucide-react";

export const AdminAnalyticsDashboard = () => {
  const { lang, t } = useLanguage();
  const { shelters, requests } = useApp();

  const totalCapacity = shelters.reduce((acc, curr) => acc + curr.totalCapacity, 0);
  const totalAvailable = shelters.reduce((acc, curr) => acc + curr.availableSpaces, 0);
  const occupiedBeds = totalCapacity - totalAvailable;
  const occupancyRate = Math.round((occupiedBeds / (totalCapacity || 1)) * 100);

  const freeCount = shelters.filter((s) => s.isFree).length;
  const paidCount = shelters.filter((s) => !s.isFree).length;
  const freePercent = Math.round((freeCount / (shelters.length || 1)) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-orange-200">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Palkhi Route Command Center</span>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 font-marathi mt-1">
            {lang === "mr" ? "पालखी मार्ग निवारा विश्लेषण (Route Analytics)" : "Palkhi Route Occupancy & Analytics"}
          </h1>
          <p className="text-xs text-gray-500">Real-time telemetry across Pandharpur Wari halts</p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-900 px-4 py-2 rounded-2xl border border-emerald-200 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>100% Volunteer Verified Network</span>
        </div>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-orange-600">
            <Building2 className="w-5 h-5" />
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-xs text-gray-500 font-medium">Total Shelters</p>
          <p className="text-2xl font-black text-gray-900">{shelters.length}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-emerald-600">
            <Users className="w-5 h-5" />
            <span className="text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded text-emerald-700">{occupancyRate}% Occupied</span>
          </div>
          <p className="text-xs text-gray-500 font-medium">Total Network Capacity</p>
          <p className="text-2xl font-black text-emerald-700">{totalCapacity} Beds</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-amber-600">
            <PieChart className="w-5 h-5" />
            <span className="text-xs font-bold bg-amber-50 px-2 py-0.5 rounded text-amber-700">{freePercent}% Free</span>
          </div>
          <p className="text-xs text-gray-500 font-medium">Free Community Shelters</p>
          <p className="text-2xl font-black text-amber-800">{freeCount} / {shelters.length}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-blue-600">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-xs font-bold bg-blue-50 px-2 py-0.5 rounded text-blue-700">Total Requests</span>
          </div>
          <p className="text-xs text-gray-500 font-medium">Completed Bookings</p>
          <p className="text-2xl font-black text-gray-900">{requests.length}</p>
        </div>
      </div>

      {/* Route Halt Capacity Distribution */}
      <div className="bg-white rounded-3xl p-6 border border-amber-100 shadow-xs space-y-6">
        <div>
          <h2 className="text-lg font-extrabold text-gray-900 font-marathi">
            Halt-wise Shelter Capacity Distribution
          </h2>
          <p className="text-xs text-gray-500">Live bed availability along the Palkhi procession timeline</p>
        </div>

        <div className="space-y-4">
          {WARI_HALTS.filter((h) => h.id !== "all").map((halt) => {
            const haltShelters = shelters.filter((s) => s.haltLocation === halt.id);
            const haltCap = haltShelters.reduce((acc, curr) => acc + curr.totalCapacity, 0);
            const haltAvail = haltShelters.reduce((acc, curr) => acc + curr.availableSpaces, 0);
            const haltOccupied = haltCap - haltAvail;
            const pct = Math.round((haltOccupied / (haltCap || 1)) * 100);

            return (
              <div key={halt.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-900 font-marathi flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-orange-600" />
                    {lang === "mr" ? halt.nameMr : halt.name}
                    <span className="text-[10px] text-gray-400 font-normal">({haltShelters.length} shelters)</span>
                  </span>
                  <span className="font-bold text-gray-700">
                    {haltAvail} beds left / {haltCap} total
                  </span>
                </div>

                <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden flex">
                  <div
                    className="bg-orange-600 h-full transition-all duration-300"
                    style={{ width: `${pct}%` }}
                    title={`${pct}% occupied`}
                  ></div>
                  <div
                    className="bg-emerald-500 h-full transition-all duration-300"
                    style={{ width: `${100 - pct}%` }}
                    title={`${100 - pct}% available`}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
