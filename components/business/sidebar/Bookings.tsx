import React from "react";

export default function Bookings() {
  return (
    <div className="mx-auto pt-10 bg-white">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <h1 className="text-xl font-medium">My</h1>
          <span className="bg-primary text-white px-5 py-1 rounded">
            Bookings
          </span>
        </div>
        <p className="text-gray-500 text-sm">
          Check your booking details
        </p>
      </div>

      {/* Search */}
      <div className="flex flex-wrap items-end gap-10 mb-8">
        <div>
          <label className="block text-sm mb-1">Booking ID / Name</label>
          <input className="border rounded px-3 py-2 w-56" />
        </div>

        <span className="text-gray-400 mb-3">Or</span>

        <div>
          <label className="block text-sm mb-1">Date</label>
          <div className="flex items-center gap-2">
            <input className="border rounded px-3 py-2 w-40" />
            <span className="text-[#0658A8] cursor-pointer text-xl">🔍</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-10">
        <button className="bg-primary text-white px-4 py-2 rounded shadow">
          Upcoming Booking
        </button>
        <button className="border px-4 py-2 rounded">Completed</button>
        <button className="border px-4 py-2 rounded">Cancelled</button>

        <div className="flex items-center gap-2 ml-4 cursor-pointer">
          <span>Filter</span>
          <span className="text-[#0658A8]">⏷</span>
        </div>
      </div>

      {/* Booking List */}
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
            <a className="underline cursor-pointer">See Id Photos</a>
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
