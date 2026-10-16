import { useCallback, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Artwork from "../components/Artwork";
import ResourceState from "../components/ResourceState";
import {
  getGameGeneration,
  getGameGroupBySlug,
} from "../data/gameContexts";
import { normalizeQuery } from "../domain/pokemon";
import { useResource } from "../hooks/useResource";
import { getGameRecord } from "../services/games";

function levelText(entry, t) {
  if (entry.method === "level-up")
    return entry.level > 0 ? t("level", { level: entry.level }) : t("levelStart");
  return t(`methods.${entry.method}`, { defaultValue: entry.method });
}

export default function GamePage() {
  const { gameSlug } = useParams();
  const game = getGameGroupBySlug(gameSlug);
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const { t, i18n } = useTranslation("games");
  const pokemonQuery = params.get("pokemon") || "";
  const requestedVersion = params.get("version");
  const version =
    game?.versions.find((entry) => entry.slug === requestedVersion) ||
    game?.versions[0] ||
    null;
  const [searchTerm, setSearchTerm] = useState(pokemonQuery);
  const locale = i18n.resolvedLanguage || i18n.language || "en";

  const loader = useCallback(
    (key) => {
      const [query, selectedVersion] = key.split("|");
      if (!query || !game) return null;
      return getGameRecord(query, game.slug, selectedVersion, locale);
    },
    [game, locale],
  );
  const resourceKey = `${pokemonQuery}|${version?.slug || ""}`;
  const { data: record, loading, error, retry } = useResource(loader, resourceKey);

  if (!game) {
    return (
      <main id="main-content" tabIndex={-1} className="resource-state">
        <h1>{t("notFound.title")}</h1>
        <p>{t("notFound.body")}</p>
        <Link to="/games">{t("backToGames")}</Link>
      </main>
    );
  }

  const generation = getGameGeneration(game);

  function submitSearch(event) {
    event.preventDefault();
    const normalized = normalizeQuery(searchTerm);
    if (!normalized) return;
    const next = new URLSearchParams(params);
    next.set("pokemon", normalized);
    next.set("version", version.slug);
    setParams(next);
  }

  function selectVersion(slug) {
    const next = new URLSearchParams(params);
    next.set("version", slug);
    setParams(next);
  }

  return (
    <main id="main-content" tabIndex={-1} className="game-page">
      <header className="game-page-hero">
        <div>
          <Link className="game-back-link" to="/games">
            {t("backToGames")}
          </Link>
          <span className="game-page-eyebrow">
            {t("gameArchive")} / {game.regionLabel} / GEN {generation?.roman}
          </span>
          <h1>{game.label}</h1>
          <p>{t("gameDescription", { region: game.regionLabel })}</p>
        </div>
        <div className="game-page-code" aria-hidden="true">
          <span>{generation?.roman}</span>
          <strong>{game.regionLabel}</strong>
        </div>
      </header>

      <section className="game-version-bar" aria-label={t("versionAria")}>
        <div>
          <span>{t("version")}</span>
          <strong>{version.label}</strong>
        </div>
        <div className="game-version-tabs">
          {game.versions.map((entry) => (
            <button
              key={entry.slug}
              type="button"
              aria-pressed={entry.slug === version.slug}
              onClick={() => selectVersion(entry.slug)}
            >
              {entry.label}
            </button>
          ))}
        </div>
        <div>
          <span>{t("regionalDex")}</span>
          <strong>{game.dexLabel}</strong>
        </div>
      </section>

      <form className="game-pokemon-search" onSubmit={submitSearch}>
        <label htmlFor="game-pokemon-search">{t("searchLabel")}</label>
        <div>
          <input
            id="game-pokemon-search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder={t("searchPlaceholder")}
          />
          <button type="submit">{t("searchAction")} →</button>
        </div>
      </form>

      {!pokemonQuery ? (
        <section className="game-empty-record">
          <span>01</span>
          <div>
            <h2>{t("emptyTitle")}</h2>
            <p>{t("emptyBody", { game: game.shortLabel })}</p>
          </div>
        </section>
      ) : loading || error ? (
        <ResourceState loading={loading} error={error} retry={error?.status === 404 ? null : retry} />
      ) : record ? (
        <>
          <section className="game-species-record">
            <div className="game-species-artwork">
              <span>{String(record.pokemon.number).padStart(3, "0")}</span>
              <Artwork src={record.pokemon.image} alt={record.pokemon.name} />
            </div>
            <div className="game-species-copy">
              <span>{t("speciesContext")}</span>
              <h2>{record.pokemon.name}</h2>
              <p>{t("speciesContextBody", { game: game.shortLabel, version: record.version.label })}</p>
              <div className="game-context-status">
                {record.introducedHere && <span>{t("originRecord")}</span>}
                {record.hasVersionData && <span>{t("versionData")}</span>}
                {!record.hasVersionData && <span>{t("contextOnly")}</span>}
              </div>
              <Link to={`/pokemon/${record.pokemon.number}`}>{t("openSpeciesRecord")} →</Link>
            </div>
          </section>

          <section className="game-data-grid">
            <article className="game-data-panel encounter-panel">
              <header>
                <span>02</span>
                <div>
                  <h2>{t("encounters.title")}</h2>
                  <small>{t("encounters.subtitle", { version: record.version.label })}</small>
                </div>
              </header>
              {record.encounters.length > 0 ? (
                <div className="encounter-list">
                  {record.encounters.map((encounter) => (
                    <div className="encounter-row" key={encounter.locationSlug || encounter.location}>
                      <div>
                        <strong>{encounter.location}</strong>
                        {encounter.maxChance != null && (
                          <small>{t("encounters.maxChance", { chance: encounter.maxChance })}</small>
                        )}
                      </div>
                      <div className="encounter-methods">
                        {encounter.details.map((detail, index) => (
                          <span key={`${detail.method}-${detail.minLevel}-${index}`}>
                            <strong>{detail.methodLabel}</strong>
                            <small>
                              {detail.minLevel != null
                                ? detail.minLevel === detail.maxLevel
                                  ? t("encounters.level", { level: detail.minLevel })
                                  : t("encounters.levelRange", { min: detail.minLevel, max: detail.maxLevel })
                                : t("encounters.levelUnknown")}
                            </small>
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="game-data-empty">
                  <strong>{t("encounters.noneTitle")}</strong>
                  <p>{t("encounters.noneBody")}</p>
                </div>
              )}
            </article>

            <article className="game-data-panel learnset-panel">
              <header>
                <span>03</span>
                <div>
                  <h2>{t("learnset.title")}</h2>
                  <small>{t("learnset.subtitle", { game: game.shortLabel })}</small>
                </div>
              </header>
              {record.levelUpMoves.length > 0 ? (
                <div className="learnset-list">
                  {record.levelUpMoves.map((entry) => (
                    <div key={`${entry.moveSlug}-${entry.level}`}>
                      <span>{levelText(entry, t)}</span>
                      <strong>{entry.move}</strong>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="game-data-empty">
                  <strong>{t("learnset.noneTitle")}</strong>
                  <p>{t("learnset.noneBody")}</p>
                </div>
              )}
              {record.learnset.length > record.levelUpMoves.length && (
                <p className="learnset-footnote">
                  {t("learnset.otherMethods", {
                    count: record.learnset.length - record.levelUpMoves.length,
                  })}
                </p>
              )}
            </article>
          </section>

          <aside className="game-source-note">
            <strong>{t("sourceNote.title")}</strong>
            <p>{t("sourceNote.body")}</p>
          </aside>
        </>
      ) : null}
    </main>
  );
}
