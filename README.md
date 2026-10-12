# FIELD DEX

A Pokémon research archive with a field-record visual identity. The Pokédex is the first module of a larger companion platform: species knowledge is its starting point, with separate game, TCG, collection and deck domains envisioned for later releases.

## V1: Kanto Pokédex core

- Home with a featured specimen, rescan and random encounter.
- Species archive for National Dex **001–151**, with name/number search and combined type filtering.
- Shareable search/type URLs and preserved archive context when returning from a record.
- Individual records with English category and field notes, types, metric height/weight, habitat, generation, abilities (including hidden labels), base stats and cry playback when available.
- Evolution families with explicit parent relationships and method conditions. Branches such as Eevee's are separate alternatives. Only Kanto records are linked; family members outside V1 are explained without opening unfinished records.
- Defensive weaknesses, resistances and immunities, including dual-type multipliers.
- An 18-type reference with offensive/defensive relationships and Kanto representatives.
- Loading, retry, empty, not-found, partial-data and unavailable-media states; section navigation, keyboard focus, reduced-motion support and responsive layouts.

**Data context:** Kanto is the species boundary, not a Generation I battle simulator. Types, stats and matchups use PokéAPI's current data (including Fairy and Steel). Matchups are type-only; abilities, moves, weather and game/version-specific rules are not applied. Evolution conditions reflect the available API entries rather than a selected game's rules.

Games, TCG Catalog, My Collection, Decks, collection-aware recommendations, Community Decks, Competitive Deck Profiles and Guides remain future direction. There is no authentication, backend database, collection persistence, deck building, pricing or game-guide UI in V1. See [Product Vision](docs/PRODUCT_VISION.md).

## Stack and data

React 19, React Router 7, Motion and Vite 8; plain JavaScript and CSS. ESLint, Vitest, Testing Library, jsdom and Prettier support development. No additional runtime dependency was needed for the V1 data layer.

Species, type, evolution and cry metadata comes from [PokéAPI](https://pokeapi.co/). Artwork and audio are served by the [PokéAPI sprites project](https://github.com/PokeAPI/sprites). Pokémon and associated names/artwork belong to their respective owners; FIELD DEX is an unofficial fan project.

Runtime requests require network access. Successful responses and pending requests are shared in a bounded, in-memory cache (256 entries, 30-minute lifetime); failed requests are evicted so retry can recover. Requests time out after 12 seconds. There is no persistent/offline cache or secret/API-key configuration.

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

Tests use controlled PokéAPI fixtures, not the live network. They exercise the real service layer and routed UI: normalized searches, combined filters, URL/back navigation, section links, initial loading, retry, partial records, stale responses, media failures, evolution branches, type multipliers and scope boundaries. jsdom mocks media playback and viewport observation; real audio, visual layout and network integration still need browser QA. The [V1 verification record](docs/V1_VERIFICATION.md) documents that pass.

## Production hosting

```sh
npm ci
npm run build
npm run preview
```

Deploy `dist/` to a static host. This app uses `BrowserRouter`: configure a **history fallback to `/index.html`** for application paths such as `/pokedex`, `/types` and `/pokemon/25`. Existing static assets should retain normal file handling. For example, an Nginx app location can use `try_files $uri $uri/ /index.html;`. Without this fallback, refreshing a nested record URL can return the host's 404 even though in-app navigation works.

The default Vite base is `/`. Subdirectory deployment additionally requires matching Vite `base` and router `basename` configuration. `vite preview` is for verification, not a production server. No deployment or hosting account is created by this repository.

## Project structure

```text
src/
  components/  Record presentation, evolution family, cry, artwork and states
  data/        Release boundary and visual type metadata
  domain/      Pure species/evolution/matchup and type-reference transforms
  hooks/       Async resource lifecycle and stale-response protection
  pages/       Home, archive, individual record and Types orchestration
  services/    PokéAPI transport/cache and Pokémon loading
  styles/      Existing page compositions, responsive and V1 interaction layers
  test/        Deterministic API fixtures and browser API shims
```

`src/data/archive.js` owns the V1 content boundary. The HTTP client and generic species transformations do not assume that every future region ends at 151. Future game, TCG and user-owned data should have separate services/models connected by species identity; they should not be added to the PokéAPI transport or giant page components.

Read [AGENTS.md](AGENTS.md) before contributing. The [initial audit](docs/V1_AUDIT.md) records the baseline issues addressed in this release.
