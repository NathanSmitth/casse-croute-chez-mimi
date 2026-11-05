// ─────────────────────────────────────────────────────────────────────────────
// Casse-Croûte chez Mimi — single source of truth for business info.
// Edit this file to update hours, phone, address, socials or the logo.
// NAP (name / address / phone) must match the Google Business Profile exactly.
// ─────────────────────────────────────────────────────────────────────────────

export type DayKey =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface DayHours {
  day: DayKey;
  /** 24h "HH:MM", or null when closed */
  open: string | null;
  close: string | null;
}

const address = {
  street: "3421 Boul. Frontenac E",
  locality: "Thetford Mines",
  neighbourhood: "Robertsonville",
  region: "QC",
  postalCode: "G6H 4G3",
  country: "CA",
};

const fullAddress = `${address.street}, ${address.locality}, ${address.region} ${address.postalCode}`;
const mapsQuery = encodeURIComponent(`Casse-Croûte chez Mimi, ${fullAddress}`);

export const siteConfig = {
  name: "Casse-Croûte chez Mimi",
  legalName: "Casse-croûte chez Mimi enr.",
  // TODO: confirm the production domain before launch (also used for canonical + sitemap).
  url: "https://cassecroutechezmimi.ca",

  phone: {
    display: "(418) 338-0319",
    href: "tel:+14183380319",
    e164: "+14183380319",
  },

  address: {
    ...address,
    full: fullAddress,
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`,
    embedUrl: `https://www.google.com/maps?q=${mapsQuery}&output=embed`,
  },

  // OpenStreetMap house node for 3421 Boul. Frontenac E.
  geo: { latitude: 46.1224, longitude: -71.252 },

  social: {
    // TODO: paste the Facebook page URL. Icons + schema sameAs appear automatically once set.
    facebook: "",
  },

  // count = exact figure for schema; countDisplay = what visitors see
  rating: { value: 4.7, count: 231, countDisplay: "200+" },
  priceRange: "$",
  // Delivery: OFF until the owner confirms. Set to true to bring "livraison" /
  // "delivery" back everywhere (hero, CTAs, call card, meta description, schema).
  offersDelivery: false,

  // ── Logo ──────────────────────────────────────────────────────────────────
  // Drop the file in /public/images and set src + its intrinsic pixel size.
  // While null, a typographic wordmark is shown instead.
  logo: null as null | { src: string; width: number; height: number },
  // e.g. logo: { src: "/images/logo.png", width: 600, height: 240 },

  // ── Hours ─────────────────────────────────────────────────────────────────
  // PLACEHOLDER — confirm with the owner, then set hoursConfirmed to true.
  // While false: a "to be confirmed" note is shown and hours are left OUT of
  // the JSON-LD schema (wrong hours in schema are worse than none).
  hoursConfirmed: false,
  hours: [
    { day: "monday", open: "06:00", close: "19:00" },
    { day: "tuesday", open: "06:00", close: "19:00" },
    { day: "wednesday", open: "06:00", close: "19:00" },
    { day: "thursday", open: "06:00", close: "19:00" },
    { day: "friday", open: "06:00", close: "19:00" },
    { day: "saturday", open: "07:00", close: "19:00" },
    { day: "sunday", open: "07:00", close: "14:00" },
  ] as DayHours[],
};

export type SiteConfig = typeof siteConfig;

/** ICU argument for copy that varies with delivery: t("key", deliveryArg) */
export const deliveryArg = { delivery: siteConfig.offersDelivery ? "yes" : "no" };
