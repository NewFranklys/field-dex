import { request, ApiError } from "./pokeapi";
import { pokemonTypes } from "../data/pokemonTypes";
import {
  CURRENT_ARCHIVE,
  archiveListPath,
  inArchive,
} from "../data/archive";
import {
  artwork,
  idFromUrl,
  formatName,
  normalizeQuery,
  formatPokemon,
  evolutionFamily,
  calculateMatchups,
} from "../domain/pokemon";

export const getTypes = () =>
  Promise.all(pokemonTypes.map((type) => request(`type/${type.slug}`)));

const getIndex = (archive = CURRENT_ARCHIVE) => request(archiveListPath(archive));

function scopeMessage(archive) {
  return `This record is outside the current ${archive.label} archive (${String(
    archive.first,
  ).padStart(3, "0")}–${String(archive.last).padStart(3, "0")}).`;
}

export async function getArchive(archive = CURRENT_ARCHIVE) {
  const [index, types] = await Promise.all([getIndex(archive), getTypes()]);
  const slots = new Map();

  for (const type of types)
    for (const entry of type.pokemon) {
      const id = idFromUrl(entry.pokemon.url);
      if (!inArchive(id, archive)) continue;
      if (!slots.has(id)) slots.set(id, []);
      slots.get(id).push({ slot: entry.slot, name: type.name });
    }

  return index.results
    .map((entry) => {
      const id = idFromUrl(entry.url);
      return {
        id,
        name: formatName(entry.name),
        image: artwork(id),
        types: (slots.get(id) || [])
          .sort((a, b) => a.slot - b.slot)
          .map((x) => x.name),
      };
    })
    .filter((entry) => inArchive(entry.id, archive));
}

async function getCore(query, archive = CURRENT_ARCHIVE) {
  const normalized = normalizeQuery(query);
  if (
    !normalized ||
    (/^\d+$/.test(normalized) && !inArchive(Number(normalized), archive))
  ) {
    throw new ApiError(scopeMessage(archive), 404);
  }

  const data = await request(`pokemon/${encodeURIComponent(normalized)}`);
  const speciesId = idFromUrl(data.species?.url) || data.id;

  if (!inArchive(speciesId, archive)) {
    throw new ApiError(scopeMessage(archive), 404);
  }

  // FIELD DEX currently exposes species records, not alternate Pokémon forms.
  // Keep species identity separate now so Phase 2 can add forms intentionally.
  if (data.is_default === false) {
    throw new ApiError(
      "This alternate form is not exposed in the current species archive.",
      404,
    );
  }

  return { data, speciesId };
}

export async function getFeatured(id, archive = CURRENT_ARCHIVE) {
  const { data, speciesId } = await getCore(id, archive);
  const species = await request(`pokemon-species/${speciesId}`).catch(() => null);
  return formatPokemon(data, species);
}

export async function getRecord(query, archive = CURRENT_ARCHIVE) {
  const { data, speciesId } = await getCore(query, archive);
  const warnings = [];

  async function optional(label, promise) {
    try {
      return await promise;
    } catch {
      warnings.push(`${label} unavailable.`);
      return null;
    }
  }

  const [species, types, index] = await Promise.all([
    optional("Species notes", request(`pokemon-species/${speciesId}`)),
    optional(
      "Type response",
      Promise.all(data.types.map((x) => request(x.type.url))),
    ),
    getIndex(archive).catch(() => null),
  ]);

  const evolution = species?.evolution_chain?.url
    ? await optional("Evolution family", request(species.evolution_chain.url))
    : null;
  const family = evolution ? evolutionFamily(evolution.chain) : [];

  const neighbor = (id) =>
    inArchive(id, archive)
      ? {
          id,
          name:
            formatName(
              index?.results.find((entry) => idFromUrl(entry.url) === id)?.name,
            ) || `Record ${String(id).padStart(3, "0")}`,
        }
      : null;

  return {
    ...formatPokemon(data, species),
    warnings,
    evolutions: family.filter((x) => inArchive(x.id, archive)),
    hasExtendedFamily: family.some((x) => !inArchive(x.id, archive)),
    matchups: types ? calculateMatchups(types) : null,
    navigation: {
      previous: neighbor(speciesId - 1),
      next: neighbor(speciesId + 1),
    },
  };
}
