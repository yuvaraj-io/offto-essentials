"use client";

import { Button } from "@/components/ui/button";

interface Plan {
  id: string;
  plan_name: string;
  sim_name: string;
  details: string;
  price: number;
}

export default function PlanSelectModal({
  plans,
  onClose,
  onSelect,
}: {
  plans: Plan[];
  onClose: () => void;
  onSelect: (plan: Plan) => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-[600px] rounded-lg p-6 space-y-4">

        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Select Plan</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {plans.map((plan) => (
          <div
            key={plan.id}
            className="border rounded p-4 flex justify-between items-center hover:bg-gray-50"
          >
            <div>
              <p className="font-medium">{plan.plan_name}</p>
              <p className="text-sm text-gray-500">{plan.details}</p>
            </div>

            <div className="text-right">
              <p className="font-semibold">₹ {plan.price}</p>
              <Button
                size="sm"
                onClick={() => onSelect(plan)}
              >
                Select
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
