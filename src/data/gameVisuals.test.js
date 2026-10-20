import { describe, expect, it } from "vitest";
import { gameGroups } from "./gameContexts";
import { getGameVisual } from "./gameVisuals";

describe("game archive visual metadata", () => {
  it("provides at least one visual identity asset for every current game archive", () => {
    for (const game of gameGroups) {
      const visual = getGameVisual(game.slug);
      expect(visual.logos?.length, game.slug).toBeGreaterThan(0);
      for (const logo of visual.logos) {
        expect(logo.label).toBeTruthy();
        expect(logo.src).toMatch(/^https:\/\//);
        expect(logo.src).not.toContain("projeffboy/my-pokemon-team");
      }
    }
  });

  it("keeps generation I and II identity art explicitly marked as box-front crops", () => {
    for (const slug of ["red-blue", "yellow", "gold-silver", "crystal"]) {
      const logos = getGameVisual(slug).logos;
      expect(logos.every((logo) => logo.isBoxFront)).toBe(true);
      expect(logos.every((logo) => logo.src.includes("img.pokemondb.net/boxes/"))).toBe(true);
    }
  });

  it("uses the pinned game-logo archive for generation III onward", () => {
    for (const slug of ["ruby-sapphire", "firered-leafgreen", "black-white", "x-y", "scarlet-violet"]) {
      expect(
        getGameVisual(slug).logos.every((logo) =>
          logo.src.includes("raw.githubusercontent.com/Cosmi4002/pokeshinytracker/7ea6cdc12a8e979428b6835d97ded65c3f82f1b4/"),
        ),
      ).toBe(true);
    }
  });
});
