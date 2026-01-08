"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useBusiness } from "@/context/BusinessContext";

export default function SubscriptionPage() {
  const router = useRouter();
  const { businessProfileId } = useBusiness();

  const handleSubscribe = async () => {
    if (!businessProfileId) return;

    const res = await fetch("/api/subscriptions/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        business_profile_id: businessProfileId
      })
    });

    if (!res.ok) {
      alert("Subscription failed");
      return;
    }

    // After successful subscription
    router.push(
      "/business/trip-essentials/connectivity-and-sim-services"
    );
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-[420px] rounded-lg border bg-white p-6 shadow">
        <h1 className="text-xl font-semibold mb-2">
          Subscribe to Offto
        </h1>

        <p className="text-sm text-gray-600 mb-6">
          Activate your business to access all features.
        </p>

        <div className="rounded-md border p-4 mb-6">
          <p className="text-lg font-bold">₹ 2500 / year</p>
          <p className="text-sm text-gray-500">
            Unlimited access for 1 year
          </p>
        </div>

        <Button className="w-full" onClick={handleSubscribe}>
          Subscribe Now
        </Button>
      </div>
    </div>
  );
}
