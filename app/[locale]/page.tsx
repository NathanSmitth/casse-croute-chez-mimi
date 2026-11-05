import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Hero from "@/components/Hero";
import SignatureDishes from "@/components/SignatureDishes";
import Reviews from "@/components/Reviews";
import FindUs from "@/components/FindUs";
import { alternatesFor, socialFor } from "@/lib/seo";
import { deliveryArg } from "@/data/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: { absolute: t("title") },
    description: t("description", deliveryArg),
    alternates: alternatesFor(locale),
    ...socialFor(locale, t("title"), t("description", deliveryArg)),
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <SignatureDishes />
      <Reviews />
      <FindUs />
    </>
  );
}
