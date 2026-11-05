// Signature dishes — copy (name, blurb, alt) lives in messages/*.json under
// home.dishes.items.<id>. Images are PLACEHOLDERS: replace the file, keep the name.
export const signatureDishes = [
  { id: "poutineClassique", image: "/images/dishes/poutine-classique.jpg" },
  { id: "guedilleHomard", image: "/images/dishes/guedille-homard.jpg" },
  { id: "dejeunerClassique", image: "/images/dishes/dejeuner-classique.jpg" },
  { id: "poutineItalienne", image: "/images/dishes/poutine-italienne.jpg" },
  { id: "menuDuJour", image: "/images/dishes/menu-du-jour.jpg" },
  { id: "fritesMaison", image: "/images/dishes/frites-maison.jpg" },
] as const;

export type SignatureDishId = (typeof signatureDishes)[number]["id"];

// Real Google reviews — kept in their original English on both locales.
export const reviews = [
  {
    quote:
      "Wonderful poutine at unbeatable prices! Restaurant full of locals, with the most joyful service and amazing food.",
    author: "Andrea G.",
    localGuide: true,
  },
  {
    quote:
      "Very friendly and authentic Casse-Croûte in Quebec. Mimi is very friendly. Great and cheap.",
    author: "Christian G.",
    localGuide: true,
  },
  {
    quote:
      "Quaint, cute, cosy, friendly. You can eat two people and have a classic breakfast for under $20.",
    author: "Sam",
    localGuide: true,
  },
];
