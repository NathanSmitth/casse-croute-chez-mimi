import type { DayHours, DayKey } from "@/data/site";

type Locale = "fr" | "en";

export const DAY_ORDER: DayKey[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

/** "06:30" → fr "6 h 30" · en "6:30 a.m." (Canadian style) */
export function formatTime(time: string, locale: Locale): string {
  const [h, m] = time.split(":").map(Number);
  if (locale === "fr") {
    return m ? `${h} h ${String(m).padStart(2, "0")}` : `${h} h`;
  }
  const suffix = h < 12 || h === 24 ? "a.m." : "p.m.";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m ? `${h12}:${String(m).padStart(2, "0")} ${suffix}` : `${h12} ${suffix}`;
}

export function formatRange(day: DayHours, locale: Locale, closedLabel: string): string {
  if (!day.open || !day.close) return closedLabel;
  return `${formatTime(day.open, locale)} – ${formatTime(day.close, locale)}`;
}

/** Collapse consecutive days with identical hours: Mon–Fri · Sat · Sun */
export function groupHours(hours: DayHours[]) {
  const groups: { from: DayKey; to: DayKey; sample: DayHours }[] = [];
  for (const d of hours) {
    const last = groups[groups.length - 1];
    if (last && last.sample.open === d.open && last.sample.close === d.close) {
      last.to = d.day;
    } else {
      groups.push({ from: d.day, to: d.day, sample: d });
    }
  }
  return groups;
}

/** Current weekday + minutes since midnight in Thetford Mines (Eastern time). */
export function nowInThetford(): { day: DayKey; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Toronto",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return {
    day: get("weekday").toLowerCase() as DayKey,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

export function isOpenAt(day: DayHours, minutes: number): boolean {
  if (!day.open || !day.close) return false;
  const toMin = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };
  return minutes >= toMin(day.open) && minutes < toMin(day.close);
}
