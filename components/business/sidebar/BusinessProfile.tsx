"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BusinessProfileForm from "../profile/BusinessProfileForm";
import { BusinessProfileFormData } from "../profile/types";
import { useBusiness } from "@/context/BusinessContext";

export default function BusinessProfile() {
  const router = useRouter();
  const { setBusinessProfileId } = useBusiness();

  const [initialData, setInitialData] =
    useState<BusinessProfileFormData | null>(null);
  const [loading, setLoading] = useState(true);

  // 1️⃣ Fetch existing profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          "/api/essential-business/connectivity-sim/profile/list"
        );

        const data = await res.json();

        if (res.ok && data.data?.length > 0) {
          const profile = data.data[0];
          setInitialData({
            name: profile.name,
            email: profile.email,
            phone_number: profile.phone_number,
            about: profile.about || "",
            address: profile.address || "",
            landmark: profile.landmark || "",
            pincode: profile.pincode || "",
            latitude: profile.latitude ?? null,
            longitude: profile.longitude ?? null
          });
        }
      } catch (err) {
        console.error("[BusinessProfile] Fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // 2️⃣ Submit handler (create or update)
  const handleSubmit = async (data: BusinessProfileFormData) => {
    const isEdit = !!initialData;

    const endpoint = isEdit
      ? "/api/essential-business/connectivity-sim/profile/update"
      : "/api/essential-business/connectivity-sim/profile/create";

    const res = await fetch(endpoint, {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed");
    }
    const result = await res.json();
    debugger
    setBusinessProfileId(result.id);
    router.push(
      "/business/trip-essentials/connectivity-and-sim-services"
    );
  };

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <BusinessProfileForm
      initialData={initialData ?? undefined}
      submitLabel={initialData ? "Update Profile" : "Create Profile"}
      disableName={!!initialData}
      onSubmit={handleSubmit}
    />
  );
}
