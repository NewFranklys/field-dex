import { useTranslation } from "react-i18next";
import GameArchiveCard from "./GameArchiveCard";
import { getGameGeneration } from "../data/gameContexts";
import { getRegionVisual } from "../data/gameVisuals";

function generationList(games) {
  return [...new Set(games.map((game) => getGameGeneration(game)?.roman).filter(Boolean))];
}

export default function RegionArchiveSection({ region, games, index }) {
  const { t } = useTranslation("games");
  const visual = getRegionVisual(region.slug);
  const generations = generationList(games);

  if (games.length === 0) return null;

  return (
    <section
      id={`region-${region.slug}`}
      className="region-archive-v2"
      style={{ "--region-accent": visual.accent }}
    >
      <header className="region-archive-v2__header">
        <span className="region-archive-v2__index">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="region-archive-v2__title">
          <small>{t("regionRecord")}</small>
          <h2>{region.label}</h2>
        </div>
        <div className="region-archive-v2__meta">
          <span>{generations.map((generation) => `GEN ${generation}`).join(" · ")}</span>
          <strong>{t("archiveCount", { count: games.length })}</strong>
        </div>
        <span className="region-archive-v2__watermark" aria-hidden="true">
          {region.label}
        </span>
      </header>
      <div className="region-game-grid-v2">
        {games.map((game) => (
          <GameArchiveCard key={game.slug} game={game} />
        ))}
      </div>
    </section>
  );
}
