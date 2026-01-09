"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useBusiness } from "@/context/BusinessContext";

export default function BusinessSimBookingsPage() {
  const router = useRouter();
  const { activeBusiness } = useBusiness();

  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!activeBusiness) return;

    const fetchBookings = async () => {
      const res = await fetch(
        `/api/business/bookings/sim-services?business_profile_id=${activeBusiness.id}`
      );
      const data = await res.json();

      if (res.ok) {
        setBookings(data.data || []);
      }
      setLoading(false);
    };

    fetchBookings();
  }, [activeBusiness]);

  if (loading) {
    return <p className="p-6">Loading bookings...</p>;
  }

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-xl font-bold">
        SIM Service Bookings
      </h1>

      {bookings.length === 0 && (
        <p className="text-gray-500">
          No bookings yet.
        </p>
      )}

      <div className="space-y-4">
        {bookings.map((b) => (
          <div
            key={b.booking_id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">
                {b.provider_name}
              </p>

              <p className="text-sm text-gray-600">
                {b.plan_name} • {b.sim_name}
              </p>

              <p className="text-sm text-gray-500">
                Customer: {b.customer_phone}
              </p>

              <p className="text-xs text-gray-400">
                {new Date(b.created_at).toLocaleString()}
              </p>
            </div>

            <div className="text-right space-y-2">
              <p className="font-semibold text-blue-600">
                ₹ {b.price}
              </p>

              <p className="text-sm">
                Status:{" "}
                <span className="font-medium">
                  {b.service_status}
                </span>
              </p>

              <Button
                size="sm"
                onClick={() =>
                  router.push(
                    `/my-bookings/trip-essentials/connectivity-and-sim-services/sim-service/${b.booking_id}`
                  )
                }
              >
                View
              </Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
