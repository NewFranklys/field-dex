import { vi } from "vitest";
import { pokemonTypes } from "../data/pokemonTypes";
const base = "https://pokeapi.co/api/v2/";
const names = {
  1: "bulbasaur",
  2: "ivysaur",
  6: "charizard",
  25: "pikachu",
  122: "mr-mime",
  133: "eevee",
  134: "vaporeon",
  135: "jolteon",
  136: "flareon",
  150: "mewtwo",
  151: "mew",
};
const speciesTypes = {
  1: ["grass", "poison"],
  2: ["grass", "poison"],
  6: ["fire", "flying"],
  25: ["electric"],
  122: ["psychic", "fairy"],
  133: ["normal"],
  134: ["water"],
  135: ["electric"],
  136: ["fire"],
  150: ["psychic"],
  151: ["psychic"],
};
export const index = {
  results: Object.entries(names).map(([id, name]) => ({
    name,
    url: `${base}pokemon/${id}/`,
  })),
};
export const pokemon = (id = 25) => ({
  id,
  name: names[id],
  height: 4,
  weight: 60,
  types: speciesTypes[id].map((name, i) => ({
    slot: i + 1,
    type: { name, url: `${base}type/${name}/` },
  })),
  abilities: [
    { ability: { name: "static" }, is_hidden: false },
    { ability: { name: "lightning-rod" }, is_hidden: true },
  ],
  stats: [
    "hp",
    "attack",
    "defense",
    "special-attack",
    "special-defense",
    "speed",
  ].map((name) => ({ stat: { name }, base_stat: 55 })),
  cries: { latest: "https://example.test/cry.ogg" },
  sprites: {
    other: {
      "official-artwork": { front_default: `https://example.test/${id}.png` },
    },
  },
});
const node = (id, children = [], details = []) => ({
  species: {
    name: names[id] || "espeon",
    url: `${base}pokemon-species/${id}/`,
  },
  evolution_details: details,
  evolves_to: children,
});
export const eeveeFamily = {
  chain: node(133, [
    node(
      134,
      [],
      [{ trigger: { name: "use-item" }, item: { name: "water-stone" } }],
    ),
    node(135, [], [{ item: { name: "thunder-stone" } }]),
    node(136, [], [{ item: { name: "fire-stone" } }]),
    node(196, [], [{ min_happiness: 220, time_of_day: "day" }]),
  ]),
};
export const species = (id) => ({
  genera: [{ language: { name: "en" }, genus: "Mouse Pokémon" }],
  flavor_text_entries: [
    { language: { name: "en" }, flavor_text: "Field\nnotes\fhere." },
  ],
  habitat: { name: "forest" },
  generation: { name: "generation-i" },
  evolution_chain: { url: `${base}evolution-chain/${id}/` },
});
export const typeData = (name) => ({
  name,
  pokemon: Object.entries(speciesTypes)
    .filter(([, types]) => types.includes(name))
    .map(([id, types]) => ({
      slot: types.indexOf(name) + 1,
      pokemon: { name: names[id], url: `${base}pokemon/${id}/` },
    })),
  damage_relations: {
    double_damage_from: name === "electric" ? [{ name: "ground" }] : [],
    half_damage_from: [],
    no_damage_from: [],
    double_damage_to: [],
    half_damage_to: [],
    no_damage_to: [],
  },
});
export const response = (data, status = 200) => ({
  ok: status >= 200 && status < 300,
  status,
  json: async () => data,
});
export function apiFixture(url) {
  const path = String(url).replace(base, "").replace(/\/$/, "");
  if (path.startsWith("pokemon?")) return response(index);
  if (path.startsWith("type/")) {
    const name = path.split("/")[1];
    if (pokemonTypes.some((t) => t.slug === name))
      return response(typeData(name));
  }
  const [resource, query] = path.split("/");
  const id = /^\d+$/.test(query)
    ? Number(query)
    : Number(Object.keys(names).find((id) => names[id] === query));
  if (resource === "pokemon" && names[id]) return response(pokemon(id));
  if (resource === "pokemon-species" && names[id]) return response(species(id));
  if (resource === "evolution-chain")
    return response(id === 133 ? eeveeFamily : { chain: node(id) });
  return response({}, 404);
}
export function mockApi(override) {
  const fetch = vi.fn(
    async (url, options) =>
      (await override?.(String(url), options)) ?? apiFixture(url),
  );
  vi.stubGlobal("fetch", fetch);
  return fetch;
}
