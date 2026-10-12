// Product scope belongs here, never in the HTTP client or species model.
export const KANTO_ARCHIVE = Object.freeze({ first: 1, last: 151 });
export const inArchive = (id, archive = KANTO_ARCHIVE) =>
  Number.isInteger(id) && id >= archive.first && id <= archive.last;
export function randomArchiveId(current, random = Math.random) {
  const { first, last } = KANTO_ARCHIVE;
  const count = last - first + 1;
  const offset = Math.floor(
    random() * (inArchive(current) ? count - 1 : count),
  );
  return inArchive(current)
    ? first + ((current - first + 1 + offset) % count)
    : first + offset;
}
