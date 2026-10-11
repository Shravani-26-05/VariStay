import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useApp } from "../context/AppContext";
import { WARI_HALTS } from "../data/shelters";
import { 
  Building2, 
  Users, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  ShieldCheck, 
  Phone, 
  MapPin, 
  ToggleLeft, 
  ToggleRight, 
  X, 
  AlertCircle, 
  DollarSign,
  Sparkles
} from "lucide-react";

export const HostDashboard = () => {
  const { lang, t } = useLanguage();
  const { 
    shelters, 
    requests, 
    addShelter, 
    acceptStayRequest, 
    rejectStayRequest, 
    updateShelterSpaces 
  } = useApp();

  const [addModalOpen, setAddModalOpen] = useState(false);

  // Form State for Add Shelter
  const [name, setName] = useState("");
  const [nameMr, setNameMr] = useState("");
  const [address, setAddress] = useState("");
  const [haltLocation, setHaltLocation] = useState("Pandharpur");
  const [shelterType, setShelterType] = useState("Community Hall");
  const [isFree, setIsFree] = useState(true);
  const [price, setPrice] = useState(0);
  const [totalCapacity, setTotalCapacity] = useState(50);
  const [availableSpaces, setAvailableSpaces] = useState(50);
  const [amenities, setAmenities] = useState(["water", "toilets", "charging"]);
  const [imageUrl, setImageUrl] = useState("");

  const pendingRequests = requests.filter((r) => r.status === "pending");
  const acceptedRequests = requests.filter((r) => r.status === "accepted");

  const totalHostCapacity = shelters.reduce((acc, curr) => acc + curr.totalCapacity, 0);
  const totalHostAvailable = shelters.reduce((acc, curr) => acc + curr.availableSpaces, 0);

  const handleToggleAmenity = (key) => {
    setAmenities((prev) =>
      prev.includes(key) ? prev.filter((a) => a !== key) : [...prev, key]
    );
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addShelter({
      name: name || "Vitthal Community Rest House",
      nameMr: nameMr || "विठ्ठल सामाजिक विश्राम गृह",
      address: address || "Near Temple Circle, Pandharpur",
      addressMr: address || "मंदिर चौकाजवळ, पंढरपूर",
      haltLocation,
      shelterType,
      isFree,
      price: isFree ? 0 : Number(price),
      totalCapacity: Number(totalCapacity),
      availableSpaces: Number(availableSpaces),
      amenities,
      coordinates: { lat: 17.6780, lng: 75.3290 },
      hostName: "Vitthal Seva Trust",
      hostPhone: "+91 98220 14589",
      distanceKm: 0.9,
      images: imageUrl ? [imageUrl] : [
        "https://images.unsplash.com/photo-1545232979-fbf59202c374?auto=format&fit=crop&w=800&q=80"
      ]
    });

    setAddModalOpen(false);
    // Reset Form
    setName("");
    setNameMr("");
    setAddress("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Host Portal Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-amber-100 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-0.5 rounded-full border border-amber-200">
              Host Portal
            </span>
            <span className="text-xs text-gray-500 font-medium">Logged in as: Vitthal Seva Trust</span>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 font-marathi mt-1">
            {t("hostTitle")}
          </h1>
        </div>

        <button
          onClick={() => setAddModalOpen(true)}
          className="py-3 px-5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-extrabold text-xs rounded-2xl shadow-md transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>{t("addNewShelter")}</span>
        </button>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-orange-600">
            <Building2 className="w-5 h-5" />
            <span className="text-xs font-bold bg-orange-50 px-2 py-0.5 rounded text-orange-700">Live</span>
          </div>
          <p className="text-xs text-gray-500 font-medium">{t("activeSheltersCount")}</p>
          <p className="text-2xl font-black text-gray-900">{shelters.length}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-emerald-600">
            <Users className="w-5 h-5" />
            <span className="text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded text-emerald-700">Beds</span>
          </div>
          <p className="text-xs text-gray-500 font-medium">{t("totalCapacityCount")}</p>
          <p className="text-2xl font-black text-emerald-700">
            {totalHostAvailable} <span className="text-xs font-normal text-gray-400">/ {totalHostCapacity} free</span>
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-amber-600">
            <Clock className="w-5 h-5" />
            <span className="text-xs font-bold bg-amber-50 px-2 py-0.5 rounded text-amber-700">Action</span>
          </div>
          <p className="text-xs text-gray-500 font-medium">{t("pendingRequestsCount")}</p>
          <p className="text-2xl font-black text-amber-600">{pendingRequests.length}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-blue-600">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-xs font-bold bg-blue-50 px-2 py-0.5 rounded text-blue-700">Confirmed</span>
          </div>
          <p className="text-xs text-gray-500 font-medium">{t("confirmedStaysCount")}</p>
          <p className="text-2xl font-black text-gray-900">{acceptedRequests.length}</p>
        </div>
      </div>

      {/* Pending Requests Queue */}
      <div className="bg-white rounded-3xl p-6 border border-amber-100 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-gray-900 font-marathi flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-600" />
              <span>Incoming Pilgrim Stay Requests ({pendingRequests.length})</span>
            </h2>
            <p className="text-xs text-gray-500 font-marathi">
              Accepting a request reserves beds and updates the Varkari's pass in real time
            </p>
          </div>
        </div>

        {pendingRequests.length === 0 ? (
          <div className="p-8 text-center bg-gray-50 rounded-2xl text-xs text-gray-500 border border-dashed border-gray-200">
            No pending stay requests at the moment.
          </div>
        ) : (
          <div className="space-y-3">
            {pendingRequests.map((req) => (
              <div
                key={req.id}
                className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-gray-900">{req.pilgrimName}</span>
                    <span className="bg-orange-100 text-orange-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                      {req.pilgrimCount} Varkaris
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    <span>{req.pilgrimPhone}</span>
                    <span>• Arrival: {req.arrivalDate}</span>
                  </p>
                  {req.specialReq && (
                    <p className="text-xs text-amber-900 italic bg-amber-100/60 px-2 py-1 rounded">
                      "{req.specialReq}"
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => acceptStayRequest(req.id)}
                    className="py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{t("acceptRequest")}</span>
                  </button>

                  <button
                    onClick={() => rejectStayRequest(req.id)}
                    className="py-2 px-3 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 transition-colors flex items-center gap-1"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>{t("rejectRequest")}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Listed Shelters Section */}
      <div className="bg-white rounded-3xl p-6 border border-amber-100 shadow-xs space-y-4">
        <h2 className="text-lg font-extrabold text-gray-900 font-marathi flex items-center gap-2">
          <Building2 className="w-5 h-5 text-orange-600" />
          <span>My Listed Shelters ({shelters.length})</span>
        </h2>

        <div className="space-y-4">
          {shelters.map((shelter) => (
            <div
              key={shelter.id}
              className="p-4 rounded-2xl border border-gray-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <img
                  src={shelter.images[0]}
                  alt={shelter.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-gray-900 font-marathi">
                      {lang === "mr" && shelter.nameMr ? shelter.nameMr : shelter.name}
                    </h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${
                        shelter.isFree ? "bg-emerald-600" : "bg-orange-600"
                      }`}
                    >
                      {shelter.isFree ? "FREE" : `₹${shelter.price}`}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-orange-600" />
                    <span>{shelter.haltLocation} — {shelter.address}</span>
                  </p>

                  <div className="flex items-center gap-2 mt-1 text-xs">
                    <span className="text-emerald-700 font-bold">
                      {shelter.availableSpaces} / {shelter.totalCapacity} spaces open
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified
                    </span>
                  </div>
                </div>
              </div>

              {/* Adjust Spaces */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() =>
                    updateShelterSpaces(
                      shelter.id,
                      Math.max(0, shelter.availableSpaces - 5)
                    )
                  }
                  className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-lg"
                >
                  - 5 Beds
                </button>
                <button
                  onClick={() =>
                    updateShelterSpaces(
                      shelter.id,
                      Math.min(shelter.totalCapacity, shelter.availableSpaces + 5)
                    )
                  }
                  className="px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-bold rounded-lg"
                >
                  + 5 Beds
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Shelter Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-amber-100 relative animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setAddModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-extrabold text-gray-900 font-marathi mb-4">
              {t("addNewShelter")}
            </h3>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Shelter Name (English)
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Vitthal Bhakta Niwas"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Shelter Name in Marathi (मराठीत नाव)
                </label>
                <input
                  type="text"
                  value={nameMr}
                  onChange={(e) => setNameMr(e.target.value)}
                  placeholder="उदा. विठ्ठल भक्त निवास"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none font-marathi"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Full Address
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Near Station Road, Pandharpur"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {t("haltSelect")}
                  </label>
                  <select
                    value={haltLocation}
                    onChange={(e) => setHaltLocation(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  >
                    {WARI_HALTS.filter((h) => h.id !== "all").map((h) => (
                      <option key={h.id} value={h.id}>
                        {h.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {t("shelterTypeSelect")}
                  </label>
                  <select
                    value={shelterType}
                    onChange={(e) => setShelterType(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  >
                    <option value="Community Hall">Community Hall</option>
                    <option value="Temple Trust">Temple Trust</option>
                    <option value="School / College">School / College</option>
                    <option value="Private House">Private House</option>
                    <option value="Volunteer Camp">Volunteer Camp</option>
                  </select>
                </div>
              </div>

              {/* Free vs Paid Toggle */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900">Is this accommodation FREE?</span>
                <button
                  type="button"
                  onClick={() => setIsFree(!isFree)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                    isFree ? "bg-emerald-600 text-white" : "bg-orange-600 text-white"
                  }`}
                >
                  {isFree ? "YES (FREE)" : "PAID"}
                </button>
              </div>

              {!isFree && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Price per night per person (₹)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Total Capacity</label>
                  <input
                    type="number"
                    min="1"
                    value={totalCapacity}
                    onChange={(e) => {
                      setTotalCapacity(e.target.value);
                      setAvailableSpaces(e.target.value);
                    }}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Available Now</label>
                  <input
                    type="number"
                    min="0"
                    max={totalCapacity}
                    value={availableSpaces}
                    onChange={(e) => setAvailableSpaces(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl"
                  />
                </div>
              </div>

              {/* Amenities */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Available Amenities</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {["water", "toilets", "charging", "first_aid", "meals", "hot_water", "sleeping_mat"].map(
                    (key) => (
                      <label
                        key={key}
                        className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                      >
                        <input
                          type="checkbox"
                          checked={amenities.includes(key)}
                          onChange={() => handleToggleAmenity(key)}
                        />
                        <span>{t(`amenity_${key}`)}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{t("submitVerification")}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
