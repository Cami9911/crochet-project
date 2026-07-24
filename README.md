# Stela's Crochet

A catalog website for a handmade crochet business. Visitors browse the product
range, filter and search the catalog, switch between color variants on a product
page, and get in touch through a contact form or social links. The interface is
in Romanian.

> **Live demo:** _add your Netlify URL here_

<!-- Add a screenshot or short GIF here once you have one:
![Stela's Crochet catalog](docs/screenshot.png)
-->

## Features

- **Catalog** — 150+ color variants across 69 products in 9 categories (bags,
  backpacks, wallets, berets, hats, shoes, boots, sandals, and kids' beanies).
- **Filtering** — narrow the grid by color, size, handle type, style, and
  category. The active filters live in the URL, so any view can be shared or
  bookmarked.
- **Search** — ranked autocomplete that matches across category, color,
  keywords, size, and style. Matching ignores diacritics, so "camasa" finds
  "cămașă".
- **Color variants** — product pages group items by base product and let you
  switch color, with separate galleries tuned for desktop and mobile.
- **Responsive images** — multi-width WebP sources are generated at build time
  and loaded lazily as you scroll, so pages stay light on data.
- **Contact** — an EmailJS-backed form plus direct WhatsApp, Instagram, and
  Facebook links.
- **Persistence** — filters and the current selection are saved to
  `localStorage`, so a reload keeps you where you were.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | React 18 + TypeScript |
| Build tool | Vite 6 |
| UI components | Ant Design 6 |
| Styling | Tailwind CSS 4, SASS |
| State | Jotai |
| Routing | React Router 7 |
| Images | vite-imagetools |
| Contact form | EmailJS |

## Getting started

Requires Node 18+ (developed on Node 22) and npm.

```bash
# install dependencies
npm install

# start the dev server (http://localhost:5173)
npm run dev

# type-check and build for production
npm run build

# preview the production build locally
npm run preview

# lint
npm run lint
```

## Project structure

```
src/
├── App.tsx                 # Router entry
├── MainDashboardEntry.tsx  # Layout: header, routes, footer, theme
├── productData.ts          # Product catalog (source of truth)
├── translations.ts         # Romanian labels, keyed by the English data values
├── imageLoaders.ts         # Lazy image resolution, caching, and prewarming
├── SwatchCache.ts          # Shared cache for color-swatch thumbnails
├── storageAtoms.tsx        # Jotai atoms persisted to localStorage
├── atoms.tsx               # In-memory UI atoms
├── useFunctions.tsx        # Small shared hooks (hover/media queries)
├── pages/
│   ├── Home.tsx            # Grid + filters
│   ├── productDetails/     # Product page, galleries, color selection
│   └── contact/            # Contact page and form
└── components/
    ├── Header.tsx          # Logo, search, social links
    ├── GridContent.tsx     # Product grid, pagination, lazy reveal
    ├── HeaderAutoComplete.tsx  # Weighted search
    ├── filters/            # Filter controls and drawers
    └── sidemenu/           # Category side menu
```

## How a few things work

**Images.** `imageLoaders.ts` and `SwatchCache.ts` do the heavy lifting.
`vite-imagetools` turns each source photo into several WebP widths at build time.
The loaders resolve those URLs lazily (nothing is processed until a component
asks for it) and keep the resolved URLs in module-level caches that outlive
component unmounts. The grid reveals cards in batches of eight using an
`IntersectionObserver`, and color swatches are fetched during idle time before a
card is hovered. Together this avoids the broken-image flash you'd otherwise see
when navigating from a product page back to the grid.

**Search.** `HeaderAutoComplete.tsx` scores each product against the query.
Different fields carry different weights (a category match counts for more than a
handle match), every search word has to match somewhere, and results are sorted
by total score. Input and product text are normalized to drop Romanian
diacritics before comparison.

**Content vs. data.** The catalog in `productData.ts` is keyed with stable
English values (`color: "black"`, `category: "bags"`). `translations.ts` maps
those keys to Romanian display text. Filtering and search work on the keys, and
the UI reads through the translation layer.

## Deployment

The app is a single-page app hosted on Netlify. `public/netlify.toml` rewrites
all routes to `index.html` so client-side routing works on refresh and deep
links. Build command: `npm run build`. Publish directory: `dist`.

> **Note:** the EmailJS service, template, and public key in
> `src/pages/contact/ContactForm.tsx` are client-side identifiers meant to be
> shipped in the browser. Restrict the allowed domains in your EmailJS dashboard
> so the keys can't be reused elsewhere.

## License

See [LICENSE](LICENSE). The code is published for portfolio and demonstration
purposes. Product photographs, logos, and descriptions belong to the business
and are not licensed for reuse.
