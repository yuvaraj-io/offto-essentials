"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/bookings/my")
      .then(res => res.json())
      .then(data => setBookings(data.data || []));
  }, []);

  return (
    <main className="container mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      <div className="space-y-4">
        {bookings.map(b => (
          <Link
            key={b.id}
            href={`/my-bookings/trip-essentials/connectivity-and-sim-services/sim-service/${b.id}`}
            className="block border rounded p-4 hover:bg-gray-50"
          >
            <p className="font-medium">SIM Service</p>
            <p className="text-sm text-gray-500">
              ₹ {b.total_amount} • {b.booking_status}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
