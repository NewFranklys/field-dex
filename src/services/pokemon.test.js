import { expect, it, vi } from "vitest";
import { request } from "./pokeapi";
import { getArchive, getRecord, getTypes } from "./pokemon";
import { createArchiveScope } from "../data/archive";
import { mockApi, pokemon, response } from "../test/fixtures";

it("shares requests across consumers and reuses type data across modules", async () => {
  const fetch = mockApi();
  await Promise.all([getArchive(), getTypes()]);
  expect(fetch).toHaveBeenCalledTimes(19);
  await getArchive();
  expect(fetch).toHaveBeenCalledTimes(19);
});

it("preserves primary/secondary type slots", async () => {
  mockApi();
  const archive = await getArchive();
  expect(archive.find((p) => p.id === 1).types).toEqual(["grass", "poison"]);
  expect(archive.find((p) => p.id === 1025).types).toEqual(["poison", "ghost"]);
});

it("supports a configured species scope without rewriting services", async () => {
  mockApi();
  const scope = createArchiveScope({
    key: "pikachu-only",
    label: "Pikachu Test",
    first: 25,
    last: 25,
  });

  const archive = await getArchive(scope);
  expect(archive.map((entry) => entry.id)).toEqual([25]);
  expect((await getRecord("25", scope)).speciesId).toBe(25);
  await expect(getRecord("1", scope)).rejects.toMatchObject({ status: 404 });
});

it("keeps alternate Pokémon forms separate from species records", async () => {
  mockApi((url) =>
    url.endsWith("/pokemon/charizard-mega-x")
      ? response({
          ...pokemon(6),
          id: 10034,
          name: "charizard-mega-x",
          is_default: false,
          species: {
            name: "charizard",
            url: "https://pokeapi.co/api/v2/pokemon-species/6/",
          },
        })
      : undefined,
  );

  await expect(getRecord("charizard-mega-x")).rejects.toThrow(
    "alternate form",
  );
});

it("evicts failures so retry can recover", async () => {
  const fetch = mockApi();
  fetch.mockRejectedValueOnce(new Error("Offline"));
  await expect(request("pokemon/25")).rejects.toThrow("Check your connection");
  await expect(request("pokemon/25")).resolves.toHaveProperty("id", 25);
});

it("times out hanging requests and allows retry", async () => {
  vi.useFakeTimers();
  vi.stubGlobal(
    "fetch",
    vi.fn(
      (url, { signal }) =>
        new Promise((resolve, reject) =>
          signal.addEventListener("abort", () => reject(new Error("aborted"))),
        ),
    ),
  );
  const result = expect(request("pokemon/25")).rejects.toThrow("took too long");
  await vi.advanceTimersByTimeAsync(12000);
  await result;
});

it("distinguishes not found from server failure", async () => {
  mockApi((url) =>
    url.endsWith("/missing") ? response({}, 404) : response({}, 503),
  );
  await expect(request("pokemon/missing")).rejects.toMatchObject({
    status: 404,
  });
  await expect(request("pokemon/25")).rejects.toMatchObject({ status: 503 });
});

it("renders available core data when species and type services fail", async () => {
  mockApi((url) =>
    /pokemon-species|\/type\//.test(url) ? response({}, 503) : undefined,
  );
  const record = await getRecord("25");
  expect(record.name).toBe("Pikachu");
  expect(record.warnings).toHaveLength(2);
  expect(record.matchups).toBeNull();
  expect(record.evolutions).toEqual([]);
});

it("navigates across the National Dex while preserving configured scope support", async () => {
  mockApi();
  expect((await getRecord("1")).navigation.previous).toBeNull();
  expect((await getRecord("1025")).navigation.next).toBeNull();
  expect((await getRecord("152")).speciesId).toBe(152);

  const eevee = await getRecord("133");
  expect(eevee.evolutions.map((x) => x.id)).toEqual([133, 134, 135, 136, 196]);
  expect(eevee.hasExtendedFamily).toBe(false);

  await expect(getRecord("1026")).rejects.toMatchObject({ status: 404 });
});
