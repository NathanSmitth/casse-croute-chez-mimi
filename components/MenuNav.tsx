"use client";

import { useEffect, useRef, useState } from "react";

// Sticky category strip. Real anchor links (work without JS); the active pill
// follows the scroll position and is kept in view.
export default function MenuNav({ tabs, label }: { tabs: { id: string; label: string }[]; label: string }) {
  const [active, setActive] = useState(tabs[0]?.id ?? "");
  const stripRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // Active = last section whose top has passed just below the header + strip.
    // rAF-throttled so it runs at most once per frame.
    const OFFSET = 170;
    let frame = 0;
    const pick = () => {
      frame = 0;
      let current = tabs[0]?.id ?? "";
      for (const t of tabs) {
        const el = document.getElementById(t.id);
        if (el && el.getBoundingClientRect().top <= OFFSET) current = t.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(pick);
    };
    pick();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [tabs]);

  useEffect(() => {
    const strip = stripRef.current;
    const link = strip?.querySelector<HTMLAnchorElement>(`a[href="#${active}"]`);
    if (!strip || !link) return;
    const left = link.offsetLeft - strip.offsetWidth / 2 + link.offsetWidth / 2;
    strip.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  return (
    <nav
      aria-label={label}
      className="sticky top-20 z-30 border-b border-charcoal/10 bg-paper/95 backdrop-blur-md"
    >
      <ul
        ref={stripRef}
        className="no-scrollbar mx-auto flex max-w-5xl gap-1.5 overflow-x-auto px-4 py-2.5 sm:px-6"
      >
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <li key={tab.id} className="shrink-0">
              <a
                href={`#${tab.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`inline-flex min-h-11 items-center whitespace-nowrap rounded-lg px-4 text-[0.95rem] font-semibold transition-colors duration-150 ${
                  isActive ? "bg-forest text-paper" : "text-charcoal/80 hover:bg-charcoal/5 hover:text-charcoal"
                }`}
              >
                {tab.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
