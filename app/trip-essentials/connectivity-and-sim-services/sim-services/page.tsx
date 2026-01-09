"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface SearchResult {
  business_id: string;
  sim_service_id: string;
  name: string;
  address: string;
  distance: number;
  starting_price: number;
}

export default function LocalSimPage() {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [date, setDate] = useState("");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);

   const router = useRouter();

  /* ---------- GET USER LOCATION ---------- */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
      },
      () => {
        console.warn("Location permission denied");
      }
    );
  }, []);

  /* ---------- SEARCH ---------- */
  const handleSearch = async () => {
    if (!lat || !lng || !date) {
      alert("Please select location and date");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `/api/public/sim-services/search?lat=${lat}&lng=${lng}&date=${date}&keyword=${keyword}`
      );
      const data = await res.json();
      setResults(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white">

      {/* ---------- HERO ---------- */}
      <section
        className="relative h-[420px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1580910051074-7b7d4c0b6b35')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative container mx-auto px-6 h-full flex flex-col justify-center">
          <h1 className="text-white text-4xl md:text-5xl font-semibold mb-6">
            Local SIM card providers
          </h1>

          {/* ---------- SEARCH BAR ---------- */}
          <div className="bg-white rounded-lg shadow grid grid-cols-1 md:grid-cols-5 overflow-hidden">

            {/* LOCATION */}
            <div className="p-4 text-sm border-b md:border-b-0 md:border-r">
              {lat && lng ? "Near me" : "Detecting location..."}
            </div>

            {/* DATE */}
            <input
              type="date"
              className="p-4 text-sm outline-none border-b md:border-b-0 md:border-r"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            {/* KEYWORD */}
            <input
              className="p-4 text-sm outline-none border-b md:border-b-0 md:border-r"
              placeholder="Search sim, pack, data"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />

            {/* SEARCH BUTTON */}
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white font-semibold py-4"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* ---------- RESULTS HEADER ---------- */}
      <section className="container mx-auto px-6 mt-10">
        <p className="text-sm text-gray-700">
          {results.length > 0
            ? `Showing ${results.length} SIM providers near you`
            : "Search for available SIM providers"}
        </p>
      </section>

      {/* ---------- LISTING ---------- */}
      <section className="container mx-auto px-6 mt-6 space-y-6 pb-16">

        {/* LOADING */}
        {loading && (
          <p className="text-center text-gray-500">
            Searching available providers...
          </p>
        )}

        {/* EMPTY STATE */}
        {!loading && results.length === 0 && (
          <p className="text-center text-gray-400">
            No SIM providers available for selected date
          </p>
        )}

        {/* RESULTS */}
        {results.map((item) => (
          <div
            key={item.sim_service_id}
            className="bg-white border rounded-lg shadow-sm p-4 grid grid-cols-1 md:grid-cols-5 gap-6"
          >
            {/* IMAGE */}
            <div className="relative md:col-span-2">
              <img
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
                alt="SIM Provider"
                className="rounded-lg h-48 w-full object-cover"
              />
            </div>

            {/* DETAILS */}
            <div className="md:col-span-2 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-lg">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  📍 {item.distance.toFixed(1)} km away
                </p>

                <p className="text-sm text-gray-400 mt-3">
                  {item.address}
                </p>
              </div>
            </div>

            {/* PRICE */}
            <div className="flex flex-col justify-between items-end">
              <div className="text-right">
                <p className="text-blue-600 font-bold text-lg">
                  ₹ {item.starting_price}
                </p>
                <p className="text-xs text-gray-400">
                  Starting price
                </p>
              </div>

              <button
                onClick={() =>
                    router.push(
                    `/trip-essentials/connectivity-and-sim-services/sim-services/details/${item.sim_service_id}`
                    )
                }
                className="bg-green-500 text-white px-6 py-2 rounded"
                >
                View Plans
               </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
