import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useApp } from "../context/AppContext";
import { 
  Play, 
  User, 
  Building2, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  ChevronUp, 
  ChevronDown,
  Layers
} from "lucide-react";

export const DemoControlBar = () => {
  const { lang, t } = useLanguage();
  const { 
    currentUser,
    loginUser,
    setActiveTab, 
    resetDemoData, 
    createStayRequest, 
    acceptStayRequest, 
    requests, 
    shelters 
  } = useApp();

  const [expanded, setExpanded] = useState(false);

  const isHost = currentUser?.role === "host";

  // Switch to Pilgrim Role
  const handleSwitchPilgrim = () => {
    loginUser({
      role: "pilgrim",
      name: "Rahul Patil",
      phone: "+91 98221 99001",
      halt: "Pandharpur"
    });
    setActiveTab("explore");
  };

  // Switch to Host Role
  const handleSwitchHost = () => {
    loginUser({
      role: "host",
      name: "Vitthal Seva Trust",
      contactPerson: "Shri Sopanrao Kadam",
      phone: "+91 98220 14589",
      halt: "Pandharpur"
    });
    setActiveTab("host");
  };

  // Quick Pitch Action 1: Auto Request Stay as Pilgrim
  const handleAutoRequest = () => {
    handleSwitchPilgrim();
    const targetShelter = shelters[0];
    if (targetShelter) {
      createStayRequest({
        shelterId: targetShelter.id,
        shelterName: targetShelter.name,
        pilgrimName: "Rahul Patil",
        pilgrimPhone: "+91 98221 99001",
        pilgrimCount: 2,
        arrivalDate: new Date().toISOString().split("T")[0],
        specialReq: "Demo pitch auto-request: 2 family members"
      });
      setActiveTab("myStays");
    }
  };

  // Quick Pitch Action 2: Auto Accept as Host
  const handleAutoAccept = () => {
    handleSwitchHost();
    const pending = requests.find((r) => r.status === "pending");
    if (pending) {
      acceptStayRequest(pending.id);
    }
  };

  return (
    <div className="fixed bottom-18 md:bottom-4 left-1/2 -translate-x-1/2 z-50 max-w-xl w-[94%] sm:w-full transition-all">
      <div className="bg-gray-900/95 text-white backdrop-blur-md rounded-2xl shadow-2xl border border-amber-500/40 p-2 space-y-2">
        <div className="flex items-center justify-between px-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-extrabold text-amber-400 tracking-wider text-[11px] uppercase">
              Role Switcher & Pitch Demo
            </span>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="text-gray-300 hover:text-white flex items-center gap-1 text-[11px] bg-gray-800 px-2 py-0.5 rounded-lg border border-gray-700 font-medium"
          >
            <span>{expanded ? "Hide" : "Pitch Bar"}</span>
            {expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
        </div>

        {expanded && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-gray-800 text-xs">
            {/* Pilgrim Role */}
            <button
              onClick={handleSwitchPilgrim}
              className={`p-2 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-colors ${
                !isHost ? "bg-orange-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Pilgrim (Rahul)</span>
            </button>

            {/* Host Role */}
            <button
              onClick={handleSwitchHost}
              className={`p-2 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-colors ${
                isHost ? "bg-amber-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Host (Vitthal)</span>
            </button>

            {/* Quick Trigger: Send Request */}
            <button
              onClick={handleAutoRequest}
              className="p-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 transition-colors"
              title="Auto create a stay request as Rahul Patil"
            >
              <Play className="w-3.5 h-3.5" />
              <span>1. Request Stay</span>
            </button>

            {/* Quick Trigger: Accept Request */}
            <button
              onClick={handleAutoAccept}
              className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 transition-colors"
              title="Auto accept pending request in Host view"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>2. Accept Stay</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
