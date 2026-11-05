import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/PageHero";
import MenuNav from "@/components/MenuNav";
import MenuSection from "@/components/MenuSection";
import CallCta from "@/components/CallCta";
import { menuData } from "@/data/menu";
import { alternatesFor, socialFor } from "@/lib/seo";
import { deliveryArg, siteConfig } from "@/data/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "menuPage" });
  const title = `${t("metaTitle")} | ${siteConfig.name}`;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: alternatesFor(locale, "/menu"),
    ...socialFor(locale, title, t("metaDescription"), "/menu"),
  };
}

export default async function MenuPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as "fr" | "en";
  const t = await getTranslations({ locale, namespace: "menuPage" });

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} heading={t("heading")} subheading={t("subheading")} />
      <MenuNav
        label={t("categoriesLabel")}
        tabs={menuData.map((c) => ({ id: c.id, label: c.name[locale] }))}
      />
      <MenuSection locale={locale} placeholderNote={t("placeholderNote")} disclaimer={t("disclaimer")} />
      <CallCta
        heading={t("ctaHeading")}
        body={t("ctaBody", deliveryArg)}
        button={t("ctaButton")}
        location="menu"
        className="pb-20 sm:pb-28"
      />
    </>
  );
}
