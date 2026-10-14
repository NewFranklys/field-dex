import { NATIONAL_DEX_LAST_ID } from "./generations";

// Product/release scope belongs here, never in the HTTP client or species model.
export function createArchiveScope({ key, label, first, last }) {
  if (
    !Number.isInteger(first) ||
    !Number.isInteger(last) ||
    first < 1 ||
    last < first
  ) {
    throw new Error("Archive scope requires a valid positive integer range.");
  }
  return Object.freeze({ key, label, first, last });
}

export const KANTO_ARCHIVE = createArchiveScope({
  key: "kanto",
  label: "Kanto",
  first: 1,
  last: 151,
});

export const NATIONAL_ARCHIVE = createArchiveScope({
  key: "national",
  label: "National Dex",
  first: 1,
  last: NATIONAL_DEX_LAST_ID,
});

// The public species module now uses National Dex scope. Regional/game scopes stay
// separate so later game-aware browsing does not have to overload National numbering.
export const CURRENT_ARCHIVE = NATIONAL_ARCHIVE;

export const isArchiveScope = (value) =>
  Boolean(
    value &&
      Number.isInteger(value.first) &&
      Number.isInteger(value.last) &&
      value.first >= 1 &&
      value.last >= value.first,
  );

export const resolveArchiveScope = (archive) =>
  isArchiveScope(archive) ? archive : CURRENT_ARCHIVE;

export const archiveSize = (archive = CURRENT_ARCHIVE) => {
  const scope = resolveArchiveScope(archive);
  return scope.last - scope.first + 1;
};

export const inArchive = (id, archive = CURRENT_ARCHIVE) => {
  const scope = resolveArchiveScope(archive);
  return Number.isInteger(id) && id >= scope.first && id <= scope.last;
};

export const archiveListPath = (archive = CURRENT_ARCHIVE) => {
  const scope = resolveArchiveScope(archive);
  return `pokemon?offset=${scope.first - 1}&limit=${archiveSize(scope)}`;
};

export function randomArchiveId(
  current,
  random = Math.random,
  archive = CURRENT_ARCHIVE,
) {
  const scope = resolveArchiveScope(archive);
  const { first } = scope;
  const count = archiveSize(scope);
  const hasCurrent = inArchive(current, scope);
  if (count === 1) return first;
  const offset = Math.floor(random() * (hasCurrent ? count - 1 : count));
  return hasCurrent
    ? first + ((current - first + 1 + offset) % count)
    : first + offset;
}
