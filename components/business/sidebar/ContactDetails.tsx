import React from "react";

export default function ContactDetails() {
  return (
    <div className="mx-auto py-10 bg-white">
      {/* Header */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <div className="flex items-center gap-4 mb-3">
            <span className="bg-[#0658A8] text-white px-4 py-1 rounded">
              Contacts
            </span>
            <span className="text-lg font-medium">Details</span>
          </div>

          <p className="text-gray-400 text-sm max-w-sm">
            Please share your contact information for customer enquiries
          </p>
        </div>

        {/* Illustration */}
        <div className="hidden md:flex">
          <div className="w-44 h-44 bg-gray-100 rounded-full flex items-center justify-center text-pink-400 text-sm">
            Illustration
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-md space-y-6">
        <div>
          <label className="block mb-1 text-sm">
            Phone number
          </label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">
            Mail ID
          </label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-center mt-20">
        <button className="border px-10 py-2 rounded-md hover:bg-gray-50">
          Save Changes
        </button>
      </div>
    </div>
  );
}
