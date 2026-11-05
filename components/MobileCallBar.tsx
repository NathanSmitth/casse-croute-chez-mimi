import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/data/site";
import { PhoneIcon } from "./icons";

// Fixed bottom call bar on mobile — usually the single highest-converting element.
export default async function MobileCallBar() {
  const t = await getTranslations("callBar");

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-paper/95 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md lg:hidden">
      <a
        href={siteConfig.phone.href}
        data-track="call"
        data-track-location="sticky-bar"
        className="on-red flex min-h-13 items-center justify-center gap-2.5 rounded-lg bg-ketchup px-4 text-[1.05rem] font-semibold text-white shadow-[0_6px_16px_-6px_rgb(200_53_43/0.6)] active:scale-[0.98]"
      >
        <PhoneIcon />
        <span>{t("label")}</span>
        <span className="tabular font-medium opacity-90">{siteConfig.phone.display}</span>
      </a>
    </div>
  );
}
