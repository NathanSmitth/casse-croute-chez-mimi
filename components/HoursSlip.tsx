"use client";

import { useEffect, useRef, useState } from "react";
import type { DayHours, DayKey } from "@/data/site";
import { isOpenAt, nowInThetford } from "@/lib/hours";

interface Row {
  day: DayKey;
  label: string;
  hours: string;
}

// Signature element: the hours card is a diner guest check ("bon de commande").
// Today's line gets circled in red pencil — computed in the browser (Eastern
// time) after hydration so static HTML never shows a stale "today".
export default function HoursSlip({
  rows,
  raw,
  confirmed,
  labels,
}: {
  rows: Row[];
  raw: DayHours[];
  confirmed: boolean;
  labels: {
    heading: string;
    title: string;
    number: string;
    server: string;
    today: string;
    openNow: string;
    closedNow: string;
    tbc: string;
    thanks: string;
  };
}) {
  const [today, setToday] = useState<DayKey | null>(null);
  const [openNow, setOpenNow] = useState<boolean | null>(null);
  const [drawn, setDrawn] = useState(false);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const update = () => {
      const now = nowInThetford();
      setToday(now.day);
      const todayHours = raw.find((d) => d.day === now.day);
      setOpenNow(todayHours ? isOpenAt(todayHours, now.minutes) : null);
    };
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, [raw]);

  // Draw the pencil circle once the slip scrolls into view
  useEffect(() => {
    const el = listRef.current;
    if (!el || !today) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [today]);

  return (
    <div className="slip-shadow h-full -rotate-[0.6deg] transition-transform duration-300 ease-[var(--ease-out-soft)] hover:rotate-0">
      <div className="slip flex h-full flex-col px-6 pb-6 pt-8 sm:px-8">
        {/* Check header */}
        <div className="flex items-baseline justify-between border-b-2 border-forest pb-3">
          <h3 className="font-display text-2xl font-semibold text-forest">{labels.title}</h3>
          <span className="tabular text-sm font-semibold text-ketchup">{labels.number}</span>
        </div>
        <div className="flex justify-between border-b border-forest/25 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-forest">
          <span>{labels.heading}</span>
          <span>{labels.server}</span>
        </div>

        {/* Ruled lines — one per day */}
        <ol ref={listRef} className="flex-1">
          {rows.map((row) => {
            const isToday = row.day === today;
            return (
              <li
                key={row.day}
                aria-current={isToday ? "date" : undefined}
                className="relative flex min-h-11 items-center justify-between gap-4 border-b border-forest/20 px-1 text-[0.975rem]"
              >
                <span className={isToday ? "font-semibold text-charcoal" : "text-charcoal"}>
                  {row.label}
                  {isToday && <span className="sr-only"> — {labels.today}</span>}
                </span>
                <span
                  className={`tabular ${isToday ? "font-semibold text-charcoal" : "text-charcoal/80"}`}
                >
                  {row.hours}
                </span>
                {isToday && (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 300 48"
                    preserveAspectRatio="none"
                    className={`pencil-circle pointer-events-none absolute -inset-x-2 -inset-y-1 h-[calc(100%+0.5rem)] w-[calc(100%+1rem)] text-ketchup ${
                      drawn ? "is-drawn" : ""
                    }`}
                  >
                    <path
                      pathLength={1}
                      d="M28 6C90 1 210 1 268 5c22 2 30 10 28 20-3 14-40 19-120 20C90 46 18 44 6 30 0 22 8 10 40 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.25"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                )}
              </li>
            );
          })}
        </ol>

        {/* Footer of the check */}
        <div className="mt-4 flex min-h-6 flex-wrap items-center justify-between gap-2 text-sm">
          {confirmed && openNow !== null ? (
            <span className="inline-flex items-center gap-2 font-semibold text-forest">
              <span
                aria-hidden="true"
                className={`size-2 rounded-full ${openNow ? "bg-forest" : "bg-charcoal/40"}`}
              />
              {openNow ? labels.openNow : labels.closedNow}
            </span>
          ) : (
            <span className="font-display text-lg text-forest">{labels.thanks}</span>
          )}
        </div>
        {!confirmed && <p className="mt-2 text-sm text-charcoal/75">{labels.tbc}</p>}
      </div>
    </div>
  );
}
