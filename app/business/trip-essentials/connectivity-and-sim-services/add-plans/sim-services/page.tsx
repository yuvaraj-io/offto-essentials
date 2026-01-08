"use client";

import { useRouter } from "next/navigation";
import { useBusiness } from "@/context/BusinessContext";
import SimServiceForm from "@/components/forms/trip-essential/simCardAndConnectivity/SimServiceForm";

export default function CreateSimServicePage() {
  const router = useRouter();
  const { activeBusiness } = useBusiness();

  if (!activeBusiness) return null;

  return (
    <SimServiceForm
      submitLabel="Create SIM Service"
      onSubmit={async (data) => {
        const res = await fetch(
          "/api/essential-business/connectivity-sim/plans/sim-services/create",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...data,
              connectivity_sim_business_profile_id:
                activeBusiness.id
            })
          }
        );

        if (!res.ok) {
          alert("Failed to create SIM service");
          return;
        }

        router.push(
          "/business/trip-essentials/connectivity-and-sim-services"
        );
      }}
    />
  );
}
