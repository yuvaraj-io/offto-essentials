"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Dashboard from "@/components/business/common/Dashboard";
import { useBusiness } from "@/context/BusinessContext";

interface BusinessData {
  id: string;
  name: string;
  address: string;
  phone_number: string;
  email: string;
}

export default function ConnectivitySimPage() {
  const router = useRouter();

  const { businessProfileId, setBusinessProfileId } = useBusiness();

  const [loading, setLoading] = useState(true);
  const [business, setBusiness] = useState<BusinessData | null>(null);

  useEffect(() => {
    const bootstrapBusiness = async () => {
      try {
        // 1️⃣ If active business already exists → fetch ONLY that
        if (businessProfileId) {
          const res = await fetch(
            `/api/essential-business/connectivity-sim/profile/detail?id=${businessProfileId}`
          );

          const data = await res.json();

          if (res.ok) {
            setBusiness(data.data);
          }

          setLoading(false);
          return;
        }

        // 2️⃣ Else → fetch list
        const res = await fetch(
          "/api/essential-business/connectivity-sim/profile/list"
        );

        const data = await res.json();

        if (res.ok && data.data?.length > 0) {
          const firstBusiness = data.data[0];

          // set active business
          setBusinessProfileId(firstBusiness.id);

          // use first business data directly
          setBusiness(firstBusiness);
        }
      } catch (err) {
        console.error("[ConnectivitySimPage]", err);
      } finally {
        setLoading(false);
      }
    };

    bootstrapBusiness();
  }, [businessProfileId, setBusinessProfileId]);

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  // ❌ No business at all → CTA
  if (!business) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">
          Connectivity & SIM Services
        </h2>

        <p className="text-gray-600 mb-4">
          Please create your Connectivity and SIM services profile
          to continue.
        </p>

        <Button
          onClick={() =>
            router.push(
              "/business/trip-essentials/connectivity-and-sim-services/create"
            )
          }
        >
          Create Profile
        </Button>
      </div>
    );
  }

  // ✅ Business exists → render dashboard with DATA (no fetching inside)
  return (
    <Dashboard
      title="Connectivity and SIM Services"
      business={business}
    />
  );
}
