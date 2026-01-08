"use client";

import { useRouter } from "next/navigation";
import BusinessProfileForm from "../profile/BusinessProfileForm";

export default function BusinessProfile() {
  const router = useRouter();

  return (
    <BusinessProfileForm
      submitLabel="Create Profile"
      onSubmit={async (data) => {
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

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Failed to create profile");
        }

        router.push(
          "/business/trip-essentials/connectivity-and-sim-services"
        );
      }}
    />
  );
}
