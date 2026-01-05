import Link from "next/link";
import React from "react";

export default function ListYourBusiness() {
  return (
    <div className="max-w-6xl mx-auto p-10 bg-white">
      {/* Heading */}
      <h1 className="text-2xl font-semibold mb-10">
        List your business here
      </h1>

      {/* Business Types */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <BusinessCard
          title="Hotels"
          description="List hotels, stays and accommodations"
          link="/business/trip-essentials"

        />

        <BusinessCard
          title="Holidays"
          description="Create and manage holiday packages"
          link="/business/trip-essentials"

        />

        <BusinessCard
          title="Activities"
          description="Add activities, tours and experiences"
          link="/business/trip-essentials"
        />

        <BusinessCard
          title="Trip essentials"
          description="Insurance, rentals and travel essentials"
          link="/business/trip-essentials"
        />
      </div>
    </div>
  );
}

/* ---------- Business Card ---------- */

function BusinessCard({
  title,
  description,
  link
}: {
  title: string;
  description: string;
  link: string;
}) {
  return (
    <Link href={link}>
        <div className="border rounded-xl p-6 hover:shadow-md transition cursor-pointer">
        {/* Icon placeholder */}
        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
            📦
        </div>

        <h2 className="text-lg font-medium mb-2">
            {title}
        </h2>

        <p className="text-sm text-gray-500">
            {description}
        </p>
        </div>
    </Link>
  );
}
