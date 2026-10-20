# Nest & Nomad

A considered collection for home, work, and wherever life takes you. A polished, English-language React storefront built as an interview demonstration, with USD pricing and US demo addresses.

## Run locally

Use Node.js **22.12+** (Node 24 also supported).

```sh
npm ci
npm run dev
```

Open http://localhost:5173. If your npm mirror is unavailable, use `npm ci --registry=https://registry.npmjs.org/`.

```sh
npm test              # Cart, inventory, persistence recovery, shipping math
npm run build         # TypeScript checking + production build
npm run preview       # Serve dist at http://localhost:4173
```

## Deploy to Netlify

**From Git:** import this repository in Netlify. The included `netlify.toml` sets the build command to `npm run build`, publish directory to `dist`, and Node version to 22. No environment variables or backend services are required.

**Manual deploy:** run `npm run build`, then upload the **dist folder** to Netlify's manual deploy area. `public/_redirects` is copied into `dist`, so manual deploys also support SPA routing.

After deployment, directly open and refresh `/products/sunday-stoneware-mug` and `/checkout`. Both must load the application rather than a hosting 404. A checkout with an empty bag intentionally shows an empty state. Unknown application routes show a friendly not-found page.

## Demo walkthrough

1. Browse 12 items across Home, On the Go, and Workspace. Search for “mug”, select a category, and change price sorting. The filters remain in the URL when returning from a product.
2. Open Sunday Stoneware Mug, select a size, and add it to the bag. Repeated additions of the same variant merge; different variants remain separate. Total units across a product's variants cannot exceed its shared stock.
3. Change quantities, remove an item, close with Escape, and refresh. The bag persists in localStorage. Keyboard focus is trapped in the dialog and restored on close.
4. Continue to checkout using sample information. Required fields, email, and US ZIP format are validated. Shipping is $5.99 below $75 and free at $75 or more. All monetary calculations use integer cents.
5. Place a demo order. A local confirmation shows the order number, items, and totals, then the bag is cleared. Refreshing dismisses the confirmation.

Also try a search with no matches, the unavailable Type Compact Keyboard, an unknown product URL, and narrow mobile screens.

## Browser verification

The repeatable Playwright script covers desktop (1440px) and mobile (390px) browsing, URL filters, variants, stock, bag persistence, quantity changes, shipping, dialog keyboard focus, form validation, confirmation, empty states, runtime errors, and horizontal overflow. Screenshots are saved to the ignored `test-results/` directory.

With the dev server running:

```sh
npx playwright install chromium
npm run test:e2e
```

Alternatively, use an installed Chrome without downloading another browser:

```sh
CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npm run test:e2e
```

To verify the production preview instead, set `BASE_URL=http://localhost:4173`. Optional `SCREENSHOT_DIR` overrides the output folder.

## Code structure

```text
src/
  page/
    Home/
      index.tsx
      style.css
      component/       # Home-only Hero and Story
    Product/
      index.tsx
      style.css
      component/       # ProductDetail
    Checkout/
      index.tsx
      style.css
      component/       # OrderSummary and TruckIcon
    NotFound/
      index.tsx
  component/           # Shared layout, navigation, bag and product UI
    style.css          # Shared component and layout styles
  test/                # Cart unit tests and browser regression script
  mock/products.ts     # Demo catalog and categories
  types/product.ts     # Catalog types
  utils/money.ts       # USD formatting
  store/cart/          # Shared cart state and business rules
    CartContext.tsx    # Provider, useCart and localStorage persistence
    cart.ts            # Reducer, inventory validation and pricing rules
  styles.css           # Fonts, reset and global foundation
  App.tsx              # Route composition
  main.tsx             # Entry point and providers
```

Page-specific styles, including responsive rules, live alongside each page. Reusable styles stay in `component/style.css`; the shared empty-state presentation is reused by checkout, product fallback, and NotFound. Existing routes and storage keys are unchanged. `npm run test:e2e` runs `src/test/browser-check.mjs`.

## Implementation notes

- React 19, TypeScript, Vite, React Router; ordinary responsive CSS and Lucide icons.
- `src/mock/products.ts` is the local catalog; `src/store/cart/cart.ts` contains independently tested inventory and pricing rules.
- Context + reducer keeps cart state small and predictable. Corrupt or stale localStorage is sanitized; unavailable storage falls back to an in-memory bag with an explanation.
- Search (`q`), category (`category`), and sort (`sort`) are URL parameters. Sort values are `featured`, `price-asc`, and `price-desc`.
- Product and checkout routes work without a backend. Product pictures and fonts are hosted locally; no runtime third-party asset requests are needed.
- Responsive grids, a mobile purchase bar, focus management, visible focus rings, labeled fields, reduced-motion support, and image fallbacks are included.

## Demo boundaries

All products, prices, inventory, and shipping rules are illustrative. Photographs are representative, not a verified product specification. There is no authentication, payment processing, order API, email, tax calculation, delivery, or returns service. US addresses are accepted only as local demonstration input; use sample details. Personal information is kept only in React memory and cleared after submission. Only product IDs, variants, and quantities are persisted. Order confirmation is also memory-only.

## Assets

Product and lifestyle photography: [Unsplash](https://unsplash.com), locally stored in `public/images`. Image source IDs are documented in `ASSETS.md`.

Fonts: [DM Sans](https://fonts.google.com/specimen/DM+Sans) and [Manrope](https://fonts.google.com/specimen/Manrope), distributed under the SIL Open Font License. License texts are included alongside the local fonts. Icons: Lucide, ISC license.
