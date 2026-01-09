"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BookingDetails() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookingId) return;
        // `/api/bookings/sim-service/${bookingId}`

    const fetchBooking = async () => {
      const res = await fetch(
          `/api/bookings/trip-essentials/sim-and-connectivity/sim-service/get/${bookingId}`
      );
      const json = await res.json();
      setData(json.data);
      setLoading(false);
    };

    fetchBooking();
  }, [bookingId]);

  if (loading) return <p className="p-6">Loading...</p>;

  if (!data) return <p className="p-6 text-red-500">Booking not found</p>;

  return (
    <main className="container mx-auto px-6 py-10">
      <h1 className="text-xl font-bold mb-4">
        {data.provider_name}
      </h1>

      <p><b>Plan:</b> {data.plan_name}</p>
      <p><b>SIM:</b> {data.sim_name}</p>
      <p><b>Price:</b> ₹ {data.price}</p>
      <p><b>Status:</b> Confirmed</p>
    </main>
  );
}
