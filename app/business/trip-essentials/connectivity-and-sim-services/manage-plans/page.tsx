"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useBusiness } from "@/context/BusinessContext";

/* ---------- TYPES ---------- */
interface SimPlan {
  id: string;
  plan_name: string;
  sim_name: string;
  price: number;
  details: string;
}

interface SimService {
  id: string;
  name: string;
  e_sim: boolean;
  activation_time: string;
  home_delivery_option: boolean;
  plans: SimPlan[];
}

export default function ManagePlansPage() {
  const router = useRouter();
  const { activeBusiness } = useBusiness();

  const [services, setServices] = useState<SimService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!activeBusiness) return;

    const fetchServices = async () => {
      try {
        //app/api/essential-business/connectivity-sim/plans/sim-services/list/route.ts
        const res = await fetch(
          `/api/essential-business/connectivity-sim/plans/sim-services/list?business_profile_id=${activeBusiness.id}`
        );
        const data = await res.json();

        if (res.ok) {
          setServices(data.data || []);
        }
      } catch (err) {
        console.error("[ManagePlans]", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [activeBusiness]);

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">
            Manage Plans
          </h1>
          <p className="text-sm text-gray-600">
            Manage SIM services & plans
          </p>
        </div>

        <Button
          onClick={() =>
            router.push(
              "/business/trip-essentials/connectivity-and-sim-services/add-plans"
            )
          }
        >
          + Add SIM Service
        </Button>
      </div>

      {/* Services */}
      {services.length === 0 && (
        <div className="border rounded p-6 text-center">
          <p className="text-gray-600 mb-4">
            No SIM services added yet
          </p>
          <Button
            onClick={() =>
              router.push(
                "/business/trip-essentials/connectivity-and-sim-services/add-plan"
              )
            }
          >
            Create First SIM Service
          </Button>
        </div>
      )}

      <div className="space-y-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="rounded-lg border bg-white p-6 shadow-sm"
          >
            {/* Service Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold text-lg">
                  {service.name}
                </h2>
                <p className="text-sm text-gray-600">
                  {service.e_sim ? "eSIM" : "Physical SIM"} •{" "}
                  {service.activation_time || "Instant"} •{" "}
                  Home Delivery:{" "}
                  {service.home_delivery_option ? "Yes" : "No"}
                </p>
              </div>

              <Button
                variant="outline"
                onClick={() =>
                  router.push(
                    `/business/trip-essentials/connectivity-and-sim-services/edit/${service.id}`
                  )
                }
              >
                Edit Service
              </Button>
            </div>

            {/* Plans */}
            <div className="flex gap-3 flex-wrap">
              {service.plans.map((plan) => (
                <div
                  key={plan.id}
                  className="rounded-md border px-4 py-2 text-sm bg-gray-50 flex items-center gap-3"
                >
                  <div>
                    <p className="font-medium">
                      {plan.plan_name}
                    </p>
                    <p className="text-xs text-gray-500">
                      ₹ {plan.price}
                    </p>
                  </div>

                  <button
                    className="text-blue-600 text-xs underline"
                    onClick={() =>
                      router.push(
                        `/business/trip-essentials/connectivity-and-sim-services/edit-plans/${service.id}?plan=${plan.id}`
                      )
                    }
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
