import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  getGameGeneration,
  getIntroductionGameGroupForPokemon,
  getRegionalGameGroupsForPokemon,
} from "../data/gameContexts";

export default function GameRecords({ pokemon }) {
  const { t } = useTranslation("record");
  const introduction = getIntroductionGameGroupForPokemon(pokemon.number);
  const groups = getRegionalGameGroupsForPokemon(pokemon.number);
  if (!introduction || groups.length === 0) return null;

  const generation = getGameGeneration(introduction);

  return (
    <section className="record-game-records">
      <div className="record-section-heading game-records-heading">
        <span>07</span>
        <div>
          <h2>{t("gameRecords.title")}</h2>
          <small>{t("gameRecords.subtitle")}</small>
        </div>
      </div>

      <div className="game-records-intro">
        <div>
          <span>{t("gameRecords.originContext")}</span>
          <strong>{introduction.regionLabel}</strong>
        </div>
        <div>
          <span>{t("gameRecords.introduced")}</span>
          <strong>
            {generation
              ? `${t("generation")} ${generation.roman}`
              : pokemon.generation}
          </strong>
        </div>
        <p>{t("gameRecords.description", { name: pokemon.name })}</p>
      </div>

      <div className="game-record-grid">
        {groups.map((game) => {
          const gameGeneration = getGameGeneration(game);
          const isOrigin = game.slug === introduction.slug;
          return (
            <Link
              className={`game-record-card${isOrigin ? " origin" : ""}`}
              key={game.slug}
              to={`/games/${game.slug}?pokemon=${pokemon.number}`}
            >
              <span className="game-record-card-index">
                {gameGeneration?.roman || "—"} · {game.regionLabel}
              </span>
              <strong>{game.shortLabel}</strong>
              <small>{game.versions.map((version) => version.label).join(" · ")}</small>
              <span className="game-record-card-state">
                {isOrigin
                  ? t("gameRecords.originRecord")
                  : t("gameRecords.openContext")}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
