export default function PageHero({
  eyebrow,
  heading,
  subheading,
}: {
  eyebrow?: string;
  heading: string;
  subheading?: string;
}) {
  return (
    <section className="on-dark relative overflow-hidden bg-forest px-4 pb-16 pt-32 sm:px-6 sm:pb-20 sm:pt-40 lg:px-8">
      {/* Soft check pattern — the diner tablecloth, kept very quiet */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(45deg, #FAF8F3 25%, transparent 25%, transparent 75%, #FAF8F3 75%), linear-gradient(45deg, #FAF8F3 25%, transparent 25%, transparent 75%, #FAF8F3 75%)",
          backgroundSize: "48px 48px",
          backgroundPosition: "0 0, 24px 24px",
        }}
      />
      <div className="relative mx-auto max-w-4xl text-center">
        {eyebrow && (
          <p className="rise mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-sage-light sm:text-sm">
            {eyebrow}
          </p>
        )}
        <h1
          className="rise font-display text-5xl font-semibold text-paper sm:text-6xl lg:text-7xl"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          {heading}
        </h1>
        {subheading && (
          <p
            className="rise mx-auto mt-6 max-w-[52ch] text-lg leading-relaxed text-paper/85"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            {subheading}
          </p>
        )}
      </div>
    </section>
  );
}
