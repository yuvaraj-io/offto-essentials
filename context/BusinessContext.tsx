"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

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
  loading: boolean;
};

const BusinessContext =
  createContext<BusinessContextType | null>(null);

export function BusinessProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeBusiness, setActiveBusiness] =
    useState<ActiveBusiness | null>(null);

  const [loading, setLoading] = useState(true);

  /**
   * 🔥 Hydrate context from cookie on first load
   */
  useEffect(() => {
    const hydrate = async () => {
      try {
        const res = await fetch("/api/business/active");
        const data = await res.json();
        debugger
        setActiveBusiness(data.activeBusiness ?? null);
      } catch (err) {
        console.error("[BusinessContext] hydrate failed", err);
        setActiveBusiness(null);
      } finally {
        setLoading(false);
      }
    };

    hydrate();
  }, []);

  return (
    <BusinessContext.Provider
      value={{ activeBusiness, setActiveBusiness, loading }}
    >
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusiness() {
  const ctx = useContext(BusinessContext);
  if (!ctx) {
    throw new Error(
      "useBusiness must be used inside BusinessProvider"
    );
  }
  return ctx;
}
