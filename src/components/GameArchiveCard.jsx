import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import GameLogo from "./GameLogo";
import { getGameGeneration } from "../data/gameContexts";
import { getGameVisual } from "../data/gameVisuals";

export default function GameArchiveCard({ game }) {
  const { t } = useTranslation("games");
  const generation = getGameGeneration(game);
  const visual = getGameVisual(game.slug);
  const archiveStamp = [
    visual.releaseYear,
    generation ? `GEN ${generation.roman}` : "GEN —",
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <Link
      className="game-archive-card"
      to={`/games/${game.slug}`}
      style={{ "--game-accent": visual.accent }}
    >
      <div className="game-archive-card__topline">
        <span>{archiveStamp}</span>
        <span>{t(`filters.kinds.${visual.kind}`)}</span>
      </div>

      <div className="game-archive-card__visual">
        <GameLogo visual={visual} label={game.shortLabel} />
      </div>

      <div className="game-archive-card__copy">
        <h3>{game.shortLabel}</h3>
        <p>{game.dexLabel}</p>
      </div>

      <div className="game-archive-card__meta">
        <span>{visual.platform}</span>
        <span>{game.regionLabel}</span>
      </div>

      <div className="game-archive-card__footer">
        <span>{t("openRecord")}</span>
        <strong aria-hidden="true">→</strong>
      </div>
    </Link>
  );
}
