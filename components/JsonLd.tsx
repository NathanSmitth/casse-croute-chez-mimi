import { getTranslations, getLocale } from "next-intl/server";
import { deliveryArg, siteConfig } from "@/data/site";

const DAY_SCHEMA = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
} as const;

export default async function JsonLd() {
  const [t, locale] = await Promise.all([getTranslations("metadata"), getLocale()]);
  const url = siteConfig.url;
  const sameAs = [siteConfig.social.facebook].filter(Boolean);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${url}/#restaurant`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: t("description", deliveryArg),
    url: `${url}/${locale}`,
    telephone: siteConfig.phone.e164,
    image: [`${url}/images/exterior.jpg`],
    ...(siteConfig.logo && { logo: `${url}${siteConfig.logo.src}` }),
    priceRange: siteConfig.priceRange,
    servesCuisine: "Québécois",
    hasMenu: `${url}/${locale}/menu`,
    inLanguage: locale === "fr" ? "fr-CA" : "en-CA",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    areaServed: { "@type": "City", name: "Thetford Mines" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.rating.value,
      reviewCount: siteConfig.rating.count,
      bestRating: 5,
      worstRating: 1,
    },
    // Hours are only published once confirmed with the owner (see data/site.ts)
    ...(siteConfig.hoursConfirmed && {
      openingHoursSpecification: siteConfig.hours
        .filter((d) => d.open && d.close)
        .map((d) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: `https://schema.org/${DAY_SCHEMA[d.day]}`,
          opens: d.open,
          closes: d.close,
        })),
    }),
    ...(sameAs.length > 0 && { sameAs }),
  };

  return (
    <script
      type="application/ld+json"
      // Escape "<" so no string value can ever close the script tag
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
    />
  );
}
