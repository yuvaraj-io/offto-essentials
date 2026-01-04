import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-white py-10 font-lato">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2 lg:grid-cols-12">

          {/* App Download */}
          <div className="lg:col-span-3">
            <p className="mb-4 text-sm font-semibold">
              Download OFFTO app now
            </p>

            <div className="flex gap-3">
              <a
                href="https://play.google.com/store/apps/details?id=com.agrellotech.offto"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://offto.in/assets_web/new/assets/img/google.png"
                  alt="Google Play"
                  className="h-10"
                />
              </a>

              <a
                href="https://apps.apple.com/in/app/offto-travellers/id6742989513"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://offto.in/assets_web/new/assets/img/apple.png"
                  alt="App Store"
                  className="h-10"
                />
              </a>
            </div>
          </div>

          {/* Links - Column 1 */}
          <div className="lg:col-span-2">
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/hotel" className="hover:text-black">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-black">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/contactus" className="hover:text-black">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-black">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Links - Column 2 */}
          <div className="lg:col-span-4">
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/co-founder" className="hover:text-black">
                  Letter from founder and co-founder
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="hover:text-black">
                  Terms and conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-black">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="/career" className="hover:text-black">
                  Career
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="lg:col-span-3">
            <p className="mb-4 text-sm font-semibold">
              Follow us on
            </p>

            <div className="flex gap-4 text-xl text-gray-600">
              <a
                href="https://www.facebook.com/offtotravellers"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black"
              >
                <i className="bi bi-facebook"></i>
              </a>

              <a
                href="https://www.instagram.com/offto_travellers/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black"
              >
                <i className="bi bi-instagram"></i>
              </a>

              <a
                href="https://x.com/OfftoTravellers?t=iC7dgrf6mX7XcwNuRciPMw&s=08"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black"
              >
                <i className="bi bi-twitter-x"></i>
              </a>

              <a
                href="https://www.youtube.com/@OFFTO_TRAVELLERS"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black"
              >
                <i className="bi bi-youtube"></i>
              </a>

              <a
                href="https://www.linkedin.com/company/offto-travellers-pvt-ltd"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black"
              >
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
