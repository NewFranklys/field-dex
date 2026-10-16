import { formatName } from "./pokemon";

export function versionGroupsFromPokemon(data = {}) {
  return [
    ...new Set(
      (data.moves || []).flatMap((move) =>
        (move.version_group_details || [])
          .map((detail) => detail.version_group?.name)
          .filter(Boolean),
      ),
    ),
  ];
}

export function buildLearnset(data = {}, versionGroupSlug) {
  const entries = [];

  for (const move of data.moves || []) {
    for (const detail of move.version_group_details || []) {
      if (detail.version_group?.name !== versionGroupSlug) continue;
      entries.push({
        move: formatName(move.move?.name),
        moveSlug: move.move?.name || null,
        method: detail.move_learn_method?.name || "unknown",
        level: detail.level_learned_at ?? 0,
      });
    }
  }

  const deduped = Array.from(
    new Map(
      entries.map((entry) => [
        `${entry.moveSlug}:${entry.method}:${entry.level}`,
        entry,
      ]),
    ).values(),
  );

  const methodRank = {
    "level-up": 0,
    egg: 1,
    tutor: 2,
    machine: 3,
  };

  return deduped.sort(
    (a, b) =>
      (methodRank[a.method] ?? 9) - (methodRank[b.method] ?? 9) ||
      a.level - b.level ||
      a.move.localeCompare(b.move),
  );
}

function cleanLocationName(name = "") {
  return formatName(name.replace(/-area$/, ""));
}

export function buildEncounterRecords(encounters = [], versionSlug) {
  const records = [];

  for (const area of encounters || []) {
    const version = (area.version_details || []).find(
      (detail) => detail.version?.name === versionSlug,
    );
    if (!version) continue;

    const details = (version.encounter_details || []).map((detail) => ({
      method: detail.method?.name || "unknown",
      methodLabel: formatName(detail.method?.name),
      minLevel: detail.min_level ?? null,
      maxLevel: detail.max_level ?? null,
      chance: detail.chance ?? null,
      conditions: (detail.condition_values || []).map((condition) =>
        formatName(condition.name),
      ),
    }));

    records.push({
      location: cleanLocationName(area.location_area?.name),
      locationSlug: area.location_area?.name || null,
      maxChance: version.max_chance ?? null,
      details,
    });
  }

  return records.sort((a, b) => a.location.localeCompare(b.location));
}
