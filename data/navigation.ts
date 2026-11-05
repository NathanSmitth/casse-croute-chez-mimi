// Menu → dedicated route; Dishes + Find Us → homepage anchor links.
// `/${locale}${href}` produces "/fr#dishes" — navigates to homepage + scrolls.
export const navLinks = [
  { href: "/menu", translationKey: "menu" },
  { href: "#dishes", translationKey: "dishes" },
  { href: "#find-us", translationKey: "findUs" },
] as const;

export type NavTranslationKey = (typeof navLinks)[number]["translationKey"];
