import React from "react";

export default function MyRevenue() {
  return (
    <div className="max-w-6xl mx-auto p-10 bg-white">
      {/* Header */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-lg font-medium">My</span>
            <span className="bg-[#0658A8] text-white px-5 py-1 rounded">
              Revenue
            </span>
          </div>
          <p className="text-gray-400 text-sm">
            See your revenue here
          </p>

          {/* Date Filter */}
          <div className="mt-6">
            <p className="font-medium mb-2">Select date</p>

            <div className="flex items-end gap-6 mb-3">
              <div>
                <label className="block text-sm mb-1">From</label>
                <input className="border rounded px-3 py-2 w-32" />
              </div>

              <div>
                <label className="block text-sm mb-1">To</label>
                <input className="border rounded px-3 py-2 w-32" />
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                View
              </label>

              <label className="flex items-center gap-2 text-green-600">
                <input type="checkbox" checked readOnly />
                View & download
              </label>

              <button className="text-[#0658A8] text-xl">➜</button>
            </div>
          </div>
        </div>

        {/* Illustration */}
        <div className="hidden md:flex">
          <div className="w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
            ₹ Illustration
          </div>
        </div>
      </div>

      {/* Revenue Circles */}
      <div className="relative h-[320px]">
        {/* Today */}
        <Circle
          className="absolute left-10 top-20 w-36 h-36"
          amount="₹ 7,490"
          label="Today's revenue"
          ring="border-green-400"
        />

        {/* This Month */}
        <Circle
          className="absolute left-60 top-10 w-56 h-56"
          amount="₹ 7,490"
          label="This month revenue"
          ring="border-blue-500"
        />

        {/* Last 3 Months */}
        <Circle
          className="absolute left-40 top-56 w-40 h-40"
          amount="₹ 7,490"
          label="Last 3 months revenue"
          ring="border-green-300"
        />
      </div>
    </div>
  );
}

/* ---------------- Circle UI ---------------- */

function Circle({
  amount,
  label,
  className,
  ring,
}: {
  amount: string;
  label: string;
  className: string;
  ring: string;
}) {
  return (
    <div
      className={`${className} rounded-full border-4 ${ring} flex flex-col items-center justify-center text-center`}
    >
      <p className="text-green-600 font-semibold">{amount}</p>
      <p className="text-xs text-gray-500 mt-1">{label}</p>
    </div>
  );
}
