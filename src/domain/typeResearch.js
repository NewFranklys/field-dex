import { artwork, idFromUrl, formatName } from "./pokemon";
import { CURRENT_ARCHIVE, inArchive } from "../data/archive";

const representativePreferences = {
  normal: [
    143, // Snorlax
    128, // Tauros
    133, // Eevee
  ],
  fire: [
    6, // Charizard
    38, // Ninetales
    59, // Arcanine
  ],
  water: [
    9, // Blastoise
    131, // Lapras
    134, // Vaporeon
  ],
  electric: [
    25, // Pikachu
    26, // Raichu
    135, // Jolteon
  ],
  grass: [
    3, // Venusaur
    45, // Vileplume
    103, // Exeggutor
  ],
  ice: [
    144, // Articuno
    131, // Lapras
    124, // Jynx
  ],
  fighting: [
    68, // Machamp
    106, // Hitmonlee
    57, // Primeape
  ],
  poison: [
    34, // Nidoking
    94, // Gengar
    110, // Weezing
  ],
  ground: [
    112, // Rhydon
    28, // Sandslash
    51, // Dugtrio
  ],
  flying: [
    149, // Dragonite
    142, // Aerodactyl
    18, // Pidgeot
  ],
  psychic: [
    150, // Mewtwo
    65, // Alakazam
    122, // Mr. Mime
  ],
  bug: [
    123, // Scyther
    12, // Butterfree
    127, // Pinsir
  ],
  rock: [
    142, // Aerodactyl
    76, // Golem
    95, // Onix
  ],
  ghost: [
    94, // Gengar
    93, // Haunter
    92, // Gastly
  ],
  dragon: [
    149, // Dragonite
    148, // Dragonair
    147, // Dratini
  ],
  dark: [],
  steel: [
    82, // Magneton
    81, // Magnemite
  ],
  fairy: [
    36, // Clefable
    40, // Wigglytuff
    122, // Mr. Mime
  ],
};

function pickRepresentatives(pokemonList, typeSlug) {
  const pokemonById = new Map(
    pokemonList.map((pokemon) => [pokemon.id, pokemon]),
  );
  const preferredIds = representativePreferences[typeSlug] || [];
  const selected = [];
  preferredIds.forEach((id) => {
    const pokemon = pokemonById.get(id);
    if (pokemon) selected.push(pokemon);
  });
  if (selected.length >= 3) return selected.slice(0, 3);

  const fallbackIndexes = [
    0,
    Math.floor(pokemonList.length / 2),
    pokemonList.length - 1,
  ];
  fallbackIndexes.forEach((index) => {
    const pokemon = pokemonList[index];
    if (
      pokemon &&
      !selected.some((item) => item.id === pokemon.id) &&
      selected.length < 3
    ) {
      selected.push(pokemon);
    }
  });
  return selected;
}

export function typeResearch(dataList, archive = CURRENT_ARCHIVE) {
  return Object.fromEntries(
    dataList.map((data) => {
      const list = data.pokemon
        .map((entry) => {
          const id = idFromUrl(entry.pokemon.url);
          return {
            id,
            name: formatName(entry.pokemon.name),
            image: artwork(id),
          };
        })
        .filter((p) => inArchive(p.id, archive))
        .sort((a, b) => a.id - b.id);
      const r = data.damage_relations;
      return [
        data.name,
        {
          count: list.length,
          representatives: pickRepresentatives(list, data.name),
          strongAgainst: r.double_damage_to.map((t) => t.name),
          notEffectiveAgainst: r.half_damage_to.map((t) => t.name),
          noEffectAgainst: r.no_damage_to.map((t) => t.name),
          weakTo: r.double_damage_from.map((t) => t.name),
          resists: r.half_damage_from.map((t) => t.name),
          immuneTo: r.no_damage_from.map((t) => t.name),
        },
      ];
    }),
  );
}
