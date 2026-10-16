import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import RegionArchiveSection from "../components/RegionArchiveSection";
import RegionQuickNav from "../components/RegionQuickNav";
import {
  gameGroups,
  getGameGeneration,
  getGameGroupBySlug,
  regionArchives,
} from "../data/gameContexts";
import { getGameVisual } from "../data/gameVisuals";

const kindOptions = ["all", "mainline", "enhanced", "remake", "sequel", "legends"];

export default function Games() {
  const { t } = useTranslation("games");
  const [search, setSearch] = useState("");
  const [generation, setGeneration] = useState("all");
  const [kind, setKind] = useState("all");

  const generationOptions = useMemo(
    () => [
      "all",
      ...new Set(gameGroups.map((game) => game.generation)),
    ],
    [],
  );

  const visibleGames = useMemo(() => {
    const query = search.trim().toLowerCase();
    return gameGroups.filter((game) => {
      const visual = getGameVisual(game.slug);
      const matchesSearch =
        !query ||
        [
          game.label,
          game.shortLabel,
          game.regionLabel,
          game.dexLabel,
          visual.platform,
        ].some((value) => value.toLowerCase().includes(query));
      const matchesGeneration = generation === "all" || game.generation === generation;
      const matchesKind = kind === "all" || visual.kind === kind;
      return matchesSearch && matchesGeneration && matchesKind;
    });
  }, [generation, kind, search]);

  const visibleSlugs = useMemo(
    () => new Set(visibleGames.map((game) => game.slug)),
    [visibleGames],
  );

  const visibleRegions = regionArchives.filter((region) =>
    region.gameGroups.some((slug) => visibleSlugs.has(slug)),
  );

  const generationCount = new Set(gameGroups.map((game) => game.generation)).size;

  return (
    <main id="main-content" tabIndex={-1} className="games-page games-page--redesign">
      <div id="game-archive-top" />
      <header className="games-hero-v2">
        <div className="games-hero-v2__copy">
          <span>{t("eyebrow")}</span>
          <h1>{t("title")}</h1>
          <p>{t("descriptionCompact")}</p>
        </div>
        <div className="games-hero-v2__meta" aria-label={t("archiveStatsAria")}>
          <div>
            <span>{t("regions")}</span>
            <strong>{regionArchives.length}</strong>
          </div>
          <div>
            <span>{t("archives")}</span>
            <strong>{gameGroups.length}</strong>
          </div>
          <div>
            <span>{t("generations")}</span>
            <strong>{generationCount}</strong>
          </div>
        </div>
      </header>

      <section className="games-controls" aria-label={t("filters.aria")}>
        <label className="games-search-field" htmlFor="games-search">
          <span>{t("filters.search")}</span>
          <input
            id="games-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t("filters.searchPlaceholder")}
          />
        </label>

        <div className="games-filter-group">
          <span>{t("filters.generation")}</span>
          <div>
            {generationOptions.map((slug) => {
              const generationData = slug === "all" ? null : getGameGeneration({ generation: slug });
              return (
                <button
                  key={slug}
                  type="button"
                  aria-pressed={generation === slug}
                  onClick={() => setGeneration(slug)}
                >
                  {slug === "all" ? t("filters.all") : generationData?.roman || slug}
                </button>
              );
            })}
          </div>
        </div>

        <div className="games-filter-group games-filter-group--kind">
          <span>{t("filters.kind")}</span>
          <div>
            {kindOptions.map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={kind === value}
                onClick={() => setKind(value)}
              >
                {value === "all" ? t("filters.all") : t(`filters.kinds.${value}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="games-filter-result" aria-live="polite">
          <span>{t("filters.showing")}</span>
          <strong>{visibleGames.length}</strong>
          <small>{t("filters.of", { total: gameGroups.length })}</small>
        </div>
      </section>

      <RegionQuickNav regions={visibleRegions} />

      <section className="region-directory-v2" aria-label={t("regionAria")}>
        {visibleRegions.length > 0 ? (
          visibleRegions.map((region, regionIndex) => {
            const games = region.gameGroups
              .filter((slug) => visibleSlugs.has(slug))
              .map(getGameGroupBySlug)
              .filter(Boolean);
            return (
              <RegionArchiveSection
                key={region.slug}
                region={region}
                games={games}
                index={regionIndex}
              />
            );
          })
        ) : (
          <div className="games-empty-filter">
            <span>00</span>
            <h2>{t("filters.emptyTitle")}</h2>
            <p>{t("filters.emptyBody")}</p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setGeneration("all");
                setKind("all");
              }}
            >
              {t("filters.clear")}
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
