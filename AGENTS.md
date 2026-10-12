# FIELD DEX repository instructions

FIELD DEX is not merely a Pokédex website. The Pokédex is the first module of a broader Pokémon companion platform.

For product or architecture decisions, read `docs/PRODUCT_VISION.md`.

## Current delivery scope

The current release goal is to finish and harden the existing Kanto Pokédex experience (001–151). Do not implement the future Games, TCG Collection, Decks, Community, or account systems unless a task explicitly asks for them.

However, avoid architectural decisions that make those future modules unnecessarily difficult. Prefer reusable data/services/domain boundaries over page-specific duplicated fetch logic or hard-coded assumptions in shared infrastructure.

## Product and design rules

- Preserve the existing FIELD DEX visual language and research/archive identity when it is working well.
- Do not replace the application with a generic Pokédex template or perform a wholesale redesign without an explicit request.
- Keep user-facing interactions polished: loading, empty, error, keyboard/focus, mobile and responsive states matter.
- Treat Pokémon data, game-specific data, TCG data, user collection data and deck data as distinct future domains even when they will eventually be connected by Pokémon/species identity.
- The current Kanto limit is a V1 product constraint, not a permanent architectural rule.

## Engineering rules

- Keep external API access out of large page components when practical; centralize reusable data access and transformation logic.
- Prefer small, testable units over continuing to grow already-large page files.
- Avoid unnecessary dependencies.
- Do not introduce credentials or secrets into the repository.
- Do not force-push or rewrite repository history.
- Work on a feature branch for implementation work unless explicitly told otherwise.
- Before declaring implementation work complete, run the relevant lint, automated tests and production build, and fix failures caused by the change.

## Definition of done for the current V1

The Kanto Pokédex core should feel release-ready rather than demo-ready: reliable search/navigation, coherent data presentation, resilient API states, responsive UI, accessible interactions, useful automated tests, a successful production build, and real project documentation.
