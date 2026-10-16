# Game logo assets

The Games archive uses official game identity art as a visual enhancement, while keeping every game name as real text so the UI never depends on an image to remain understandable.

## Current catalog

The archive now has visual assets for every game record currently represented by FIELD DEX (Red/Blue through Scarlet/Violet).

The runtime URLs are pinned to commit `f9daa66855d12768d3070d28bac8c9eb1798fe0f` of `projeffboy/my-pokemon-team`, whose `game-logos-sources.md` documents the original Bulbagarden Archives source for each image. Pinning the commit makes the rendered assets immutable instead of following a moving `main`/`master` branch.

Source catalog:

`https://github.com/projeffboy/my-pokemon-team/blob/f9daa66855d12768d3070d28bac8c9eb1798fe0f/src/images/game-logos/game-logos-sources.md`

The source catalog uses English logos where standalone English wordmarks exist. Generation I and II do not have equivalent standalone English mascot/version wordmarks in the same form, so their visual assets use trimmed English box-front identity art documented by the source catalog.

These assets are trademarks/logos owned by Nintendo, Creatures, Game Freak and their respective rights holders. FIELD DEX is an unofficial fan project and does not claim ownership or official affiliation.

## Rendering rules

- Game names always remain available as real text below the visual identity art.
- Paired versions render both identities in one normalized visual container.
- Generation I/II box-front crops receive a dedicated sizing treatment so they do not overpower later wordmarks.
- Missing or failed images fall back to a typographic game mark instead of leaving an empty card.
- Logo loading is lazy and must not block page content.
- Reduced-motion preferences disable hover movement.

## Hosting note

The current pinned GitHub raw URLs are deliberately more stable than the first proof pass, which hotlinked moving archive redirects. Before a public production/commercial release, prefer vendoring optimized local copies under FIELD DEX's own static assets while retaining this source record and the existing `GameLogo` metadata contract.
