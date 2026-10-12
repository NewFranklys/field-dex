# FIELD DEX visual language

Species Record 2.0 keeps the existing research/archive identity and makes more information readable at a glance.

## Type symbols

The 18 type symbols use the vector recreation from [`partywhale/pokemon-type-icons`](https://github.com/partywhale/pokemon-type-icons), which recreates the modern in-game type icon set and is released under the MIT license. FIELD DEX references those SVGs through a shared `TypeIcon` component so the archive, type observatory, species record and matchup analysis all use one visual vocabulary.

Type names remain localized (`en` / `pt-BR`); type slugs remain stable internal identifiers.

## Species record visual modules

- type-symbol badges and subtle type watermark;
- habitat classification glyph;
- Base Stat Total plus strongest/weakest stat emphasis;
- type-symbol matchup chips;
- connected evolution flow for linear families while preserving branching families;
- evolution method glyphs;
- height comparison against a neutral 1.75 m human reference;
- historical sprite strip derived from PokéAPI `sprites.versions` data.

## Design rules

Visual additions should improve recognition rather than decorate every label. Large editorial typography, thin rules, neutral paper tones and restrained type-color accents remain the core FIELD DEX language.

This pass does not implement National Dex, forms browsing, game-specific encounter data, accounts or TCG.
