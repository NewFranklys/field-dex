# V1 audit

Baseline: `ef31a4c`, inspected before implementation. Read AGENTS.md, PRODUCT_VISION.md and GitHub issue #1 in full. Installed with `npm ci`, started Vite and inspected Home, archive, Eevee record and Types with live PokéAPI data in the browser.

- Existing archive typography, muted type colors, specimen artwork, scanner details and responsive compositions are worth preserving.
- `#025` and zero-padded numbers fail archive search; names with punctuation are inconsistent between search and records. Search is lost on returning from a record.
- Empty filters have no explanation or reset. Request failures lack retry; Home can remain on “Scanning archive” after failure.
- Data access and naming/artwork/type transforms are duplicated across pages. Requests have no timeout, shared cache or stale-result protection.
- Type slot ordering is lost in archive cards (e.g. Bug/Flying appears Flying/Bug).
- Eevee's branches are rendered as successive evolutions. Evolution links and direct queries escape the Kanto boundary. Method labels omit combined conditions.
- Optional species/evolution/type failures prevent the entire record from rendering. Image and rejected audio playback have no deliberate fallback.
- Missing global section navigation, unknown-route recovery, route focus management, Home search label and filter selection semantics.
- Baseline lint: two `react-hooks/set-state-in-effect` errors. Production build passes when Windows subprocess execution is allowed. No tests exist.
- Dependency audit reports two fixable transitive development vulnerabilities. Default README and unreferenced starter assets remain.

Plan: shared PokéAPI client and Pokémon transformations; explicit release configuration; preserve page markup/styles while improving state/navigation; behavior tests for services, routes, search, filters, races, optional failures and media; browser checks at desktop/tablet/mobile sizes; documented production SPA fallback.
