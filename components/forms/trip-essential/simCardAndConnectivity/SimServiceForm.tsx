"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import LocationPicker from "@/components/business/profile/LocationPicker";
import { SimServiceFormData, SimPlan } from "./types";
import PlanDetailsModal from "./PlanDetailsModal";

interface Props {
  onSubmit: (data: SimServiceFormData & { plans: SimPlan[] }) => Promise<void>;
  submitLabel?: string;
}

export default function SimServiceForm({
  onSubmit,
  submitLabel = "Save SIM Service"
}: Props) {
  /* ---------- SIM SERVICE FORM ---------- */
  const [form, setForm] = useState<SimServiceFormData>({
    name: "",
    e_sim: false,
    passport_required: false,
    aadhar_required: false,
    photo_required: false,
    activation_time: "",
    home_delivery_option: false,
    pickup_latitude: null,
    pickup_longitude: null,
    sim_replace_availability: false
  });

  /* ---------- PLANS ---------- */
  const [plans, setPlans] = useState<SimPlan[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);

  /* ---------- HELPERS ---------- */
  const update = (key: keyof SimServiceFormData, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    await onSubmit({ ...form, plans });
    setLoading(false);
  };

  const handleDeletePlan = (index: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this plan?"
    );
    if (!confirmDelete) return;

    setPlans((prev) => prev.filter((_, i) => i !== index));
  };

  /* ---------- RENDER ---------- */
  return (
    <div className="space-y-8 max-w-4xl">

      {/* ---------- PLAN MODAL ---------- */}
      {showModal && (
        <PlanDetailsModal
          initialPlan={
            editingIndex !== null ? plans[editingIndex] : undefined
          }
          onSave={(plan: SimPlan) => {
            if (editingIndex === null) {
              setPlans((p) => [...p, plan]);
            } else {
              const copy = [...plans];
              copy[editingIndex] = plan;
              setPlans(copy);
            }
          }}
          onClose={() => {
            setShowModal(false);
            setEditingIndex(null);
          }}
        />
      )}

      {/* ---------- SIM PROVIDER NAME ---------- */}
      <div>
        <label className="block text-sm font-medium mb-1">
          SIM provider name
        </label>
        <input
          className="w-full border-b outline-none py-1"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
        />
      </div>

      {/* ---------- SIM TYPE ---------- */}
      <div>
        <p className="text-sm font-medium mb-2">
          SIM type (Physical SIM / eSIM)
        </p>

        <label className="mr-6">
          <input
            type="checkbox"
            checked={!form.e_sim}
            onChange={() => update("e_sim", false)}
          />{" "}
          Physical SIM
        </label>

        <label>
          <input
            type="checkbox"
            checked={form.e_sim}
            onChange={() => update("e_sim", true)}
          />{" "}
          eSIM
        </label>
      </div>

      {/* ---------- PLAN DETAILS ---------- */}
      <div className="flex items-center gap-4 flex-wrap">
        <p className="text-sm font-medium min-w-[90px]">
          Plan details -
        </p>

        {/* Existing plans */}
        <div className="flex gap-2 flex-wrap">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="flex items-center gap-2 rounded bg-blue-500 px-3 py-1.5 text-sm text-white"
            >
              <button
                onClick={() => {
                  setEditingIndex(index);
                  setShowModal(true);
                }}
                className="flex items-center gap-1 hover:underline"
              >
                {plan.plan_name}
                <span className="text-xs">✏️</span>
              </button>

              <button
                onClick={() => handleDeletePlan(index)}
                className="text-xs hover:text-red-200"
                title="Delete plan"
              >
                🗑
              </button>
            </div>
          ))}
        </div>

        {/* Add new */}
        <button
          onClick={() => {
            setEditingIndex(null);
            setShowModal(true);
          }}
          className="rounded border px-4 py-1.5 text-sm hover:bg-gray-50"
        >
          + Add New
        </button>
      </div>

      {/* ---------- REQUIRED DOCUMENTS ---------- */}
      <div>
        <p className="text-sm font-medium mb-2">
          Required documents
        </p>

        <label className="mr-4">
          <input
            type="checkbox"
            checked={form.passport_required}
            onChange={(e) =>
              update("passport_required", e.target.checked)
            }
          />{" "}
          Passport
        </label>

        <label className="mr-4">
          <input
            type="checkbox"
            checked={form.aadhar_required}
            onChange={(e) =>
              update("aadhar_required", e.target.checked)
            }
          />{" "}
          Aadhaar
        </label>

        <label>
          <input
            type="checkbox"
            checked={form.photo_required}
            onChange={(e) =>
              update("photo_required", e.target.checked)
            }
          />{" "}
          Photo
        </label>
      </div>

      {/* ---------- ACTIVATION TIME ---------- */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Activation time
        </label>
        <input
          className="border-b outline-none py-1 w-48"
          placeholder="e.g. 30 minutes"
          value={form.activation_time}
          onChange={(e) =>
            update("activation_time", e.target.value)
          }
        />
      </div>

      {/* ---------- PICKUP LOCATION ---------- */}
      <div>
        <p className="text-sm font-medium mb-2">
          Pickup location
        </p>

        <LocationPicker
          latitude={form.pickup_latitude}
          longitude={form.pickup_longitude}
          onChange={(lat, lng) => {
            update("pickup_latitude", lat);
            update("pickup_longitude", lng);
          }}
        />
      </div>

      {/* ---------- HOME DELIVERY ---------- */}
      <div>
        <p className="text-sm font-medium mb-2">
          Home delivery option
        </p>

        <label className="mr-6">
          <input
            type="radio"
            checked={form.home_delivery_option}
            onChange={() =>
              update("home_delivery_option", true)
            }
          />{" "}
          Yes
        </label>

        <label>
          <input
            type="radio"
            checked={!form.home_delivery_option}
            onChange={() =>
              update("home_delivery_option", false)
            }
          />{" "}
          No
        </label>
      </div>

      {/* ---------- SIM REPLACEMENT ---------- */}
      <div>
        <p className="text-sm font-medium mb-2">
          SIM replacement availability
        </p>

        <label className="mr-6">
          <input
            type="radio"
            checked={form.sim_replace_availability}
            onChange={() =>
              update("sim_replace_availability", true)
            }
          />{" "}
          Yes
        </label>

        <label>
          <input
            type="radio"
            checked={!form.sim_replace_availability}
            onChange={() =>
              update("sim_replace_availability", false)
            }
          />{" "}
          No
        </label>
      </div>

      {/* ---------- SUBMIT ---------- */}
      <Button disabled={loading} onClick={handleSubmit}>
        {loading ? "Saving..." : submitLabel}
      </Button>
    </div>
  );
}
