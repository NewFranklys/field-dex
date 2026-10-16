import { describe, expect, it } from "vitest";
import {
  buildEncounterRecords,
  buildLearnset,
  versionGroupsFromPokemon,
} from "./gameContext";

const pokemon = {
  moves: [
    {
      move: { name: "razor-leaf" },
      version_group_details: [
        {
          level_learned_at: 8,
          move_learn_method: { name: "level-up" },
          version_group: { name: "crystal" },
        },
        {
          level_learned_at: 6,
          move_learn_method: { name: "level-up" },
          version_group: { name: "gold-silver" },
        },
      ],
    },
    {
      move: { name: "cut" },
      version_group_details: [
        {
          level_learned_at: 0,
          move_learn_method: { name: "machine" },
          version_group: { name: "crystal" },
        },
      ],
    },
  ],
};

describe("game-context transformations", () => {
  it("extracts supported version groups and builds a version-specific learnset", () => {
    expect(versionGroupsFromPokemon(pokemon)).toEqual([
      "crystal",
      "gold-silver",
    ]);
    expect(buildLearnset(pokemon, "crystal")).toEqual([
      {
        move: "Razor Leaf",
        moveSlug: "razor-leaf",
        method: "level-up",
        level: 8,
      },
      { move: "Cut", moveSlug: "cut", method: "machine", level: 0 },
    ]);
  });

  it("keeps encounters scoped to the selected individual version", () => {
    const records = buildEncounterRecords(
      [
        {
          location_area: { name: "route-29-area" },
          version_details: [
            {
              version: { name: "crystal" },
              max_chance: 30,
              encounter_details: [
                {
                  method: { name: "walk" },
                  min_level: 2,
                  max_level: 3,
                  chance: 30,
                  condition_values: [],
                },
              ],
            },
            {
              version: { name: "gold" },
              max_chance: 20,
              encounter_details: [],
            },
          ],
        },
      ],
      "crystal",
    );

    expect(records).toHaveLength(1);
    expect(records[0]).toMatchObject({
      location: "Route 29",
      maxChance: 30,
    });
    expect(records[0].details[0]).toMatchObject({
      method: "walk",
      methodLabel: "Walk",
      minLevel: 2,
      maxLevel: 3,
    });
  });
});
