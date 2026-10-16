import { describe, expect, it } from "vitest";
import {
  getGameGroupBySlug,
  getIntroductionGameGroupForPokemon,
  getRegionalGameGroupsForPokemon,
  regionArchives,
} from "./gameContexts";

describe("game context metadata", () => {
  it("keeps game groups tied to a release generation and regional archive", () => {
    const crystal = getGameGroupBySlug("crystal");
    expect(crystal).toMatchObject({
      region: "johto",
      generation: "gen-ii",
      dexLabel: "Johto Pokédex",
    });
    expect(crystal.versions.map((version) => version.slug)).toEqual(["crystal"]);
    expect(regionArchives.find((region) => region.slug === "johto")?.gameGroups).toContain(
      "heartgold-soulsilver",
    );
  });

  it("maps species to their introduction game context without treating remakes as origins", () => {
    expect(getIntroductionGameGroupForPokemon(152)?.slug).toBe("gold-silver");
    expect(getIntroductionGameGroupForPokemon(808)?.slug).toBe(
      "lets-go-pikachu-lets-go-eevee",
    );
    expect(getIntroductionGameGroupForPokemon(899)?.slug).toBe("legends-arceus");
    expect(getIntroductionGameGroupForPokemon(906)?.slug).toBe("scarlet-violet");
  });

  it("offers only same-region archives released after a species existed", () => {
    expect(getRegionalGameGroupsForPokemon(152).map((game) => game.slug)).toEqual([
      "gold-silver",
      "crystal",
      "heartgold-soulsilver",
    ]);
    expect(getRegionalGameGroupsForPokemon(808).map((game) => game.slug)).toEqual([
      "lets-go-pikachu-lets-go-eevee",
    ]);
  });
});
