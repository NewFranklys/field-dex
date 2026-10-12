# FIELD DEX — Product Vision

## 1. Product definition

FIELD DEX is a Pokémon companion platform built around five connected ideas:

**knowledge + context + collection + play + community**.

The Pokédex is the first module and the species identity anchor, but it is not the final product. FIELD DEX should eventually connect a Pokémon to the games where it exists, the cards that represent it, the decks that use those cards, guides and community knowledge, while also understanding the user's own collection and preferences.

A normal Pokédex answers:

> What is this Pokémon?

FIELD DEX should eventually also answer:

> How does this Pokémon exist in the game I am playing?
>
> Which cards of this Pokémon exist in the TCG?
>
> Which of those cards do I own?
>
> What decks can I actually build with the cards I already have?

The product should feel like one connected Pokémon research system rather than several unrelated databases.

---

## 2. Product principles

1. **Useful context over raw data.** Raw API fields should become understandable information.
2. **Stable identity first.** Pokémon, forms, games, cards and users must be identified by stable IDs, not translated display names.
3. **Connected, not monolithic.** Species, games, TCG, users, collections, decks and community content connect through explicit relationships while remaining separate domains.
4. **Personal relevance.** Long-term value comes from knowing the user's game context, preferences and owned cards.
5. **Explain recommendations.** Future deck intelligence must explain why a deck was suggested, what is owned, what is missing and what can substitute.
6. **International by design.** English is the default/fallback UI language and Brazilian Portuguese is an official supported language. Future locales should not require architectural rewrites.
7. **Community content keeps authorship.** User-created content remains in its authored language by default; optional translation is a separate future capability.
8. **Preserve FIELD DEX identity.** Avoid turning the product into a generic dashboard or generic Pokédex clone.
9. **Finish layers before expanding.** Each phase should become stable before the next major dependency is built on top of it.
10. **Objective data and community opinion are different.** Official/source-backed facts must remain distinguishable from user strategy, commentary and recommendations.

---

## 3. Current completed release — V1 Kanto Research Archive

V1 established a production-quality first module around Kanto species 001–151.

It includes Home, archive browsing, normalized search, type filtering, individual field records, category/description, types, height/weight, abilities, base stats, evolution families, matchup information, cry playback, previous/next navigation, Types reference, resilient loading/error/partial-data states, responsive behavior, accessibility improvements, tests and CI.

Kanto is a historical release boundary, not the long-term Pokédex model.

The V1 architecture already separates reusable domain/data/service logic from page orchestration so later regions and modules do not have to rebuild the application from scratch.

---

## 4. Platform Foundation

Before major product expansion, FIELD DEX needs a stable platform layer that future modules can share.

This foundation includes:

- internationalization with English default/fallback and Brazilian Portuguese;
- shared navigation patterns suitable for multiple product modules;
- stable identity rules for species, forms, games and future TCG cards;
- clear domain boundaries;
- reusable error/loading/data-state conventions;
- documentation for localized and user-generated content;
- architecture that can expand beyond Kanto without treating 151 as a global limit.

This phase should not prematurely implement Accounts, TCG Collection, Deck Intelligence or Community.

---

## 5. Pokédex — National Dex

The Pokédex should expand from the V1 Kanto archive to the supported National Dex rather than remaining permanently limited to 151 species.

Expected capabilities include:

- National Dex browsing;
- generation filtering;
- region filtering where meaningful;
- search across all supported species;
- navigation across the configured National Dex release;
- species pages that remain the canonical identity anchor for cross-module relationships;
- explicit handling of forms and varieties without incorrectly assigning new National Dex identities.

### Species vs forms

Species identity and form identity must remain distinct.

Examples:

- Charizard remains National Dex #006;
- Mega Charizard X is a form/variety related to Charizard, not a new National Dex species;
- regional forms remain linked to the underlying species identity;
- form-specific typing, stats, abilities or appearance can be modeled separately when supported.

The exact set of supported forms can expand iteratively, but the data model must not confuse forms with species.

---

## 6. Regions and Generations

Kanto should become one browse context among several rather than the identity of the entire product.

FIELD DEX should eventually support structured navigation through regions/generations such as Kanto, Johto, Hoenn, Sinnoh, Unova and later regions.

Region/generation browsing is a discovery layer over species identity. It must not be confused with a game's exact regional Pokédex, because different games in the same broad region may have different availability and rules.

---

## 7. Games

Games are one of FIELD DEX's major differentiators.

The user should eventually be able to choose a Pokémon game/version and view Pokémon in that specific context.

Example questions:

- Is this Pokémon available in Pokémon Platinum?
- Where can I catch it in this version?
- At what levels and in which areas can it appear?
- How does it evolve in this game?
- Which moves can it learn here?
- Is it part of this game's regional Pokédex?
- Which important trainers use it?

Potential game experiences include:

- game/version directory;
- game-specific Pokédex;
- encounters and locations;
- level ranges and encounter methods;
- learnsets/moves where reliable data exists;
- version-specific evolution requirements;
- important trainers;
- Elite Four and Champion teams;
- related guides.

Game-specific data must remain separate from global species data. A global Pokémon page can link to game contexts, but game rules must not overwrite canonical species identity.

---

## 8. Accounts and Profiles

Accounts are the foundation for personalization and later community systems.

Future profile concepts may include:

- username/display name;
- avatar;
- preferred FIELD DEX UI language;
- additional languages understood;
- favorite Pokémon;
- favorite games or TCG preferences;
- public/private profile settings;
- future collection/deck/community relationships.

Authentication and the user database should be introduced only when the product phase explicitly requires them.

---

## 9. Pokémon TCG Catalog

FIELD DEX should include a searchable Pokémon TCG catalog as a separate domain connected to Pokémon/species identity.

Expected fields may include:

- stable card identifier;
- expansion/set;
- collector/card number;
- localized display name where available;
- Pokémon/species relation where applicable;
- card type/subtype;
- rarity;
- artwork/image;
- illustrator;
- rules/text where legally and technically appropriate;
- legality/format information where reliable data exists;
- printing/language metadata where supported.

### Card identity rule

A card must never be identified internally only by its localized name.

The same logical or related printing may appear in English, Portuguese, Japanese or other languages. Stable identifiers, set identity and collector/card number must drive relationships. Localized names are presentation data.

---

## 10. My Collection

Signed-in users should eventually be able to catalog the physical TCG cards they own.

The collection is not merely a gallery. It is the primary input for future deck intelligence.

Expected concepts include:

- owned card/printing;
- quantity owned;
- exact set/printing where relevant;
- card language where relevant;
- collection filtering and browsing;
- collection coverage against decks.

Later optional metadata may include condition, trade status or acquisition details, but those should not block the first useful collection implementation.

---

## 11. Decks

Decks are a major product pillar and should support both construction and discovery.

### Personal deck builder

Users should be able to build and save decks from the TCG catalog and understand which cards they actually own.

A deck view should be able to show:

- required quantity per card;
- owned quantity;
- missing quantity;
- legality/format where reliable data exists;
- deck notes or authored description;
- collection completion percentage.

### Deck profiles

Decks can eventually be published as profiles by community members or represented from reliable competitive sources.

Deck profiles may be categorized broadly as casual/for-fun, budget, competitive, tournament list or other useful product categories.

---

## 12. Collection-aware Deck Intelligence

This is one of FIELD DEX's strongest intended differentiators.

The system should eventually be able to inspect the user's collection and answer:

- What is the best deck I can build using only cards I already own?
- Which playable archetypes am I closest to completing?
- Which deck can I build with no additional purchases?
- Which stronger deck becomes available if I obtain only a few missing cards?
- Which substitutions can I use from my collection when a recommended card is missing?

Possible recommendation modes include:

- **For Fun** — prioritizes themes, favorites and interesting combinations;
- **Best With My Collection** — optimizes around owned cards;
- **Competitive** — compares the collection against viable archetypes;
- **Budget Upgrade** — identifies small additions with meaningful improvement;
- **Inspired By** — adapts an existing community or competitive deck profile to the user's collection.

Recommendations must be explainable rather than opaque.

Pricing/purchasing logic is not required unless a later phase explicitly chooses a reliable data source and product direction for it.

---

## 13. Community

FIELD DEX can eventually become a multilingual Pokémon community layer around the structured product data.

Potential community features include:

- public profiles;
- published decks;
- deck descriptions and strategy notes;
- guides;
- follows/bookmarks or similar discovery relationships if justified;
- language-aware discovery;
- comments or discussion only if the moderation/product cost is explicitly accepted.

### Language rule for community content

System UI follows the user's selected FIELD DEX locale.

User-generated content remains in the language authored by its creator and should carry language metadata where practical. Automatic translation can be offered later as an explicit feature; it should not silently replace the original text.

Community strategy/opinion must remain distinguishable from objective card/game data.

---

## 14. Competitive layer

A later competitive layer may connect reliable tournament/player decklists to FIELD DEX.

Potential experiences include:

- notable decklists;
- tournament/event context;
- archetype discovery;
- player/deck references when attribution is reliable;
- collection comparison against a competitive list;
- metagame/trend information if a reliable source and update strategy exist.

A key interaction is still personal relevance:

> You own 52/60 cards in this list. These are the missing cards.

Competitive ingestion must have explicit source attribution and must not be presented as official FIELD DEX data when it originates from external/community sources.

---

## 15. Guides and Knowledge

Guides should be connected to the entities they discuss instead of becoming an isolated wiki.

Examples:

- a Pokémon record can link to evolution or game-specific guides;
- a game can link to progression or mechanic guides;
- a deck can link to a strategy guide;
- a card can link to deck profiles that use it.

Guides may be editorial, community-authored or source-backed, but authorship and provenance should remain clear.

---

## 16. Long-term information architecture

The exact navigation can evolve, but the conceptual product areas are:

- Pokédex
- Regions / Generations
- Games
- TCG Catalog
- My Collection
- Decks
- Deck Intelligence
- Community
- Competitive
- Guides
- Account / Profile

A future Pokémon record may expose connected views such as:

- Overview
- Forms
- Evolutions
- Stats and matchups
- Games
- TCG cards
- Related guides
- Relevant decks/community references

These are connected views over shared identity, not one giant data object.

---

## 17. Domain model at a glance

FIELD DEX should evolve around the following conceptual domains:

```text
FIELD DEX
│
├── Pokémon Domain
│   ├── Species
│   ├── Forms
│   ├── Types
│   └── Evolutions
│
├── Games Domain
│   ├── Games / Versions
│   ├── Regional Dexes
│   ├── Encounters / Locations
│   ├── Learnsets / Rules
│   └── Trainers
│
├── TCG Domain
│   ├── Sets
│   ├── Cards
│   ├── Printings
│   └── Localized card data
│
├── User Domain
│   ├── Account
│   ├── Profile
│   ├── Preferences
│   └── Collection
│
├── Deck Domain
│   ├── Decks
│   ├── Deck entries
│   ├── Deck profiles
│   └── Recommendations
│
└── Community Domain
    ├── Published decks
    ├── Guides
    ├── Authored content
    └── Social/discovery relationships
```

Detailed identity/boundary rules live in `docs/DOMAIN_MODEL.md`.

---

## 18. Delivery strategy

Do not build the entire vision in one pass.

Each phase should have an explicit product boundary, tests and definition of done. Dependencies matter: for example, collection-aware recommendations depend on a stable TCG catalog, user identity, collection representation and deck representation.

The canonical implementation order is maintained in `docs/ROADMAP.md`.
