"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BusinessProfileForm from "../profile/BusinessProfileForm";
import { BusinessProfileFormData } from "../profile/types";
import { useBusiness } from "@/context/BusinessContext";

export default function BusinessProfile() {
  const router = useRouter();
  const { activeBusiness, setActiveBusiness } = useBusiness();

  const [initialData, setInitialData] =
    useState<BusinessProfileFormData | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * 1️⃣ Fetch profile ONLY if active business exists
   * ❌ No list API
   * ❌ No data[0]
   */
  useEffect(() => {
    const fetchProfile = async () => {
      if (!activeBusiness?.id) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `/api/essential-business/connectivity-sim/profile/detail?id=${activeBusiness.id}`
        );

        const data = await res.json();

        if (res.ok && data.success) {
          const profile = data.data;
          debugger
          setInitialData({
            name: profile.name,
            email: profile.email,
            phone_number: profile.phone_number,
            about: profile.about || "",
            address: profile.address || "",
            landmark: profile.landmark || "",
            pincode: profile.pincode || "",
            latitude: profile.latitude ?? null,
            longitude: profile.longitude ?? null,
          });
        }
      } catch (err) {
        console.error("[BusinessProfile] Fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [activeBusiness?.id]);

  /**
   * 2️⃣ Submit handler (create or update)
   */
  const handleSubmit = async (data: BusinessProfileFormData) => {
    const isEdit = !!initialData;

    const endpoint = isEdit
      ? "/api/essential-business/connectivity-sim/profile/update"
      : "/api/essential-business/connectivity-sim/profile/create";

    const res = await fetch(endpoint, {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed");
    }

    const result = await res.json();

    /**
     * ✅ Update active business safely
     * ❌ No spreading null
     */

    router.push(
      "/business/trip-essentials/connectivity-and-sim-services"
    );
  };

  /**
   * 3️⃣ Loading state
   */
  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  /**
   * 4️⃣ No active business selected → force user to choose
   */
  if (!activeBusiness?.id) {
    return (
      <div className="p-6">
        <h2 className="text-lg font-semibold">No business selected</h2>
        <p className="mt-2 text-gray-600">
          Please select a business to continue.
        </p>
        <button
          onClick={() =>
            router.push(
              "/business/trip-essentials/connectivity-and-sim-services/chain-of-business"
            )
          }
          className="mt-4 px-4 py-2 bg-black text-white rounded"
        >
          Select Business
        </button>
      </div>
    );
  }

  /**
   * 5️⃣ Render form
   */
  return (
    <BusinessProfileForm
      initialData={initialData ?? undefined}
      submitLabel={initialData ? "Update Profile" : "Create Profile"}
      disableName={!!initialData}
      onSubmit={handleSubmit}
    />
  );
}
