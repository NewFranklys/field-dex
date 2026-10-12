# Phase 1A — Product Shell

Issue: #17

## Goal

Separate FIELD DEX's product identity from the currently available Kanto archive without expanding the dataset yet.

## Decisions

- FIELD DEX is presented globally as a Pokémon companion platform.
- `Species Research` is the currently public module.
- Kanto remains the current archive scope and is identified inside Home/Pokédex content, not as the identity of the entire application.
- The global navigation exposes only implemented routes: Home, Pokédex and Types.
- Future Games, TCG, Accounts and Community modules are not rendered as placeholder navigation.
- The current route structure is unchanged.
- Page focus, skip-link behavior and reduced-motion behavior remain owned by the existing application shell.

## Implementation

- Added `ProductShell` as the shared product-level brand/navigation boundary.
- Moved global navigation out of `App.jsx` into the shared shell.
- Added product-level framing and a current-module status without embedding the Kanto release boundary in the global shell.
- Reframed Home to describe Kanto as the current public archive.
- Reframed the Pokédex page explicitly as the Kanto Species Archive.
- Added dedicated responsive shell styles.
- Added an automated test asserting that the product shell does not identify FIELD DEX itself as Kanto/001–151.

## Deferred

- Internationalization remains Issue #4.
- National Dex readiness/refactoring remains Issue #18.
- Full National Dex expansion remains Epic #6.
- Games, Accounts, TCG and Community remain later phases in `docs/ROADMAP.md`.
