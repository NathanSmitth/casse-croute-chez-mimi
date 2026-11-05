import Image from "next/image";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

// Logo slot — set `siteConfig.logo` once the file is in /public/images.
// Until then a typographic wordmark stands in (rounded display face, nod to the script logo).
export default function Logo({
  priority = false,
  className,
}: {
  priority?: boolean;
  className?: string;
}) {
  if (siteConfig.logo) {
    return (
      <Image
        src={siteConfig.logo.src}
        alt={siteConfig.name}
        width={siteConfig.logo.width}
        height={siteConfig.logo.height}
        priority={priority}
        className={cn("h-12 w-auto object-contain", className)}
      />
    );
  }

  return (
    <span className={cn("flex flex-col leading-none text-paper", className)}>
      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-sage">
        Casse-Croûte
      </span>{" "}
      <span className="font-display text-[1.75rem] font-semibold tracking-tight">chez Mimi</span>
    </span>
  );
}
