import { request, ApiError } from "./pokeapi";
import { pokemonTypes } from "../data/pokemonTypes";
import { KANTO_ARCHIVE, inArchive } from "../data/archive";
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
const getIndex = () =>
  request(
    `pokemon?offset=${KANTO_ARCHIVE.first - 1}&limit=${KANTO_ARCHIVE.last - KANTO_ARCHIVE.first + 1}`,
  );
export async function getArchive() {
  const [index, types] = await Promise.all([getIndex(), getTypes()]);
  const slots = new Map();
  for (const type of types)
    for (const entry of type.pokemon) {
      const id = idFromUrl(entry.pokemon.url);
      if (!slots.has(id)) slots.set(id, []);
      slots.get(id).push({ slot: entry.slot, name: type.name });
    }
  return index.results.map((entry) => {
    const id = idFromUrl(entry.url);
    return {
      id,
      name: formatName(entry.name),
      image: artwork(id),
      types: (slots.get(id) || [])
        .sort((a, b) => a.slot - b.slot)
        .map((x) => x.name),
    };
  });
}
async function getCore(query) {
  const normalized = normalizeQuery(query);
  if (
    !normalized ||
    (/^\d+$/.test(normalized) && !inArchive(Number(normalized)))
  )
    throw new ApiError(
      "This record is outside the V1 Kanto archive (001–151).",
      404,
    );
  const data = await request(`pokemon/${encodeURIComponent(normalized)}`);
  if (!inArchive(data.id))
    throw new ApiError(
      "This record is outside the V1 Kanto archive (001–151).",
      404,
    );
  return data;
}
export async function getFeatured(id) {
  const data = await getCore(id);
  const species = await request(`pokemon-species/${data.id}`).catch(() => null);
  return formatPokemon(data, species);
}
export async function getRecord(query) {
  const data = await getCore(query);
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
    optional("Species notes", request(`pokemon-species/${data.id}`)),
    optional(
      "Type response",
      Promise.all(data.types.map((x) => request(x.type.url))),
    ),
    getIndex().catch(() => null),
  ]);
  const evolution = species?.evolution_chain?.url
    ? await optional("Evolution family", request(species.evolution_chain.url))
    : null;
  const family = evolution ? evolutionFamily(evolution.chain) : [];
  const neighbor = (id) =>
    inArchive(id)
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
    evolutions: family.filter((x) => inArchive(x.id)),
    hasExtendedFamily: family.some((x) => !inArchive(x.id)),
    matchups: types ? calculateMatchups(types) : null,
    navigation: {
      previous: neighbor(data.id - 1),
      next: neighbor(data.id + 1),
    },
  };
}
