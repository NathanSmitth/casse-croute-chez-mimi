import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/data/site";
import { ogFonts } from "@/lib/og-fonts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Casse-Croûte chez Mimi — Thetford Mines";

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const tHero = await getTranslations({ locale, namespace: "home.hero" });
  const rating = siteConfig.rating.value.toLocaleString(locale === "fr" ? "fr-CA" : "en-CA");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#1F5A2E",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(168,203,110,0.22), transparent 45%), radial-gradient(circle at 10% 100%, rgba(16,48,26,0.9), transparent 55%)",
          color: "#FAF8F3",
          fontFamily: "Figtree",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 6, textTransform: "uppercase", color: "#A8CB6E" }}>
          {t("ogLocation")}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "Fredoka", fontWeight: 600, fontSize: 40, color: "#A8CB6E", letterSpacing: 4, textTransform: "uppercase" }}>
            Casse-Croûte
          </div>
          <div style={{ fontFamily: "Fredoka", fontWeight: 700, fontSize: 150, lineHeight: 1, letterSpacing: -3 }}>
            chez Mimi
          </div>
          <div style={{ marginTop: 24, fontSize: 40, color: "rgba(250,248,243,0.9)" }}>{t("ogTagline")}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 32, color: "rgba(250,248,243,0.9)" }}>
            {`★ ${tHero("rating", { rating, count: siteConfig.rating.countDisplay })}`}
          </div>
          <div
            style={{
              display: "flex",
              padding: "16px 32px",
              borderRadius: 14,
              background: "#C8352B",
              fontFamily: "Fredoka",
              fontWeight: 600,
              fontSize: 38,
            }}
          >
            {siteConfig.phone.display}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: await ogFonts() }
  );
}
