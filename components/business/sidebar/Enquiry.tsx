import React from "react";

export default function Enquiry() {
  return (
    <div className="mx-auto py-10 bg-white">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <span className="bg-[#0658A8] text-white px-4 py-1 rounded">
              Enquiry
            </span>
          </div>
          <p className="text-gray-400 text-sm max-w-md">
            Collect all customer enquiries and get in touch with them
          </p>
        </div>

        {/* Illustration */}
        <div className="hidden md:flex">
          <div className="w-44 h-44 bg-gray-100 rounded-full flex items-center justify-center text-purple-400">
            Illustration
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button className="border border-blue-400 text-blue-600 px-5 py-2 rounded">
          My enquiries
        </button>
        <button className="border px-5 py-2 rounded">
          Enquiry analytics
        </button>
        <button className="border px-5 py-2 rounded">
          Subscription
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex items-center gap-6 mb-8">
        <div className="relative w-80">
          <span className="absolute left-3 top-2.5 text-gray-400">
            🔍
          </span>
          <input
            className="w-full border rounded-lg py-2 pl-10 pr-3 text-sm"
            placeholder="Looking enquiries for"
          />
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium">Filter</span>
          <span className="text-[#0658A8]">⏷</span>
          <span className="text-blue-500 cursor-pointer">Clear</span>
        </div>
      </div>

      {/* Enquiry Card */}
      <div className="border rounded-xl p-6 mb-10">
        <div className="flex gap-6">
          {/* Left */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                className="h-12 w-12 rounded-full"
              />
              <h3 className="font-medium">Amit Kumar</h3>
            </div>

            <p className="text-blue-600 text-sm mb-1">
              Custom requirement
            </p>
            <p className="text-sm text-gray-600">
              Collect all customer enquiries and get in touch with
              them enquiries and get in touch with them{" "}
              <span className="text-blue-500 cursor-pointer">
                see more..
              </span>
            </p>
          </div>

          {/* Divider */}
          <div className="w-px bg-gray-200" />

          {/* Right */}
          <div className="flex-1 grid grid-cols-2 gap-y-3 text-sm">
            <p>📍 Goa</p>
            <p>🧳 Tour guide</p>
            <p>🌟 Solo</p>
            <p>🏷 Domestic</p>
            <p>📍 Pickup & drop- Goa - Blr</p>
            <p>📅 10 Jul - 12 Jul</p>
            <p>⏱ Half day</p>
            <p>👨‍👩‍👧‍👦 5 adults 2 children</p>
            <p>💰 0 - ₹50,000</p>
            <p>🎯 Group activity</p>
            <p>🕘 9am - 12pm</p>
            <p>📞 Offto chat</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mt-6">
          <select className="border rounded px-3 py-2 text-sm">
            <option>Pending</option>
            <option>Converted</option>
            <option>Hold</option>
            <option>Decline</option>
          </select>

          <div className="flex gap-4">
            <button className="border px-6 py-2 rounded flex items-center gap-2">
              💬 Message
            </button>
            <button className="border px-6 py-2 rounded flex items-center gap-2">
              📞 Call
            </button>
          </div>
        </div>
      </div>

      {/* Status Legend + Filter Box */}
      <div className="flex gap-10 items-start">
        <div className="space-y-2">
          <div className="bg-green-400 text-white px-4 py-1 rounded">
            Converted
          </div>
          <div className="bg-yellow-300 text-black px-4 py-1 rounded">
            Hold
          </div>
          <div className="bg-red-300 text-black px-4 py-1 rounded">
            Decline
          </div>
        </div>

        <div className="border rounded-lg p-4 w-56 relative">
          <button className="absolute top-2 right-2">✕</button>
          <p className="font-medium mb-3">Filters</p>

          <label className="flex items-center gap-2 text-sm mb-2">
            <input type="checkbox" checked readOnly />
            Converted
          </label>
          <label className="flex items-center gap-2 text-sm mb-2">
            <input type="checkbox" />
            Hold
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" />
            Decline
          </label>
        </div>
      </div>
    </div>
  );
}
