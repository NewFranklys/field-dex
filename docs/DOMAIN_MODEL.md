# FIELD DEX — Domain Model

This document defines the conceptual boundaries and stable identity rules that future FIELD DEX implementation work should preserve.

It is intentionally technology-agnostic. Database tables, API routes and frontend folder names may change; the identities and relationships below should remain understandable.

## 1. Core rule: identity is not presentation

Names, translated labels and UI copy are presentation data. They must not be used as the primary identity of long-lived entities.

Examples:

- Pokémon species should be related by stable species identifiers, not by the current English or Portuguese name;
- a game/version should have a stable identifier independent of translated title text;
- a TCG card/printing should be identified by stable source/set/card identifiers rather than localized card name;
- a user-generated deck should reference card identities, not copied display strings.

This rule is essential for internationalization, cross-module links and long-term data integrity.

---

## 2. Pokémon Domain

### Species

Represents a National Dex species identity.

Examples: Bulbasaur, Pikachu, Charizard, Eevee.

A Species may have:

- National Dex number;
- canonical source slug/ID;
- localized display names;
- species metadata;
- evolution relationships;
- one or more Forms/Varieties;
- relationships to game appearances;
- relationships to TCG cards where appropriate.

### Form / Variety

Represents a distinct form or battle/data variation of a Species without inventing a new National Dex species identity.

Examples can include regional forms, Mega forms and other supported variants.

A Form may define form-specific:

- artwork;
- typing;
- stats;
- abilities;
- dimensions;
- game availability.

Not every upstream variety needs to become a first-class FIELD DEX form immediately. Product support can expand incrementally.

### Type

Represents a Pokémon elemental/type identity independent of localization.

Localized labels such as `Fire` and `Fogo` are presentation values for the same Type identity.

### Evolution relationship

Represents a directional relationship between Species/Forms with contextual method information.

Evolution requirements can differ by generation/game, so global evolution summaries must not prevent future game-specific overrides/context.

---

## 3. Games Domain

### Game / Version

Represents a specific Pokémon game/version where rules and content may differ.

Do not collapse multiple versions into one entity when differences matter to encounters, availability or mechanics.

### Generation

Represents a broad franchise/game generation used for discovery and organization.

Generation is not equivalent to a specific game.

### Region

Represents a world/region concept used for discovery.

Region is not automatically equivalent to one exact regional Pokédex.

### Regional/Game Pokédex

Represents a specific ordered set of species/forms relevant to a game or game family.

It may have its own numbering independent of National Dex numbering.

### Encounter / Location

Connects a Pokémon Species/Form to a specific game context and location/method.

Potential fields include:

- game/version;
- location/area;
- encounter method;
- level range;
- conditions;
- rarity/chance where reliable.

### Learnset / game rules

Move availability and certain evolution/mechanic rules belong to game context rather than the global Species object.

### Trainer

Represents important in-game trainers when/if supported. Trainer teams must be scoped to game/version and encounter/rematch context where relevant.

---

## 4. TCG Domain

### Set / Expansion

Represents a TCG expansion/set with stable identity and release metadata.

### Card

Represents a source-backed card record. Exact modeling may depend on the selected TCG data provider.

A card should be identified using stable provider/source identity and set/card information, never only its display name.

Potential fields:

- provider/source ID;
- set ID;
- collector/card number;
- supertype/subtypes;
- rules/text;
- rarity;
- illustrator;
- image references;
- legality/format metadata;
- species relation where applicable.

### Printing / Language Variant

If the selected data source distinguishes language-specific printings, FIELD DEX should preserve that identity.

The user's physical copy may have language/printing metadata even when deck rules treat multiple localized printings as functionally equivalent.

The data model must leave room for both concepts:

- gameplay-equivalent card identity where useful;
- exact owned printing identity where collection accuracy matters.

Do not assume the final equivalence strategy before the TCG provider is selected and audited.

---

## 5. User Domain

### Account

Authentication/security identity.

This should remain separate from public Profile presentation.

### Profile

Public or semi-public user identity.

Potential fields:

- display name;
- avatar;
- bio;
- favorite Pokémon;
- interests/preferences;
- public visibility settings.

### Preferences

Includes product settings such as:

- FIELD DEX UI locale;
- display preferences;
- future game/TCG defaults.

### User language metadata

UI language and authored-content language are separate concepts.

A user can browse FIELD DEX in Portuguese while writing a deck description in English.

---

## 6. Collection Domain

Collection belongs to the user but should remain conceptually distinct from Profile presentation.

### Collection entry

Connects a User to a TCG card/printing.

Expected initial concepts:

- user ID;
- card/printing ID;
- quantity owned;
- language/printing metadata where supported.

Potential later metadata:

- condition;
- trade status;
- notes;
- acquisition metadata.

Deck recommendations should read collection entries rather than duplicating ownership state inside decks.

---

## 7. Deck Domain

### Deck

Represents a saved deck identity owned/authored by a user or imported from a trusted external source.

Potential fields:

- author/source;
- title;
- description;
- format;
- tags/category;
- visibility;
- authored language;
- source attribution where external.

### Deck entry

Connects a Deck to a TCG card identity with required quantity and section/category where the game requires it.

### Deck profile

The public presentation/discovery layer for a deck.

A Deck and its public profile do not need to be separate storage entities initially, but the conceptual distinction matters because private saved decks and public community decks have different product rules.

### Collection comparison

Derived information, not duplicated source-of-truth data.

Given a Deck and a User Collection, FIELD DEX can calculate:

- owned quantity;
- missing quantity;
- completion percentage;
- candidate substitutions when supported.

---

## 8. Recommendation Domain

Deck recommendations are derived from other domains.

Inputs can include:

- user collection;
- deck/card legality;
- deck templates/profiles;
- archetype/synergy knowledge;
- user preferences;
- competitive data where reliable.

Outputs should include an explanation layer:

- why this deck was selected;
- owned vs required cards;
- missing cards;
- suggested substitutions;
- recommendation mode;
- confidence/limitations where useful.

Do not allow recommendation output to silently mutate the user's collection or saved decks.

---

## 9. Community Domain

### Authored content

Community content such as deck descriptions, guides or posts should preserve:

- author;
- authored language;
- timestamps;
- related entities;
- moderation/status metadata when moderation exists.

### Localization rule

FIELD DEX-owned system UI is translated through the product i18n system.

User-generated text is stored in the original authored language. Optional machine translation can later exist as a derived presentation feature and should never destroy the source text.

### Provenance

Content from community users, FIELD DEX editorial work and external competitive/tournament sources must remain distinguishable.

---

## 10. Cross-domain relationships

Important relationships include:

```text
Species ──< Forms
Species ──< Game appearances / encounters
Species ──< TCG cards (where applicable)
Game ──< Regional/Game Pokédex entries
Game ──< Encounters
User ──< Collection entries >── TCG cards/printings
User ──< Decks
Deck ──< Deck entries >── TCG cards
User Collection + Deck ──> Collection comparison
User Collection + Deck/Card knowledge ──> Recommendations
Species/Game/Card/Deck ──< Guides or community references
```

Relationships should be explicit. Avoid embedding every related domain into one enormous Pokémon object or page-specific state shape.

---

## 11. Data ownership and source-of-truth rules

FIELD DEX will likely consume multiple external data sources over time.

For each imported domain, implementation should document:

- source/provider;
- provider identifier retained locally;
- update strategy;
- attribution requirements;
- fields considered authoritative;
- fallback behavior;
- any transformed/derived FIELD DEX fields.

User-owned data such as collection entries, saved decks and preferences should have FIELD DEX-controlled persistence once Accounts are introduced.

---

## 12. Rules for future implementation agents

When implementing a new module:

1. identify which domain owns the new data;
2. use stable IDs for relationships;
3. do not make localized display strings into identifiers;
4. do not put unrelated domain persistence into Pokémon/PokéAPI services;
5. keep source-backed objective data distinct from user/community opinions;
6. add explicit boundaries before building cross-domain intelligence;
7. document any new long-lived identity decision in this file.
