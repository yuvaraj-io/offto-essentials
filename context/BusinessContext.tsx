"use client";

import { createContext, useContext, useState } from "react";

interface BusinessContextValue {
  businessProfileId: string | null;
  setBusinessProfileId: (id: string | null) => void;
}

const BusinessContext = createContext<BusinessContextValue | null>(null);

export function BusinessProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [businessProfileId, setBusinessProfileId] =
    useState<string | null>(null);

  return (
    <BusinessContext.Provider
      value={{ businessProfileId, setBusinessProfileId }}
    >
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusiness() {
  const ctx = useContext(BusinessContext);
  if (!ctx) {
    throw new Error(
      "useBusiness must be used within BusinessProvider"
    );
  }
  return ctx;
}
