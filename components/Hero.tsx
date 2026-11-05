import Image from "next/image";
import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { deliveryArg, siteConfig } from "@/data/site";
import CallButton from "./CallButton";
import { StarIcon } from "./icons";

export default async function Hero() {
  const [t, locale] = await Promise.all([getTranslations("home.hero"), getLocale()]);
  const rating = siteConfig.rating.value.toLocaleString(locale === "fr" ? "fr-CA" : "en-CA");

  return (
    <section className="on-dark relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      {/* Background image — PLACEHOLDER: replace /public/images/exterior.jpg with the real façade */}
      <div className="absolute inset-0">
        <Image
          src="/images/exterior.jpg"
          alt={t("imageAlt")}
          fill
          priority
          fetchPriority="high"
          quality={70}
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Layered overlay: warm forest tint + bottom-weighted darkening for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/65 to-charcoal-dark/40" />
        <div className="absolute inset-0 bg-charcoal-dark/30" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 pb-24 pt-28 text-center sm:px-6">
        <p
          className="rise mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-sage sm:text-sm"
          style={{ "--i": 0 } as React.CSSProperties}
        >
          {t("eyebrow")}
        </p>

        <h1
          className="rise mb-6 font-display text-[3.25rem] font-semibold leading-[0.95] text-paper sm:text-7xl lg:text-[6.5rem]"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          {t("heading")}
        </h1>

        <p
          className="rise mx-auto mb-10 max-w-[34ch] text-lg leading-relaxed text-paper/85 sm:text-xl"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          {t("tagline")}
        </p>

        <div
          className="rise flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
          style={{ "--i": 3 } as React.CSSProperties}
        >
          <Link
            href={`/${locale}/menu`}
            className="inline-flex min-h-12 items-center justify-center rounded-lg border border-paper/40 bg-paper/5 px-6 py-3 text-base font-semibold text-paper backdrop-blur-sm transition-[background-color,border-color,transform] duration-150 ease-[var(--ease-hover)] hover:border-paper/70 hover:bg-paper/10 active:scale-[0.97]"
          >
            {t("ctaMenu")}
          </Link>
          <CallButton label={t("ctaCall")} showNumber location="hero" />
        </div>

        {/* Trust row */}
        <ul
          className="rise mt-10 flex flex-col items-center justify-center gap-x-6 gap-y-2 text-sm text-paper/80 sm:flex-row sm:flex-wrap"
          style={{ "--i": 4 } as React.CSSProperties}
        >
          <li className="flex items-center gap-1.5">
            <StarIcon className="size-4 text-sage" />
            <span className="font-semibold text-paper">
              {t("rating", { rating, count: siteConfig.rating.countDisplay })}
            </span>
          </li>
          <li aria-hidden="true" className="hidden text-paper/30 sm:block">
            •
          </li>
          <li>{t("services", deliveryArg)}</li>
          <li aria-hidden="true" className="hidden text-paper/30 sm:block">
            •
          </li>
          <li>{t("area")}</li>
        </ul>
      </div>
    </section>
  );
}
