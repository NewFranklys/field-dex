import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  getGameGeneration,
  getGameGroupBySlug,
  regionArchives,
} from "../data/gameContexts";

export default function Games() {
  const { t } = useTranslation("games");

  return (
    <main id="main-content" tabIndex={-1} className="games-page">
      <header className="games-hero">
        <span>{t("eyebrow")}</span>
        <h1>{t("title")}</h1>
        <p>{t("description")}</p>
        <div className="games-hero-meta">
          <div>
            <span>{t("regions")}</span>
            <strong>{regionArchives.length}</strong>
          </div>
          <div>
            <span>{t("archives")}</span>
            <strong>
              {regionArchives.reduce(
                (total, region) => total + region.gameGroups.length,
                0,
              )}
            </strong>
          </div>
        </div>
      </header>

      <section className="region-directory" aria-label={t("regionAria")}>
        {regionArchives.map((region, regionIndex) => (
          <article className="region-archive" key={region.slug}>
            <header>
              <span>{String(regionIndex + 1).padStart(2, "0")}</span>
              <div>
                <small>{t("regionRecord")}</small>
                <h2>{region.label}</h2>
              </div>
              <strong>{region.gameGroups.length}</strong>
            </header>
            <div className="region-game-grid">
              {region.gameGroups.map((slug) => {
                const game = getGameGroupBySlug(slug);
                const generation = getGameGeneration(game);
                return (
                  <Link className="region-game-card" key={slug} to={`/games/${slug}`}>
                    <span>
                      {generation ? `GEN ${generation.roman}` : "GEN —"}
                    </span>
                    <strong>{game.shortLabel}</strong>
                    <small>{game.dexLabel}</small>
                    <em>{t("openRecord")} →</em>
                  </Link>
                );
              })}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
