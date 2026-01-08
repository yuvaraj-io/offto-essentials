"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Dashboard from "@/components/business/common/Dashboard";

export default function ConnectivitySimPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [hasBusiness, setHasBusiness] = useState(false);

  useEffect(() => {
    const checkBusinessProfile = async () => {
      try {
        const res = await fetch(
          "/api/essential-business/connectivity-sim/profile/list"
        );

        const data = await res.json();

        if (res.ok && data.data && data.data.length > 0) {
          setHasBusiness(true);
        } else {
          setHasBusiness(false);
        }
      } catch (err) {
        console.error(err);
        setHasBusiness(false);
      } finally {
        setLoading(false);
      }
    };

    checkBusinessProfile();
  }, []);

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  // ❌ No business profile yet → SHOW CTA (NO REDIRECT)
  if (!hasBusiness) {
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

  // ✅ Business exists → show dashboard
  return <Dashboard title="Connectivity and SIM Services" />;
}
