export function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function getMonthDays(year: number, month: number) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);

  const days: Date[] = [];
  for (let d = 1; d <= last.getDate(); d++) {
    days.push(new Date(year, month, d));
  }

  return {
    firstDayIndex: (first.getDay() + 6) % 7, // Mon start
    days
  };
}

export function monthLabel(year: number, month: number) {
  return new Date(year, month).toLocaleString("default", {
    month: "long",
    year: "numeric"
  });
}
