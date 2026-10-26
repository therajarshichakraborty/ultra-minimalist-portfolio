const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function parts(iso: string) {
  const [year, month = 1, day = 1] = iso.split("-").map(Number);
  return { year, month: months[month - 1] ?? months[0], day };
}

export function formatDate(iso: string) {
  const { year, month, day } = parts(iso);
  return `${month} ${day}, ${year}`;
}

export function formatMonth(iso: string) {
  const { year, month } = parts(iso);
  return `${month.slice(0, 3)} ${year}`;
}
