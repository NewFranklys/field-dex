import { describe, expect, it } from "vitest";
import {
  normalizeQuery,
  filterPokemon,
  evolutionFamily,
  evolutionMethod,
  calculateMatchups,
  formatPokemon,
} from "./pokemon";
import { eeveeFamily, pokemon } from "../test/fixtures";
import { randomArchiveId } from "../data/archive";

describe("Pokémon transformations", () => {
  it.each([
    [" #025 ", "25"],
    ["001", "1"],
    ["Mr. Mime", "mr-mime"],
    ["Farfetch’d", "farfetchd"],
    ["Nidoran♀", "nidoran-f"],
    ["Nidoran M", "nidoran-m"],
  ])("normalizes %s", (input, output) =>
    expect(normalizeQuery(input)).toBe(output),
  );

  it("combines exact numeric searches and partial names with type filters", () => {
    const list = [
      { id: 25, name: "Pikachu", types: ["electric"] },
      { id: 125, name: "Electabuzz", types: ["electric"] },
    ];
    expect(filterPokemon(list, "#025", "electric")).toEqual([list[0]]);
    expect(filterPokemon(list, "pika", "water")).toEqual([]);
    expect(filterPokemon(list, "PIKA", "all")).toEqual([list[0]]);
  });

  it("retains sibling parents instead of inventing sequential evolutions", () => {
    const family = evolutionFamily(eeveeFamily.chain);
    expect(family.slice(1).every((x) => x.parent.id === 133)).toBe(true);
    expect(family[1].method).toBe("Water Stone");
    expect(family.at(-1).method).toBe("High friendship · Day");
  });

  it("combines trade items, level and additional conditions", () => {
    expect(
      evolutionMethod({
        trigger: { name: "trade" },
        held_item: { name: "metal-coat" },
      }),
    ).toBe("Trade · holding Metal Coat");
    expect(evolutionMethod({ min_level: 20, relative_physical_stats: 1 })).toBe(
      "Lv. 20 · Attack > Defense",
    );
  });

  it("multiplies dual types including cancellation, quarter resistance and immunity", () => {
    const relations = (double, half, none) => ({
      damage_relations: {
        double_damage_from: double.map((name) => ({ name })),
        half_damage_from: half.map((name) => ({ name })),
        no_damage_from: none.map((name) => ({ name })),
      },
    });
    expect(
      calculateMatchups([
        relations(["rock", "water", "ground"], ["grass", "fire"], []),
        relations(["rock"], ["grass", "water"], ["ground"]),
      ]),
    ).toEqual({
      weaknesses: [{ type: "Rock", multiplier: 4 }],
      resistances: [
        { type: "Grass", multiplier: 0.25 },
        { type: "Fire", multiplier: 0.5 },
      ],
      immunities: [{ type: "Ground", multiplier: 0 }],
    });
  });

  it("supplies honest missing-data fallbacks and labels hidden abilities", () => {
    const result = formatPokemon(
      { ...pokemon(), sprites: {}, cries: {} },
      null,
    );
    expect(result.image).toBeNull();
    expect(result.cry).toBeNull();
    expect(result.category).toBe("Category unavailable");
    expect(result.abilities).toContain("Lightning Rod (hidden)");
  });

  it("keeps species identity distinct from an alternate pokemon form id", () => {
    const result = formatPokemon(
      {
        ...pokemon(6),
        id: 10034,
        name: "charizard-mega-x",
        is_default: false,
        species: {
          name: "charizard",
          url: "https://pokeapi.co/api/v2/pokemon-species/6/",
        },
      },
      { id: 6 },
    );

    expect(result.id).toBe(6);
    expect(result.speciesId).toBe(6);
    expect(result.pokemonId).toBe(10034);
    expect(result.isDefaultForm).toBe(false);
  });

  it("random encounters stay in scope without repeating the current specimen", () => {
    for (const current of [1, 25, 151])
      for (const value of [0, 0.5, 0.999]) {
        const id = randomArchiveId(current, () => value);
        expect(id).not.toBe(current);
        expect(id).toBeGreaterThanOrEqual(1);
        expect(id).toBeLessThanOrEqual(151);
      }
  });
});
