import { getTranslations, getLocale } from "next-intl/server";
import { navLinks } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const [t, tHeader, locale] = await Promise.all([
    getTranslations("nav"),
    getTranslations("header"),
    getLocale(),
  ]);

  const resolvedLinks = navLinks.map((link) => ({
    href: link.href,
    label: t(link.translationKey),
  }));

  return (
    <NavbarClient
      locale={locale}
      resolvedLinks={resolvedLinks}
      labels={{
        mainNav: tHeader("mainNav"),
        openMenu: tHeader("openMenu"),
        closeMenu: tHeader("closeMenu"),
        call: tHeader("call"),
        callAria: tHeader("callAria", { phone: siteConfig.phone.display }),
        facebook: tHeader("facebook"),
        language: tHeader("language"),
      }}
    />
  );
}
