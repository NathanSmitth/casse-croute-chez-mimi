# Casse-Croûte chez Mimi

Bilingual (FR default, EN) site for Casse-Croûte chez Mimi, Thetford Mines, QC.
Next.js 16 (App Router) · Tailwind v4 · next-intl · Vercel Analytics.

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /fr
npm run build
```

## Where things live

| What | File |
| --- | --- |
| Hours, phone, address, socials, logo, domain | `data/site.ts` |
| Menu (FR/EN names + prices) | `data/menu.ts` |
| All page copy (FR / EN) | `messages/fr.json`, `messages/en.json` |
| Reviews + signature dish list | `data/content.ts` |
| Colours, fonts, motion | `app/globals.css` (`@theme`) |

## Before launch — TODO

- [ ] **Hours**: confirm with the owner in `data/site.ts`, then set `hoursConfirmed: true`
      (adds hours to JSON-LD, swaps the "à confirmer" note for a live "Ouvert en ce moment").
- [ ] **Facebook**: paste the page URL in `social.facebook`. Header/footer icons and schema `sameAs` appear automatically.
- [ ] **Logo**: add the file to `/public/images/` and set `logo: { src, width, height }`.
      Optionally replace `app/icon.tsx` / `app/apple-icon.tsx` with the real mark.
- [ ] **Photos**: replace the placeholders, keeping the same filenames:
      `public/images/exterior.jpg` (3:2, hero) and `public/images/dishes/*.jpg` (4:5).
- [ ] **Menu**: replace placeholder items/prices in `data/menu.ts` and remove `placeholder: true`.
      The "prix à titre indicatif" note disappears once no placeholders remain.
- [ ] **Delivery**: hidden for now. If the owner confirms they deliver, set `offersDelivery: true` in `data/site.ts`.
      This restores the delivery wording everywhere: hero, CTAs, call card, meta description and schema.
- [ ] **Domain**: confirm `url` in `data/site.ts` (canonical, hreflang, sitemap, OG).

## Lead tracking

Every `tel:` link fires `call_click`, Maps links fire `directions_click` and Facebook links fire `facebook_click`.
Each event carries a `location` (hero, header, sticky-bar, find-us, footer…).
You can see them in Vercel → Analytics → Events once the site is deployed.
