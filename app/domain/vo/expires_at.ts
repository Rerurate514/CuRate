export class ExpiresAt {
  constructor(public readonly value: Date) {}

  static fromSeconds(seconds: number): ExpiresAt {
    return new ExpiresAt(new Date(Date.now() + seconds * 1000));
  }

  public toUnix(): number {
    return Math.floor(this.value.getTime() / 1000);
  }

  public toMaxAgeSeconds(): number {
    return Math.max(0, Math.floor((this.value.getTime() - Date.now()) / 1000));
  }

  public isPast(now: Date = new Date()): boolean {
    return now.getTime() > this.value.getTime();
  }
}
