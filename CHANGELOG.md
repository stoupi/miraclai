## Landing Page v1 (Navbar + Hero)

- Feature: Adds a single, image-accurate navbar and a hero section to the localized home page.
- What it does: Renders a white top navigation (logo/title, centered links, language switch, donate CTA) and a blue gradient hero with headline, subtitle, and two CTAs. Colors adjusted to match design: brand blue `#1F6DB2` links, deep blue text `#184F88`, hero gradient `#2F6FB7→#2A66A6`, donate pink `#F05A7A`. Background image supported via local file or env.
- How to use:
  - Content: Edit translations in `messages/*` under `navigation` and `home`.
  - Layout: Navbar is rendered in `app/[locale]/layout.tsx`; hero renders from `app/[locale]/page.tsx`.
  - Components: Update UI in `app/[locale]/components/navbar.tsx` and `app/[locale]/components/hero.tsx`.
  - Links: Use the i18n `Link` from `app/i18n/navigation` to preserve locale in URLs.
  - Background image: Default fallback is `public/assets/nouveaularib.jpg`. You can override via `NEXT_PUBLIC_HERO_IMAGE_URL` or DB setting `HERO_IMAGE_URL`.

### Tweaks
- Navbar menu links updated to brand blue `#0063AF` and font size 16px (`text-base`).
- Language button text updated to `#0063AF` and 16px.
 - Logo caption colors unified: service and hospital text now `#0063AF`; logo badge also `#0063AF`. Hover states for menu links match `#0063AF`.
 - Navbar logo now uses `public/assets/logo.png` via `next/image` with localized alt text.
 - Logo size increased to 38×38 with softer rounded corners (`rounded-lg`).
 - Increased letter-spacing on “Service de Cardiologie” to align visually with the uppercase hospital line.
 - Added a solid blue divider line between the two logo captions to match the design.
 - Corrected FR hero subtitle wording to: "Hôpital Lariboisière - Assistance Publique des Hôpitaux de Paris (AP-HP)".
- Donate button: added a heart icon that animates with a heartbeat on hover only.
- Donate button icon now sourced from `public/assets/heart.svg` and animated on hover.
- Hero: added a line below subtitle — “Chef de service : Professeur Patrick HENRY” (localized).
- Hero spacing: grouped subtitle and chief lines with tighter spacing and same font size for visual cohesion.
- Navbar links: added a subtle underline reveal animation on hover/focus matching `#0063AF`.
 - Hero: added a team image to the right of the title on desktop (`/assets/team.png` by default, overridable via `HERO_TEAM_IMAGE_URL` setting or `NEXT_PUBLIC_HERO_TEAM_IMAGE_URL`).

## Asset: Hand-drawn Heart SVG

- Feature: Adds `public/assets/hand-drawn-heart.svg`, a human, hand-drawn style heart outline with subtle double-stroke for authenticity.
- What it does: Provides a brand-friendly decorative icon that pairs well with healthcare visuals.
- How to use:
  - As an `<img>`/background: `/assets/hand-drawn-heart.svg` from the `public` folder.
  - With Next.js: `<Image src="/assets/hand-drawn-heart.svg" alt="Heart" width={48} height={48} />`.
  - As inline SVG: import the file content or copy into a component to change stroke color via `currentColor`.
