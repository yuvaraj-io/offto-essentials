import React from "react";

export default function BusinessDocuments() {
  return (
    <div className="max-w-6xl mx-auto p-10 bg-white">
      {/* Header */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-lg font-medium">Business</span>
            <span className="bg-[#0658A8] text-white px-4 py-1 rounded">
              documents
            </span>
          </div>

          <p className="text-gray-400 text-sm max-w-md">
            Please provide information about the property ownership
          </p>

          {/* Info Row */}
          <div className="flex items-center gap-3 mt-6 text-sm">
            <span className="w-4 h-4 bg-green-500 rounded-sm"></span>
            <span>
              Keep near by attraction same for all your properties
            </span>
          </div>

          <button className="mt-4 bg-blue-100 text-blue-700 px-5 py-2 rounded">
            Your Properties
          </button>
        </div>

        {/* Illustration */}
        <div className="hidden md:flex">
          <div className="w-48 h-48 bg-blue-100 rounded-full flex items-center justify-center text-gray-400">
            Illustration
          </div>
        </div>
      </div>

      {/* Property Selection */}
      <div className="flex gap-6 mb-10">
        <PropertyCard
          active
          title="Hotel Royal"
          address="18th main, Sharjapur, Bangalore"
        />
        <PropertyCard
          title="Hotel Royal"
          address="Junagar"
        />
      </div>

      {/* Upload Ownership Document */}
      <div className="mb-10">
        <p className="mb-3 font-medium">
          Please upload the ownership registration document
        </p>
        <div className="border-2 border-blue-500 rounded-lg p-6 text-center text-blue-600 cursor-pointer">
          UPLOAD DOCUMENT
        </div>
      </div>

      {/* Upload Identity Proof */}
      <div className="mb-20">
        <p className="mb-3 font-medium">
          Please upload the identity proof
        </p>
        <div className="border-2 border-blue-500 rounded-lg p-6 text-center text-blue-600 cursor-pointer">
          UPLOAD DOCUMENT
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-center">
        <button className="border px-10 py-2 rounded-md hover:bg-gray-50">
          Submit
        </button>
      </div>
    </div>
  );
}

/* ---------------- Property Card ---------------- */

function PropertyCard({
  title,
  address,
  active,
}: {
  title: string;
  address: string;
  active?: boolean;
}) {
  return (
    <div
      className={`border rounded-lg p-4 flex items-center gap-4 w-72 ${
        active ? "border-blue-500" : ""
      }`}
    >
      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xs">
        Logo
      </div>
      <div className="flex-1">
        <p className="font-medium text-sm">{title}</p>
        <p className="text-xs text-gray-500">{address}</p>
      </div>
      <span
        className={`w-3 h-3 rounded-full ${
          active ? "bg-green-500" : "border border-gray-300"
        }`}
      ></span>
    </div>
  );
}
