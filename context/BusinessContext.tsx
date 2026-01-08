"use client";

import { createContext, useContext, useState } from "react";

type ActiveBusiness = {
  id: string;
  name: string;
  phone_number: string;
  isSubscribed: boolean;
  subscriptionEndsAt?: string;
};

type BusinessContextType = {
  activeBusiness: ActiveBusiness | null;
  setActiveBusiness: (b: ActiveBusiness | null) => void;
};

const BusinessContext = createContext<BusinessContextType | null>(null);

export function BusinessProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [activeBusiness, setActiveBusiness] =
    useState<ActiveBusiness | null>(null);

  return (
    <BusinessContext.Provider
      value={{ activeBusiness, setActiveBusiness }}
    >
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusiness() {
  const ctx = useContext(BusinessContext);
  if (!ctx) {
    throw new Error("useBusiness must be used inside BusinessProvider");
  }
  return ctx;
}
