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
  const { activeBusiness, setActiveBusiness } = useBusiness();

  const [loading, setLoading] = useState(true);
  const [business, setBusiness] = useState<BusinessData | null>(null);
  const [hasAnyBusiness, setHasAnyBusiness] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        let businessId = activeBusiness?.id;

        // 1️⃣ No active business → fetch list
        if (!businessId) {
          const listRes = await fetch(
            "/api/essential-business/connectivity-sim/profile/list"
          );
          const listData = await listRes.json();

          if (!listRes.ok || !listData.data?.length) {
            setHasAnyBusiness(false);
            return;
          }

          businessId = listData.data[0].id;
        }

        // 2️⃣ Fetch business detail
        const detailRes = await fetch(
          `/api/essential-business/connectivity-sim/profile/detail?id=${businessId}`
        );
        const detailData = await detailRes.json();

        if (!detailRes.ok || !detailData.data) {
          setHasAnyBusiness(false);
          return;
        }

        const fullBusiness: BusinessData = detailData.data;
        setBusiness(fullBusiness);

        // 3️⃣ Fetch subscription (can be null – OK)
        const subRes = await fetch(
          `/api/subscriptions/get/${businessId}`
        );
        const subData = await subRes.json();
        // 4️⃣ Sync context ONLY if business exists
        setActiveBusiness({
          id: fullBusiness.id,
          name: fullBusiness.name,
          phone_number: fullBusiness.phone_number,
          isSubscribed: Boolean(subData?.is_subscribed),
          subscriptionEndsAt: subData?.subscription?.to_date ?? null
        });
      } catch (err) {
        console.error("[ConnectivitySimPage]", err);
        setHasAnyBusiness(false);
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
    // run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- STATES ---------- */

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  // ❌ No business in DB
  if (!hasAnyBusiness) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">
          Connectivity & SIM Services
        </h2>

        <p className="text-gray-600 mb-4">
          You don’t have any business profile yet.
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

  // ❌ Defensive (should never happen, but safe)
  if (!business) {
    return (
      <p className="p-6 text-gray-500">
        Unable to load business details.
      </p>
    );
  }else{

     /* ✅ Business exists */
  return (
    <Dashboard
      title="Connectivity and SIM Services"
      business={business}
    />
  );

  }

 
}
