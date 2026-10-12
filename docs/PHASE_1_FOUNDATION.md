# Phase 1 — Platform Foundation

This phase is the current implementation focus after V1 Kanto.

Its job is not to ship a major new content module. Its job is to make the existing application a safe base for National Dex, Games, Accounts and TCG expansion.

## Goals

### A. Internationalization foundation

- English (`en`) default/fallback;
- Brazilian Portuguese (`pt-BR`) official supported locale;
- scalable locale resources;
- language switcher and persistence;
- localized document/accessibility text;
- explicit upstream-data fallback rules;
- no route loss while switching locale.

Tracked by Issue #4.

### B. Product shell

- shared navigation/header patterns that are not Kanto-only;
- preserve current route behavior and FIELD DEX identity;
- define where future modules will appear without exposing fake/unfinished navigation;
- consistent error/loading/empty page-state behavior.

### C. National Dex readiness

- move any remaining reusable infrastructure away from permanent 001–151 assumptions;
- keep release/browse scope configurable;
- define species/form identity use in UI and services;
- prepare archive/query patterns for a larger species set;
- document performance/data-loading risks before expanding to the full National Dex.

This phase does **not** itself need to expose every Pokémon beyond 151. That is Phase 2.

### D. Domain boundaries

- Pokémon services stay Pokémon-focused;
- future Games, TCG, User, Collection, Deck and Community services get separate ownership;
- stable IDs, not localized strings, are used for relationships;
- future user-generated language rules are documented.

## Non-goals

Do not implement during Phase 1 unless a dedicated issue explicitly changes scope:

- authentication;
- user profiles;
- TCG catalog;
- My Collection;
- deck builder;
- deck recommendation engine;
- community publishing;
- tournament ingestion;
- full game/version data.

## Exit criteria

Phase 1 is complete when:

- the existing V1 works fully in EN and PT-BR;
- locale choice persists and fallback behavior is tested;
- application shell/global copy no longer assumes Kanto is the entire product;
- reusable infrastructure can support a larger National Dex without hard-coded Kanto behavior;
- domain/identity rules are reflected in code where relevant and documented elsewhere;
- current lint/tests/build/CI pass;
- browser QA confirms the existing V1 remains stable on desktop and mobile.
