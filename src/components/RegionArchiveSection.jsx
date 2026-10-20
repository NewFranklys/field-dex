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

          <div
            className="region-archive-v2__summary"
            aria-label={t("dossier.aria", { region: region.label })}
          >
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
        </div>

        <div className="region-archive-v2__meta">
          <strong>{t("archiveCount", { count: games.length })}</strong>
        </div>
      </header>

      <div className={`region-game-grid-v2 region-game-grid-v2--count-${layoutCount}`}>
        {games.map((game) => (
          <GameArchiveCard key={game.slug} game={game} />
        ))}
      </div>
    </section>
  );
}
