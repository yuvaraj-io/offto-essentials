"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useBusiness } from "@/context/BusinessContext";

interface Subscription {
  id: string;
  from_date: string;
  to_date: string;
  revenue: number;
}

export default function SubscriptionPage() {
  const { activeBusiness, setActiveBusiness } = useBusiness();

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!activeBusiness) {
      setLoading(false);
      return;
    }

    const fetchSubscriptions = async () => {
      try {
        const res = await fetch(
          `/api/subscriptions/list?business_profile_id=${activeBusiness.id}`
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
  }, [activeBusiness]);

  const handleSubscribe = async () => {
    if (!activeBusiness) return;

    const res = await fetch("/api/subscriptions/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        business_profile_id: activeBusiness.id
      })
    });

    if (!res.ok) return;

    // update context immediately
    setActiveBusiness({
      ...activeBusiness,
      isSubscribed: true
    });

    // reload history
    setLoading(true);
    const listRes = await fetch(
      `/api/subscriptions/list?business_profile_id=${activeBusiness.id}`
    );
    const listData = await listRes.json();
    setSubscriptions(listData.data || []);
    setLoading(false);
  };

  const handleRenew = async (subscriptionId: string) => {
    if (!activeBusiness) return;

    const res = await fetch(
      `/api/subscriptions/renew/${subscriptionId}`,
      { method: "POST" }
    );

    if (!res.ok) return;

    // update context
    setActiveBusiness({
      ...activeBusiness,
      isSubscribed: true
    });

    // reload history
    setLoading(true);
    const listRes = await fetch(
      `/api/subscriptions/list?business_profile_id=${activeBusiness.id}`
    );
    const listData = await listRes.json();
    setSubscriptions(listData.data || []);
    setLoading(false);
  };

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  if (!activeBusiness) {
    return (
      <p className="p-6 text-gray-500">
        No active business selected
      </p>
    );
  }

  const today = new Date();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold">Subscriptions</h1>

      {/* No subscriptions */}
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

              {!isActive && (
                <Button
                  size="sm"
                  onClick={() => handleRenew(sub.id)}
                >
                  Renew
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
