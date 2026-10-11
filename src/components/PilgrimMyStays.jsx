import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useApp } from "../context/AppContext";
import { StayPassModal } from "./StayPassModal";
import { 
  BookmarkCheck, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Users, 
  Calendar, 
  QrCode, 
  XCircle 
} from "lucide-react";

export const PilgrimMyStays = ({ onExplore }) => {
  const { lang, t } = useLanguage();
  const { requests, shelters } = useApp();
  const [selectedPassReq, setSelectedPassReq] = useState(null);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 font-marathi">
            {t("myStays")}
          </h1>
          <p className="text-xs text-gray-500 font-marathi">
            Track your stay request status and view your digital Varkari passes
          </p>
        </div>

        <button
          onClick={onExplore}
          className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-xs"
        >
          + {t("findShelter")}
        </button>
      </div>

      {requests.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-amber-100 shadow-xs space-y-3">
          <BookmarkCheck className="w-12 h-12 text-orange-300 mx-auto" />
          <h3 className="text-base font-bold text-gray-800 font-marathi">
            {t("emptyStays")}
          </h3>
          <button
            onClick={onExplore}
            className="px-5 py-2.5 bg-orange-600 text-white text-xs font-bold rounded-xl"
          >
            {t("findShelter")}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => {
            const shelter = shelters.find((s) => s.id === req.shelterId);
            const isConfirmed = req.status === "accepted";
            const isRejected = req.status === "rejected";

            return (
              <div
                key={req.id}
                className="bg-white rounded-2xl p-5 border border-amber-100 shadow-xs space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
                  <div>
                    <span className="text-[10px] font-bold font-mono text-gray-400">
                      ID: {req.id}
                    </span>
                    <h3 className="font-bold text-base text-gray-900 font-marathi">
                      {shelter ? (lang === "mr" && shelter.nameMr ? shelter.nameMr : shelter.name) : req.shelterName}
                    </h3>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-extrabold px-3 py-1 rounded-full text-white ${
                      isConfirmed
                        ? "bg-emerald-600"
                        : isRejected
                        ? "bg-rose-600"
                        : "bg-amber-500 animate-pulse"
                    }`}
                  >
                    {isConfirmed ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : isRejected ? (
                      <XCircle className="w-3.5 h-3.5" />
                    ) : (
                      <Clock className="w-3.5 h-3.5" />
                    )}
                    <span>
                      {isConfirmed
                        ? t("statusAccepted")
                        : isRejected
                        ? t("statusRejected")
                        : t("statusPending")}
                    </span>
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-gray-700">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-orange-600 shrink-0" />
                    <span>{req.pilgrimCount} Pilgrims</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-orange-600 shrink-0" />
                    <span>{req.arrivalDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
                    <MapPin className="w-4 h-4 text-orange-600 shrink-0" />
                    <span>{shelter ? shelter.haltLocation : "Pandharpur"}</span>
                  </div>
                </div>

                {req.specialReq && (
                  <p className="text-xs text-gray-500 bg-gray-50 p-2.5 rounded-xl border border-gray-100 italic">
                    "{req.specialReq}"
                  </p>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setSelectedPassReq(req)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white text-xs font-bold rounded-xl shadow-xs"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>View Digital Pass</span>
                  </button>

                  {shelter && shelter.hostPhone && (
                    <a
                      href={`tel:${shelter.hostPhone}`}
                      className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{shelter.hostPhone}</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedPassReq && (
        <StayPassModal
          request={selectedPassReq}
          shelter={shelters.find((s) => s.id === selectedPassReq.shelterId)}
          onClose={() => setSelectedPassReq(null)}
        />
      )}
    </div>
  );
};
