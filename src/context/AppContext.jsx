import React, { createContext, useContext, useState, useEffect } from "react";
import { INITIAL_SHELTERS, INITIAL_REQUESTS } from "../data/shelters";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Current Logged In User state (role: 'varkari' | 'host' | null)
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("varistay_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Persistence state - Automatically migrate old cached data if it contains outdated Unsplash URLs
  const [shelters, setShelters] = useState(() => {
    const saved = localStorage.getItem("varistay_shelters");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const hasOldUnsplash = parsed.some((s) =>
          s.images.some((img) => img.includes("unsplash.com"))
        );
        if (hasOldUnsplash) {
          localStorage.removeItem("varistay_shelters");
          return INITIAL_SHELTERS;
        }
        return parsed;
      } catch (e) {
        return INITIAL_SHELTERS;
      }
    }
    return INITIAL_SHELTERS;
  });

  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem("varistay_requests");
    return saved ? JSON.parse(saved) : INITIAL_REQUESTS;
  });

  const [activeRole, setActiveRole] = useState(() => {
    return localStorage.getItem("varistay_role") || (currentUser?.role || "varkari");
  });

  const [selectedHalt, setSelectedHalt] = useState("all");
  const [lowBandwidth, setLowBandwidth] = useState(false);
  const [activeTab, setActiveTab] = useState(() => {
    if (currentUser?.role === "host") return "host";
    if (currentUser?.role === "varkari") return "explore";
    return "landing";
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalDefaultRole, setAuthModalDefaultRole] = useState("varkari");

  useEffect(() => {
    localStorage.setItem("varistay_shelters", JSON.stringify(shelters));
  }, [shelters]);

  useEffect(() => {
    localStorage.setItem("varistay_requests", JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem("varistay_role", activeRole);
  }, [activeRole]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("varistay_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("varistay_user");
    }
  }, [currentUser]);

  // Auth Handlers
  const loginAsVarkari = (userObj) => {
    const user = {
      role: "varkari",
      name: userObj?.name || "Rahul Patil",
      phone: userObj?.phone || "+91 98221 99001",
      halt: userObj?.halt || "Pandharpur"
    };
    setCurrentUser(user);
    setActiveRole("varkari");
    setActiveTab("explore");
    setAuthModalOpen(false);
  };

  const loginAsHost = (userObj) => {
    const user = {
      role: "host",
      name: userObj?.name || "Vitthal Seva Trust",
      contactPerson: userObj?.contactPerson || "Shri Sopanrao Kadam",
      phone: userObj?.phone || "+91 98220 14589",
      halt: userObj?.halt || "Pandharpur"
    };
    setCurrentUser(user);
    setActiveRole("host");
    setActiveTab("host");
    setAuthModalOpen(false);
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setActiveRole("varkari");
    setActiveTab("landing");
    localStorage.removeItem("varistay_user");
  };

  const openAuthModal = (defaultRole = "varkari") => {
    setAuthModalDefaultRole(defaultRole);
    setAuthModalOpen(true);
  };

  // Action Handlers
  const addShelter = (newShelter) => {
    const created = {
      ...newShelter,
      id: `shelter-${Date.now()}`,
      verificationStatus: "verified",
      verifiedBy: "✓ Verified by Local Volunteer",
      verifiedByMr: "✓ स्थानिक स्वयंसेवकाद्वारे पडताळलेले",
      rating: 4.8,
      reviewsCount: 1,
      images: newShelter.images && newShelter.images.length > 0 ? newShelter.images : [
        "/images/shelter_twin_beds.jpg",
        "/images/vitthal_dindi_hall.jpg"
      ]
    };
    setShelters((prev) => [created, ...prev]);
    return created;
  };

  const updateShelterSpaces = (shelterId, newAvailable) => {
    setShelters((prev) =>
      prev.map((s) => (s.id === shelterId ? { ...s, availableSpaces: newAvailable } : s))
    );
  };

  const createStayRequest = (reqData) => {
    const newReq = {
      id: `req-${Date.now().toString().slice(-4)}`,
      shelterId: reqData.shelterId,
      shelterName: reqData.shelterName,
      pilgrimName: reqData.pilgrimName || (currentUser ? currentUser.name : "Rahul Patil"),
      pilgrimPhone: reqData.pilgrimPhone || (currentUser ? currentUser.phone : "+91 98221 99001"),
      pilgrimCount: Number(reqData.pilgrimCount) || 1,
      arrivalDate: reqData.arrivalDate || new Date().toISOString().split("T")[0],
      specialReq: reqData.specialReq || "",
      status: "pending",
      createdAt: new Date().toISOString()
    };

    setShelters((prev) =>
      prev.map((s) =>
        s.id === reqData.shelterId
          ? { ...s, availableSpaces: Math.max(0, s.availableSpaces - newReq.pilgrimCount) }
          : s
      )
    );

    setRequests((prev) => [newReq, ...prev]);
    return newReq;
  };

  const acceptStayRequest = (reqId) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === reqId ? { ...r, status: "accepted" } : r))
    );
  };

  const rejectStayRequest = (reqId) => {
    setRequests((prev) => {
      const targetReq = prev.find((r) => r.id === reqId);
      if (targetReq) {
        setShelters((shelterList) =>
          shelterList.map((s) =>
            s.id === targetReq.shelterId
              ? { ...s, availableSpaces: s.availableSpaces + targetReq.pilgrimCount }
              : s
          )
        );
      }
      return prev.map((r) => (r.id === reqId ? { ...r, status: "rejected" } : r));
    });
  };

  const resetDemoData = () => {
    setShelters(INITIAL_SHELTERS);
    setRequests(INITIAL_REQUESTS);
    setSelectedHalt("all");
    localStorage.removeItem("varistay_shelters");
    localStorage.removeItem("varistay_requests");
  };

  return (
    <AppContext.Provider
      value={{
        shelters,
        requests,
        activeRole,
        setActiveRole,
        currentUser,
        loginAsVarkari,
        loginAsHost,
        logoutUser,
        authModalOpen,
        setAuthModalOpen,
        openAuthModal,
        authModalDefaultRole,
        selectedHalt,
        setSelectedHalt,
        lowBandwidth,
        setLowBandwidth,
        activeTab,
        setActiveTab,
        addShelter,
        updateShelterSpaces,
        createStayRequest,
        acceptStayRequest,
        rejectStayRequest,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
