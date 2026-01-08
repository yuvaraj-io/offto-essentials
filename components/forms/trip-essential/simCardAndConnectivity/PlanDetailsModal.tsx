"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SimPlan } from "./types";

interface Props {
  initialPlan?: SimPlan; // undefined = add new
  onSave: (plan: SimPlan) => void;
  onClose: () => void;
}

export default function PlanDetailsModal({
  initialPlan,
  onSave,
  onClose
}: Props) {
  const [form, setForm] = useState<SimPlan>({
    plan_name: initialPlan?.plan_name ?? "",
    sim_name: initialPlan?.sim_name ?? "",
    details: initialPlan?.details ?? "",
    price: initialPlan?.price ?? ""
  });

  const [error, setError] = useState("");

  const update = (key: keyof SimPlan, value: string) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

  const handleDone = () => {
    // 🔐 validation
    if (
      !form.plan_name.trim() ||
      !form.sim_name.trim() ||
      !form.details.trim() ||
      !form.price
    ) {
      setError("All fields are required");
      return;
    }

    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[900px] rounded-lg bg-white p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {initialPlan ? "Edit plan" : "Add plan"}
          </h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* Form */}
        <div className="grid grid-cols-5 gap-4 items-end">
          <input
            placeholder="Plan name"
            className="border-b outline-none"
            value={form.plan_name}
            onChange={(e) => update("plan_name", e.target.value)}
          />

          <input
            placeholder="SIM name"
            className="border-b outline-none"
            value={form.sim_name}
            onChange={(e) => update("sim_name", e.target.value)}
          />

          <input
            placeholder="Details"
            className="border-b outline-none col-span-2"
            value={form.details}
            onChange={(e) => update("details", e.target.value)}
          />

          <input
            placeholder="Price"
            type="number"
            className="border-b outline-none"
            value={form.price}
            onChange={(e) => update("price", e.target.value)}
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleDone}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
