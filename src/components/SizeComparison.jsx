import { useState } from "react";
import { useTranslation } from "react-i18next";

const artworkMetricsCache = new Map();

function readVisibleArtworkMetrics(image) {
  const { naturalWidth: width, naturalHeight: height } = image;
  if (!width || !height) return null;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return null;

  try {
    context.drawImage(image, 0, 0, width, height);
    const pixels = context.getImageData(0, 0, width, height).data;
    let top = height;
    let bottom = -1;

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const alpha = pixels[(y * width + x) * 4 + 3];
        if (alpha > 8) {
          if (y < top) top = y;
          if (y > bottom) bottom = y;
        }
      }
    }

    if (bottom < top) return null;
    return { naturalHeight: height, top, bottom };
  } catch {
    // If an upstream image cannot be sampled because of CORS, the visual
    // gracefully falls back to the untrimmed image box.
    return null;
  }
}

function artworkStyle(metrics, targetVisibleHeight) {
  if (!metrics) return { height: `${targetVisibleHeight}px` };

  const visiblePixels = metrics.bottom - metrics.top + 1;
  const renderedHeight =
    (targetVisibleHeight * metrics.naturalHeight) / visiblePixels;
  const bottomPaddingPixels = metrics.naturalHeight - 1 - metrics.bottom;
  const renderedBottomPadding =
    (bottomPaddingPixels / metrics.naturalHeight) * renderedHeight;

  return {
    height: `${renderedHeight}px`,
    transform: `translateY(${renderedBottomPadding}px)`,
  };
}

export default function SizeComparison({ pokemon }) {
  const { t } = useTranslation("record");
  const [artworkMetrics, setArtworkMetrics] = useState(
    () => artworkMetricsCache.get(pokemon.image) || null,
  );
  const pokemonHeight = Number(pokemon.height);
  if (!Number.isFinite(pokemonHeight) || pokemonHeight <= 0) return null;

  const humanHeight = 1.75;
  const tallest = Math.max(humanHeight, pokemonHeight);
  const maxVisualHeight = 170;
  const humanVisualHeight = Math.max(
    16,
    Math.round((humanHeight / tallest) * maxVisualHeight),
  );
  const pokemonVisualHeight = Math.max(
    16,
    Math.round((pokemonHeight / tallest) * maxVisualHeight),
  );

  function handleArtworkLoad(event) {
    if (!pokemon.image || artworkMetricsCache.has(pokemon.image)) return;
    const metrics = readVisibleArtworkMetrics(event.currentTarget);
    if (!metrics) return;
    artworkMetricsCache.set(pokemon.image, metrics);
    setArtworkMetrics(metrics);
  }

  return (
    <section className="record-size-comparison" aria-label={t("sizeComparisonAria")}>
      <div className="record-size-heading">
        <span>05</span>
        <div>
          <h2>{t("sizeComparisonTitle")}</h2>
          <small>{t("sizeComparisonSubtitle")}</small>
        </div>
      </div>
      <div className="size-comparison-stage">
        <div className="size-grid" aria-hidden="true" />
        <div className="size-baseline" />
        <div className="size-figure human">
          <div
            className="size-figure-visual"
            style={{ height: `${humanVisualHeight}px` }}
          >
            <span className="size-height-marker" aria-hidden="true" />
            <svg viewBox="0 6 64 174" role="img" aria-label={t("humanReference")}>
              <circle cx="32" cy="20" r="14" />
              <path d="M22 38h20c7 0 12 5 13 12l4 42H48l-3-29-2 117H32l-2-70-2 70H17L15 63l-3 29H1l4-42c1-7 6-12 13-12h4Z" />
            </svg>
          </div>
          <strong>1.75 m</strong>
          <span>{t("humanReference")}</span>
        </div>
        <div className="size-figure pokemon">
          <div
            className="size-figure-visual"
            style={{ height: `${pokemonVisualHeight}px` }}
          >
            <span className="size-height-marker" aria-hidden="true" />
            <img
              crossOrigin="anonymous"
              src={pokemon.image}
              alt=""
              style={artworkStyle(artworkMetrics, pokemonVisualHeight)}
              onLoad={handleArtworkLoad}
            />
          </div>
          <strong>{pokemon.height} m</strong>
          <span>{pokemon.name}</span>
        </div>
      </div>
    </section>
  );
}
