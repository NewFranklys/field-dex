import { useTranslation } from "react-i18next";

export default function SizeComparison({ pokemon }) {
  const { t } = useTranslation("record");
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
            <svg viewBox="0 0 64 180" role="img" aria-label={t("humanReference")}>
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
            <img src={pokemon.image} alt="" />
          </div>
          <strong>{pokemon.height} m</strong>
          <span>{pokemon.name}</span>
        </div>
      </div>
    </section>
  );
}
