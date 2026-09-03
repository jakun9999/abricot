### Option B - Mission (cas fictif) - Développez un SaaS de gestion de tâches.

Cahier des charges : https://course.oc-static.com/paths/2631+DA+Full-stack/DA+Full-stack+P7+-+Spe%CC%81cifications+Fonctionnelles+_+Application+de+Gestion+de+Projet+Collaboratif+(SaaS).pdf

Code backend : https://github.com/OpenClassrooms-Student-Center/dev-react-P10

Maquette : https://www.figma.com/design/4dE90dtmpQNUS05IGd9HxT/Abricot?node-id=0-1&p=f&t=bMvwdRP0k1voe2l4-0

## Relancer le projet (clone → app qui tourne)

Suivre les étapes **dans l’ordre**, depuis le terminal intégré de VS Code (`Ctrl+ù` / `Ctrl+\``). Le gestionnaire de paquets du projet est **npm** (le fichier `package-lock.json` fige les versions).

### 1. Prérequis

| Outil | Version minimale | Vérification |
| --- | --- | --- |
| [Node.js](https://nodejs.org/) | **20.9** ou plus (Next.js 16) | `node -v` |
| npm | celui livré avec Node | `npm -v` |
| Git | n’importe quelle version récente | `git --version` |

Installer aussi le **backend** du dépôt OpenClassrooms `dev-react-P10` (lien ci-dessus) : Abricot ne contient que le frontend Next.js. Sans API, login / projets / tâches échouent.

### 2. Cloner et ouvrir

```bash
git clone <url-du-depot-abricot>
cd abricot
```

Dans VS Code : *File → Open Folder…* sur ce dossier, puis ouvrir un terminal dans le projet.

### 3. Installer les dépendances

Ne **pas** copier `node_modules`. Un clone + cette commande suffisent. `npm ci` installe **exactement** les versions du lockfile (recommandé). `npm install` est un repli si `npm ci` échoue.

```bash
npm ci
```

### 4. Variables d’environnement

```bash
cp .env.example .env.local
```

Éditer `.env.local` :

- `API_URL_INTERNAL` : URL du backend telle que Next.js la voit (souvent `http://localhost:3001` — **vérifier le port dans le README du backend**).
- `MISTRAL_API_KEY` : clé [Mistral](https://console.mistral.ai/) pour la génération de tâches. Laisser vide si vous n’utilisez pas l’IA (le reste de l’app fonctionne).
- `MISTRAL_MODEL` : optionnel, défaut `mistral-small-latest`.

Ne jamais committer `.env.local`.

### 5. Démarrer le backend

Dans **un autre terminal**, lancer l’API `dev-react-P10` selon son README (install + `npm start` / équivalent). Attendre qu’elle écoute avant l’étape 6.

### 6. Démarrer Abricot

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) : redirection vers `/login`. Créer un compte (`/signin`) puis se connecter. Les routes `/dashboard`, `/projects` et `/account` exigent le cookie `token`.

Pour un build de production local :

```bash
npm run build
npm run start
```

`start` sert le build déjà compilé (port 3000 par défaut). Le backend et `.env.local` restent nécessaires.

---

## Consulter la documentation déjà versionnée

Après un clone, **nul besoin de régénérer** pour lire la doc : les HTML sont dans le dépôt.

| Doc | Dossier versionné | Ouvrir |
| --- | --- | --- |
| TypeDoc (API du code source) | `docs/` | ouvrir `docs/index.html` dans le navigateur |
| Storybook (composants UI) | `storybook-static/` | ouvrir `storybook-static/index.html` dans le navigateur |

Si le navigateur bloque les scripts en `file://`, servir le dossier :

```bash
npx --yes serve docs
npx --yes serve storybook-static
```

---

## Régénérer la documentation (après modification du code)

### TypeDoc

Génère `docs/` à partir des JSDoc du source (`components`, `hooks`, `lib`, `schemas`, `types`, `context`, `middleware.ts`, `app/api`). Config : `typedoc.json` + `tsconfig.typedoc.json`.

```bash
npm run docs
```

Puis committer `docs/` si la doc doit rester à jour dans le dépôt.

### Storybook

Interface interactive (hot reload), port **6006** :

```bash
npm run storybook
```

Ouvrir [http://localhost:6006](http://localhost:6006).

Export HTML statique (écrase `storybook-static/`) :

```bash
npm run build-storybook
```

Puis committer `storybook-static/` si besoin.

Tests des stories (navigateur Playwright). Au premier run sur une machine neuve, installer Chromium :

```bash
npx playwright install chromium
npx vitest --project storybook run
```

---

## Scripts npm

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Serveur de développement Next.js (`localhost:3000`) |
| `npm run build` | Build de production |
| `npm run start` | Sert le build de production |
| `npm run lint` | ESLint |
| `npm run format:check` | Vérifie Prettier (sans modifier) |
| `npm run format:write` | Applique Prettier |
| `npm run generate:icons` | SVG `src/svg-raw/` → composants `components/ui/icons/` |
| `npm run docs` | Génère TypeDoc dans `docs/` |
| `npm run storybook` | Storybook dev sur le port 6006 |
| `npm run build-storybook` | Build statique dans `storybook-static/` |

---

## Dépendances et versions installées

Versions ci-dessous = celles **résolues dans `package-lock.json`** (ce que `npm ci` installe). Les plages `^` / `latest` du `package.json` ne doivent pas servir à réinstaller « à la louche ».

### Runtime (`dependencies`)

| Package | Version | Rôle dans Abricot |
| --- | --- | --- |
| `next` | 16.3.1 | Framework App Router, pages, API routes BFF, middleware |
| `react` / `react-dom` | 19.2.4 | UI |
| `zod` | 4.4.3 | Schémas (tâches, projets, auth, payloads IA) |
| `react-hook-form` | 7.86.0 | Formulaires (login, compte, modales) |
| `@hookform/resolvers` | 5.9.1 | Pont React Hook Form ↔ Zod |
| `@radix-ui/react-select` | 2.3.7 | Liste déroulante accessible (`SelectorInput`) |
| `ai` | 7.0.91 | SDK Vercel AI (`generateText`) pour les tâches IA |
| `@ai-sdk/mistral` | 4.0.39 | Provider Mistral du SDK AI |
| `lucide-react` | 1.33.0 | Icônes burger / fermer du header |
| `usehooks-ts` | 3.1.1 | Hooks utilitaires |

### Développement (`devDependencies`)

| Package | Version | Rôle |
| --- | --- | --- |
| `typescript` | 5.9.3 | Typage |
| `tailwindcss` / `@tailwindcss/postcss` | 4.3.3 | Styles (jetons Figma dans `app/globals.css`) |
| `eslint` | 9.39.5 | Lint |
| `eslint-config-next` | 16.2.12 | Règles Next / React |
| `eslint-config-prettier` | 10.1.8 | Désactive les règles ESLint en conflit avec Prettier |
| `prettier` | 3.9.6 | Formatage |
| `typedoc` | 0.28.20 | Documentation HTML du source |
| `storybook` | 10.6.0 | Atelier des composants UI |
| `@storybook/nextjs-vite` | 10.6.0 | Intégration Storybook × Next × Vite |
| `@storybook/addon-docs` | 10.6.0 | Docs autodocs dans Storybook |
| `@storybook/addon-a11y` | 10.6.0 | Contrôles d’accessibilité dans Storybook |
| `@storybook/addon-vitest` | 10.6.0 | Tests des stories via Vitest |
| `@storybook/addon-mcp` | 10.6.0 | Addon MCP Storybook |
| `@chromatic-com/storybook` | 5.3.1 | Addon Chromatic (visuel / CI) |
| `eslint-plugin-storybook` | 10.6.0 | Lint des fichiers `*.stories` |
| `vitest` | 4.1.11 | Runner de tests |
| `@vitest/browser-playwright` | 4.1.11 | Tests Storybook dans Chromium |
| `@vitest/coverage-v8` | 4.1.11 | Couverture (si activée) |
| `playwright` | 1.62.1 | Navigateur pour Vitest / Storybook |
| `msw` | 2.15.0 | Mock HTTP (login en Storybook) |
| `msw-storybook-addon` | 3.0.0 | Branche MSW sur Storybook |
| `mockdate` | 3.0.5 | Date figée dans les stories (libellés « aujourd’hui ») |
| `vite` | 8.2.2 | Bundler utilisé par Storybook |
| `@types/node` | 20.19.43 | Types Node |
| `@types/react` / `@types/react-dom` | 19.2.18 / 19.2.4 | Types React |

---

## Architecture utile pour s’y retrouver

- `app/` : App Router (pages, layouts, `app/api/*` = BFF vers le backend).
- `components/ui/` : UI Figma (ne pas changer tailles de police ni couleurs).
- `context/auth-context.tsx` : hydratation du profil via cookie `user_data` ; JWT en cookie HttpOnly `token`.
- `lib/api-server.ts` : `fetch` serveur authentifié vers `API_URL_INTERNAL`.
- `schemas/` : Zod.
- `middleware.ts` : protection `/dashboard`, `/projects`, `/account`.
- `.storybook/` : config Storybook (preview, MSW).
- `docs/` et `storybook-static/` : sorties HTML versionnées.

---

## Qualité et icônes

```bash
npm run lint
npm run format:check
```

Pour régénérer une icône SVG Figma : placer le fichier dans `src/svg-raw/`, puis `npm run generate:icons`.
