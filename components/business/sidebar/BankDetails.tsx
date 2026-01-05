import React from "react";

export default function BankDetails() {
  return (
    <div className="max-w-6xl mx-auto p-10 bg-white">
      <div className="flex justify-between items-start">
        {/* Left Form */}
        <div className="flex-1 max-w-2xl">
          <div className="space-y-6">
            {/* Account Number */}
            <input
              type="text"
              placeholder="Bank account number"
              className="w-full border rounded-full px-5 py-3 text-sm"
            />

            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Bank account name"
                className="border rounded-full px-5 py-3 text-sm"
              />
              <input
                type="text"
                placeholder="Bank account type"
                className="border rounded-full px-5 py-3 text-sm"
              />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Branch name"
                className="border rounded-full px-5 py-3 text-sm"
              />
              <input
                type="text"
                placeholder="Bank Name"
                className="border rounded-full px-5 py-3 text-sm"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-16">
            <button className="border px-10 py-2 rounded-md hover:bg-gray-50">
              Save changes
            </button>
          </div>
        </div>

        {/* Illustration */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
            Illustration
          </div>
        </div>
      </div>
    </div>
  );
}
