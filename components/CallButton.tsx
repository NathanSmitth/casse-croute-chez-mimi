import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { PhoneIcon } from "./icons";

// Primary CTA — the only element (with the call bar) that uses the red.
export default function CallButton({
  label,
  showNumber = false,
  location,
  className,
}: {
  label: string;
  showNumber?: boolean;
  /** Analytics: where on the page this call button lives */
  location: string;
  className?: string;
}) {
  return (
    <a
      href={siteConfig.phone.href}
      data-track="call"
      data-track-location={location}
      className={cn(
        "on-red inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-ketchup px-6 py-3 text-base font-semibold text-white shadow-[0_1px_2px_rgb(0_0_0/0.12),0_6px_16px_-6px_rgb(200_53_43/0.55)] transition-[background-color,transform] duration-150 ease-[var(--ease-hover)] hover:bg-ketchup-dark active:scale-[0.97]",
        className
      )}
    >
      <PhoneIcon className="size-[1.125rem]" />
      <span>{label}</span>
      {showNumber && <span className="tabular font-medium opacity-90">· {siteConfig.phone.display}</span>}
    </a>
  );
}
