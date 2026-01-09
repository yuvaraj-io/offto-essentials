import Link from "next/link";

export default function SimServicesPage() {
  return (
    <main className="bg-white">

      {/* HERO SECTION */}
      <section
        className="relative h-[380px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1520923642038-b4259acecbd7')",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative container mx-auto px-6 h-full flex items-center">
          <h1 className="text-white text-4xl md:text-5xl font-semibold max-w-xl">
            Connectivity and sim services
          </h1>
        </div>
      </section>

      {/* BOOK NOW BAR */}

      {/* CATEGORIES */}
      <section className="container mx-auto px-6 mt-12">
        <h2 className="text-lg font-semibold border-b-2 border-blue-500 inline-block pb-1">
          Our categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8 text-center">

          {[
            "Local sim card providers",
            "Portable wifi rentals",
            "International roaming solutions",
            "Signal boosters rentals",
          ].map((title, index) => (
            <Link href="/trip-essentials/connectivity-and-sim-services/sim-services">
            <div key={index} className="flex flex-col items-center gap-2">
              <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-xl">📶</span>
              </div>
              <p className="text-sm text-gray-600">{title}</p>
            </div>
            </Link>
            
          ))}

        </div>
      </section>

      {/* RECENTLY VIEWED */}
      <section className="container mx-auto px-6 mt-16 pb-16">
        <h2 className="text-lg font-semibold border-b-2 border-blue-500 inline-block pb-1">
          Recently viewed
        </h2>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-lg shadow p-4">

          {/* IMAGE */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
              alt="Trip"
              className="rounded-lg object-cover w-full h-52"
            />
            <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow">
              ❤️
            </button>
          </div>

          {/* CONTENT */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-lg">
                Agt trip planners
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                📍 1kms from BTM 1st stage
              </p>

              <p className="text-sm text-gray-500">
                • Mount trek
              </p>

              <p className="text-sm text-gray-400 mt-3">
                Lorem Ipsum is simply dummy text of the printing and
                typesetting industry.
              </p>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div>
                <p className="text-blue-600 font-bold text-lg">₹ 5,000</p>
                <div className="flex items-center text-sm">
                  ⭐ <span className="ml-1">4.3</span>
                </div>
              </div>

              <button className="bg-green-500 text-white px-6 py-2 rounded">
                Book Now
              </button>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
