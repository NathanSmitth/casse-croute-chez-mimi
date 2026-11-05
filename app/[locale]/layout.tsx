import type { Metadata, Viewport } from "next";
import { Figtree, Fredoka } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileCallBar from "@/components/MobileCallBar";
import JsonLd from "@/components/JsonLd";
import Tracking from "@/components/Tracking";
import { localeTags, routing } from "@/i18n/routing";
import { deliveryArg, siteConfig } from "@/data/site";
import { alternatesFor, socialFor } from "@/lib/seo";

// Display: rounded & friendly — a nod to the script logo. Body: clean, warm sans.
const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#163F21",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t("title"),
      template: `%s | ${siteConfig.name}`,
    },
    description: t("description", deliveryArg),
    applicationName: siteConfig.name,
    alternates: alternatesFor(locale),
    ...socialFor(locale, t("title"), t("description", deliveryArg)),
    formatDetection: { telephone: true, address: true },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const tHeader = await getTranslations({ locale, namespace: "header" });

  return (
    <html lang={localeTags[locale].lang} className={`${fredoka.variable} ${figtree.variable}`}>
      <body className="flex min-h-screen flex-col bg-paper">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-paper focus:px-4 focus:py-3 focus:font-semibold focus:text-forest"
        >
          {tHeader("skip")}
        </a>
        {/* Client components receive their copy as props — don't ship the whole
            translations file (incl. unused variants) in every page payload. */}
        <NextIntlClientProvider messages={null}>
          <JsonLd />
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <MobileCallBar />
          <Tracking />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
