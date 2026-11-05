import CallButton from "./CallButton";
import { cn } from "@/lib/utils";

// Repeat CTA band — dropped in every couple of sections and before the footer.
export default function CallCta({
  heading,
  body,
  button,
  location,
  className,
}: {
  heading: string;
  body: string;
  button: string;
  location: string;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-3xl px-4 sm:px-6", className)}>
      <div className="on-dark flex flex-col items-center gap-6 rounded-2xl bg-forest px-6 py-10 text-center sm:flex-row sm:justify-between sm:px-10 sm:text-left">
        <div>
          <h2 className="font-display text-3xl font-semibold text-paper">{heading}</h2>
          <p className="mt-2 max-w-[40ch] text-paper/85">{body}</p>
        </div>
        <CallButton label={button} showNumber location={location} className="shrink-0" />
      </div>
    </div>
  );
}
