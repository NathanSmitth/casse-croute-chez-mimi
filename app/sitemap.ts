import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/data/site";

const routes = ["", "/menu"];

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (l: string, route: string) => `${siteConfig.url}/${l}${route}`;
  return routing.locales.flatMap((locale) =>
    routes.map((route) => ({
      url: url(locale, route),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? (locale === routing.defaultLocale ? 1 : 0.9) : 0.8,
      alternates: {
        languages: {
          "fr-CA": url("fr", route),
          "en-CA": url("en", route),
          "x-default": url(routing.defaultLocale, route),
        },
      },
    }))
  );
}
