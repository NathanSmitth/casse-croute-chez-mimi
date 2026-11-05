import { getTranslations, getLocale } from "next-intl/server";
import { reviews } from "@/data/content";
import { deliveryArg, siteConfig } from "@/data/site";
import Marquee from "./Marquee";
import CallCta from "./CallCta";
import SectionHeader from "./SectionHeader";
import { ArrowRightIcon, GoogleIcon, StarIcon } from "./icons";

// 3 reviews × 3 per half keeps each half wider than a 2560px screen.
const LOOP = [...reviews, ...reviews, ...reviews];

const googleReviewsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${siteConfig.name} ${siteConfig.address.full}`
)}`;

function RatingStars({ value }: { value: number }) {
  const pct = `${(value / 5) * 100}%`;
  return (
    <span aria-hidden="true" className="relative inline-flex">
      <span className="flex text-charcoal/15">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} className="size-5" />
        ))}
      </span>
      <span className="absolute inset-0 flex overflow-hidden text-[#E8A33D]" style={{ width: pct }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} className="size-5 shrink-0" />
        ))}
      </span>
    </span>
  );
}

export default async function Reviews() {
  const [t, tMarquee, locale] = await Promise.all([
    getTranslations("home.reviews"),
    getTranslations("marquee"),
    getLocale(),
  ]);
  const rating = siteConfig.rating.value.toLocaleString(locale === "fr" ? "fr-CA" : "en-CA");
  const count = siteConfig.rating.countDisplay;

  return (
    <section className="overflow-hidden border-t border-paper-dark bg-paper-dark/50 py-20 sm:py-28 lg:py-32">
      <SectionHeader eyebrow={t("eyebrow")} heading={t("heading")} />

      {/* Aggregate rating badge */}
      <div className="mt-8 flex justify-center px-4">
        <a
          href={googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-14 items-center gap-3 rounded-full border border-charcoal/10 bg-white px-5 py-2.5 shadow-[0_1px_4px_rgb(58_61_64/0.06)] transition-shadow duration-200 hover:shadow-[0_4px_16px_rgb(58_61_64/0.1)]"
        >
          <GoogleIcon className="size-5" />
          <span className="font-display text-2xl font-semibold text-charcoal tabular">
            {rating}
            <span className="sr-only"> / 5 ·</span>
          </span>
          <RatingStars value={siteConfig.rating.value} />
          <span className="text-sm text-charcoal/75">{t("count", { count })}</span>
        </a>
      </div>

      <Marquee
        label={t("listLabel")}
        pauseLabel={tMarquee("pause")}
        playLabel={tMarquee("play")}
        duration={55}
        className="mt-12"
      >
        {LOOP.map((review, i) => (
          <li key={`${review.author}-${i}`} className="w-[19rem] shrink-0 sm:w-[22rem]">
            <figure className="flex h-full flex-col rounded-2xl border border-charcoal/[0.07] bg-white p-6 shadow-[0_1px_4px_rgb(58_61_64/0.04)] sm:p-8">
              <svg
                aria-hidden="true"
                viewBox="0 0 32 24"
                className="mb-4 h-6 w-8 text-sage"
                fill="currentColor"
              >
                <path d="M0 24V14.4C0 6.4 4.2 1.6 12.6 0l1.2 2.9C9.5 4.2 7.4 6.8 7.2 10.8H13V24H0Zm19 0V14.4C19 6.4 23.2 1.6 31.6 0l1.2 2.9c-4.3 1.3-6.4 3.9-6.6 7.9H32V24H19Z" />
              </svg>
              {/* Original English on both locales */}
              <blockquote lang="en" className="flex-1 text-[1.05rem] leading-relaxed text-charcoal">
                <p>{review.quote}</p>
              </blockquote>
              <figcaption className="mt-6 flex items-center justify-between gap-3 border-t border-charcoal/[0.07] pt-4">
                <span>
                  <span className="block font-semibold text-charcoal">{review.author}</span>
                  <span className="text-sm text-charcoal/75">
                    {t("source")}
                    {review.localGuide && ` · ${t("localGuide")}`}
                  </span>
                </span>
                <GoogleIcon className="size-5 shrink-0" />
              </figcaption>
            </figure>
          </li>
        ))}
      </Marquee>

      <div className="mt-2 px-4 text-center">
        <a
          href={googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex min-h-11 items-center gap-2 text-base font-semibold text-forest underline decoration-forest/30 decoration-2 underline-offset-[6px] transition-colors duration-150 hover:decoration-forest"
        >
          {t("seeAll")}
          <ArrowRightIcon className="size-4 transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover:translate-x-1" />
        </a>
      </div>

      {/* Repeat CTA — never make a hungry visitor scroll back up */}
      <CallCta
        heading={t("ctaHeading")}
        body={t("ctaBody", deliveryArg)}
        button={t("ctaButton")}
        location="reviews"
        className="mt-16"
      />
    </section>
  );
}
