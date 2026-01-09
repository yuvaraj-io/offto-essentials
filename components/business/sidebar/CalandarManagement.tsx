"use client";

import { useEffect, useState } from "react";
import MonthCalendar from "./calandar-management/MonthCalendar";
import { formatDate, getMonthDays } from "./calandar-management/calendar-utils";
import { useBusiness } from "@/context/BusinessContext";

export default function CalendarManagement() {
  const { activeBusiness } = useBusiness();
  const businessId = activeBusiness?.id;

  const [unavailable, setUnavailable] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const today = new Date();
  const months = Array.from({ length: 12 }).map((_, i) => {
    const d = new Date(today.getFullYear(), today.getMonth() + i, 1);
    return { year: d.getFullYear(), month: d.getMonth() };
  });

  /* ---------- LOAD ---------- */
  useEffect(() => {
    if (!businessId) return;

    const from = formatDate(months[0] && new Date(months[0].year, months[0].month, 1));
    const last = months[months.length - 1];
    const to = formatDate(new Date(last.year, last.month + 1, 0));

    fetch(
      `/api/business/unavailability/list?business_profile_id=${businessId}&from=${from}&to=${to}`
    )
      .then((r) => r.json())
      .then((res) => {
        const set = new Set<string>();

        res.data.forEach((row: any) => {
          let d = new Date(row.from_date);
          const end = new Date(row.to_date);

          while (d <= end) {
            set.add(formatDate(d));
            d.setDate(d.getDate() + 1);
          }
        });

        setUnavailable(set);
      })
      .finally(() => setLoading(false));
  }, [businessId]);

  /* ---------- DATE CLICK ---------- */
  const toggleDate = async (date: string) => {
    const isBlocked = unavailable.has(date);

    setUnavailable((prev) => {
      const copy = new Set(prev);
      isBlocked ? copy.delete(date) : copy.add(date);
      return copy;
    });

    await fetch(
      `/api/business/unavailability/${isBlocked ? "delete" : "create"}`,
      {
        method: isBlocked ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business_profile_id: businessId,
          from_date: date,
          to_date: date,
          date
        })
      }
    );
  };

  /* ---------- MONTH TOGGLE ---------- */
  const toggleMonth = async (
  year: number,
  month: number,
  block: boolean
) => {
  const { days } = getMonthDays(year, month);

  // 🔥 Optimistic UI update
  setUnavailable((prev) => {
    const copy = new Set(prev);

    days.forEach((d) => {
      const key = formatDate(d);
      block ? copy.add(key) : copy.delete(key);
    });

    return copy;
  });

  // 🔁 Sync with backend
  await fetch(
    `/api/business/unavailability/${block ? "block-month" : "unblock-month"}`,
    {
      method: block ? "POST" : "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        business_profile_id: businessId,
        year,
        month: month + 1
      })
    }
  );
};


  if (loading) return <p className="p-6">Loading calendar...</p>;

  return (
    <div className="p-6 space-y-10">
      <div>
        <h1 className="text-xl font-bold">Calendar Management</h1>
        <p className="text-sm text-gray-600">
          Manage business availability
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {months.map(({ year, month }) => (
          <MonthCalendar
            key={`${year}-${month}`}
            year={year}
            month={month}
            unavailableDates={unavailable}
            onDateClick={toggleDate}
            onToggleMonth={(blocked) =>
              toggleMonth(year, month, blocked)
            }
          />
        ))}
      </div>
    </div>
  );
}
