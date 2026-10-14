import { expect, it } from "vitest";
import {
  getGenerationForPokemon,
  getGenerationBySlug,
  inGeneration,
  pokemonGenerations,
} from "./generations";

it("covers National Dex generation boundaries without gaps", () => {
  expect(pokemonGenerations[0]).toMatchObject({ first: 1, last: 151 });
  expect(pokemonGenerations.at(-1)).toMatchObject({ first: 906, last: 1025 });

  for (let index = 1; index < pokemonGenerations.length; index += 1) {
    expect(pokemonGenerations[index].first).toBe(
      pokemonGenerations[index - 1].last + 1,
    );
  }
});

it("resolves generation metadata for species ids and URL filters", () => {
  expect(getGenerationForPokemon(152)?.region).toBe("Johto");
  expect(getGenerationForPokemon(906)?.slug).toBe("gen-ix");
  expect(getGenerationBySlug("gen-iv")?.region).toBe("Sinnoh");
  expect(inGeneration(25, "gen-i")).toBe(true);
  expect(inGeneration(25, "gen-ii")).toBe(false);
  expect(inGeneration(1025, "all")).toBe(true);
});
