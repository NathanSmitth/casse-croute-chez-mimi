"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { PauseIcon, PlayIcon } from "./icons";

// Infinite CSS marquee. Items render twice; the copy is aria-hidden + inert so
// screen readers and keyboards meet each item once. Pauses on hover/focus, has
// an explicit pause button (WCAG 2.2.2), and becomes a swipeable strip when the
// visitor prefers reduced motion.
export default function Marquee({
  children,
  label,
  pauseLabel,
  playLabel,
  duration = 45,
  className,
}: {
  children: ReactNode;
  label: string;
  pauseLabel: string;
  playLabel: string;
  /** seconds per full loop */
  duration?: number;
  className?: string;
}) {
  const [paused, setPaused] = useState(false);

  return (
    <div className={cn("relative", className)}>
      <div className="marquee" data-paused={paused} role="region" aria-label={label}>
        <div
          className="marquee-track"
          style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
        >
          <ul className="marquee-list">{children}</ul>
          <ul className="marquee-list" aria-hidden="true" inert>
            {children}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-6 flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label={paused ? playLabel : pauseLabel}
          className="marquee-toggle inline-flex size-11 items-center justify-center rounded-full border border-charcoal/15 text-charcoal/75 transition-colors duration-150 hover:border-charcoal/30 hover:text-charcoal"
        >
          {paused ? <PlayIcon /> : <PauseIcon />}
        </button>
      </div>
    </div>
  );
}
