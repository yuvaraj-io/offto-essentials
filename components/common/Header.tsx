import Image from "next/image";
import { Bell, Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* Left: Menu + Logo */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-md">
            {/* <Menu className="h-5 w-5" /> */}
            <Image
              src="/icons/Menu.png" // put logo inside public/images
              alt="OFFTO"
              width={36}
              height={36}
              priority
            />
          </button>

          <div className="flex items-center gap-2">
            <Image
              src="/icons/offto_logo.png" // put logo inside public/images
              alt="OFFTO"
              width={90}
              height={32}
              priority
            />
          </div>
        </div>

        {/* Center: Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          <NavItem label="Home" active />
          <NavItem label="Profile" />
          <NavItem label="Upcoming bookings" />
        </nav>

        {/* Right: Notification */}
        <div className="relative">
          <Bell className="h-5 w-5 text-black" />

          {/* red notification dot */}
          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-red-500" />
        </div>
      </div>
    </header>
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
    <div className="relative cursor-pointer text-lg font-medium text-black px-5">
      {label}
      {active && (
        <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded bg-blue-600" />
      )}    
    </div>
  );
}
