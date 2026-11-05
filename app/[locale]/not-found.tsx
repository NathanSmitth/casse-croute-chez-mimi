import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import CallButton from "@/components/CallButton";

// A dead end is a lost lead: nav, phone and a way back to the menu.
export default async function NotFound() {
  const [t, locale] = await Promise.all([getTranslations("notFound"), getLocale()]);

  return (
    <section className="on-dark flex min-h-[80svh] items-center bg-forest px-4 pb-20 pt-32 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <title>{t("metaTitle")}</title>
        <meta name="robots" content="noindex" />
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-sage-light">{t("eyebrow")}</p>
        <h1 className="font-display text-4xl font-semibold text-paper sm:text-6xl">{t("heading")}</h1>
        <p className="mx-auto mt-6 max-w-[48ch] text-lg text-paper/85">{t("body")}</p>
        <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Link
            href={`/${locale}/menu`}
            className="inline-flex min-h-12 items-center justify-center rounded-lg border border-paper/40 px-6 font-semibold text-paper transition-colors hover:bg-paper/10"
          >
            {t("menu")}
          </Link>
          <CallButton label={t("call")} showNumber location="404" />
        </div>
        <Link
          href={`/${locale}`}
          className="mt-8 inline-flex min-h-11 items-center font-semibold text-sage-light underline decoration-sage/40 underline-offset-4 hover:decoration-sage"
        >
          {t("home")}
        </Link>
      </div>
    </section>
  );
}
