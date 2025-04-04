export class Expiration {
  static seconds(seconds: number): number {
    return seconds;
  }

  static minutes(minutes: number): number {
    return minutes * 60;
  }

  static hours(hours: number): number {
    return hours * 3600;
  }

  static days(days: number): number {
    return days * 86400;
  }

  static weeks(weeks: number): number {
    return weeks * 604800;
  }

  static months(months: number): number {
    return months * 2629746;
  }
}
