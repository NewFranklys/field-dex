const specialNames = {
  "mr-mime": "Mr. Mime",
  farfetchd: "Farfetch’d",
  "nidoran-f": "Nidoran♀",
  "nidoran-m": "Nidoran♂",
};

export const formatName = (name = "") =>
  specialNames[name] ||
  name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export function normalizeQuery(value) {
  const query = String(value)
    .trim()
    .toLowerCase()
    .replace(/^#\s*/, "")
    .replace(/♀/g, "-f")
    .replace(/♂/g, "-m")
    .replace(/[.’']/g, "")
    .replace(/\s+/g, "-");
  return /^\d+$/.test(query) ? String(Number(query)) : query;
}

export const idFromUrl = (url = "") =>
  Number(String(url).split("/").filter(Boolean).at(-1));

export const speciesIdFromPokemon = (data = {}) =>
  idFromUrl(data.species?.url) || data.species?.id || data.id;

export const artwork = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

export function filterPokemon(list, query, type) {
  const normalized = normalizeQuery(query);
  return list.filter(
    (pokemon) =>
      (!normalized ||
        (/^\d+$/.test(normalized)
          ? pokemon.id === Number(normalized)
          : normalizeQuery(pokemon.name).includes(normalized))) &&
      (type === "all" || pokemon.types.includes(type)),
  );
}

export function evolutionMethod(details = {}) {
  const conditions = [];
  if (details.min_level) conditions.push(`Lv. ${details.min_level}`);
  if (details.item) conditions.push(formatName(details.item.name));
  if (details.trigger?.name === "trade") conditions.push("Trade");
  if (details.held_item)
    conditions.push(`holding ${formatName(details.held_item.name)}`);
  if (details.min_happiness) conditions.push("High friendship");
  if (details.min_affection)
    conditions.push(`Affection ${details.min_affection}+`);
  if (details.min_beauty) conditions.push(`Beauty ${details.min_beauty}+`);
  if (details.time_of_day) conditions.push(formatName(details.time_of_day));
  if (details.gender) conditions.push(details.gender === 1 ? "Female" : "Male");
  if (details.location)
    conditions.push(`at ${formatName(details.location.name)}`);
  if (details.known_move)
    conditions.push(`knowing ${formatName(details.known_move.name)}`);
  if (details.known_move_type)
    conditions.push(
      `knowing a ${formatName(details.known_move_type.name)} move`,
    );
  if (details.relative_physical_stats != null)
    conditions.push(
      {
        "-1": "Attack < Defense",
        0: "Attack = Defense",
        1: "Attack > Defense",
      }[details.relative_physical_stats],
    );
  if (details.needs_overworld_rain) conditions.push("Rain");
  return (
    conditions.join(" · ") ||
    formatName(details.trigger?.name) ||
    "Method not recorded"
  );
}

// Keep parent identity: siblings must never masquerade as successive evolutions.
export function evolutionFamily(node, parent = null) {
  const id = idFromUrl(node.species.url);
  const name = formatName(node.species.name);
  return [
    {
      id,
      name,
      parent,
      image: artwork(id),
      method: parent
        ? [...new Set(node.evolution_details.map(evolutionMethod))].join(
            " / ",
          ) || "Method not recorded"
        : "Base form",
    },
    ...node.evolves_to.flatMap((child) => evolutionFamily(child, { id, name })),
  ];
}

export function calculateMatchups(types) {
  const multipliers = {};
  for (const type of types)
    for (const [relation, factor] of [
      ["double_damage_from", 2],
      ["half_damage_from", 0.5],
      ["no_damage_from", 0],
    ]) {
      for (const { name } of type.damage_relations[relation])
        multipliers[name] = (multipliers[name] ?? 1) * factor;
    }
  const values = Object.entries(multipliers).map(([type, multiplier]) => ({
    type: formatName(type),
    multiplier,
  }));
  return {
    weaknesses: values
      .filter((x) => x.multiplier > 1)
      .sort((a, b) => b.multiplier - a.multiplier),
    resistances: values
      .filter((x) => x.multiplier > 0 && x.multiplier < 1)
      .sort((a, b) => a.multiplier - b.multiplier),
    immunities: values.filter((x) => x.multiplier === 0),
  };
}

export function formatPokemon(data, species) {
  const labels = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Sp. Atk",
    "special-defense": "Sp. Def",
    speed: "Speed",
  };
  const speciesId = species?.id || speciesIdFromPokemon(data);

  return {
    // `id` remains the public species-record identity for current callers.
    id: speciesId,
    number: speciesId,
    speciesId,
    pokemonId: data.id,
    isDefaultForm: data.is_default !== false,
    name: formatName(data.name),
    category:
      species?.genera?.find((x) => x.language.name === "en")?.genus ||
      "Category unavailable",
    description:
      species?.flavor_text_entries
        ?.find((x) => x.language.name === "en")
        ?.flavor_text.replace(/[\f\n\r]+/g, " ") || "No field notes available.",
    habitat: formatName(species?.habitat?.name) || "Unknown",
    generation: species?.generation?.name
      ? `Generation ${species.generation.name.replace("generation-", "").toUpperCase()}`
      : "Unknown",
    height: data.height == null ? "—" : data.height / 10,
    weight: data.weight == null ? "—" : data.weight / 10,
    image:
      data.sprites?.other?.["official-artwork"]?.front_default ||
      data.sprites?.front_default ||
      null,
    cry: data.cries?.latest || data.cries?.legacy || null,
    types: data.types.map((x) => formatName(x.type.name)),
    abilities: data.abilities.map(
      (x) => `${formatName(x.ability.name)}${x.is_hidden ? " (hidden)" : ""}`,
    ),
    stats: data.stats.map((x) => ({
      name: x.stat.name,
      label: labels[x.stat.name] || formatName(x.stat.name),
      value: x.base_stat,
    })),
  };
}
