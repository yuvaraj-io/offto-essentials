"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBusiness } from "@/context/BusinessContext";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Business {
  id: string;
  name: string;
  address: string | null;
  phone_number: string;
}

export default function BusinessChainPage() {
  const router = useRouter();
  const { setActiveBusiness } = useBusiness();

  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selectedBusiness, setSelectedBusiness] =
    useState<Business | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const res = await fetch(
          "/api/essential-business/connectivity-sim/profile/list"
        );
        const data = await res.json();

        if (res.ok) {
          setBusinesses(data.data || []);
        }
      } catch (err) {
        console.error("[BusinessChain]", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  const handleMakeActive = async () => {
    if (!selectedBusiness) return;

    try {
      // 1️⃣ Fetch subscription status
      const subRes = await fetch(
        `/api/subscriptions/get/${selectedBusiness.id}`
      );
      const subData = await subRes.json();

      await fetch("/api/business/active/set-active", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ business_id: selectedBusiness.id }),
      });

      // 2️⃣ Hydrate context properly
      setActiveBusiness({
        id: selectedBusiness.id,
        name: selectedBusiness.name,
        phone_number: selectedBusiness.phone_number,
        isSubscribed: Boolean(subData?.is_subscribed),
        subscriptionEndsAt: subData?.subscription?.to_date ?? null
      });

      // 3️⃣ Navigate
      router.push(
        "/business/trip-essentials/connectivity-and-sim-services"
      );
    } catch (err) {
      console.error("[MakeActive]", err);
    }
  };

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold">Chain of Businesses</h1>
        <p className="text-sm text-gray-600">
          Add or manage your chain of businesses
        </p>
      </div>

      {/* Business Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {businesses.map((biz) => (
          <div
            key={biz.id}
            onClick={() => setSelectedBusiness(biz)}
            className={`cursor-pointer rounded-lg border p-4 transition
              ${
                selectedBusiness?.id === biz.id
                  ? "border-primary ring-2 ring-primary"
                  : "border-gray-200"
              }`}
          >
            <div className="flex gap-4 items-center">
              <Image
                src="/icons/Company.png"
                alt="Business"
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <p className="font-medium">{biz.name}</p>
                <p className="text-sm text-gray-500">
                  {biz.address ?? "—"}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* ➕ Add New Business */}
        <div
          onClick={() =>
            router.push(
              "/business/trip-essentials/connectivity-and-sim-services/create"
            )
          }
          className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 text-gray-500 hover:border-primary hover:text-primary"
        >
          <span className="text-lg font-medium">
            + Add new business
          </span>
        </div>
      </div>

      {/* Make Active Button */}
      <div className="flex justify-end">
        <Button
          disabled={!selectedBusiness}
          onClick={handleMakeActive}
        >
          Make Active
        </Button>
      </div>
    </div>
  );
}
