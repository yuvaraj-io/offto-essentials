import Image from "next/image";

export default function InsuranceListingPage() {
  return (
    <div className="w-full font-lato">
      <HeroSearchSection />
      <ResultsInfoBar />
      <div className="mx-auto max-w-6xl px-6 py-6 space-y-8">
        <InsuranceCard />
        <InsuranceCard />
      </div>
    </div>
  );
}

/* ---------------- Hero Section ---------------- */

function HeroSearchSection() {
  return (
    <div className="relative h-[320px] w-full overflow-hidden">
      <Image
        src="/images/insurance-hero.jpg"
        alt="Domestic travel insurance"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-black/30" />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-white">
        <h1 className="mb-6 text-2xl font-black md:text-3xl">
          Domestic travel insurance
        </h1>

        <div className="flex w-full max-w-3xl overflow-hidden rounded-lg bg-white text-black shadow-lg">
          <input
            className="flex-1 px-4 py-3 text-sm outline-none"
            defaultValue="Bangalore"
          />
          <input
            className="flex-1 border-l px-4 py-3 text-sm outline-none"
            defaultValue="Wed, 16 Apr"
          />
          <button className="bg-blue-600 px-6 text-sm font-semibold text-white">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Info Bar ---------------- */

function ResultsInfoBar() {
  return (
    <div className="border-b bg-white">
      <div className="mx-auto max-w-6xl px-6 py-4 text-sm font-medium">
        Showing holidays from <span className="font-semibold">BTM 1st stage</span>
      </div>
    </div>
  );
}

/* ---------------- Insurance Card ---------------- */

function InsuranceCard() {
  return (
    <div className="flex flex-col gap-6 rounded-xl border bg-white p-6 shadow-sm md:flex-row">
      
      {/* Image */}
      <div className="relative h-40 w-full overflow-hidden rounded-lg md:w-64">
        <Image
          src="/images/insurance-card.jpg"
          alt="Insurance"
          fill
          className="object-cover"
        />
        <span className="absolute right-3 top-3 rounded-full bg-white p-2 shadow">
          ❤️
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/images/profile.jpg"
              alt="Agent"
              width={36}
              height={36}
              className="rounded-full"
            />
            <h3 className="text-lg font-bold">Agt insurance</h3>
          </div>

          <p className="mt-2 text-sm text-gray-500">
            1 kms from BTM 1st stage • Coverage limit ₹40000
          </p>

          <p className="mt-3 max-w-xl text-sm text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy.
          </p>
        </div>

        {/* Price & CTA */}
        <div className="flex flex-col items-end justify-between">
          <div className="flex items-center gap-2 text-sm">
            ⭐ <span className="font-semibold">4.3</span>
          </div>

          <div className="text-right">
            <p className="text-lg font-black text-blue-600">₹ 5,000</p>
            <p className="text-xs text-gray-500">Service fee</p>
          </div>

          <button className="rounded-lg bg-green-500 px-6 py-2 text-sm font-semibold text-white">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
