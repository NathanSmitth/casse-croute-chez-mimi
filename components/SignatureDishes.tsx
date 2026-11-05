import Image from "next/image";
import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { signatureDishes } from "@/data/content";
import Marquee from "./Marquee";
import SectionHeader from "./SectionHeader";
import { ArrowRightIcon } from "./icons";

// Each half of the marquee must be wider than the widest viewport, so the
// six dishes are repeated once inside each half (2 × 6 × ~300px ≈ 3.6k px).
const LOOP = [...signatureDishes, ...signatureDishes];

export default async function SignatureDishes() {
  const [t, tMarquee, locale] = await Promise.all([
    getTranslations("home.dishes"),
    getTranslations("marquee"),
    getLocale(),
  ]);

  return (
    <section id="dishes" className="overflow-hidden bg-paper py-20 sm:py-28 lg:py-32">
      <SectionHeader eyebrow={t("eyebrow")} heading={t("heading")} intro={t("intro")} />

      <Marquee
        label={t("listLabel")}
        pauseLabel={tMarquee("pause")}
        playLabel={tMarquee("play")}
        duration={60}
        className="mt-12 sm:mt-14"
      >
        {LOOP.map((dish, i) => (
          <li key={`${dish.id}-${i}`} className="w-[15.5rem] shrink-0 sm:w-[18.5rem]">
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-paper-dark ring-1 ring-charcoal/5">
                <Image
                  src={dish.image}
                  alt={t(`items.${dish.id}.alt`)}
                  fill
                  sizes="(min-width: 640px) 296px, 248px"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-4 px-1">
                <span className="block font-display text-xl font-semibold text-charcoal">
                  {t(`items.${dish.id}.name`)}
                </span>
                <span className="mt-1 block text-[0.95rem] leading-snug text-charcoal/80">
                  {t(`items.${dish.id}.blurb`)}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </Marquee>

      <div className="mt-6 px-4 text-center">
        <Link
          href={`/${locale}/menu`}
          className="group inline-flex min-h-11 items-center gap-2 text-base font-semibold text-forest underline decoration-forest/30 decoration-2 underline-offset-[6px] transition-colors duration-150 hover:decoration-forest"
        >
          {t("cta")}
          <ArrowRightIcon className="size-4 transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
