# FIELD DEX — Product Roadmap

This roadmap defines dependency order, not promised dates. Major features should keep objective source-backed data separate from community opinion and should not collapse National Dex identity, region identity and game/version identity into one model.

## Status legend

- ✅ complete
- 🟡 active / next to decompose
- ⏸ intentionally deferred

---

## Phase 0 — V1 Kanto Research Archive ✅

Established the first shippable FIELD DEX module and engineering baseline.

Delivered:

- Kanto species 001–151;
- Home / Species Archive / Types / individual records;
- resilient PokéAPI behavior;
- responsive/accessibility pass;
- automated tests and CI;
- service/domain boundaries;
- release documentation.

Kanto remains an important archive context, but is no longer the product boundary.

---

## Phase 1 — Platform Foundation ✅

Delivered:

- English default/fallback locale;
- Brazilian Portuguese supported locale;
- locale persistence and `<html lang>` synchronization;
- localized document titles and shared state copy;
- shared FIELD DEX product shell;
- species vs Pokémon/form identity rules;
- source-backed domain/service boundaries;
- architecture that can host National Dex, Games and later TCG/account modules independently.

---

## Phase 2 — National Dex ✅

Delivered:

- National Dex 001–1025;
- search by name/number across the full archive;
- type + generation filters that compose through URL state;
- Generation I–IX metadata and regional labels;
- previous/next navigation across generation boundaries;
- progressive rendering rather than mounting 1000+ cards at once;
- Home/Types/species copy updated away from Kanto-only assumptions;
- forms kept separate from National Dex numbering.

The National Dex is now the stable species identity layer.

---

## Phase 3 — Regions & Game Context Foundation ✅

Purpose: represent region, release generation, game group and individual version as separate concepts from National Dex identity.

Delivered:

- structured regional Game Archives;
- explicit game-group metadata across Kanto, Johto, Hoenn, Sinnoh, Unova, Kalos, Alola, Galar, Hisui and Paldea contexts;
- individual version identity inside each game group;
- regional Pokédex context labels;
- species introduction-game mapping;
- Species → Game Records links;
- `/games` directory and `/games/:gameSlug` routes;
- English/PT-BR UI for the game module;
- source-boundary messaging for incomplete historical data.

Definition of done met: FIELD DEX can now represent `National Dex`, `Region/Generation`, `Game Group` and `Specific Version` without treating them as the same thing.

---

## Phase 4 — Games 🟡

Purpose: turn the game-context foundation into a useful version-specific research pillar.

### Delivered first slice

- wild encounter/location records filtered by individual version;
- encounter methods and level ranges where PokéAPI provides them;
- version-group move data;
- level-up learnsets emphasized in the first UI;
- direct links between species records and relevant regional game contexts.

### Next subphases

1. **Regional/game Pokédex membership**
   - explicit membership and regional numbering;
   - distinguish native dex membership from transfer-only presence.

2. **Encounter depth**
   - encounter conditions, rates and method grouping;
   - clearer route/location hierarchy;
   - gifts/static/event acquisition when reliable sources are available.

3. **Game-specific evolution context**
   - historical evolution methods by selected version;
   - avoid applying modern/global rules retroactively.

4. **Move research**
   - machines, tutors, egg moves and other learn methods;
   - version-specific move detail pages where useful.

5. **Important trainers**
   - Gym Leaders / Elite Four / Champions / major trainers;
   - teams, levels, types and links back to species records.

6. **Forms and regional variants**
   - forms remain attached to stable species identity;
   - Mega/regional/special forms should not become fake National Dex species numbers.

### Definition of done

FIELD DEX can reliably answer useful questions such as:

- “Where can I find this Pokémon in Crystal?”
- “What level is it encountered at?”
- “What does it learn by level in this game?”
- “How does it evolve in this version?”

with clear provenance and source limitations.

---

## Phase 5 — Accounts & Profiles 🟡

Purpose: introduce durable user identity only once the knowledge foundation is stable.

Expected work:

- authentication;
- secure persistence;
- public profile identity separated from account identity;
- locale/product preferences;
- privacy/visibility defaults;
- data ownership/deletion rules.

---

## Phase 6 — TCG Catalog 🟡

Purpose: create a reliable card knowledge domain before ownership/deck intelligence.

Expected work:

- set/expansion directory;
- card search/browse;
- stable card/set/printing identity;
- collector number, rarity, type/subtype;
- image/illustrator metadata;
- legality/format where reliable;
- links from Pokémon Species to related cards.

---

## Phase 7 — My Collection 🟡

Purpose: let users represent the physical cards they own.

Expected work:

- add/remove cards;
- quantities;
- exact printing/set identity;
- language where supported;
- browse/search/filter;
- set completion and collection summaries.

---

## Phase 8 — Deck Builder & Deck Profiles 🟡

Expected work:

- create/edit/save decks;
- quantities and legality validation;
- owned vs missing comparison against My Collection;
- public/private deck profiles;
- For Fun / Competitive / other useful deck categories.

---

## Phase 9 — Collection-aware Deck Intelligence 🟡

Key product question:

> What can I play with what I own?

Recommendation modes can include:

- Best With My Collection;
- No Purchase / owned-only;
- For Fun / favorites-oriented;
- Budget Upgrade;
- Competitive proximity;
- Inspired By an existing deck profile.

Recommendations should explain owned coverage, missing cards, substitutions and known limitations.

---

## Phase 10 — Community 🟡

Potential work:

- public profiles;
- publish/discover deck profiles;
- language-aware discovery;
- favorites/bookmarks/follows where justified;
- moderation/reporting before open comments;
- authored guides and community knowledge kept visibly separate from objective source-backed data.

---

## Phase 11 — Competitive Data Layer 🟡

Potential work:

- tournament decklists;
- event/player/source attribution;
- archetype classification;
- collection comparison against competitive decks;
- meta/trend views where source quality permits.

---

## Phase 12 — Guides & Connected Knowledge 🟡

Potential work:

- game/mechanic guides;
- evolution/acquisition guides;
- deck strategy guides;
- entity linking from Species/Game/Card/Deck pages;
- editorial vs community authorship labels;
- optional localization/translation workflows.

---

## Dependency graph

```text
Kanto V1 ✅
   │
   ▼
Platform Foundation ✅
   │
   ├──► National Dex ✅ ─► Regions/Game Context ✅ ─► Games 🟡
   │
   └──► Accounts ─► TCG Catalog ─► Collection ─► Decks ─► Intelligence
                                           │             │
                                           └─────────────┴──► Community
                                                                │
                                                                ├──► Competitive
                                                                └──► Guides
```

---

## Current implementation focus

The immediate product focus is **Phase 4 — Games**, building on the completed region/version foundation. The next highest-value slices are regional/game Pokédex membership, deeper encounter context, version-aware evolution rules and broader learnset methods.
