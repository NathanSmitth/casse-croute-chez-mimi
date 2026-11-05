import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { navLinks } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { formatRange, groupHours } from "@/lib/hours";
import Logo from "./Logo";
import { FacebookIcon } from "./icons";

export default async function Footer() {
  const [t, tNav, tHeader, tShort, tFind, rawLocale] = await Promise.all([
    getTranslations("footer"),
    getTranslations("nav"),
    getTranslations("header"),
    getTranslations("daysShort"),
    getTranslations("home.findUs"),
    getLocale(),
  ]);
  const locale = rawLocale as "fr" | "en";
  const groups = groupHours(siteConfig.hours);

  return (
    <footer className="on-dark bg-charcoal text-paper/80">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.3fr_1fr_1.2fr_1.3fr] lg:px-8">
        {/* Brand */}
        <div>
          <Link href={`/${locale}`} className="inline-flex min-h-11 items-center rounded-md">
            <Logo />
          </Link>
          <p className="mt-4 max-w-[30ch] text-[0.95rem] leading-relaxed text-paper/75">{t("tagline")}</p>
          {siteConfig.social.facebook && (
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={tHeader("facebook")}
              data-track="facebook"
              data-track-location="footer"
              className="-ml-2.5 mt-4 inline-flex size-11 items-center justify-center rounded-md text-paper/75 transition-colors hover:text-sage"
            >
              <FacebookIcon />
            </a>
          )}
        </div>

        {/* Navigation */}
        <nav aria-label={t("explore")}>
          <h2 className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-sage">
            {t("explore")}
          </h2>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={`/${locale}${link.href}`}
                  className="inline-flex min-h-11 items-center transition-colors hover:text-sage"
                >
                  {tNav(link.translationKey)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Condensed hours */}
        <div>
          <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-sage">
            {t("hours")}
          </h2>
          <ul className="space-y-2 text-[0.95rem]">
            {groups.map((g) => (
              <li key={g.from} className="flex justify-between gap-4">
                <span className="text-paper/70">
                  {tShort(g.from)}
                  {g.from !== g.to && ` – ${tShort(g.to)}`}
                </span>
                <span className="tabular text-paper/90">{formatRange(g.sample, locale, tFind("closed"))}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* NAP */}
        <div>
          <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-sage">
            {t("findUs")}
          </h2>
          <address className="not-italic text-[0.95rem] leading-relaxed">
            <p>
              {siteConfig.address.street}
              <br />
              {siteConfig.address.locality}, {siteConfig.address.region} {siteConfig.address.postalCode}
            </p>
            <a
              href={siteConfig.phone.href}
              data-track="call"
              data-track-location="footer"
              className="tabular mt-2 inline-flex min-h-11 items-center text-lg font-semibold text-paper transition-colors hover:text-sage"
            >
              {siteConfig.phone.display}
            </a>
          </address>
          <a
            href={siteConfig.address.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-track="directions"
            data-track-location="footer"
            className="inline-flex min-h-11 items-center font-semibold text-sage underline decoration-sage/40 underline-offset-4 hover:decoration-sage"
          >
            {t("directions")}
          </a>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="mx-auto max-w-7xl px-4 py-6 pb-28 text-sm text-paper/70 sm:px-6 lg:px-8 lg:pb-6">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. {t("builtBy")}{" "}
            <a
              href="https://aurentis.ca"
              target="_blank"
              rel="noopener"
              className="font-medium text-paper/90 underline decoration-paper/30 underline-offset-4 hover:decoration-paper"
            >
              Aurentis
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
