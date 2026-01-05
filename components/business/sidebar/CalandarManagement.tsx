import React from "react";

const YEAR = 2026;

const months = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];

export default function CalendarManagement() {
  return (
    <div className="max-w-7xl mx-auto p-10 bg-white">
      {/* Header */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <div className="flex items-center gap-4 mb-3">
            <h2 className="text-xl font-medium">Calendar</h2>
            <span className="bg-primary text-white px-4 py-1 rounded">
              Management
            </span>
          </div>
          <p className="text-gray-500 text-sm">
            Get the full control on price & details of your booking
          </p>

          {/* Date Search */}
          <div className="flex items-center gap-3 mt-6">
            <label className="text-sm">Date-</label>
            <input
              placeholder="dd/mm/yyyy"
              className="border px-3 py-2 rounded w-44 text-sm"
            />
            <span className="text-blue-600 cursor-pointer">🔍</span>
          </div>
        </div>

        {/* Illustration */}
        <div className="hidden md:flex">
          <div className="w-56 h-56 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
            Illustration
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {months.map((month, index) => (
          <MonthCard key={month} month={month} monthIndex={index} />
        ))}
      </div>
    </div>
  );
}

/* ---------------- Month Card ---------------- */

function MonthCard({
  month,
  monthIndex,
}: {
  month: string;
  monthIndex: number;
}) {
  const firstDay = new Date(YEAR, monthIndex, 1).getDay(); // 0 = Sun
  const daysInMonth = new Date(YEAR, monthIndex + 1, 0).getDate();

  // Convert Sunday-based index to Monday-based grid
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;

  const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7;

  return (
    <div className="text-center">
      {/* Live Toggle */}
      <div className="flex justify-center items-center gap-2 mb-3">
        <Toggle />
        <span className="text-xs text-red-500">Live</span>
      </div>

      {/* Month Label */}
      <div className="bg-primary text-white rounded-full py-2 mb-4">
        {month} {YEAR}
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 text-xs text-gray-400 mb-2">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 gap-y-2 text-sm">
        {Array.from({ length: totalCells }).map((_, i) => {
          const day = i - startOffset + 1;
          const isValidDay = day > 0 && day <= daysInMonth;

          return (
            <div
              key={i}
              className={`h-7 w-7 mx-auto flex items-center justify-center rounded-full
                ${
                  day === 15
                    ? "bg-blue-600 text-white"
                    : isValidDay
                    ? "text-gray-700"
                    : "text-transparent"
                }`}
            >
              {isValidDay ? day : ""}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- Toggle ---------------- */

function Toggle() {
  return (
    <div className="w-10 h-5 bg-blue-500 rounded-full relative">
      <div className="absolute top-0.5 left-0.5 h-4 w-4 bg-white rounded-full" />
    </div>
  );
}
