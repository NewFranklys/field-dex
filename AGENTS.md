# FIELD DEX repository instructions

FIELD DEX is not merely a Pokédex website. The Pokédex is the first module of a broader Pokémon companion platform built around knowledge, game context, TCG collection, decks and community.

Before product or architecture work, read:

- `docs/PRODUCT_VISION.md`
- `docs/ROADMAP.md`
- `docs/DOMAIN_MODEL.md`

## Current product state

V1 — the Kanto Research Archive (001–151) — is complete and merged.

Kanto is a completed first release boundary, not the permanent FIELD DEX limit.

The next major product phase is **Platform Foundation**, followed by National Dex expansion and the later roadmap phases. Do not jump directly into Accounts, TCG, Collection, Deck Intelligence or Community unless the assigned issue explicitly requests that work.

Issue #4 (EN + PT-BR internationalization) is a Platform Foundation subtask, not the entire product roadmap.

## Product and design rules

- Preserve the existing FIELD DEX visual language and research/archive identity when it is working well.
- Do not replace the application with a generic Pokédex/dashboard template or perform a wholesale redesign without an explicit request.
- Keep user-facing interactions polished: loading, empty, error, keyboard/focus, mobile and responsive states matter.
- Treat Pokémon data, game-specific data, TCG data, user/account data, collection data, deck data and community content as distinct domains even when they connect through stable identities.
- Stable IDs own relationships; translated/display names do not.
- Species and forms are distinct concepts. Do not create new National Dex species identities for forms/varieties.
- English is the default/fallback FIELD DEX UI locale; Brazilian Portuguese is an official planned locale. Future locales must remain possible without architectural rewrites.
- System UI localization and user-generated-content language are separate concerns.
- User-created text should retain its authored language; automatic translation is a future presentation feature.
- Objective/source-backed data and community strategy/opinion must remain distinguishable.

## Engineering rules

- Keep external API access out of large page components when practical; centralize reusable data access and transformation logic.
- Prefer small, testable domain/service units over page-specific duplicated fetch/transformation logic.
- Do not place future TCG/account/community persistence into PokéAPI/Pokémon services.
- Avoid hard-coded Kanto limits in generic infrastructure. Release/browse scope belongs in explicit configuration/domain boundaries.
- Document long-lived identity decisions and new cross-domain relationships in `docs/DOMAIN_MODEL.md`.
- Avoid unnecessary dependencies, but use mature libraries when they materially reduce long-term risk (for example, production-grade internationalization).
- Do not introduce credentials or secrets into the repository.
- Do not force-push or rewrite repository history.
- Work on a feature branch for implementation work unless explicitly told otherwise.
- Before declaring implementation work complete, run relevant lint, automated tests and production build, and fix failures caused by the change.
- Preserve or improve CI coverage when expanding critical product behavior.

## Delivery rules

- Follow the dependency order in `docs/ROADMAP.md` unless the task explicitly changes product priorities.
- Finish one bounded phase/subphase before expanding into a dependent major module.
- A new major module should have an explicit source/data strategy, identity model, failure states, tests and definition of done.
- Do not create placeholder navigation that presents an unimplemented future module as if it were complete.
