import { getTranslations, getLocale } from "next-intl/server";
import { deliveryArg, siteConfig } from "@/data/site";
import { formatRange } from "@/lib/hours";
import HoursSlip from "./HoursSlip";
import MapEmbed from "./MapEmbed";
import CallButton from "./CallButton";
import SectionHeader from "./SectionHeader";
import { ArrowRightIcon, MapPinIcon } from "./icons";

export default async function FindUs() {
  const [t, tDays, rawLocale] = await Promise.all([
    getTranslations("home.findUs"),
    getTranslations("days"),
    getLocale(),
  ]);
  const locale = rawLocale as "fr" | "en";

  const rows = siteConfig.hours.map((d) => ({
    day: d.day,
    label: tDays(d.day),
    hours: formatRange(d, locale, t("closed")),
  }));

  return (
    <section id="find-us" className="border-t border-paper-dark bg-paper py-20 sm:py-28 lg:py-32">
      <SectionHeader eyebrow={t("eyebrow")} heading={t("heading")} />

      <div className="mx-auto mt-14 grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-[1fr_1.25fr_1fr] lg:gap-10 lg:px-8">
        {/* Hours — order slip */}
        <HoursSlip
          rows={rows}
          raw={siteConfig.hours}
          confirmed={siteConfig.hoursConfirmed}
          labels={{
            heading: t("hoursLabel"),
            title: t("slipTitle"),
            number: t("slipNumber"),
            server: t("slipServer"),
            today: t("today"),
            openNow: t("openNow"),
            closedNow: t("closedNow"),
            tbc: t("hoursTbc"),
            thanks: t("slipThanks"),
          }}
        />

        {/* Location */}
        <div className="on-dark flex flex-col rounded-2xl bg-charcoal p-6 sm:p-8 md:order-last md:col-span-2 lg:order-none lg:col-span-1">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-sage">
            {t("locationLabel")}
          </h3>
          <address className="not-italic">
            <p className="flex items-start gap-2 text-lg leading-snug text-paper">
              <MapPinIcon className="mt-0.5 size-5 shrink-0 text-sage" />
              <span>
                {siteConfig.address.street}
                <br />
                {siteConfig.address.locality}, {siteConfig.address.region} {siteConfig.address.postalCode}
                <span className="mt-1 block text-sm text-paper/70">{t("neighbourhood")}</span>
              </span>
            </p>
          </address>
          <a
            href={siteConfig.address.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-track="directions"
            data-track-location="find-us"
            className="group mt-4 inline-flex min-h-11 items-center gap-2 self-start font-semibold text-sage underline decoration-sage/40 decoration-2 underline-offset-[6px] transition-colors hover:decoration-sage"
          >
            {t("directions")}
            <ArrowRightIcon className="size-4 transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover:translate-x-1" />
          </a>
          <div className="mt-6 min-h-[240px] flex-1 overflow-hidden rounded-xl bg-charcoal-dark">
            <MapEmbed src={siteConfig.address.embedUrl} title={t("mapTitle")} />
          </div>
        </div>

        {/* Call card */}
        <div className="on-dark flex flex-col justify-between gap-8 rounded-2xl bg-forest p-6 sm:p-8">
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-sage-light">
              {t("callLabel")}
            </h3>
            <p className="text-lg text-paper/90">{t("callBody", deliveryArg)}</p>
            <a
              href={siteConfig.phone.href}
              data-track="call"
              data-track-location="find-us-number"
              className="tabular mt-4 inline-flex min-h-11 items-center font-display text-4xl font-semibold text-paper sm:text-[2.6rem]"
            >
              {siteConfig.phone.display}
            </a>
          </div>
          <div>
            <CallButton label={t("callCta")} location="find-us" className="w-full" />
            <p className="mt-4 text-sm text-paper/80">{t("callNote")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
