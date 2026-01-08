"use client";

import Image from "next/image";
import Link from "next/link";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
  navigationMain: String
};

export default function Sidebar({ open, onClose, navigationMain }: SidebarProps) {
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
          <div className="flex items-center gap-3">
            <Image
              src="/icons/offto_logo.png"
              alt="Offto"
              width={80}
              height={28}
            />
          </div>

          <button onClick={onClose}>✕</button>
        </div>

        {/* Business Info */}
        <div className="p-4 border-b">
          <p className="font-semibold">AGT Insurances</p>
          <button className="mt-2 text-sm border rounded px-3 py-1">
            Switch to
          </button>

          <div className="flex items-center gap-2 mt-3">
            <span className="w-10 h-5 bg-blue-500 rounded-full relative">
              <span className="absolute top-0.5 left-0.5 h-4 w-4 bg-white rounded-full" />
            </span>
            <span className="text-xs text-red-500">Live</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2 text-sm">
          <SidebarItem label="Add & manage plans" href="#" />
          <SidebarItem label="Business profiles" href={navigationMain + "/business-profile"} />
          <SidebarItem label="Chain of Business" href={navigationMain + "/chain-of-business"} />
          <SidebarItem label="My bookings" href={navigationMain + "/my-bookings"} />
          <SidebarItem label="Calendar management" href={navigationMain + "/calendar-management"} />
          <SidebarItem label="Messages" href={navigationMain + "/messages"}/>
          <SidebarItem label="Inclusion & Exclusions" href={navigationMain + "/inclusion-and-exclusions"}/>
          <SidebarItem label="My revenue" href={navigationMain + "/my-revenue"}/>
          <SidebarItem label="Contact details" href={navigationMain + "/contact-details"}/>
          <SidebarItem label="Enquiry" href={navigationMain + "/enquiry"}/>
          <SidebarItem label="Rate and reviews" href={navigationMain + "/rate-reviews"}/>
          <SidebarItem label="Policies sold"  href={navigationMain + "/policy-sales"}/>
          <SidebarItem label="Apply to offto verify" href={navigationMain + "/offto-verify"}/>
          <SidebarItem label="Bank details" href={navigationMain + "/bank-details"}/>
          <SidebarItem label="Upload business documents" href={navigationMain + "/business-documents"} />
          <SidebarItem label="Subscription and invoice" href={navigationMain + "/subscription-invoice"} />
          <SidebarItem label="Settings" href={navigationMain + "/settings"}/>
        </nav>
      </aside>
    </>
  );
}

/* ---------- Sidebar Item ---------- */

function SidebarItem({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block px-4 py-3 rounded hover:bg-gray-100"
    >
      {label}
    </Link>
  );
}
