"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBusiness } from "@/context/BusinessContext";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Business {
  id: string;
  name: string;
  address: string;
}

export default function BusinessChainPage() {
  const router = useRouter();
  const { setBusinessProfileId } = useBusiness();

  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
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

  const handleMakeActive = () => {
    if (!selectedId) return;

    debugger
    setBusinessProfileId(selectedId);

    router.push(
      "/business/trip-essentials/connectivity-and-sim-services"
    );
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
            onClick={() => setSelectedId(biz.id)}
            className={`cursor-pointer rounded-lg border p-4 transition
              ${
                selectedId === biz.id
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
                  {biz.address}
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
          <span className="text-lg font-medium">+ Add new business</span>
        </div>
      </div>

      {/* Make Active Button */}
      <div className="flex justify-end">
        <Button
          disabled={!selectedId}
          onClick={handleMakeActive}
        >
          Make Active
        </Button>
      </div>
    </div>
  );
}
