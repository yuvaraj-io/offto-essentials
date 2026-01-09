'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";


interface User {
  phone: string;
}


export default function Header() {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetch("/api/auth/users-login/me");
        const data = await res.json();

        if (data.loggedIn) {
          setUser({ phone: data.user?.phone_no });
        }
      } catch (err) {
        console.error("Auth check failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.reload();
  };


  return (
    <header id="header" className="sticky top-0 z-50 bg-white border-b">
      {/* Top Branding */}
      <div className="flex items-center">
        <div className="container mx-auto px-4 flex items-center justify-between relative">

          {/* Logo */}
          <Link
            href="/dashboard"
            className="flex items-center border-r pr-4"
          >
            <Image
              src="https://offto.in/assets_web/new/assets/img/logo.png"
              alt="logo"
              width={120}
              height={40}
              unoptimized
            />
          </Link>

          {/* Navigation */}
          <nav className="flex-1">
            <ul className="flex">

              {/* Hotels */}
              <li className="flex-1 border-r">
                <Link
                  href="/hotel"
                  className="flex items-center gap-2 px-2 py-3 justify-start md:justify-center"
                >
                  <Image
                    src="https://offto.in/assets_web/new/assets/img/hotel.png"
                    alt="Hotels"
                    width={24}
                    height={24}
                    unoptimized
                  />
                  <div>
                    <div className="font-bold">Hotels</div>
                    <small className="text-gray-500">
                      Best stays, best rates
                    </small>
                  </div>
                </Link>
              </li>

              {/* Holidays */}
              <li className="flex-1 border-r">
                <Link
                  href="#"
                  className="flex items-center gap-2 px-2 py-3 justify-start md:justify-center"
                >
                  <Image
                    src="https://offto.in/assets_web/new/assets/img/holiday.png"
                    alt="Holidays"
                    width={24}
                    height={24}
                    unoptimized
                  />
                  <div>
                    <div className="font-bold">Holidays</div>
                    <small className="text-gray-500">
                      Holiday more, spend less
                    </small>
                  </div>
                </Link>
              </li>

              {/* Activities */}
              <li className="flex-1 border-r">
                <Link
                  href="#"
                  className="flex items-center gap-2 px-2 py-3 justify-start md:justify-center"
                >
                  <Image
                    src="https://offto.in/assets_web/new/assets/img/activ.png"
                    alt="Activities"
                    width={24}
                    height={24}
                    unoptimized
                  />
                  <div>
                    <div className="font-bold">Activities</div>
                    <small className="text-gray-500">
                      Thrills at the best price
                    </small>
                  </div>
                </Link>
              </li>

            </ul>
          </nav>

          {/* Social Space */}
          <Link
            href="#"
            className="flex items-center gap-2 px-2"
          >
            <Image
              src="https://offto.in/assets_web/new/assets/img/world.png"
              alt="world"
              width={24}
              height={24}
              unoptimized
            />
            <small className="hidden md:block text-gray-500 leading-tight whitespace-nowrap">
              Discover our social <br />
              space, & connect with <br />
              travelers
            </small>
          </Link>

          {/* Icons */}
          <div className="flex flex-col items-center gap-2 ml-4">
            <Link href="#">
              <Image
                src="https://offto.in/assets_web/new/assets/img/suitcase.png"
                alt="suitcase"
                width={24}
                height={24}
                unoptimized
              />
            </Link>
            <Link href="#">
              <Image
                src="https://offto.in/assets_web/new/assets/img/chat.png"
                alt="chat"
                width={24}
                height={24}
                unoptimized
              />
            </Link>
          </div>

        </div>
      </div>

      {/* Login */}
       {/* RIGHT SIDE */}
        {!loading && (
          <div className="flex items-center gap-4 text-sm">
            {!user ? (
              <>
                <Link href="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button>Sign up</Button>
                </Link>
              </>
            ) : (
              <>
                <span className="text-gray-700">
                  📱 {user.phone}
                </span>

                <Button
                  variant="outline"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}
          </div>
        )}
    </header>
  );
}
