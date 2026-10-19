import { useTranslation } from "react-i18next";
import GameArchiveCard from "./GameArchiveCard";
import { getGameGeneration } from "../data/gameContexts";
import { getGameVisual, getRegionVisual } from "../data/gameVisuals";

function generationList(games) {
  return [...new Set(games.map((game) => getGameGeneration(game)?.roman).filter(Boolean))];
}

function platformList(games) {
  return [...new Set(games.map((game) => getGameVisual(game.slug).platform).filter(Boolean))];
}

function kindList(games) {
  return [...new Set(games.map((game) => getGameVisual(game.slug).kind).filter(Boolean))];
}

export default function RegionArchiveSection({ region, games, index }) {
  const { t } = useTranslation("games");
  const visual = getRegionVisual(region.slug);
  const generations = generationList(games);
  const platforms = platformList(games);
  const kinds = kindList(games);
  const layoutCount = Math.min(games.length, 4);

  if (games.length === 0) return null;

  return (
    <section
      id={`region-${region.slug}`}
      className={`region-archive-v2 region-archive-v2--count-${layoutCount}`}
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

      <div className={`region-game-grid-v2 region-game-grid-v2--count-${layoutCount}`}>
        {games.map((game) => (
          <GameArchiveCard key={game.slug} game={game} />
        ))}
      </div>

      <div className="region-context-strip" aria-label={t("dossier.aria", { region: region.label })}>
        <div className="region-context-strip__identity">
          <span>{t("dossier.title")}</span>
          <strong>{String(index + 1).padStart(2, "0")} / {region.label.toUpperCase()}</strong>
        </div>

        <div className="region-context-strip__facts">
          <span>
            <small>{t("generations")}</small>
            <strong>{generations.map((generation) => `GEN ${generation}`).join(" · ")}</strong>
          </span>
          <span>
            <small>{t("dossier.platforms")}</small>
            <strong>{platforms.join(" · ")}</strong>
          </span>
          <span>
            <small>{t("dossier.formats")}</small>
            <strong>{kinds.map((kind) => t(`filters.kinds.${kind}`)).join(" · ")}</strong>
          </span>
        </div>

        <div className="region-context-strip__marks" aria-hidden="true">
          {games.map((game) => {
            const gameVisual = getGameVisual(game.slug);
            return (
              <span key={game.slug} style={{ "--strip-accent": gameVisual.accent }}>
                {gameVisual.mark}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
