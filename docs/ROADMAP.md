# FIELD DEX — Product Roadmap

This roadmap defines dependency order, not promised dates. Each phase should be implemented through one or more focused issues/PRs with explicit tests and a definition of done.

## Status legend

- ✅ complete
- 🟡 planned / ready to decompose
- ⏸ intentionally deferred

---

## Phase 0 — V1 Kanto Research Archive ✅

Purpose: establish the first shippable FIELD DEX module and engineering baseline.

Delivered:

- Kanto species 001–151;
- Home / Species Archive / Types / individual records;
- robust search/filter/navigation;
- resilient API behavior;
- accessibility/responsive improvements;
- automated tests and CI;
- service/domain boundaries;
- release documentation.

Outcome: Kanto is now one completed archive, not the long-term product limit.

---

## Phase 1 — Platform Foundation 🟡

Purpose: prepare the application for multiple regions, languages and future product modules before adding large new surfaces.

Includes:

### 1A. Internationalization

- English default/fallback;
- Brazilian Portuguese official locale;
- scalable locale resources;
- language switcher and persistence;
- `<html lang>` / localized document titles;
- UI-owned copy extracted from components;
- localized upstream data selection where the source supports it;
- explicit fallback to English where Portuguese source data is unavailable.

Existing issue: #4.

### 1B. Shared product shell

- navigation suitable for Pokédex, Games and later TCG/account modules;
- shared page/state conventions;
- avoid Kanto-specific global branding/navigation assumptions;
- preserve FIELD DEX research/archive visual identity.

### 1C. Identity and domain hardening

- species vs form identity rules;
- remove remaining Kanto-only assumptions from reusable infrastructure;
- document stable identifiers for future Games/TCG integration;
- keep source-backed data services separate by domain.

### Definition of done

Foundation is complete when new locales, National Dex browsing and later domains can be added without rewriting core routing/state/data conventions.

---

## Phase 2 — National Dex 🟡

Purpose: make the Pokédex a true multi-generation species archive.

Expected work:

- configure current supported National Dex range from source data rather than a permanent `151` product boundary;
- browse all supported species;
- search by name/number across the full archive;
- previous/next navigation across the configured National Dex;
- generation filters;
- region-oriented discovery where meaningful;
- preserve Kanto as a filter/archive context;
- adapt Home copy/featured discovery away from Kanto-only framing;
- maintain performance despite the larger dataset;
- define form/variety presentation without treating forms as new National Dex species.

### Definition of done

A user can use FIELD DEX as a complete supported National Dex while still intentionally browsing Kanto or another generation/region context.

---

## Phase 3 — Regions & Game Context Foundation 🟡

Purpose: separate broad generation/region discovery from exact game/version context.

Expected work:

- structured region/generation directory;
- model game/version identity;
- model regional/game Pokédex identity;
- define supported game data sources and limitations;
- establish routes/navigation for Games without yet attempting every game mechanic.

### Definition of done

FIELD DEX can represent `National Dex`, `Region/Generation` and `Specific Game/Version` as separate concepts.

---

## Phase 4 — Games 🟡

Purpose: deliver the second major FIELD DEX knowledge pillar.

Incremental scope should include:

- game/version directory;
- game-specific Pokédex browsing;
- species availability;
- encounters/locations;
- encounter methods and level ranges where reliable;
- game-specific evolution context;
- learnsets/moves when the chosen source supports them;
- important trainers / Elite Four / Champions in later subphases;
- links from a Species record into supported game contexts.

Avoid presenting current-generation/global data as if it were historically correct for every game.

### Definition of done

FIELD DEX can answer useful version-specific questions instead of only showing global species data.

---

## Phase 5 — Accounts & Profiles 🟡

Purpose: introduce durable user identity only once the knowledge foundation is stable.

Expected work:

- authentication;
- secure user/account persistence;
- public profile identity;
- product preferences including locale;
- favorite Pokémon/interests where useful;
- privacy/visibility defaults;
- data ownership/deletion rules.

Do not mix authentication identity directly with public profile presentation.

### Definition of done

Users can sign in and own persistent FIELD DEX data safely, preparing the platform for Collection and Community.

---

## Phase 6 — TCG Catalog 🟡

Purpose: create a reliable card knowledge domain before any ownership/deck intelligence.

Prerequisite: select and audit a TCG data provider.

Expected work:

- set/expansion directory;
- card search/browse;
- stable card/set identity;
- collector number;
- rarity/type/subtype;
- image/illustrator metadata;
- legality/format where reliable;
- language/printing model based on provider capabilities;
- links from Pokémon Species to related cards where reliable.

### Definition of done

FIELD DEX has a stable, source-backed TCG catalog whose identifiers are safe for user collections and decks.

---

## Phase 7 — My Collection 🟡

Purpose: let users represent the physical cards they own.

Expected work:

- add/remove owned cards;
- quantity owned;
- exact printing/set identity;
- card language when supported;
- collection browse/search/filter;
- ownership display on card pages;
- collection summary/coverage metrics where useful.

Optional metadata such as condition/trade status can be deferred.

### Definition of done

A signed-in user's collection is a trustworthy source of truth that later deck systems can query.

---

## Phase 8 — Deck Builder & Deck Profiles 🟡

Purpose: create the deck representation required before recommendations.

Expected work:

- create/edit/save decks;
- deck entries with quantities;
- format/legal validation where reliable;
- compare deck requirements with My Collection;
- show owned/missing quantities;
- private/public visibility foundations;
- authored deck title/description/language metadata;
- initial `For Fun` / `Competitive` / other useful deck categories.

### Definition of done

Users can build decks and understand exactly how much of each deck they already own.

---

## Phase 9 — Collection-aware Deck Intelligence 🟡

Purpose: deliver one of FIELD DEX's key differentiators.

Recommendation modes can be introduced iteratively:

- Best With My Collection;
- No Purchase / owned-only;
- For Fun / favorites-oriented;
- Budget Upgrade;
- Competitive proximity;
- Inspired By an existing deck profile.

Every recommendation should explain:

- why it was suggested;
- owned/required coverage;
- missing cards;
- substitutions from owned cards where supported;
- known limitations.

### Definition of done

A user can ask, effectively, `What can I play with what I own?` and receive useful, explainable answers.

---

## Phase 10 — Community 🟡

Purpose: build a multilingual social/discovery layer around structured FIELD DEX knowledge.

Potential work:

- public profiles;
- publish deck profiles;
- discover/browse community decks;
- language metadata and language-aware discovery;
- favorites/bookmarks/follows if justified;
- guides/authored knowledge;
- moderation/reporting before introducing high-cost social features such as open comments.

User-generated text remains in the original authored language. Automatic translation is a future optional presentation feature.

### Definition of done

Users can share and discover useful Pokémon/TCG knowledge without confusing community opinion with objective source-backed data.

---

## Phase 11 — Competitive Data Layer 🟡

Purpose: connect external tournament/competitive information when reliable sources and update strategy are available.

Potential work:

- competitive decklists;
- event/tournament attribution;
- player/source attribution;
- archetype classification;
- collection comparison against tournament decks;
- meta/trend views if data quality permits.

### Definition of done

Competitive information has clear provenance and can be meaningfully compared with a user's own collection.

---

## Phase 12 — Guides & Connected Knowledge 🟡

Purpose: make FIELD DEX a connected knowledge system rather than a set of isolated tools.

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
V1 Kanto ✅
   │
   ▼
Platform Foundation
   │
   ├──────────────► National Dex ─► Regions ─► Games
   │
   └──────────────► Accounts ─► TCG Catalog ─► Collection ─► Decks ─► Intelligence
                                                   │             │
                                                   └─────────────┴────► Community
                                                                        │
                                                                        ├──► Competitive
                                                                        └──► Guides
```

The graph is directional guidance, not a prohibition against small preparatory work. Major features should not skip their data/model prerequisites.

---

## Current next decision

The immediate implementation focus is **Phase 1 — Platform Foundation**.

Issue #4 (EN + PT-BR) is one subtask of that phase and should be implemented in the context of the Foundation rather than treated as the whole next product release.
