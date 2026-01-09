"use client";


export interface SimPlan {
  id: string;
  plan_name: string;
  sim_name: string;
  details: string;
  price: number;
}
interface Props {
  plans: SimPlan[];
  onSelect: (plan: SimPlan) => void;
  onClose: () => void;
}

export default function PlanSelectModal({
  plans,
  onSelect,
  onClose
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-[600px] rounded-lg p-6 space-y-4">

        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Select a plan</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="space-y-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="border rounded p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium">{plan.plan_name}</h3>
                <p className="text-sm text-gray-500">{plan.details}</p>
              </div>

              <div className="text-right">
                <p className="font-semibold">₹ {plan.price}</p>
                <button
                  onClick={() => onSelect(plan)}
                  className="mt-2 border px-4 py-1 rounded text-sm hover:bg-gray-50"
                >
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
