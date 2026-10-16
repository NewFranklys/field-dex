# FIELD DEX

A Pokémon research archive with a field-record visual identity. The National Dex is the species foundation of a larger companion platform, now joined by an initial version-aware game research layer.

## Current release: National Dex + Game Research foundation

- Home with a featured specimen, rescan and random encounter across the current National Dex scope.
- National Dex species archive **001–1025**, with name/number search plus generation and type filtering.
- Generation I–IX navigation with National Dex ranges and region labels.
- Progressive catalogue rendering in batches instead of mounting the entire archive at once.
- Shareable search/type/generation URLs and preserved archive context when returning from a record.
- Individual records with category/field notes, types, metric height/weight, habitat, generation, abilities, base stats and cry playback when available.
- Evolution families with explicit parent relationships, item/method conditions and visual evolution-method cues.
- Defensive weaknesses, resistances and immunities, including dual-type multipliers.
- An 18-type reference with offensive/defensive relationships and National Dex representatives.
- **Game Archives** organized by region, release generation, game group and individual version.
- Species records link to relevant regional game contexts through **Game Records**.
- Game pages can show source-backed wild encounter/location data for an individual version.
- Game pages can show source-backed level-up learnsets for the selected game group.
- English and Brazilian Portuguese UI, loading/retry/empty/not-found/partial-data states, keyboard focus, reduced-motion support and responsive layouts.

The National Dex remains the species identity layer. Game-specific context is modeled separately so historical locations, learnsets and later evolution/gameplay rules do not overwrite global species data. See [Product Vision](docs/PRODUCT_VISION.md) and [Roadmap](docs/ROADMAP.md).

## Languages

FIELD DEX currently supports:

- **English (`en`)** — default and fallback language.
- **Português do Brasil (`pt-BR`)** — official supported language.

The language switcher changes the interface without reloading or losing the current route, Pokémon, filter or query. The selected locale is stored locally and reused on future visits.

PokéAPI content is localized only when the upstream field provides the requested language; missing `pt-BR` source data falls back to English instead of being silently invented. Internal Pokémon/species identity never depends on translated names.

See [Localization](docs/LOCALIZATION.md) for resource organization, contribution guidance and future community/TCG language rules.

## Data context

The public species archive currently follows National Pokédex numbering through **#1025**. Generation filters describe when a species was introduced and remain separate from region/game/version identity.

Types, stats and matchups use PokéAPI's current data. Matchups are type-only; abilities, moves, weather and game/version-specific rules are not applied to the global record. Evolution conditions in the global record reflect the available API entries rather than a selected game's historical rules.

The Game Research module currently exposes two version-aware slices when PokéAPI provides them:

- wild encounter/location records filtered by individual version;
- move learn data filtered by version group, with the UI currently emphasizing level-up learnsets.

Absence of a wild encounter record does **not** mean a Pokémon is unobtainable in that version. Events, gifts, trades, transfers and source gaps are not inferred. FIELD DEX surfaces the source boundary instead of inventing missing historical facts.

Alternate Pokémon forms remain distinct from National Dex species numbering. Forms browsing, regional variants, Mega/other forms, full version-specific evolution rules, trainer data and complete game-specific Pokédex membership remain future work.

TCG Catalog, My Collection, Decks, collection-aware recommendations, Community, Competitive data and Guides remain later roadmap phases. There is no authentication, backend database, collection persistence, deck building or pricing in the current release.

## Stack and data

React 19, React Router 7, Motion, i18next/react-i18next and Vite 8; plain JavaScript and CSS. ESLint, Vitest, Testing Library, jsdom and Prettier support development.

Species, type, evolution, encounter, learnset and cry metadata comes from [PokéAPI](https://pokeapi.co/). Artwork and audio are served by the [PokéAPI sprites project](https://github.com/PokeAPI/sprites). Pokémon and associated names/artwork belong to their respective owners; FIELD DEX is an unofficial fan project.

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

Tests use controlled PokéAPI fixtures, not the live network. They cover routed search/filter/generation/back navigation, National Dex boundaries, region/game metadata, version-specific encounter filtering, version-group learnsets, loading/error/partial states, request races, media failures, evolution branches, type multipliers, species/form identity and locale behavior.

## Production hosting

```sh
npm ci
npm run build
npm run preview
```

Deploy `dist/` to a static host. This app uses `BrowserRouter`: configure a **history fallback to `/index.html`** for application paths such as `/pokedex`, `/types`, `/games/crystal` and `/pokemon/25`. Existing static assets should retain normal file handling. Without this fallback, refreshing a nested record URL can return the host's 404 even though in-app navigation works.

The default Vite base is `/`. Subdirectory deployment additionally requires matching Vite `base` and router `basename` configuration. `vite preview` is for verification, not a production server.

## Project structure

```text
src/
  components/  Shared shell and species/game record presentation components
  data/        National, generation, region and game-context metadata
  domain/      Pure species/evolution/matchup/game-context transforms
  hooks/       Async resource lifecycle and stale-result protection
  i18n/        Locale initialization, resources and presentation localization
  pages/       Home, National Dex, species records, Types and Game Archives
  services/    PokéAPI transport/cache plus species and game research loaders
  styles/      Product/page compositions and responsive layers
  test/        Deterministic API fixtures and browser API shims
```

`src/data/archive.js` owns National Dex boundaries. `src/data/generations.js` owns National Dex generation metadata. `src/data/gameContexts.js` owns regional/game/version identity. Those concepts intentionally remain separate so future regional Pokédexes and exact game mechanics do not redefine species identity.

Future TCG, user, collection and deck domains should remain separate services/models connected through stable identities rather than being folded into PokéAPI transport or large page components.

Read [AGENTS.md](AGENTS.md) before contributing.
