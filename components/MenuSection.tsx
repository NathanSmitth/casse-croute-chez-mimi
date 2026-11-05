import { menuData, menuHasPlaceholders, formatPrice, type MenuItem } from "@/data/menu";

type Locale = "fr" | "en";

function MenuItemRow({ item, locale }: { item: MenuItem; locale: Locale }) {
  return (
    <li className="border-b border-charcoal/10 py-5 last:border-0">
      <div className="flex items-baseline gap-3">
        <h3 className="font-display text-xl font-semibold text-charcoal">{item.name[locale]}</h3>
        {item.price !== undefined && (
          <>
            {/* Diner-menu dotted leader */}
            <span aria-hidden="true" className="min-w-6 flex-1 translate-y-[-0.3em] border-b-2 border-dotted border-charcoal/20" />
            <span className="tabular shrink-0 text-lg font-semibold text-forest">
              {formatPrice(item.price, locale)}
            </span>
          </>
        )}
      </div>
      {item.description && (
        <p className="mt-1 max-w-[56ch] text-[0.975rem] leading-relaxed text-charcoal/80">
          {item.description[locale]}
        </p>
      )}
      {item.sizes && (
        <dl className="mt-3 flex flex-wrap gap-2">
          {item.sizes.map((s) => (
            <div
              key={s.label.en}
              className="inline-flex items-baseline gap-2 rounded-md bg-paper-dark px-3 py-1.5 text-[0.95rem]"
            >
              <dt className="text-charcoal/80">{s.label[locale]}</dt>
              <dd className="tabular font-semibold text-forest">{formatPrice(s.price, locale)}</dd>
            </div>
          ))}
        </dl>
      )}
    </li>
  );
}

export default function MenuSection({
  locale,
  placeholderNote,
  disclaimer,
}: {
  locale: Locale;
  placeholderNote: string;
  disclaimer: string;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      {menuHasPlaceholders && (
        <p
          role="note"
          className="mb-12 rounded-lg border border-forest/20 bg-sage/15 px-4 py-3 text-[0.95rem] text-charcoal"
        >
          {placeholderNote}
        </p>
      )}

      {menuData.map((cat) => (
        <section
          key={cat.id}
          id={cat.id}
          aria-labelledby={`${cat.id}-heading`}
          className="scroll-mt-16 pb-14 last:pb-0"
        >
          <div className="mb-2 flex items-end gap-4 border-b-2 border-forest pb-3">
            <h2 id={`${cat.id}-heading`} className="font-display text-4xl font-semibold text-forest sm:text-5xl">
              {cat.name[locale]}
            </h2>
          </div>
          {cat.note && <p className="mt-3 text-[0.975rem] text-charcoal/80">{cat.note[locale]}</p>}
          <ul className="mt-2">
            {cat.items.map((item) => (
              <MenuItemRow key={item.id} item={item} locale={locale} />
            ))}
          </ul>
        </section>
      ))}

      <p className="mt-12 text-sm text-charcoal/75">{disclaimer}</p>
    </div>
  );
}
