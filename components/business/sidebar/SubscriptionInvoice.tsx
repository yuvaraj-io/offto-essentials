import React from "react";

export default function SubscriptionInvoice() {
  return (
    <div className="max-w-5xl mx-auto p-10 bg-white">
      {/* Header */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-lg font-medium">Subscription &</span>
            <span className="bg-[#0658A8] text-white px-4 py-1 rounded">
              Invoice
            </span>
          </div>
          <p className="text-gray-400 text-sm">
            Check your subscriptions and invoices here
          </p>
        </div>

        {/* Illustration */}
        <div className="hidden md:flex">
          <div className="w-36 h-36 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
            SUB
          </div>
        </div>
      </div>

      {/* Subscription Card */}
      <div className="border rounded-xl p-6 mb-10 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
            💳
          </div>

          <div className="text-sm">
            <p className="font-medium">
              To Pay{" "}
              <span className="text-red-500 font-semibold">
                50% off
              </span>
            </p>
            <p className="text-gray-500 line-through">
              ₹5000
            </p>
            <p className="font-semibold">
              ₹2950 / day
            </p>
            <p className="text-xs text-gray-400">
              incl all taxes & charges
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-gray-400">⌃</span>
          <button className="border px-6 py-2 rounded-md hover:bg-gray-50">
            Pay
          </button>
        </div>
      </div>

      {/* Invoice Section */}
      <div className="mb-6">
        <button className="bg-blue-100 text-blue-700 px-5 py-2 rounded">
          Invoices
        </button>
      </div>

      {/* Invoice Filters */}
      <div className="space-y-3 mb-8 text-sm">
        <label className="flex items-center gap-2">
          <input type="radio" name="invoice" defaultChecked />
          Last month
        </label>

        <label className="flex items-center gap-2">
          <input type="radio" name="invoice" />
          Last 3 months
        </label>

        <label className="flex items-center gap-2">
          <input type="radio" name="invoice" />
          Last financial year
        </label>
      </div>

      {/* Download */}
      <button className="border px-6 py-2 rounded-md hover:bg-gray-50">
        Download Invoice
      </button>
    </div>
  );
}
