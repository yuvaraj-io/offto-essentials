"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useBusiness } from "@/context/BusinessContext";

interface Subscription {
  id: string;
  from_date: string;
  to_date: string;
  revenue: number;
}

export default function SubscriptionPage() {
  const router = useRouter();
  const { businessProfileId } = useBusiness();

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!businessProfileId) return;

    const fetchSubscriptions = async () => {
      try {
        const res = await fetch(
          `/api/subscriptions/list?business_profile_id=${businessProfileId}`
        );

        const data = await res.json();

        if (res.ok) {
          setSubscriptions(data.data || []);
        }
      } catch (err) {
        console.error("[SubscriptionList]", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, [businessProfileId]);

  const handleSubscribe = async () => {
    if (!businessProfileId) return;

    const res = await fetch("/api/subscriptions/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        business_profile_id: businessProfileId
      })
    });

    if (res.ok) {
      router.refresh();
    }
  };

  const handleRenew = async (id: string) => {
    const res = await fetch(`/api/subscriptions/renew/${id}`, {
      method: "POST"
    });

    if (res.ok) {
      router.refresh();
    }
  };

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  const today = new Date();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold">Subscriptions</h1>

      {/* No subscriptions yet */}
      {subscriptions.length === 0 && (
        <div className="rounded border p-6 text-center">
          <p className="mb-4 text-gray-600">
            No active subscription found.
          </p>
          <Button onClick={handleSubscribe}>
            Subscribe ₹2500 / year
          </Button>
        </div>
      )}

      {/* Subscription List */}
      {subscriptions.length > 0 && (
        <div className="space-y-4">
          {subscriptions.map((sub) => {
            const isActive =
              new Date(sub.from_date) <= today &&
              today <= new Date(sub.to_date);

            return (
              <div
                key={sub.id}
                className="flex items-center justify-between rounded border p-4"
              >
                <div>
                  <p className="font-medium">
                    ₹ {sub.revenue} / year
                  </p>
                  <p className="text-sm text-gray-600">
                    {sub.from_date} → {sub.to_date}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`text-sm font-medium ${
                      isActive
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {isActive ? "Active" : "Expired"}
                  </span>

                    <Button
                      size="sm"
                      onClick={() => handleRenew(sub.id)}
                    >
                      Renew
                    </Button>
                  
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
