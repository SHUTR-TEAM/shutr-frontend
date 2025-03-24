export function formatDateWithDayAndMonth(
  date: Date | string = new Date()
): string {
  const dateObject: Date = typeof date === "string" ? new Date(date) : date;

  // Format options for day of week, day, and month
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  return new Intl.DateTimeFormat("en-US", options).format(dateObject);
}
