import { describe, expect, it } from "vitest";
import { evolutionFamily, evolutionMethodMetadata } from "./pokemon";

const speciesNode = (id, details = [], children = []) => ({
  species: { url: `https://pokeapi.co/api/v2/pokemon-species/${id}/`, name: `species-${id}` },
  evolution_details: details,
  evolves_to: children,
});

describe("evolution method metadata", () => {
  it("preserves item and held-item identities independently from display text", () => {
    expect(
      evolutionMethodMetadata({
        trigger: { name: "use-item" },
        item: { name: "moon-stone" },
      }),
    ).toMatchObject({ trigger: "use-item", item: "moon-stone" });

    expect(
      evolutionMethodMetadata({
        trigger: { name: "trade" },
        held_item: { name: "metal-coat" },
      }),
    ).toMatchObject({ trigger: "trade", heldItem: "metal-coat" });
  });

  it("carries structured method data into evolution-family records", () => {
    const family = evolutionFamily(
      speciesNode(29, [], [
        speciesNode(30, [{ min_level: 16 }], [
          speciesNode(31, [
            { trigger: { name: "use-item" }, item: { name: "moon-stone" } },
          ]),
        ]),
      ]),
    );

    expect(family[1].methodDetails[0].minLevel).toBe(16);
    expect(family[2].method).toBe("Moon Stone");
    expect(family[2].methodDetails[0]).toMatchObject({
      trigger: "use-item",
      item: "moon-stone",
    });
  });
});
