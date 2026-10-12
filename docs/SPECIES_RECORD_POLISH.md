# Species Record 2.0 — polish pass

This follow-up pass addresses issues found during visual QA of the first Species Record 2.0 release.

## Changes

- Home featured specimen and type module now use the shared type-icon language.
- PT-BR habitat labels are localized and English-only species prose is explicitly marked rather than silently mixed into Portuguese UI.
- Linear evolution families use equal-width cards and show evolution requirements only between stages, avoiding duplicated level requirements.
- Height comparison scales the visual box itself, preventing wide Pokémon artwork from appearing artificially short.
- Historical sprite archive uses a deterministic generation order and representative game allowlist (Yellow, Crystal, Emerald, Platinum, Black/White, X/Y, Ultra Sun/Ultra Moon, Sword/Shield, Scarlet/Violet when available).
- Non-representative entries such as icon sheets or Pokémon Champions are not selected as generation representatives.

## Deferred

- Full official Portuguese species prose dataset.
- National Dex and generation/region navigation.
- Forms browsing and game-specific encounter data.
