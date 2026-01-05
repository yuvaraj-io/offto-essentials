import React from "react";
import Link from "next/link";

const basePath = "/business/trip-essentials";

const services = [
  {
    title: "Travel Insurance & Protection",
    slug: "travel-insurance-and-protection",
  },
  {
    title: "Transport & Mobility",
    slug: "transport-and-mobility",
  },
  {
    title: "Adventure & Outdoor Gear",
    slug: "adventure-and-outdoor-gear",
  },
  {
    title: "Luggage and packing support",
    slug: "luggage-and-packing-support",
  },
  {
    title: "Photography & videography Service",
    slug: "photography-and-videography-service",
  },
  {
    title: "Local Guides & Translators",
    slug: "local-guides-and-translators",
  },

  {
    title: "Forex & Currency Services",
    slug: "forex-and-currency-services",
  },
  {
    title: "Camping & Outdoor Setup Vendors",
    slug: "camping-and-outdoor-setup-vendors",
  },
  {
    title: "Connectivity & SIM Services",
    slug: "connectivity-and-sim-services",
  },
  {
    title: "Souvenir & Local Craft Stores",
    slug: "souvenir-and-local-craft-stores",
  },
  {
    title: "Courier & Logistics Support",
    slug: "courier-and-logistics-support",
  },
  {
    title: "Wellness & Relaxation",
    slug: "wellness-and-relaxation",
  },

  {
    title: "Vehicle Assistance & Garage Service",
    slug: "vehicle-assistance-and-garage-service",
  },
  {
    title: "Event & Celebration Partners",
    slug: "event-and-celebration-partners",
  },
  {
    title: "Permits & Entry Services",
    slug: "permits-and-entry-services",
  },
  {
    title: "Travel Consultants & Agents",
    slug: "travel-consultants-and-agents",
  },
  {
    title: "Ticketing & Pass Services",
    slug: "ticketing-and-pass-services",
  },
  {
    title: "Pet-Friendly Travel Essentials",
    slug: "pet-friendly-travel-essentials",
  },
];

export default function OurServices() {
  return (
    <div className="max-w-7xl mx-auto px-10 py-14 bg-white">
      {/* Heading */}
      <div className="mb-12">
        <h2 className="text-2xl font-medium mb-2">
          Our services
        </h2>
        <div className="w-20 h-0.5 bg-blue-600" />
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-10 gap-y-14">
        {services.map((service) => {
          const slug =
            service.slug ??
            service.title
              .toLowerCase()
              .replace(/&/g, "and")
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "");

          return (
            <Link
              key={service.title}
              href={`${basePath}/${slug}`}
            >
              <ServiceItem title={service.title} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Service Item ---------- */

function ServiceItem({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center text-center cursor-pointer group">
      {/* Icon placeholder */}
      <div className="w-20 h-20 mb-4 flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-blue-100 transition">
        <span className="text-3xl">🧳</span>
      </div>

      <p className="text-sm text-gray-700 leading-snug">
        {title}
      </p>
    </div>
  );
}
