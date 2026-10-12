const paths = {
  forest: <path d="M16 3 8 14h5l-4 6h6v5h2v-5h6l-4-6h5L16 3Z" />,
  mountain: <path d="m3 25 9-14 4 6 4-5 9 13H3Zm9-10-5 8h18l-5-7-4 5-4-6Z" />,
  cave: <path d="M4 26C5 12 11 5 16 5s11 7 12 21h-7c0-7-2-11-5-11s-5 4-5 11H4Z" />,
  sea: <path d="M3 12c4-3 7 3 11 0s7 3 15 0v4c-8 3-11-3-15 0s-7-3-11 0v-4Zm0 8c4-3 7 3 11 0s7 3 15 0v4c-8 3-11-3-15 0s-7-3-11 0v-4Z" />,
  "waters-edge": <path d="M3 20c5-4 8 4 13 0s8 4 13 0v5c-5 4-8-4-13 0s-8-4-13 0v-5Zm17-15 5 9H15l5-9Z" />,
  grassland: <path d="M5 27c3-10 6-15 8-19-1 8 0 12 2 18 0-10 4-17 8-22-2 9-1 16 1 23H5Z" />,
  "rough-terrain": <path d="m3 26 7-10 4 5 5-11 10 16H3Z" />,
  urban: <path d="M5 27V10h8V5h14v22H5Zm4-13v3h2v-3H9Zm0 6v3h2v-3H9Zm8-10v3h3v-3h-3Zm0 6v3h3v-3h-3Zm0 6v3h3v-3h-3Z" />,
  rare: <path d="m16 3 3 8 8 1-6 5 2 9-7-5-7 5 2-9-6-5 8-1 3-8Z" />,
};

export default function HabitatGlyph({ habitat }) {
  const key = String(habitat || "").toLowerCase();
  return (
    <span className="habitat-glyph" aria-hidden="true">
      <svg viewBox="0 0 32 32">
        {paths[key] || <path d="M16 3a9 9 0 0 0-9 9c0 7 9 17 9 17s9-10 9-17a9 9 0 0 0-9-9Zm0 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" />}
      </svg>
    </span>
  );
}
