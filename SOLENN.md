**Démarrer**
- **Dev**: `npm run dev` → http://localhost:3000

**Arborescence utile**
- `app/`: routes et pages (App Router)
  - `app/[locale]/.../page.tsx`: page serveur par défaut
  - `app/layout.tsx`: layout global
  - `app/api/.../route.ts`: endpoints API (GET/POST...)
- `components/`: composants réutilisables (client si besoin d’interactions)
- `lib/`: actions serveur, services, `prisma.ts`, `auth.ts`
- `messages/`: i18n (`en.json`, `fr.json`)
- `prisma/`: `schema.prisma` + migrations

**Créer/modifier une page**
- **Nouvelle page**: crée `app/[locale]/ma-page/page.tsx` avec:
  - `export default function Page() { return <div>Salut</div> }`
  - Ajoute en tête `"use client"` si tu utilises état, événements, ou APIs navigateur.
- **Style**: classes Tailwind directement dans le JSX (pas de CSS complexe requis).

**Composants: serveur vs client**
- **Serveur (par défaut)**: idéal pour fetch/SEO, pas d’état local.
- **Client**: ajoute `"use client"` tout en haut si tu utilises `useState`, événements, animations, etc.

**Commandes utiles**
- `npm run dev`: serveur de dev + HMR
- `npm run lint`: ESLint
- `npm run test:e2e`: tests Playwright
- `npx prisma studio`: inspecter la base

**Dépannage rapide**
- **Node incompatible**: vérifie `node -v >= 18`
- **DB**: Postgres up + `DATABASE_URL` correct; si souci: `npx prisma migrate dev && npx prisma generate`
- **Env**: `.env` présent et bien rempli
- **Cache pété**: `rm -rf node_modules .next` puis `npm install`
- **Port déjà pris**: change `NEXT_PUBLIC_APP_URL` ou stoppe le service sur 3000

**Rappels Next/React (express)**
- **Route = dossier** avec `page.tsx`
- **Layout** par dossier via `layout.tsx`
- **API** côté serveur dans `app/api/.../route.ts`
- **i18n**: routes `/:locale/...` (`fr`, `en`)
- **TSX**: retourne du JSX; tu peux penser « fonction → balises HTML »

Si tu bloques, commence par lancer `npm run dev`, ajoute une page simple dans `app/fr`, et regarde la console du terminal: elle te dira exactement quoi corriger.

