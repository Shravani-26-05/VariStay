import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useApp } from "../context/AppContext";
import { X, Calendar, Users, User, Phone, FileText, Send, Sparkles } from "lucide-react";

export const BookingFlowModal = ({ shelter, onClose, onSuccess }) => {
  const { lang, t } = useLanguage();
  const { createStayRequest } = useApp();

  const [pilgrimName, setPilgrimName] = useState("Rahul Patil");
  const [pilgrimPhone, setPilgrimPhone] = useState("+91 98221 99001");
  const [pilgrimCount, setPilgrimCount] = useState(2);
  const [arrivalDate, setArrivalDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [specialReq, setSpecialReq] = useState("Ground floor space needed for senior citizen");

  const handleSubmit = (e) => {
    e.preventDefault();
    const createdReq = createStayRequest({
      shelterId: shelter.id,
      shelterName: shelter.name,
      pilgrimName,
      pilgrimPhone,
      pilgrimCount,
      arrivalDate,
      specialReq
    });

    onSuccess(createdReq);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-amber-100 relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 font-marathi">
              {t("requestTitle")}
            </h3>
            <p className="text-xs text-gray-500 font-marathi">
              {lang === "mr" && shelter.nameMr ? shelter.nameMr : shelter.name}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Pilgrim Name */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-orange-600" />
              Full Name (नाव)
            </label>
            <input
              type="text"
              required
              value={pilgrimName}
              onChange={(e) => setPilgrimName(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          {/* Pilgrim Mobile */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-orange-600" />
              Mobile Number (मोबाईल नंबर)
            </label>
            <input
              type="tel"
              required
              value={pilgrimPhone}
              onChange={(e) => setPilgrimPhone(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Number of Pilgrims */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-orange-600" />
                {t("numPilgrims")}
              </label>
              <input
                type="number"
                min="1"
                max={shelter.availableSpaces || 20}
                required
                value={pilgrimCount}
                onChange={(e) => setPilgrimCount(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>

            {/* Arrival Date */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-orange-600" />
                {t("selectDate")}
              </label>
              <input
                type="date"
                required
                value={arrivalDate}
                onChange={(e) => setArrivalDate(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Special Notes */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-orange-600" />
              {t("specialReq")}
            </label>
            <textarea
              rows="2"
              value={specialReq}
              onChange={(e) => setSpecialReq(e.target.value)}
              placeholder="e.g. Elderly members requiring ground mats, family group, etc."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
            ></textarea>
          </div>

          {/* Cost Summary */}
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between text-xs">
            <span className="font-bold text-amber-900">Total Stay Cost:</span>
            <span className="font-extrabold text-sm text-gray-900">
              {shelter.isFree ? "FREE (मोफत)" : `₹${shelter.price * pilgrimCount}`}
            </span>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>{t("submitRequest")}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
