import { request, ApiError } from "./pokeapi";
import { CURRENT_ARCHIVE, inArchive } from "../data/archive";
import {
  getGameGroupBySlug,
  getIntroductionGameGroupForPokemon,
} from "../data/gameContexts";
import {
  formatPokemon,
  idFromUrl,
  normalizeQuery,
} from "../domain/pokemon";
import {
  buildEncounterRecords,
  buildLearnset,
  versionGroupsFromPokemon,
} from "../domain/gameContext";

function scopeMessage() {
  return `This record is outside the current ${CURRENT_ARCHIVE.label} archive.`;
}

async function getCore(query) {
  const normalized = normalizeQuery(query);
  if (
    !normalized ||
    (/^\d+$/.test(normalized) &&
      !inArchive(Number(normalized), CURRENT_ARCHIVE))
  ) {
    throw new ApiError(scopeMessage(), 404, "outOfScope");
  }

  const data = await request(`pokemon/${encodeURIComponent(normalized)}`);
  const speciesId = idFromUrl(data.species?.url) || data.id;
  if (!inArchive(speciesId, CURRENT_ARCHIVE))
    throw new ApiError(scopeMessage(), 404, "outOfScope");
  if (data.is_default === false)
    throw new ApiError(
      "This alternate form is not exposed in the current species archive.",
      404,
      "alternateForm",
    );

  return { data, speciesId };
}

export async function getGameRecord(
  query,
  gameSlug,
  versionSlug,
  locale = "en",
) {
  const game = getGameGroupBySlug(gameSlug);
  if (!game) throw new ApiError("Unknown game archive.", 404, "gameNotFound");

  const version =
    game.versions.find((entry) => entry.slug === versionSlug) || game.versions[0];
  const { data, speciesId } = await getCore(query);

  const [species, encounterSource] = await Promise.all([
    request(`pokemon-species/${speciesId}`).catch(() => null),
    request(`pokemon/${data.id}/encounters`).catch(() => []),
  ]);

  const pokemon = formatPokemon(data, species, { locale });
  const versionGroups = versionGroupsFromPokemon(data);
  const learnset = buildLearnset(data, game.slug);
  const encounters = buildEncounterRecords(encounterSource, version.slug);
  const introductionGame = getIntroductionGameGroupForPokemon(speciesId);

  return {
    game,
    version,
    pokemon,
    introducedHere: introductionGame?.slug === game.slug,
    hasVersionData: versionGroups.includes(game.slug),
    learnset,
    levelUpMoves: learnset.filter((entry) => entry.method === "level-up"),
    encounters,
  };
}
