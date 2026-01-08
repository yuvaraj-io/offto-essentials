"use client";


import { useBusiness } from "@/context/BusinessContext";
import Link from "next/link";


export default function PlansHomePage() {
  const { activeBusiness } = useBusiness();

  const base =
    "/business/trip-essentials/connectivity-and-sim-services/add-plans";

  const CATEGORIES = [
    {
      key: "local-sim",
      title: "Local SIM Card Providers",
      href: base + "/sim-services"
    },
    {
      key: "wifi",
      title: "Portable Wi-Fi Rentals",
      href: base + "/wifi"
    },
    {
      key: "roaming",
      title: "International Roaming Solutions",
      href: base + "/roaming"
    },
    {
      key: "booster",
      title: "Signal Booster Rentals",
      href: base + "/signal-booster"
    }
  ];

  return (
    <div className="p-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-xl font-bold">
          Connectivity Plans
        </h1>
        <p className="text-sm text-gray-500">
          Choose which plan to add
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
        {CATEGORIES.map((item) => (
          <PlanCategoryCard
            key={item.key}
            title={item.title}
            href={item.href}
            active={item.key === "local-sim"}
          />
        ))}
      </div>
    </div>
  );
}

interface Props {
  title: string;
  href: string;
  active?: boolean;
}


function PlanCategoryCard({
  title,
  href,
  active = false
}: Props) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-center rounded-xl border-2 px-10 py-12 text-center
        text-lg font-medium transition
        ${
          active
            ? "border-primary text-primary"
            : "border-gray-300 hover:border-primary hover:text-primary"
        }`}
    >
      {title}
    </Link>
  );
}
