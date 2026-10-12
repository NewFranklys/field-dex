# National Dex readiness

Issue: #18

This document records the Phase 1B decisions that keep the current Kanto release intact while preparing FIELD DEX for Phase 2 National Dex expansion.

## Current release boundary

Kanto (001–151) remains the only public species archive in the current release. That boundary is now represented as an explicit archive scope in `src/data/archive.js` rather than being treated as a universal Pokémon-domain rule.

`CURRENT_ARCHIVE` points to the Kanto scope today. Generic archive helpers and Pokémon services accept an archive scope so Phase 2 can expand or introduce additional browse contexts without rewriting those layers.

## Species vs Pokémon/form identity

PokéAPI exposes related but different identities:

- `pokemon-species` represents species/National Dex identity;
- `pokemon` represents a concrete Pokémon variety/form used for battle-facing data such as stats, abilities, sprites and cries.

Those IDs must not be assumed to be interchangeable forever.

FIELD DEX now keeps both values in formatted records:

- `speciesId`: stable species/National Dex identity;
- `pokemonId`: PokéAPI Pokémon/variety identity;
- `id` / `number`: currently remain aliases of `speciesId` for existing species-record callers.

The current UI intentionally exposes only default-form species records. Alternate forms are rejected as separate record routes for now instead of being silently treated as new National Dex entries. Phase 2 can add form presentation deliberately.

## Current archive loading pattern

The V1 archive currently builds its card index from:

1. one Pokémon list request for the configured numeric range;
2. the 18 type endpoints, used to derive type membership and slot ordering.

This was acceptable for the Kanto release and avoids one request per species, but it should be re-evaluated before a full National Dex rollout.

### Scaling risks

- Type endpoints return large membership payloads that include Pokémon well outside the active archive.
- Runtime construction means every cold client depends on several upstream requests before the archive is complete.
- The `/pokemon` resource is a variety/form resource, not the canonical species identity index. Relying on its numeric ordering as the long-term National Dex source would blur species and form identities.
- A much larger archive increases rendering, filtering and artwork/network pressure even if request count stays relatively small.

## Phase 2 recommendation

Before enabling the full National Dex UI, evaluate a species-first catalog strategy.

Preferred direction:

- use species identity (`pokemon-species`) as the canonical National Dex catalog key;
- resolve the default Pokémon variety for battle-facing data separately;
- consider a derived/static catalog index or another source-backed aggregation layer so the browser does not rebuild the entire catalog from large PokéAPI relationship payloads on every cold session;
- keep archive/browse contexts (National, Kanto, later regions/generations) as filters/scopes over species identities rather than separate duplicate species models;
- virtualize/paginate/lazy-render the larger archive if browser QA shows the full grid is too costly;
- keep images lazy and avoid eager detail requests for every card.

A provider/source change is not required by Phase 1B. Phase 2 should benchmark the current approach and choose the smallest reliable change.

## What remains intentionally Kanto-specific

These are valid current-release assumptions and should not be removed merely because the infrastructure is generic:

- Home copy describing the current Kanto archive;
- current archive badge/range;
- Kanto representatives in the Types experience;
- user-facing errors explaining that the current public archive is 001–151;
- current previous/next navigation stopping at Bulbasaur/Mew.

Phase 2 changes those product boundaries when the National Dex is actually shipped.

## Verification expectations

Phase 1B should preserve all V1 behavior while adding tests for:

- arbitrary archive scopes;
- scope-aware archive queries/filtering;
- scope-aware navigation;
- species/form identity separation;
- alternate forms not being misclassified as new species records.
