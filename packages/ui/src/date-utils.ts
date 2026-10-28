/** Date-only Gregorian values. UTC arithmetic avoids DST and host-timezone drift. */
export function isDateValue(value: string | undefined): value is string {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value) || value < '0001-01-01') return false;
  const d = readDate(value);
  return Number.isFinite(d.getTime()) && writeDate(d) === value;
}
export function readDate(value: string) {
  const [y, m, d] = value.split('-').map(Number),
    date = new Date(0);
  date.setUTCHours(12, 0, 0, 0);
  date.setUTCFullYear(y, m - 1, d);
  return date;
}
export function writeDate(date: Date) {
  return date.toISOString().split('T')[0];
}
export function shiftDay(value: string, amount: number) {
  const d = readDate(value);
  d.setUTCDate(d.getUTCDate() + amount);
  return writeDate(d);
}
export function shiftMonth(value: string, amount: number) {
  const d = readDate(value),
    day = d.getUTCDate();
  d.setUTCDate(1);
  d.setUTCMonth(d.getUTCMonth() + amount);
  const end = new Date(d);
  end.setUTCMonth(end.getUTCMonth() + 1, 0);
  d.setUTCDate(Math.min(day, end.getUTCDate()));
  return writeDate(d);
}
export function monthValue(value: string | undefined) {
  return value && /^\d{4}-(0[1-9]|1[0-2])$/.test(value) && value >= '0001-01' ? value : undefined;
}
export function boundDate(value: string, min?: string, max?: string) {
  const lo = isDateValue(min) ? min : '0001-01-01',
    hi = isDateValue(max) ? max : '9999-12-31';
  return value < lo ? lo : value > hi ? hi : value;
}
export function dateLabel(
  value: string,
  locale = 'en-US',
  options: Intl.DateTimeFormatOptions = { dateStyle: 'full' },
) {
  return new Intl.DateTimeFormat(locale, { ...options, timeZone: 'UTC' }).format(readDate(value));
}
