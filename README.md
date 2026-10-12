# FIELD DEX

A Pokémon research archive with a field-record visual identity. The Pokédex is the first module of a larger companion platform: species knowledge is its starting point, with separate game, TCG, collection and deck domains planned for later releases.

## Current release: Kanto species research

- Home with a featured specimen, rescan and random encounter.
- Species archive for National Dex **001–151**, with name/number search and combined type filtering.
- Shareable search/type URLs and preserved archive context when returning from a record.
- Individual records with category/field notes, types, metric height/weight, habitat, generation, abilities, base stats and cry playback when available.
- Evolution families with explicit parent relationships and method conditions.
- Defensive weaknesses, resistances and immunities, including dual-type multipliers.
- An 18-type reference with offensive/defensive relationships and Kanto representatives.
- Loading, retry, empty, not-found, partial-data and unavailable-media states; keyboard focus, reduced-motion support and responsive layouts.

Kanto is the current public archive, not FIELD DEX's permanent product boundary. See [Product Vision](docs/PRODUCT_VISION.md) and [Roadmap](docs/ROADMAP.md).

## Languages

FIELD DEX currently supports:

- **English (`en`)** — default and fallback language.
- **Português do Brasil (`pt-BR`)** — official supported language.

The language switcher changes the interface without reloading or losing the current route, Pokémon, filter or query. The selected locale is stored locally and reused on future visits.

PokéAPI content is localized only when the upstream field provides the requested language; missing `pt-BR` source data falls back to English instead of being silently invented. Internal Pokémon/species identity never depends on translated names.

See [Localization](docs/LOCALIZATION.md) for resource organization, contribution guidance and future community/TCG language rules.

## Data context

Kanto is the current species boundary, not a Generation I battle simulator. Types, stats and matchups use PokéAPI's current data (including Fairy and Steel). Matchups are type-only; abilities, moves, weather and game/version-specific rules are not applied. Evolution conditions reflect the available API entries rather than a selected game's rules.

Games, TCG Catalog, My Collection, Decks, collection-aware recommendations, Community, Competitive data and Guides remain later roadmap phases. There is no authentication, backend database, collection persistence, deck building, pricing or game-guide UI in the current release.

## Stack and data

React 19, React Router 7, Motion, i18next/react-i18next and Vite 8; plain JavaScript and CSS. ESLint, Vitest, Testing Library, jsdom and Prettier support development.

Species, type, evolution and cry metadata comes from [PokéAPI](https://pokeapi.co/). Artwork and audio are served by the [PokéAPI sprites project](https://github.com/PokeAPI/sprites). Pokémon and associated names/artwork belong to their respective owners; FIELD DEX is an unofficial fan project.

Runtime requests require network access. Successful responses and pending requests are shared in a bounded, in-memory cache; failed requests are evicted so retry can recover. Requests time out after 12 seconds. There is no persistent/offline API cache or secret/API-key configuration.

## Local setup

Use **Node.js 22.12+** (Node 24 recommended and used in CI) and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. On Windows PowerShell, `npm.cmd` can be used if the shell blocks `npm.ps1`. No environment variables are required.

## Scripts and verification

| Command              | Purpose                                 |
| -------------------- | --------------------------------------- |
| `npm run dev`        | Vite development server                 |
| `npm run lint`       | ESLint and React hook checks            |
| `npm test`           | All automated tests, once               |
| `npm run test:watch` | Watch tests during development          |
| `npm run build`      | Production output in `dist/`            |
| `npm run preview`    | Serve the production build locally      |
| `npm run format`     | Format JavaScript/JSX source and README |

Run `npm run lint`, `npm test` and `npm run build` before opening a PR. GitHub Actions runs installation and all three checks on PRs to `main`.

Tests use controlled PokéAPI fixtures, not the live network. They cover routed search/filter/back navigation, loading/error/partial states, scope boundaries, request races, media failures, evolution branches, type multipliers, species/form identity and locale switching/persistence/fallback behavior.

## Production hosting

```sh
npm ci
npm run build
npm run preview
```

Deploy `dist/` to a static host. This app uses `BrowserRouter`: configure a **history fallback to `/index.html`** for application paths such as `/pokedex`, `/types` and `/pokemon/25`. Existing static assets should retain normal file handling. Without this fallback, refreshing a nested record URL can return the host's 404 even though in-app navigation works.

The default Vite base is `/`. Subdirectory deployment additionally requires matching Vite `base` and router `basename` configuration. `vite preview` is for verification, not a production server.

## Project structure

```text
src/
  components/  Shared shell and record presentation components
  data/        Release/archive boundaries and visual metadata
  domain/      Pure species/evolution/matchup transforms
  hooks/       Async resource lifecycle and stale-result protection
  i18n/        Locale initialization, resources and presentation localization
  pages/       Home, archive, individual record and Types orchestration
  services/    PokéAPI transport/cache and Pokémon loading
  styles/      Product/page compositions and responsive layers
  test/        Deterministic API fixtures and browser API shims
```

`src/data/archive.js` owns the current content boundary. Generic HTTP/species infrastructure is scope-aware and separates species identity from PokéAPI Pokémon/form identity so National Dex and form expansion do not require treating 151 as a permanent rule.

Future Game, TCG, user, collection and deck domains should remain separate services/models connected through stable identities rather than being folded into PokéAPI transport or large page components.

Read [AGENTS.md](AGENTS.md) before contributing.
