"use client";

import { useRouter } from "next/navigation";
import { useBusiness } from "@/context/BusinessContext";
import SimServiceForm from "@/components/forms/trip-essential/simCardAndConnectivity/SimServiceForm";
import { Button } from "@/components/ui/button";
import { SimServiceFormData, SimPlan } from "@/components/forms/trip-essential/simCardAndConnectivity/types";

/* ---------- API HELPERS ---------- */

async function createSimService(
  data: SimServiceFormData & { plans: SimPlan[] },
  businessProfileId: string
): Promise<string> {
  const res = await fetch(
    "/api/essential-business/connectivity-sim/plans/sim-services/create",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        connectivity_sim_business_profile_id: businessProfileId
      })
    }
  );

  if (!res.ok) {
    throw new Error("Failed to create SIM service");
  }

  const result = await res.json();
  return result.id; // sim_service_id
}



/* ---------- PAGE ---------- */

export default function CreateSimServicePage() {
  const router = useRouter();
  const { activeBusiness } = useBusiness();

  if (!activeBusiness) return null;

  /* ---------- SUBMIT HANDLER ---------- */
  const handleCreateSimService = async (
    data: SimServiceFormData & { plans: SimPlan[] }
  ) => {
    try {
      console.log("[CreateSimService] payload", data);

      const simServiceId = await createSimService(
        data,
        activeBusiness.id
      );

      router.push(
        "/business/trip-essentials/connectivity-and-sim-services"
      );
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong");
    }
  };

  /* ---------- UI ---------- */
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">
            Create SIM Service
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Add SIM & connectivity plans for{" "}
            <span className="font-medium">
              {activeBusiness.name}
            </span>
          </p>
        </div>

        <Button variant="outline" onClick={() => router.back()}>
          ← Back
        </Button>
      </div>

      {/* Form */}
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <SimServiceForm
          submitLabel="Create SIM Service"
          onSubmit={handleCreateSimService}
        />
      </div>
    </div>
  );
}
