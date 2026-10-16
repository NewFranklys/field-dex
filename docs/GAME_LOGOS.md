# Game logo assets

The Games archive supports game logos as a visual enhancement, but UI structure must never depend on a logo being available.

## Current proof assets

The first visual pass uses remote image references for a small set of proof cases:

- Pokémon FireRed Version — Bulbagarden Archives file page: `Pokemon_FireRed_Logo_EN.png`
- Pokémon LeafGreen Version — Bulbagarden Archives file page: `Pokemon_LeafGreen_Logo_EN.png`
- Pokémon Crystal — Bulbagarden Archives file page: `Pokemoncrystal.logo.png`
- Pokémon Legends: Arceus — Wikimedia Commons file page: `Pokémon_Legends_Arceus_Logo.png`

These assets are trademarks/logos owned by their respective rights holders. FIELD DEX is an unofficial fan project and does not claim ownership or official affiliation.

## Rendering rules

- Logos are decorative identity cues; the game name always remains available as real text.
- Paired versions can render two logos in one normalized visual container.
- Missing or failed images fall back to a typographic game mark rather than leaving an empty card.
- Logo loading must not block page content.
- Reduced-motion preferences disable hover movement.

## Future asset pass

Before public production hosting, prefer vendored, optimized local assets with explicit source records instead of depending indefinitely on remote image hosts. Keep the `GameLogo` component and metadata contract stable so replacing remote URLs with local paths does not require page rewrites.
