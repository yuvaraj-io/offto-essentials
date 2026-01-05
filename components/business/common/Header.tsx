"use client";

import Image from "next/image";
import { Bell } from "lucide-react";
import { useState } from "react";
import Sidebar from "../sidebar/Sidebar";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="w-full bg-white border-b">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Left */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-md"
            >
              <Image
                src="/icons/Menu.png"
                alt="Menu"
                width={28}
                height={28}
              />
            </button>

            <Image
              src="/icons/offto_logo.png"
              alt="OFFTO"
              width={90}
              height={32}
            />
          </div>

          {/* Center */}
          <nav className="hidden md:flex gap-10">
            <NavItem label="Home" active />
            <NavItem label="Profile" />
            <NavItem label="Upcoming bookings" />
          </nav>

          {/* Right */}
          <div className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" />
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <Sidebar open={open} onClose={() => setOpen(false)} navigationMain={`/business/trip-essentials/travel-insurance-and-protection`} />
    </>
  );
}

function NavItem({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <div className="relative cursor-pointer text-lg font-medium px-5">
      {label}
      {active && (
        <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-blue-600" />
      )}
    </div>
  );
}
