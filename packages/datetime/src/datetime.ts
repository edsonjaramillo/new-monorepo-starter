import dayjs, { type Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';

dayjs.extend(timezone);
dayjs.extend(utc);

export const TZ = 'America/Chicago';

export function Datetime(date?: string | number | Date | Dayjs) {
  return dayjs(date).tz(getTimezone());
}

export function getTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function isValidTimezone(timezone: string) {
  return Intl.supportedValuesOf('timeZone').includes(timezone);
}
