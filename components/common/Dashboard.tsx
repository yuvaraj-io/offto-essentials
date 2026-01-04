import Image from "next/image";

export default function Dashboard() {
  return (
    <section className="w-full py-8 font-lato">
      {/* Title */}
      <h1 className="text-center text-xl font-extrabold mb-10">
        Trip essentials & insurance
      </h1>

      {/* Top section */}
      <div className="flex items-start justify-between gap-10">
        {/* Left: Company Info */}
        <div className="flex gap-6">
          {/* Logo */}
          <div className="relative">
            <Image
              src="/icons/Company.png"
              alt="Holiday Company"
              width={90}
              height={90}
              className="rounded-full"
            />

            <button className="mt-3 rounded-full bg-blue-500 px-4 py-1 text-sm text-white">
              6 Boards
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-white" />
            </button>
          </div>

          {/* Info */}
          <div>
            <h2 className="text-lg font-bold mb-1">AGT Guides</h2>

            <p className="text-sm text-gray-700">
              123 Maple Lane,<br />
              Springfield, Anywhere<br />
              12345
            </p>

            <p className="mt-2 text-sm">911234565</p>
            <p className="text-sm">www.royal@gmail.com</p>

         
          </div>
        </div>

        {/* Divider */}
        <div className="h-24 w-px bg-gray-300" />

        {/* Followers */}
        <div className="flex flex-col justify-center">
          <p className="text-sm text-gray-500">Followers</p>
          <p className="text-lg font-semibold">1,235</p>
        </div>

        {/* Actions */}
        <div className="flex gap-6">
          <ActionCard title="Add & manage plans" icon="/icons/Approve.png" />
          <ActionCard title="Direct bookings" icon="/icons/ticket.png" />
        </div>
      </div>

      {/* Metrics */}
      <div className="mt-14 grid grid-cols-4 gap-10">
        <MetricCircle
          color="border-green-400"
          value="₹ 7,490"
          label="Today's Revenue"
        />
        <MetricCircle
          color="border-blue-400"
          value="23456"
          label="Today's Bookings"
        />
        <MetricCircle
          color="border-yellow-400"
          value="4.5 / 5"
          label="Ratings"
        />
        <MetricCircle
          color="border-red-500"
          value="2 days"
          label="Monthly pack expiring in 2 days"
        />
      </div>

      {/* CTA */}
      <div className="mt-12 flex justify-center">
        <button className="rounded-lg border px-6 py-2 text-sm font-medium">
          Apply for Offto Verify
        </button>
      </div>
    </section>
  );
}

/* ---------- Helper Components (internal) ---------- */

function ActionCard({ title, icon }: { title: string; icon: string }) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-blue-700 px-6 py-4 text-white shadow">
      <p className="text-sm font-medium leading-snug">{title}</p>
      <Image src={icon} alt="" width={32} height={32} />
    </div>
  );
}

function MetricCircle({
  value,
  label,
  color,
}: {
  value: string;
  label: string;
  color: string;
}) {
  return (
    <div
      className={`flex h-44 w-44 flex-col items-center justify-center rounded-full border-[10px] ${color}`}
    >
      <p className="text-lg font-semibold">{value}</p>
      <p className="mt-1 text-center text-sm text-gray-600">{label}</p>
    </div>
  );
}
