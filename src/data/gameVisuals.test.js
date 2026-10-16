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
        expect(logo.src).toContain("raw.githubusercontent.com/projeffboy/my-pokemon-team/");
      }
    }
  });

  it("keeps generation I and II identity art explicitly marked as box-front crops", () => {
    for (const slug of ["red-blue", "yellow", "gold-silver", "crystal"]) {
      expect(getGameVisual(slug).logos.every((logo) => logo.isBoxFront)).toBe(true);
    }
  });
});
