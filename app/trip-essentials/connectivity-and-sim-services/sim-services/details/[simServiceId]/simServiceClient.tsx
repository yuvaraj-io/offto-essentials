"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import PlanSelectModal from "./PlanSelectModal";

interface Plan {
  id: string;
  plan_name: string;
  sim_name: string;
  details: string;
  price: number;
}

interface Service {
  provider_name: string;
  activation_time: string;
  home_delivery_option: number;
  e_sim: number;
  passport_required: number;
  aadhar_required: number;
  photo_required: number;
  sim_replace_availability: number;
  address: string;
  about: string;
}

export default function SimServiceClient({
  simServiceId,
}: {
  simServiceId: string;
}) {
  const [service, setService] = useState<Service | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showPlans, setShowPlans] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `/api/public/sim-services/details?simServiceId=${simServiceId}`
      );
      const data = await res.json();

      setService(data.service);
      setPlans(data.plans || []);
    };

    fetchData();
  }, [simServiceId]);

  if (!service) return null;

  return (
    <main className="bg-[#f2f2f2] min-h-screen py-8">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 bg-white border-2 border-blue-400 p-6 space-y-6">
          <h2 className="text-lg font-semibold text-blue-700 border-b pb-2">
            SIM provider name
          </h2>
          <p>• {service.provider_name}</p>

          <h2 className="text-lg font-semibold text-blue-700 border-b pb-2">
            Choose SIM type
          </h2>
          <p>
            {service.e_sim ? "• eSIM" : "• Physical SIM"}
          </p>

          <h2 className="text-lg font-semibold text-blue-700 border-b pb-2">
            Plan details
          </h2>
          <Button variant="outline" onClick={() => setShowPlans(true)}>
            {selectedPlan ? selectedPlan.plan_name : "Select plan"}
          </Button>

          <h2 className="text-lg font-semibold text-blue-700 border-b pb-2">
            Required documents
          </h2>
          <ul className="list-disc ml-6">
            {service.aadhar_required && <li>Aadhaar</li>}
            {service.passport_required && <li>Passport</li>}
            {service.photo_required && <li>Photo</li>}
          </ul>

          <h2 className="text-lg font-semibold text-blue-700 border-b pb-2">
            Activation time
          </h2>
          <p>• {service.activation_time} mins</p>

          <h2 className="text-lg font-semibold text-blue-700 border-b pb-2">
            Pickup location
          </h2>
          <p>• {service.address}</p>

          <h2 className="text-lg font-semibold text-blue-700 border-b pb-2">
            Home delivery option
          </h2>
          <p>• {service.home_delivery_option ? "Yes" : "No"}</p>

          <h2 className="text-lg font-semibold text-blue-700 border-b pb-2">
            SIM replacement availability
          </h2>
          <p>• {service.sim_replace_availability ? "Yes" : "No"}</p>
        </div>

        {/* RIGHT PRICE CARD */}
        <div className="bg-white p-6 rounded-lg shadow space-y-4 h-fit">
          <p className="text-sm text-gray-500">Sim Price + Pack</p>

          <p className="text-2xl font-bold">
            ₹ {selectedPlan?.price ?? plans[0]?.price}
          </p>

          <Button className="w-full" disabled={!selectedPlan}>
            PROCEED TO CHECKOUT
          </Button>
        </div>
      </div>

      {/* PLAN MODAL */}
      {showPlans && (
        <PlanSelectModal
          plans={plans}
          onClose={() => setShowPlans(false)}
          onSelect={(plan) => {
            setSelectedPlan(plan);
            setShowPlans(false);
          }}
        />
      )}
    </main>
  );
}
