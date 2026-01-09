"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Dashboard from "@/components/business/common/Dashboard";
import { useBusiness } from "@/context/BusinessContext";

interface BusinessData {
  id: string;
  name: string;
  address: string | null;
  phone_number: string;
  email: string;
}

export default function ConnectivitySimPage() {
  const router = useRouter();
  const { activeBusiness, loading: businessLoading } = useBusiness();

  const [loading, setLoading] = useState(true);
  const [business, setBusiness] = useState<BusinessData | null>(null);

  useEffect(() => {
    const bootstrap = async () => {
      // 1️⃣ WAIT for context hydration
      if (businessLoading) return;

      // 2️⃣ No active business → go to selector
      if (!activeBusiness?.id) {
        router.replace(
          "/business/trip-essentials/connectivity-and-sim-services/chain-of-business"
        );
        return;
      }

      try {
        // 3️⃣ Fetch business detail (ONLY by active ID)
        const detailRes = await fetch(
          `/api/essential-business/connectivity-sim/profile/detail?id=${activeBusiness.id}`
        );

        const detailData = await detailRes.json();

        if (!detailRes.ok || !detailData.data) {
          throw new Error("Business not found");
        }

        setBusiness(detailData.data);
      } catch (err) {
        console.error("[ConnectivitySimPage]", err);
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, [activeBusiness?.id, businessLoading, router]);

  /* ---------- STATES ---------- */

  if (businessLoading || loading) {
    return <p className="p-6">Loading...</p>;
  }

  if (!business) {
    return (
      <p className="p-6 text-gray-500">
        Unable to load business details.
      </p>
    );
  }

  return (
    <Dashboard
      title="Connectivity and SIM Services"
      business={business}
    />
  );
}
