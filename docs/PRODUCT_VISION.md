# FIELD DEX — Product Vision

## 1. What FIELD DEX is

FIELD DEX is intended to become a personal Pokémon companion platform, not just a species encyclopedia.

The Pokédex is the first module and the identity anchor. Over time, FIELD DEX should connect four kinds of knowledge around the same Pokémon/species identity:

1. species and biological/game data;
2. game-specific context;
3. Pokémon TCG cards and the user's own collection;
4. deck knowledge from the user, community and competitive play.

The core product idea is context. A normal Pokédex answers "what is this Pokémon?" FIELD DEX should eventually also answer "how does this Pokémon exist in the game I am playing?" and "what can I build with the cards I actually own?"

---

## 2. Current release — V1 Pokédex Core

The current implementation is intentionally focused on Kanto (001–151). V1 should finish this experience before the project expands into the larger platform.

### V1 goals

- polished Home experience;
- Kanto Pokédex browsing;
- search by Pokémon name and National Dex number;
- useful type filters;
- individual Pokémon records;
- species description/category;
- types;
- height and weight;
- abilities;
- base stats;
- evolution family and evolution method where available;
- weaknesses, resistances and immunities;
- Pokémon cry where available;
- previous/next Pokémon navigation;
- type reference experience;
- reliable loading, empty and failure states;
- desktop, tablet and mobile responsiveness;
- basic accessibility and keyboard/focus behavior;
- production-quality README;
- automated tests for important behavior;
- passing lint, tests and production build.

### V1 architectural goal

Kanto is a release boundary, not the long-term data model. The implementation should avoid spreading `151` assumptions and direct API calls across unrelated UI components where they can be centralized cleanly.

V1 should leave the codebase in a condition where future modules can be added without rebuilding the application from scratch.

---

## 3. Future module — Games

FIELD DEX should eventually let the user choose a Pokémon game/version and view Pokémon in that context.

Example questions the module should be able to answer in the future:

- Is this Pokémon available in Pokémon Platinum?
- Where can I catch it in this game?
- At what levels/areas can it appear?
- How does it evolve in this specific version?
- Which moves can it learn in this game?
- Is it part of this game's regional Pokédex?
- Which important trainers use it?

Possible game experiences include regional Pokédex browsing, locations, encounters, movesets, evolution context, important trainers, Elite Four/Champion teams and related guides.

Game-specific data must remain conceptually separate from global species data.

---

## 4. Future module — Pokémon TCG Catalog

FIELD DEX should include a searchable catalog of Pokémon TCG cards.

The catalog may eventually support fields such as:

- card name;
- Pokémon/species relation;
- expansion/set;
- card number;
- rarity;
- card type/subtype;
- artwork/image;
- illustrator;
- legality/format information where reliable data exists.

A Pokémon record should eventually be able to link naturally to cards featuring that Pokémon, but species data and TCG card data remain distinct domains.

---

## 5. Future module — My Collection

A signed-in user should eventually be able to mark which physical TCG cards they own.

The primary purpose is not merely collection display. The collection becomes input for deck intelligence.

Expected concepts include:

- owned card;
- quantity owned;
- exact printing/set when relevant;
- collection browsing and filtering;
- collection completion/coverage information where useful.

Potential later metadata such as card language, condition or trade status should not be assumed in the first implementation unless product requirements explicitly call for it.

---

## 6. Future module — Decks

Decks are a major product pillar.

FIELD DEX should support both deck construction and deck discovery.

### Personal deck builder

Users should be able to construct and save decks using cards from the catalog and understand which cards they actually own.

### Collection-aware deck recommendations

This is one of the product's key differentiators.

The system should eventually be able to inspect the user's collection and answer questions such as:

- What is the best deck I can build using only cards I already own?
- Which playable archetypes am I closest to completing?
- Which deck can I build with no additional purchases?
- Which stronger deck becomes available if I obtain only a few missing cards?
- Which substitutions can I use from my collection when I am missing a recommended card?

A deck recommendation should be explainable. The user should understand why the deck was recommended, how many required cards are already owned, what is missing, and what substitutions are being proposed.

### Recommendation modes

Future recommendation modes may include:

- **For Fun** — prioritizes enjoyable themes, favorite Pokémon and interesting combinations;
- **Best With My Collection** — optimizes around cards already owned;
- **Competitive** — compares the collection against viable competitive archetypes;
- **Budget Upgrade** — identifies small additions that create a meaningful improvement;
- **Inspired By** — adapts an existing community or competitive deck profile to the user's collection.

Do not implement purchase or pricing logic unless explicitly requested and backed by an appropriate data source.

---

## 7. Future module — Community and Competitive Deck Profiles

Users should eventually be able to publish and explore deck profiles.

Profiles can include broad categories such as casual/for-fun and competitive. Competitive lists may eventually reference notable tournament or player decklists when the source and attribution are reliable.

A core interaction should be collection comparison. When opening a deck, the user should be able to see something like:

- cards owned vs total deck requirement;
- cards missing;
- legal substitutions already present in the collection;
- how close the user is to building the deck.

Community opinion and strategy should be presented separately from objective game/card data.

---

## 8. Long-term information architecture

The exact navigation may evolve, but the conceptual product areas are:

- Pokédex
- Games
- TCG Catalog
- My Collection
- Decks
- Community / Deck Profiles
- Guides

A Pokémon/species identity can connect these modules without collapsing them into one data model.

Example future Pokémon record:

- Overview
- Evolutions
- Stats and matchups
- Games
- TCG cards
- Related guides
- Relevant decks

---

## 9. What should NOT happen during the current V1

Do not prematurely build the entire roadmap while finishing the Pokédex.

Specifically, unless a task explicitly expands scope, do not add:

- authentication;
- a production user database;
- card collection persistence;
- deck recommendation algorithms;
- community posting;
- tournament ingestion;
- card pricing/purchasing features;
- game walkthrough systems.

The correct V1 outcome is a strong Pokédex core with code boundaries that do not block these later modules.

---

## 10. Product principles

1. **Useful context over raw data.** Raw API fields should become understandable user information.
2. **Personal relevance.** Long-term value comes from knowing the user's game context and owned cards.
3. **Connected, not monolithic.** Species, games, TCG, collections and decks connect through identities but remain clean domains.
4. **Explain recommendations.** Future deck intelligence should show why it recommends something.
5. **Preserve FIELD DEX identity.** Avoid turning the product into a generic dashboard or generic Pokédex clone.
6. **Finish one layer before expanding.** The current Pokédex should be release-ready before the larger roadmap is implemented.
