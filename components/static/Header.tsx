'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
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
      <div className="container mx-auto px-4">
        <div className="flex justify-end py-2">
          <button
            className="flex items-center gap-2"
            onClick={() => {
              // open login modal
              console.log('Open Login Modal');
            }}
          >
            <i className="bi bi-person-circle text-2xl"></i>
            <span>Login / Signup</span>
          </button>
        </div>
      </div>
    </header>
  );
}
