# V1 verification

Verified on 2026-10-11 (America/Sao_Paulo), using Node 24.19.0 and npm on Windows.

## Automated checks

- Dependency installation/resolution: successful (`npm ci` baseline, `npm install` for the test tooling and final lockfile).
- `npm run lint`: passes, no errors or warnings.
- `npm test`: **35 tests pass** across three files.
- `npm run build`: passes with 446 transformed modules; production output in `dist/`.
- `npm audit`: zero vulnerabilities after updating the two affected transitive development packages.
- `git diff --check`: passes.

The workflow in `.github/workflows/verify.yml` repeats a fresh `npm ci`, lint, tests and build on Ubuntu with Node 24 for the PR.

## Browser pass

Used the Chromium-based in-app browser, live PokéAPI and the development server, followed by the actual production output through `vite preview`.

- Inspected Home, the archive, records and Types at desktop (1440×1000), tablet (768×1024) and mobile (390×844); also checked narrow Home and Mr. Mime's record at 320×760.
- Confirmed 151 live archive entries, normalized `#025` search, punctuation in `Mr. Mime`, type selection, Dark's empty Kanto result and recovery controls.
- Confirmed archive return links retain search context, shared section navigation, route focus and visible keyboard focus on evolution controls.
- Confirmed Eevee's three available Kanto branches each identify Eevee as their parent, with stone labels and an explanation of excluded family members.
- Confirmed hidden-ability labels, stats, type multipliers and type-only context.
- Played Mr. Mime's real cry; the media element reached `ended: true`, with duration/current time 1.036421 seconds and no media error.
- Opened `/pokemon/133` directly in production preview, followed an evolution to Jolteon and reloaded `/pokemon/135` successfully.
- No console errors/warnings were recorded in the reviewed final live flows.
- Fixed the observed mobile Types decoration overflow, narrow-screen debug outline, record search layout and evolution layout. Checked page width against the usable viewport after the fixes; horizontal type rails scroll within their own container.

## Scope and verification limits

Network failures, timeout, retries, missing artwork, rejected/absent audio, partial data, stale responses and boundary records are tested deterministically using API fixtures and browser API shims. The browser pass complements those tests; it is not a cross-browser/device certification or an offline guarantee.

Hosting must supply the documented SPA history fallback. No live deployment, authentication, Games, TCG, collection or deck functionality is included. Matchups and evolution labels use current PokéAPI data without a selected game/version or ability effects.
