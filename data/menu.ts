// ─────────────────────────────────────────────────────────────────────────────
// Menu — single data file, FR/EN names + prices (CAD).
//
// ⚠️  PLACEHOLDER: every item below is a stand-in based on a typical Québec
// casse-croûte menu, with estimated prices. Replace with Mimi's real menu, then
// set `placeholder: false` (or delete the flag) on each confirmed item.
// While any item is a placeholder, the menu page shows a "prices to confirm" note.
// ─────────────────────────────────────────────────────────────────────────────

export interface Localized {
  fr: string;
  en: string;
}

export interface SizePrice {
  label: Localized;
  price: number;
}

export interface MenuItem {
  id: string;
  name: Localized;
  description?: Localized;
  /** Single price in CAD */
  price?: number;
  /** Or several sizes */
  sizes?: SizePrice[];
  placeholder?: boolean;
}

export interface MenuCategory {
  id: string;
  name: Localized;
  note?: Localized;
  items: MenuItem[];
}

const SIZES = {
  small: { fr: "Petite", en: "Small" },
  medium: { fr: "Moyenne", en: "Medium" },
  large: { fr: "Grande", en: "Large" },
} satisfies Record<string, Localized>;

const poutineSizes = (s: number, m: number, l: number): SizePrice[] => [
  { label: SIZES.small, price: s },
  { label: SIZES.medium, price: m },
  { label: SIZES.large, price: l },
];

export const menuData: MenuCategory[] = [
  // ── DÉJEUNERS ──────────────────────────────────────────────────────────────
  {
    id: "dejeuners",
    name: { fr: "Déjeuners", en: "Breakfast" },
    note: {
      fr: "Servis avec rôties et patates déjeuner.",
      en: "Served with toast and home fries.",
    },
    items: [
      {
        id: "classique",
        name: { fr: "Le classique", en: "The classic" },
        description: {
          fr: "2 œufs, bacon, jambon ou saucisses, fèves au lard.",
          en: "2 eggs, bacon, ham or sausages, baked beans.",
        },
        price: 9.95,
        placeholder: true,
      },
      {
        id: "bucheron",
        name: { fr: "L'assiette du bûcheron", en: "The lumberjack plate" },
        description: {
          fr: "2 œufs, bacon, jambon, saucisses, crêpe, cretons et fèves au lard.",
          en: "2 eggs, bacon, ham, sausages, a pancake, cretons and baked beans.",
        },
        price: 15.95,
        placeholder: true,
      },
      {
        id: "omelette",
        name: { fr: "Omelette jambon-fromage", en: "Ham & cheese omelette" },
        price: 11.5,
        placeholder: true,
      },
      {
        id: "crepes",
        name: { fr: "Crêpes au sirop d'érable (3)", en: "Pancakes with maple syrup (3)" },
        price: 9.5,
        placeholder: true,
      },
      {
        id: "pain-dore",
        name: { fr: "Pain doré", en: "French toast" },
        price: 9.95,
        placeholder: true,
      },
      {
        id: "roties-cretons",
        name: { fr: "Rôties et cretons", en: "Toast with cretons" },
        price: 5.5,
        placeholder: true,
      },
    ],
  },

  // ── POUTINES ───────────────────────────────────────────────────────────────
  {
    id: "poutines",
    name: { fr: "Poutines", en: "Poutines" },
    note: {
      fr: "Frites maison, fromage en grains qui fait squick squick.",
      en: "Homemade fries and squeaky cheese curds.",
    },
    items: [
      {
        id: "poutine-classique",
        name: { fr: "Poutine classique", en: "Classic poutine" },
        description: { fr: "Sauce brune maison.", en: "House brown gravy." },
        sizes: poutineSizes(8.5, 11.5, 14.5),
        placeholder: true,
      },
      {
        id: "poutine-italienne",
        name: { fr: "Poutine italienne", en: "Italian poutine" },
        description: { fr: "Sauce à spaghetti maison.", en: "House meat sauce." },
        sizes: poutineSizes(9.5, 12.5, 15.5),
        placeholder: true,
      },
      {
        id: "poutine-bbq",
        name: { fr: "Poutine BBQ", en: "BBQ poutine" },
        description: { fr: "Sauce BBQ.", en: "BBQ gravy." },
        sizes: poutineSizes(8.5, 11.5, 14.5),
        placeholder: true,
      },
      {
        id: "galvaude",
        name: { fr: "Galvaude", en: "Galvaude" },
        description: {
          fr: "Poulet effiloché, petits pois, sauce brune.",
          en: "Pulled chicken, green peas, brown gravy.",
        },
        sizes: poutineSizes(10.5, 13.5, 16.5),
        placeholder: true,
      },
      {
        id: "la-mimi",
        name: { fr: "La Mimi", en: "La Mimi" },
        description: {
          fr: "Bacon, saucisse, oignons rissolés, sauce brune.",
          en: "Bacon, sausage, fried onions, brown gravy.",
        },
        sizes: poutineSizes(11.5, 14.5, 17.5),
        placeholder: true,
      },
    ],
  },

  // ── MENU DU JOUR ───────────────────────────────────────────────────────────
  {
    id: "menu-du-jour",
    name: { fr: "Menu du jour", en: "Daily special" },
    note: {
      fr: "Du lundi au vendredi. Appelez-nous pour savoir ce qui mijote aujourd'hui.",
      en: "Monday to Friday. Call us to find out what's cooking today.",
    },
    items: [
      {
        id: "complet",
        name: { fr: "Menu du jour complet", en: "Full daily special" },
        description: {
          fr: "Soupe, plat du jour, dessert et café.",
          en: "Soup, main of the day, dessert and coffee.",
        },
        price: 14.95,
        placeholder: true,
      },
      {
        id: "plat",
        name: { fr: "Plat du jour seulement", en: "Main of the day only" },
        price: 12.5,
        placeholder: true,
      },
      {
        id: "soupe",
        name: { fr: "Soupe du jour", en: "Soup of the day" },
        price: 4.5,
        placeholder: true,
      },
    ],
  },

  // ── SANDWICHS & BURGERS ────────────────────────────────────────────────────
  {
    id: "sandwichs-burgers",
    name: { fr: "Sandwichs & burgers", en: "Sandwiches & burgers" },
    items: [
      {
        id: "hamburger",
        name: { fr: "Hamburger", en: "Hamburger" },
        price: 6.5,
        placeholder: true,
      },
      {
        id: "cheeseburger",
        name: { fr: "Cheeseburger", en: "Cheeseburger" },
        price: 7.25,
        placeholder: true,
      },
      {
        id: "club",
        name: { fr: "Club sandwich", en: "Club sandwich" },
        description: { fr: "Servi avec frites et salade de chou.", en: "With fries and coleslaw." },
        price: 15.95,
        placeholder: true,
      },
      {
        id: "hot-dog",
        name: { fr: "Hot-dog steamé", en: "Steamed hot dog" },
        price: 2.75,
        placeholder: true,
      },
      {
        id: "sous-marin",
        name: { fr: "Sous-marin jambon-fromage", en: "Ham & cheese sub" },
        price: 10.95,
        placeholder: true,
      },
    ],
  },

  // ── FRUITS DE MER ──────────────────────────────────────────────────────────
  {
    id: "fruits-de-mer",
    name: { fr: "Fruits de mer", en: "Seafood" },
    items: [
      {
        id: "guedille-homard",
        name: { fr: "Guédille au homard", en: "Lobster roll" },
        description: {
          fr: "Pain grillé au beurre, homard, mayo, céleri. Servie avec frites.",
          en: "Buttered toasted bun, lobster, mayo, celery. Served with fries.",
        },
        price: 21.95,
        placeholder: true,
      },
      {
        id: "guedille-crevettes",
        name: { fr: "Guédille aux crevettes", en: "Shrimp roll" },
        price: 13.95,
        placeholder: true,
      },
      {
        id: "fish-chips",
        name: { fr: "Fish & chips", en: "Fish & chips" },
        price: 15.95,
        placeholder: true,
      },
    ],
  },

  // ── EXTRAS ─────────────────────────────────────────────────────────────────
  {
    id: "extras",
    name: { fr: "Extras", en: "Sides & extras" },
    items: [
      {
        id: "frites",
        name: { fr: "Frites maison", en: "Homemade fries" },
        sizes: poutineSizes(4.25, 5.75, 7.25),
        placeholder: true,
      },
      {
        id: "rondelles",
        name: { fr: "Rondelles d'oignon", en: "Onion rings" },
        price: 6.5,
        placeholder: true,
      },
      {
        id: "salade-chou",
        name: { fr: "Salade de chou", en: "Coleslaw" },
        price: 2.5,
        placeholder: true,
      },
      {
        id: "sauce",
        name: { fr: "Sauce brune (extra)", en: "Extra gravy" },
        price: 2.0,
        placeholder: true,
      },
      {
        id: "fromage",
        name: { fr: "Fromage en grains (extra)", en: "Extra cheese curds" },
        price: 3.0,
        placeholder: true,
      },
    ],
  },

  // ── BOISSONS ───────────────────────────────────────────────────────────────
  {
    id: "boissons",
    name: { fr: "Boissons", en: "Drinks" },
    items: [
      {
        id: "cafe",
        name: { fr: "Café", en: "Coffee" },
        price: 2.25,
        placeholder: true,
      },
      {
        id: "the",
        name: { fr: "Thé", en: "Tea" },
        price: 2.25,
        placeholder: true,
      },
      {
        id: "liqueur",
        name: { fr: "Liqueur (boisson gazeuse)", en: "Soft drink" },
        price: 2.25,
        placeholder: true,
      },
      {
        id: "jus",
        name: { fr: "Jus", en: "Juice" },
        price: 2.75,
        placeholder: true,
      },
      {
        id: "lait-frappe",
        name: { fr: "Lait frappé", en: "Milkshake" },
        price: 5.5,
        placeholder: true,
      },
    ],
  },
];

export const menuHasPlaceholders = menuData.some((c) => c.items.some((i) => i.placeholder));

export function formatPrice(value: number, locale: "fr" | "en"): string {
  return new Intl.NumberFormat(locale === "fr" ? "fr-CA" : "en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
  }).format(value);
}
