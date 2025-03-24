import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';

dayjs.extend(timezone);
dayjs.extend(utc);

export const TZ = 'America/Chicago';

export function Datetime(date?: string | number | Date | Dayjs): Dayjs {
  return dayjs(date).tz(getTimezone());
}

export function getTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function isValidTimezone(timezone: string): boolean {
  return Intl.supportedValuesOf('timeZone').includes(timezone);
}
