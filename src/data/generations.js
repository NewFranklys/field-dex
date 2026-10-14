export const pokemonGenerations = [
  { slug: "gen-i", roman: "I", label: "Generation I", region: "Kanto", first: 1, last: 151 },
  { slug: "gen-ii", roman: "II", label: "Generation II", region: "Johto", first: 152, last: 251 },
  { slug: "gen-iii", roman: "III", label: "Generation III", region: "Hoenn", first: 252, last: 386 },
  { slug: "gen-iv", roman: "IV", label: "Generation IV", region: "Sinnoh", first: 387, last: 493 },
  { slug: "gen-v", roman: "V", label: "Generation V", region: "Unova", first: 494, last: 649 },
  { slug: "gen-vi", roman: "VI", label: "Generation VI", region: "Kalos", first: 650, last: 721 },
  { slug: "gen-vii", roman: "VII", label: "Generation VII", region: "Alola", first: 722, last: 809 },
  { slug: "gen-viii", roman: "VIII", label: "Generation VIII", region: "Galar / Hisui", first: 810, last: 905 },
  { slug: "gen-ix", roman: "IX", label: "Generation IX", region: "Paldea", first: 906, last: 1025 },
];

export const NATIONAL_DEX_LAST_ID = pokemonGenerations.at(-1).last;

export function getGenerationBySlug(slug) {
  return pokemonGenerations.find((generation) => generation.slug === slug) || null;
}

export function getGenerationForPokemon(id) {
  return pokemonGenerations.find(
    (generation) => id >= generation.first && id <= generation.last,
  ) || null;
}

export function inGeneration(id, generationSlug) {
  if (!generationSlug || generationSlug === "all") return true;
  const generation = getGenerationBySlug(generationSlug);
  return Boolean(generation && id >= generation.first && id <= generation.last);
}
