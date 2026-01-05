import React from "react";

export default function Sales() {
  return (
    <div className="max-w-7xl mx-auto p-10 bg-white">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-lg font-medium">Policies</span>
            <span className="bg-[#0658A8] text-white px-5 py-1 rounded">
              Sold
            </span>
          </div>
          <p className="text-gray-400 text-sm">
            Check your sales details
          </p>
        </div>

        {/* Illustration */}
        <div className="hidden md:flex">
          <div className="w-36 h-44 bg-gray-100 rounded flex items-center justify-center text-gray-400">
            Illustration
          </div>
        </div>
      </div>

      {/* Graph Placeholder */}
      <div className="border-2 border-blue-400 rounded-md h-64 mb-10 flex items-center justify-center text-gray-400">
        Graph Placeholder
      </div>

      {/* Report Section */}
      <div className="mb-10">
        <h3 className="font-medium border-b pb-2 inline-block mb-6">
          Report
        </h3>

        <div className="flex items-end gap-6 flex-wrap">
          <div>
            <label className="block text-sm mb-1">From date</label>
            <input className="border rounded px-3 py-2 w-40" />
          </div>

          <div>
            <label className="block text-sm mb-1">To date</label>
            <input className="border rounded px-3 py-2 w-40" />
          </div>

          <button className="bg-blue-500 text-white px-6 py-2 rounded">
            Download report
          </button>
        </div>
      </div>

      {/* Recent Sales */}
      <div className="mb-6">
        <h3 className="font-medium border-b pb-2 inline-block mb-4">
          Recent sales
        </h3>

        <div className="flex gap-4 flex-wrap mb-4">
          <button className="bg-[#0658A8] text-white px-5 py-2 rounded shadow">
            Active
          </button>
          <button className="border px-5 py-2 rounded">
            Expired
          </button>
          <button className="border px-5 py-2 rounded">
            Last month
          </button>
          <button className="border px-5 py-2 rounded">
            Quarter month
          </button>
          <button className="border px-5 py-2 rounded">
            Financial year
          </button>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium">Filter</span>
          <span className="text-[#0658A8]">⏷</span>
        </div>
      </div>

      {/* Sold Policies List */}
      {[1, 2].map((i) => (
        <div key={i} className="border-b pb-8 mb-8">
          <div className="flex gap-3 mb-4">
            <span className="font-medium">{i}.</span>
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
              <p>
                <strong>Name</strong> – Mr. Raj
              </p>
              <p>Policy type – Single trip</p>
              <p>Booking Id – 10243567</p>
              <p>Sale date – 10/10/2025</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm ml-6 mb-4">
            <p>91-xxxxxxxxxx</p>
            <a className="underline cursor-pointer">See Ids</a>
            <a className="underline cursor-pointer">
              See Id Photos
            </a>
            <p className="font-semibold">Amount – ₹2000</p>
            <p>Expiring on – 10/10/26</p>
          </div>

          <div className="flex flex-wrap items-center gap-x-10 gap-y-4 ml-6 text-sm">
            <div className="flex items-center gap-2 cursor-pointer">
              <span>📋</span>
              <span>Copy Details</span>
            </div>

            <p>
              Payment status – Completed via upi
            </p>

            <div className="flex items-center gap-2">
              <span>Status –</span>
              <span className="bg-green-400 text-white px-4 py-1 rounded">
                Active
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
