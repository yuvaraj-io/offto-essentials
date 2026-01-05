import React from "react";

export default function InclusionExclusion() {
  return (
    <div className="mx-auto py-10 bg-white">
      {/* Header */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <div className="flex items-center gap-4 mb-3">
            <span className="text-lg font-medium">Inclusion</span>
            <span className="bg-primary text-white px-4 py-1 rounded">
              Exclusions
            </span>
          </div>
          <p className="text-gray-400 text-sm">
            Write about your inclusion exclusion
          </p>
        </div>

        {/* Illustration */}
        <div className="hidden md:block">
          <div className="w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
            Illustration
          </div>
        </div>
      </div>

      {/* Inclusion */}
      <div className="mb-8">
        <label className="block font-medium mb-2">
          Inclusion
        </label>
        <textarea
          rows={4}
          className="w-full border rounded-md p-3 resize-none"
        />
      </div>

      {/* Exclusion */}
      <div className="mb-20">
        <label className="block font-medium mb-2">
          Exclusion
        </label>
        <textarea
          rows={4}
          className="w-full border rounded-md p-3 resize-none"
        />
      </div>

      {/* Save Button */}
      <div className="flex justify-center">
        <button className="border px-10 py-2 rounded-md hover:bg-gray-50">
          Save Changes
        </button>
      </div>
    </div>
  );
}
