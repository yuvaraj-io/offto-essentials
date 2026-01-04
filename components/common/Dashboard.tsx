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
          value="₹ 7,490"
          label="Today's Revenue"
          percentage={75}
          color="text-green-400"
        />

        <MetricCircle
          value="23456"
          label="Today's Bookings"
          percentage={60}
          color="text-blue-400"
        />

        <MetricCircle
          value="4.5 / 5"
          label="Ratings"
          percentage={90}
          color="text-yellow-400"
        />

        <MetricCircle
          value="2 days"
          label="Monthly pack expiring in 2 days"
          percentage={30}
          color="text-red-500"
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
  percentage,
  color,
}: {
  value: string;
  label: string;
  percentage: number; // still used for progress
  color: string;
}) {
  const radius = 70; // ⬅️ bigger circle
  const strokeWidth = 12;
  const size = 180; // svg size
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[180px] w-[180px]">
        <svg
          width={size}
          height={size}
          className="-rotate-90"
        >
          {/* Background ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
            fill="none"
          />

          {/* Progress ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={color}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <p className="text-xl font-black font-lato leading-tight">
            {value}
          </p>
         <p className="mt-2 w-[120px] text-center text-sm leading-snug text-gray-600 break-words">
          {label}
        </p>
        </div>
      </div>
    </div>
  );
}


