// Product/release scope belongs here, never in the HTTP client or species model.
export function createArchiveScope({ key, label, first, last }) {
  if (!Number.isInteger(first) || !Number.isInteger(last) || first < 1 || last < first) {
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

// Phase 2 can change the active release/browse scope without rewriting generic services.
export const CURRENT_ARCHIVE = KANTO_ARCHIVE;

export const archiveSize = (archive = CURRENT_ARCHIVE) =>
  archive.last - archive.first + 1;

export const inArchive = (id, archive = CURRENT_ARCHIVE) =>
  Number.isInteger(id) && id >= archive.first && id <= archive.last;

export const archiveListPath = (archive = CURRENT_ARCHIVE) =>
  `pokemon?offset=${archive.first - 1}&limit=${archiveSize(archive)}`;

export function randomArchiveId(
  current,
  random = Math.random,
  archive = CURRENT_ARCHIVE,
) {
  const { first } = archive;
  const count = archiveSize(archive);
  const hasCurrent = inArchive(current, archive);
  if (count === 1) return first;
  const offset = Math.floor(random() * (hasCurrent ? count - 1 : count));
  return hasCurrent
    ? first + ((current - first + 1 + offset) % count)
    : first + offset;
}
