"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routing } from "@/i18n/routing";

const LOCALE_NAMES: Record<string, string> = { fr: "Français", en: "English" };

// FR | EN — real links (crawlable, work without JS), preserving the current page.
export default function LocaleSwitcher({ locale, label }: { locale: string; label: string }) {
  const pathname = usePathname();

  const pathFor = (next: string) => {
    const segments = pathname.split("/");
    segments[1] = next;
    return segments.join("/") || `/${next}`;
  };

  return (
    <div role="group" aria-label={label} className="flex items-center text-sm font-semibold">
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && (
            <span aria-hidden="true" className="px-0.5 text-paper/35">
              |
            </span>
          )}
          <Link
            href={pathFor(l)}
            hrefLang={l === "fr" ? "fr-CA" : "en-CA"}
            lang={l}
            aria-label={LOCALE_NAMES[l]}
            aria-current={locale === l ? "true" : undefined}
            scroll={false}
            className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-md transition-colors duration-150 ${
              locale === l ? "text-sage" : "text-paper/70 hover:text-paper"
            }`}
          >
            {l.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  );
}
