"use client";

import Image from "next/image";
import Link from "next/link";
import { useBusiness } from "@/context/BusinessContext";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
  navigationMain: string;
};

type NavItem = {
  label: string;
  href: string;
  requiresSubscription?: boolean;
};

export default function Sidebar({
  open,
  onClose,
  navigationMain
}: SidebarProps) {
  const { activeBusiness } = useBusiness();

  const isSubscribed = activeBusiness?.isSubscribed ?? false;

  const NAV_ITEMS: NavItem[] = [
    { label: "Dashboard", href: navigationMain },

    {
      label: "Chain of Business",
      href: navigationMain + "/chain-of-business"
    },
    {
      label: "Subscription and invoice",
      href: navigationMain + "/subscription-invoice"
    },

    {
      label: "Add & manage plans",
      href: navigationMain + "/add-plans",
      requiresSubscription: true
    },
    {
      label: "Business profiles",
      href: navigationMain + "/business-profile",
      requiresSubscription: true
    },
    {
      label: "My bookings",
      href: navigationMain + "/my-bookings",
      requiresSubscription: true
    },
    {
      label: "Calendar management",
      href: navigationMain + "/calendar-management",
      requiresSubscription: true
    },
    {
      label: "Messages",
      href: navigationMain + "/messages",
      requiresSubscription: true
    },
    {
      label: "Inclusion & Exclusions",
      href: navigationMain + "/inclusion-and-exclusions",
      requiresSubscription: true
    },
    {
      label: "My revenue",
      href: navigationMain + "/my-revenue",
      requiresSubscription: true
    },
    {
      label: "Contact details",
      href: navigationMain + "/contact-details",
      requiresSubscription: true
    },
    {
      label: "Enquiry",
      href: navigationMain + "/enquiry",
      requiresSubscription: true
    },
    {
      label: "Rate and reviews",
      href: navigationMain + "/rate-reviews",
      requiresSubscription: true
    },
    {
      label: "Policies sold",
      href: navigationMain + "/policy-sales",
      requiresSubscription: true
    },
    {
      label: "Apply to Offto verify",
      href: navigationMain + "/offto-verify",
      requiresSubscription: true
    },
    {
      label: "Bank details",
      href: navigationMain + "/bank-details",
      requiresSubscription: true
    },
    {
      label: "Upload business documents",
      href: navigationMain + "/business-documents",
      requiresSubscription: true
    },
    {
      label: "Settings",
      href: navigationMain + "/settings",
      requiresSubscription: true
    }
  ];

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-lg
        transform transition-transform duration-300
        flex flex-col
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <Image
            src="/icons/offto_logo.png"
            alt="Offto"
            width={80}
            height={28}
          />
          <button onClick={onClose}>✕</button>
        </div>

        {/* Active Business */}
        <div className="p-4 border-b">
          <p className="font-semibold">
            {activeBusiness?.name ?? "No active business"}
          </p>
          <p className="text-xs text-gray-500">
            {activeBusiness?.phone_number ?? ""}
          </p>
            <Link
              href={navigationMain + "/chain-of-business"}
              className="block px-4 py-3 rounded hover:bg-gray-100"
              >
              <button className="mt-2 text-sm border rounded px-3 py-1">
              Switch to
            </button>
            </Link>
          

          <div className="flex items-center gap-2 mt-3">
            <span
              className={`w-10 h-5 rounded-full relative ${
                isSubscribed ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              <span className="absolute top-0.5 left-0.5 h-4 w-4 bg-white rounded-full" />
            </span>
            <span
              className={`text-xs ${
                isSubscribed ? "text-green-600" : "text-red-500"
              }`}
            >
              {isSubscribed ? "Live" : "Inactive"}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2 text-sm">
          {NAV_ITEMS.map((item) => (
            <SidebarItem
              key={item.label}
              label={item.label}
              href={item.href}
              locked={item.requiresSubscription && !isSubscribed}
            />
          ))}
        </nav>
      </aside>
    </>
  );
}

/* ---------- Sidebar Item ---------- */

function SidebarItem({
  label,
  href,
  locked
}: {
  label: string;
  href: string;
  locked?: boolean;
}) {
  if (locked) {
    return (
      <div className="px-4 py-3 text-gray-400 cursor-not-allowed flex justify-between items-center">
        <span>{label}</span>
        <span>🔒</span>
      </div>
    );
  }

  return (
    <Link
      href={href}
      className="block px-4 py-3 rounded hover:bg-gray-100"
    >
      {label}
    </Link>
  );
}
