import { expect, it } from "vitest";
import {
  archiveListPath,
  archiveSize,
  createArchiveScope,
  inArchive,
  randomArchiveId,
} from "./archive";

it("models archive boundaries independently from Kanto", () => {
  const scope = createArchiveScope({
    key: "sample",
    label: "Sample",
    first: 25,
    last: 27,
  });

  expect(archiveSize(scope)).toBe(3);
  expect(inArchive(25, scope)).toBe(true);
  expect(inArchive(28, scope)).toBe(false);
  expect(archiveListPath(scope)).toBe("pokemon?offset=24&limit=3");
  expect(randomArchiveId(25, () => 0, scope)).toBe(26);
  expect(randomArchiveId(27, () => 0.999, scope)).toBe(26);
});

it("falls back to the current release scope for non-scope loader keys", () => {
  expect(archiveListPath("")).toBe("pokemon?offset=0&limit=151");
  expect(inArchive(151, "")).toBe(true);
});

it("rejects invalid archive ranges", () => {
  expect(() =>
    createArchiveScope({ key: "bad", label: "Bad", first: 10, last: 1 }),
  ).toThrow("valid positive integer range");
});
