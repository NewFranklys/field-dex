import { getGenerationBySlug, pokemonGenerations } from "./generations";

export const gameGroups = [
  { slug: "red-blue", label: "Pokémon Red / Blue", shortLabel: "Red / Blue", generation: "gen-i", region: "kanto", regionLabel: "Kanto", dexLabel: "Kanto Pokédex", versions: [{ slug: "red", label: "Red" }, { slug: "blue", label: "Blue" }] },
  { slug: "yellow", label: "Pokémon Yellow", shortLabel: "Yellow", generation: "gen-i", region: "kanto", regionLabel: "Kanto", dexLabel: "Kanto Pokédex", versions: [{ slug: "yellow", label: "Yellow" }] },
  { slug: "gold-silver", label: "Pokémon Gold / Silver", shortLabel: "Gold / Silver", generation: "gen-ii", region: "johto", regionLabel: "Johto", dexLabel: "Johto Pokédex", versions: [{ slug: "gold", label: "Gold" }, { slug: "silver", label: "Silver" }] },
  { slug: "crystal", label: "Pokémon Crystal", shortLabel: "Crystal", generation: "gen-ii", region: "johto", regionLabel: "Johto", dexLabel: "Johto Pokédex", versions: [{ slug: "crystal", label: "Crystal" }] },
  { slug: "ruby-sapphire", label: "Pokémon Ruby / Sapphire", shortLabel: "Ruby / Sapphire", generation: "gen-iii", region: "hoenn", regionLabel: "Hoenn", dexLabel: "Hoenn Pokédex", versions: [{ slug: "ruby", label: "Ruby" }, { slug: "sapphire", label: "Sapphire" }] },
  { slug: "emerald", label: "Pokémon Emerald", shortLabel: "Emerald", generation: "gen-iii", region: "hoenn", regionLabel: "Hoenn", dexLabel: "Hoenn Pokédex", versions: [{ slug: "emerald", label: "Emerald" }] },
  { slug: "firered-leafgreen", label: "Pokémon FireRed / LeafGreen", shortLabel: "FireRed / LeafGreen", generation: "gen-iii", region: "kanto", regionLabel: "Kanto", dexLabel: "Kanto Pokédex", versions: [{ slug: "firered", label: "FireRed" }, { slug: "leafgreen", label: "LeafGreen" }] },
  { slug: "diamond-pearl", label: "Pokémon Diamond / Pearl", shortLabel: "Diamond / Pearl", generation: "gen-iv", region: "sinnoh", regionLabel: "Sinnoh", dexLabel: "Sinnoh Pokédex", versions: [{ slug: "diamond", label: "Diamond" }, { slug: "pearl", label: "Pearl" }] },
  { slug: "platinum", label: "Pokémon Platinum", shortLabel: "Platinum", generation: "gen-iv", region: "sinnoh", regionLabel: "Sinnoh", dexLabel: "Sinnoh Pokédex", versions: [{ slug: "platinum", label: "Platinum" }] },
  { slug: "heartgold-soulsilver", label: "Pokémon HeartGold / SoulSilver", shortLabel: "HeartGold / SoulSilver", generation: "gen-iv", region: "johto", regionLabel: "Johto", dexLabel: "Johto Pokédex", versions: [{ slug: "heartgold", label: "HeartGold" }, { slug: "soulsilver", label: "SoulSilver" }] },
  { slug: "black-white", label: "Pokémon Black / White", shortLabel: "Black / White", generation: "gen-v", region: "unova", regionLabel: "Unova", dexLabel: "Unova Pokédex", versions: [{ slug: "black", label: "Black" }, { slug: "white", label: "White" }] },
  { slug: "black-2-white-2", label: "Pokémon Black 2 / White 2", shortLabel: "Black 2 / White 2", generation: "gen-v", region: "unova", regionLabel: "Unova", dexLabel: "Unova Pokédex", versions: [{ slug: "black-2", label: "Black 2" }, { slug: "white-2", label: "White 2" }] },
  { slug: "x-y", label: "Pokémon X / Y", shortLabel: "X / Y", generation: "gen-vi", region: "kalos", regionLabel: "Kalos", dexLabel: "Kalos Pokédex", versions: [{ slug: "x", label: "X" }, { slug: "y", label: "Y" }] },
  { slug: "omega-ruby-alpha-sapphire", label: "Pokémon Omega Ruby / Alpha Sapphire", shortLabel: "Omega Ruby / Alpha Sapphire", generation: "gen-vi", region: "hoenn", regionLabel: "Hoenn", dexLabel: "Hoenn Pokédex", versions: [{ slug: "omega-ruby", label: "Omega Ruby" }, { slug: "alpha-sapphire", label: "Alpha Sapphire" }] },
  { slug: "sun-moon", label: "Pokémon Sun / Moon", shortLabel: "Sun / Moon", generation: "gen-vii", region: "alola", regionLabel: "Alola", dexLabel: "Alola Pokédex", versions: [{ slug: "sun", label: "Sun" }, { slug: "moon", label: "Moon" }] },
  { slug: "ultra-sun-ultra-moon", label: "Pokémon Ultra Sun / Ultra Moon", shortLabel: "Ultra Sun / Ultra Moon", generation: "gen-vii", region: "alola", regionLabel: "Alola", dexLabel: "Alola Pokédex", versions: [{ slug: "ultra-sun", label: "Ultra Sun" }, { slug: "ultra-moon", label: "Ultra Moon" }] },
  { slug: "lets-go-pikachu-lets-go-eevee", label: "Pokémon: Let’s Go, Pikachu! / Eevee!", shortLabel: "Let’s Go Pikachu / Eevee", generation: "gen-vii", region: "kanto", regionLabel: "Kanto", dexLabel: "Kanto Pokédex", versions: [{ slug: "lets-go-pikachu", label: "Let’s Go, Pikachu!" }, { slug: "lets-go-eevee", label: "Let’s Go, Eevee!" }] },
  { slug: "sword-shield", label: "Pokémon Sword / Shield", shortLabel: "Sword / Shield", generation: "gen-viii", region: "galar", regionLabel: "Galar", dexLabel: "Galar Pokédex", versions: [{ slug: "sword", label: "Sword" }, { slug: "shield", label: "Shield" }] },
  { slug: "brilliant-diamond-and-shining-pearl", label: "Pokémon Brilliant Diamond / Shining Pearl", shortLabel: "Brilliant Diamond / Shining Pearl", generation: "gen-viii", region: "sinnoh", regionLabel: "Sinnoh", dexLabel: "Sinnoh Pokédex", versions: [{ slug: "brilliant-diamond", label: "Brilliant Diamond" }, { slug: "shining-pearl", label: "Shining Pearl" }] },
  { slug: "legends-arceus", label: "Pokémon Legends: Arceus", shortLabel: "Legends: Arceus", generation: "gen-viii", region: "hisui", regionLabel: "Hisui", dexLabel: "Hisui Pokédex", versions: [{ slug: "legends-arceus", label: "Legends: Arceus" }] },
  { slug: "scarlet-violet", label: "Pokémon Scarlet / Violet", shortLabel: "Scarlet / Violet", generation: "gen-ix", region: "paldea", regionLabel: "Paldea", dexLabel: "Paldea Pokédex", versions: [{ slug: "scarlet", label: "Scarlet" }, { slug: "violet", label: "Violet" }] },
];

export const regionArchives = [
  { slug: "kanto", label: "Kanto", gameGroups: ["red-blue", "yellow", "firered-leafgreen", "lets-go-pikachu-lets-go-eevee"] },
  { slug: "johto", label: "Johto", gameGroups: ["gold-silver", "crystal", "heartgold-soulsilver"] },
  { slug: "hoenn", label: "Hoenn", gameGroups: ["ruby-sapphire", "emerald", "omega-ruby-alpha-sapphire"] },
  { slug: "sinnoh", label: "Sinnoh", gameGroups: ["diamond-pearl", "platinum", "brilliant-diamond-and-shining-pearl"] },
  { slug: "unova", label: "Unova", gameGroups: ["black-white", "black-2-white-2"] },
  { slug: "kalos", label: "Kalos", gameGroups: ["x-y"] },
  { slug: "alola", label: "Alola", gameGroups: ["sun-moon", "ultra-sun-ultra-moon"] },
  { slug: "galar", label: "Galar", gameGroups: ["sword-shield"] },
  { slug: "hisui", label: "Hisui", gameGroups: ["legends-arceus"] },
  { slug: "paldea", label: "Paldea", gameGroups: ["scarlet-violet"] },
];

const introductionRanges = [
  { first: 1, last: 151, game: "red-blue" },
  { first: 152, last: 251, game: "gold-silver" },
  { first: 252, last: 386, game: "ruby-sapphire" },
  { first: 387, last: 493, game: "diamond-pearl" },
  { first: 494, last: 649, game: "black-white" },
  { first: 650, last: 721, game: "x-y" },
  { first: 722, last: 802, game: "sun-moon" },
  { first: 803, last: 807, game: "ultra-sun-ultra-moon" },
  { first: 808, last: 809, game: "lets-go-pikachu-lets-go-eevee" },
  { first: 810, last: 898, game: "sword-shield" },
  { first: 899, last: 905, game: "legends-arceus" },
  { first: 906, last: 1025, game: "scarlet-violet" },
];

export function getGameGroupBySlug(slug) {
  return gameGroups.find((game) => game.slug === slug) || null;
}

export function getRegionArchiveBySlug(slug) {
  return regionArchives.find((region) => region.slug === slug) || null;
}

export function getIntroductionGameGroupForPokemon(id) {
  const match = introductionRanges.find((range) => id >= range.first && id <= range.last);
  return match ? getGameGroupBySlug(match.game) : null;
}

function generationIndex(slug) {
  return pokemonGenerations.findIndex((generation) => generation.slug === slug);
}

export function getRegionalGameGroupsForPokemon(id) {
  const introduction = getIntroductionGameGroupForPokemon(id);
  if (!introduction) return [];
  const region = getRegionArchiveBySlug(introduction.region);
  if (!region) return [introduction];
  const introducedAt = generationIndex(introduction.generation);
  return region.gameGroups
    .map(getGameGroupBySlug)
    .filter(Boolean)
    .filter((game) => generationIndex(game.generation) >= introducedAt);
}

export function getGameGeneration(game) {
  return game ? getGenerationBySlug(game.generation) : null;
}
