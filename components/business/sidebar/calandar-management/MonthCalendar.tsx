"use client";

import { formatDate, getMonthDays, monthLabel } from "./calendar-utils";

interface Props {
  year: number;
  month: number;
  unavailableDates: Set<string>;
  onDateClick: (date: string) => void;
  onToggleMonth: (blocked: boolean) => void;
}

export default function MonthCalendar({
  year,
  month,
  unavailableDates,
  onDateClick,
  onToggleMonth
}: Props) {
  const { days, firstDayIndex } = getMonthDays(year, month);

  const allBlocked = days.every((d) =>
    unavailableDates.has(formatDate(d))
  );

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="font-medium">
          {monthLabel(year, month)}
        </span>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={!allBlocked}
            onChange={(e) =>
              onToggleMonth(!e.target.checked)
            }
          />
          <span className={allBlocked ? "text-red-500" : "text-green-600"}>
            {allBlocked ? "Blocked" : "Live"}
          </span>
        </label>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-2 text-center text-sm">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
          <div key={d} className="text-gray-400">
            {d}
          </div>
        ))}

        {Array.from({ length: firstDayIndex }).map((_, i) => (
          <div key={i} />
        ))}

        {days.map((date) => {
          const key = formatDate(date);
          const blocked = unavailableDates.has(key);

          return (
            <button
              key={key}
              onClick={() => onDateClick(key)}
              className={`h-9 rounded-full ${
                blocked
                  ? "bg-red-500 text-white"
                  : "hover:bg-blue-100"
              }`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
