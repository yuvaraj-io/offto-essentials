"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PlanSelectModal, {SimPlan} from "./PlanSelectModal";

interface SimService {
  id: string;
  name: string;
  e_sim: boolean;
  passport_required: boolean;
  aadhar_required: boolean;
  photo_required: boolean;
  activation_time: string;
  home_delivery_option: boolean;
  sim_replace_availability: boolean;
  pickup_address: string;
}



export default function SimServiceDetailPage() {
  const { businessProfileID } = useParams();

  const [service, setService] = useState<SimService | null>(null);
  const [plans, setPlans] = useState<SimPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<SimPlan | null>(null);
  const [showPlans, setShowPlans] = useState(false);
  const [loading, setLoading] = useState(true);

  /* ---------- FETCH SERVICE ---------- */
  useEffect(() => {
    if (!businessProfileID) return;

    const fetchData = async () => {
      try {
        debugger
        const serviceRes = await fetch(
          `/api/public/sim-services/by-business/${businessProfileID}`
        );
        const serviceData = await serviceRes.json();
        debugger
        setService(serviceData.service);

        const plansRes = await fetch(
          `/api/public/sim-services/${serviceData.service.id}/plans`
        );
        const plansData = await plansRes.json();

        setPlans(plansData.plans);
      } catch (err) {
        console.error("Failed to load SIM service", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [businessProfileID]);

  if (loading) {
    return <p className="p-6">Loading SIM service...</p>;
  }

  if (!service) {
    return <p className="p-6">SIM service not found</p>;
  }

  return (
    <main className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* ---------- LEFT ---------- */}
        <div className="lg:col-span-3 bg-white p-6 rounded shadow space-y-6">

          <h1 className="text-xl font-semibold">{service.name}</h1>

          <Info title="SIM provider name">Sim studio</Info>

          <Info title="Choose SIM type">
            {service.e_sim ? "eSIM" : "Physical SIM"}
          </Info>

          <Info title="Plan details">
            <button
              onClick={() => setShowPlans(true)}
              className="border px-4 py-2 rounded text-sm"
            >
              {selectedPlan ? selectedPlan.plan_name : "Select plan"}
            </button>
          </Info>

          <Info title="Required documents">
            {service.aadhar_required && "Aadhar "}
            {service.passport_required && "Passport "}
            {service.photo_required && "Photo"}
          </Info>

          <Info title="Activation time">
            {service.activation_time}
          </Info>

          <Info title="Pickup location">
            {service.pickup_address}
          </Info>

          <Info title="Home delivery option">
            {service.home_delivery_option ? "Yes" : "No"}
          </Info>

          <Info title="SIM replacement availability">
            {service.sim_replace_availability ? "Yes" : "No"}
          </Info>
        </div>

        {/* ---------- PRICE ---------- */}
        <div className="bg-white p-6 rounded shadow h-fit">
          <p className="text-sm text-gray-500">SIM Price + Pack</p>

          <p className="text-2xl font-bold mt-2">
            ₹ {selectedPlan?.price ?? "--"}
          </p>

          <p className="text-xs text-gray-400">Including tax</p>

          <button
            disabled={!selectedPlan}
            className={`mt-4 w-full py-2 rounded text-white ${
              selectedPlan
                ? "bg-blue-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Proceed to checkout
          </button>
        </div>
      </div>

      {/* ---------- PLAN MODAL ---------- */}
      {showPlans && (
        <PlanSelectModal
          plans={plans}
          onSelect={(plan) => {
            setSelectedPlan(plan);
            setShowPlans(false);
          }}
          onClose={() => setShowPlans(false)}
        />
      )}
    </main>
  );
}

/* ---------- REUSABLE INFO ---------- */
function Info({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-sm font-medium border-b pb-1 mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-700">{children}</p>
    </div>
  );
}
