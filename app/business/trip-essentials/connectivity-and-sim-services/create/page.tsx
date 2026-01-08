"use client";

import { useRouter } from "next/navigation";
import BusinessProfileForm from "@/components/business/profile/BusinessProfileForm";

export default function BusinessProfile() {
  const router = useRouter();

  const handleCreateProfile = async (data: any) => {
    console.log("[BusinessProfile] Submit triggered");
    console.log("[BusinessProfile] Payload:", data);

    try {
      const res = await fetch(
        "/api/essential-business/connectivity-sim/profile/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      );

      console.log("[BusinessProfile] API status:", res.status);

      if (!res.ok) {
        const err = await res.json();
        console.error("[BusinessProfile] API error:", err);
        throw new Error(err.message || "Failed to create profile");
      }

      const result = await res.json();
      console.log("[BusinessProfile] API success:", result);

      console.log(
        "[BusinessProfile] Redirecting to dashboard..."
      );

      router.push(
        "/business/trip-essentials/connectivity-and-sim-services"
      );
    } catch (error) {
      console.error(
        "[BusinessProfile] Submit failed:",
        error
      );
      throw error; // let form decide how to show error
    }
  };

  return (
    <BusinessProfileForm
      submitLabel="Create Profile"
      onSubmit={handleCreateProfile}
    />
  );
}
