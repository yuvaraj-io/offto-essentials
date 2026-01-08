"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import SimServiceForm from "@/components/forms/trip-essential/simCardAndConnectivity/SimServiceForm";
import { Button } from "@/components/ui/button";

export default function EditSimServicePage() {
  const router = useRouter();
  const params = useParams();

  const simServiceId = params.simServiceId as string;

  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState<any>(null);

  /* ---------- FETCH EXISTING DATA ---------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
         
          `/api/essential-business/connectivity-sim/plans/sim-services/details?sim_service_id=${simServiceId}`
        );

        const data = await res.json();

        if (!res.ok) {
          alert("Failed to load SIM service");
          router.back();
          return;
        }

        setInitialData(data.data);
      } catch (err) {
        console.error("[EDIT_SIM_SERVICE]", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [simServiceId, router]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!initialData) return null;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* ---------- HEADER ---------- */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">
            Manage SIM Service & Plans
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Edit service details and manage pricing plans
          </p>
        </div>

        <Button variant="outline" onClick={() => router.back()}>
          ← Back
        </Button>
      </div>

      {/* ---------- FORM ---------- */}
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <SimServiceForm
          submitLabel="Update SIM Service"
          initialData={initialData}
          onSubmit={async (payload) => {
            /* 1️⃣ Update SIM service */
            await fetch(
              "/api/essential-business/connectivity-sim/plans/sim-services/update",
              {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  sim_service_id: simServiceId,
                  ...payload
                })
              }
            );

            /* 2️⃣ Replace plans */
            await fetch(
              "/api/essential-business/connectivity-sim/plans/replace",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  sim_service_id: simServiceId,
                  plans: payload.plans
                })
              }
            );

            router.push(
              "/business/trip-essentials/connectivity-and-sim-services"
            );
          }}
        />
      </div>
    </div>
  );
}
