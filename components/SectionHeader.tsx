import { cn } from "@/lib/utils";

export default function SectionHeader({
  eyebrow,
  heading,
  intro,
  className,
}: {
  eyebrow: string;
  heading: string;
  intro?: string;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-3xl px-4 text-center sm:px-6", className)}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-forest sm:text-[0.8rem]">
        {eyebrow}
      </p>
      <h2 className="font-display text-[2.5rem] font-semibold text-charcoal sm:text-5xl lg:text-6xl">
        {heading}
      </h2>
      {intro && (
        <p className="mx-auto mt-5 max-w-[52ch] text-lg leading-relaxed text-charcoal/80">{intro}</p>
      )}
    </div>
  );
}
