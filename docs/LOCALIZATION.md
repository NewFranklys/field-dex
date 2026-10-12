# FIELD DEX localization

FIELD DEX treats localization as a platform capability, not as duplicated language-specific applications.

## Supported locales

- `en` — English, default and fallback locale.
- `pt-BR` — Brazilian Portuguese, official supported locale.

The first visit starts in English unless a prior FIELD DEX locale preference exists. The application does not silently choose a locale from the browser in the current release.

The selected locale is stored under `field-dex.locale` in local storage and changing language does not change the route, query parameters, filters or current Pokémon record.

## Resource organization

Locale resources live under `src/i18n/locales/` and are split by product namespace:

- `common` — shell, navigation, shared states and canonical type/stat labels;
- `home` — Home experience;
- `pokedex` — current species archive;
- `typesPage` — type observatory;
- `record` — Pokémon records, evolution and media UI;
- `presentation` — localized presentation metadata such as type descriptions and generated labels.

English is the i18next fallback language. New modules should add their own namespace when that produces a clearer ownership boundary instead of growing a single monolithic translation file indefinitely.

## Adding another locale

1. Add locale files mirroring the existing namespaces.
2. Add the locale to `SUPPORTED_LOCALES` and `resources` in `src/i18n/index.js`.
3. Add it to the accessible language selector.
4. Keep English as the fallback unless a product decision explicitly changes that rule.
5. Add tests for switching, persistence and at least one representative page/state.
6. Run lint, all tests and the production build.
7. Review desktop and mobile layouts because translated text length can change substantially.

Do not use translated labels as entity identifiers, API keys, route identities or database relationships.

## Upstream Pokémon data

FIELD DEX-owned interface copy is translated through i18next.

PokéAPI content is treated separately. When a PokéAPI field supplies localized entries, the data layer may select the current FIELD DEX locale. If the requested upstream locale is missing, FIELD DEX falls back to English source content rather than inventing a canonical translation.

Stable species IDs/slugs remain independent from display language.

## Community content

Future user-generated content follows a different rule from system UI:

- FIELD DEX interface follows the viewer's selected locale;
- authored deck names, descriptions, guides, posts and similar content remain in the language in which the author wrote them;
- future authored content should carry language metadata where useful;
- automatic translation is a separate optional presentation feature and must not overwrite the original text.

## TCG identity

Localized card names must never become card identity. Future TCG relationships should use provider-backed stable identifiers plus set/collector-number/printing identity as appropriate. This allows users to own different language printings without fragmenting the underlying card model.
