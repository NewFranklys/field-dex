import Artwork from "../components/Artwork";
import TypeIcon from "../components/TypeIcon";
import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { getTypeMeta, pokemonTypes } from "../data/pokemonTypes";
import { typeResearch } from "../domain/typeResearch";
import { getTypes } from "../services/pokemon";
import { useResource } from "../hooks/useResource";
import ResourceState from "../components/ResourceState";

function RelationChips({ types }) {
  const { t } = useTranslation("common");
  if (!types || types.length === 0) {
    return <span className="obs-relation-empty">—</span>;
  }
  return (
    <div className="obs-relation-chips">
      {types.map((typeSlug) => {
        const typeMeta = getTypeMeta(typeSlug);
        const name = t(`types.${typeSlug}`, {
          defaultValue: typeMeta?.name || typeSlug,
        });
        return (
          <span
            className="obs-relation-chip"
            key={typeSlug}
            style={{ "--chip-accent": typeMeta?.accent || "#77736a" }}
          >
            <TypeIcon type={typeSlug} label={name} size="sm" />
            {name}
          </span>
        );
      })}
    </div>
  );
}

function Types() {
  const navigate = useNavigate();
  const { t } = useTranslation(["typesPage", "common", "presentation"]);
  const [params, setParams] = useSearchParams();
  const selectedType = pokemonTypes.some((type) => type.slug === params.get("type"))
    ? params.get("type")
    : "fire";
  const setSelectedType = (type) => setParams({ type });
  const { data, loading, error, retry } = useResource(getTypes);
  const research = useMemo(() => (data ? typeResearch(data) : {}), [data]);
  const selectedMeta = useMemo(
    () => getTypeMeta(selectedType) || pokemonTypes[0],
    [selectedType],
  );
  const selectedResearch = research[selectedType];
  const selectedIndex = pokemonTypes.findIndex((type) => type.slug === selectedType);
  const typeName = (slug) => t(`common:types.${slug}`);
  const selectedName = typeName(selectedType);

  function openSelectedType() {
    navigate(`/pokedex?type=${selectedType}`);
  }

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="types-page type-observatory"
      style={{
        "--obs-accent": selectedMeta.accent,
        "--obs-soft": selectedMeta.soft,
      }}
    >
      <header className="types-header">
        <button className="types-logo" onClick={() => navigate("/")}>
          FIELD DEX
        </button>
        <div className="obs-header-data">
          <span>{t("typesPage:headerLabel")}</span>
          <strong>{t("typesPage:headerValue")}</strong>
        </div>
      </header>

      <section className="obs-intro">
        <div>
          <span className="types-eyebrow">{t("typesPage:eyebrow")}</span>
          <h1>{t("typesPage:title")}</h1>
          <p>{t("typesPage:description")}</p>
        </div>
        <div className="obs-status">
          <span>{t("typesPage:database")}</span>
          <strong>
            {loading
              ? t("typesPage:indexing")
              : error
                ? t("typesPage:offline")
                : t("typesPage:classesOnline")}
          </strong>
        </div>
      </section>

      <nav className="type-rail" aria-label={t("typesPage:navAria")}>
        {pokemonTypes.map((type, index) => {
          const isSelected = type.slug === selectedType;
          return (
            <button
              type="button"
              key={type.slug}
              className={`type-rail-item ${isSelected ? "is-selected" : ""}`}
              aria-pressed={isSelected}
              onClick={() => setSelectedType(type.slug)}
            >
              <span className="rail-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <TypeIcon type={type.slug} size="sm" />
              <strong>{typeName(type.slug)}</strong>
              {isSelected && (
                <motion.span
                  className="rail-indicator"
                  layoutId="type-rail-indicator"
                  transition={{ type: "spring", stiffness: 430, damping: 34 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      <section className="observatory-stage">
        <span className="observatory-color-field" />
        <span className="observatory-static-axis horizontal" />
        <span className="observatory-static-axis vertical" />
        {loading ? (
          <div className="obs-loading" role="status">
            <span />
            {t("typesPage:loading")}
          </div>
        ) : error ? (
          <ResourceState error={error} retry={retry} />
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={selectedType}
              className="observatory-motion-layer"
              initial={{ opacity: 0, y: 16 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.28,
                  delay: 0.13,
                  ease: [0.16, 1, 0.3, 1],
                },
              }}
              exit={{
                opacity: 0,
                y: -13,
                transition: { duration: 0.13, ease: [0.4, 0, 1, 1] },
              }}
            >
              <div className="observatory-main">
                <div className="observatory-type-info">
                  <span className="obs-classification">
                    {t("typesPage:classification", {
                      index: String(selectedIndex + 1).padStart(2, "0"),
                    })}
                  </span>
                  <div className="obs-type-title-lockup">
                    <TypeIcon type={selectedType} label={selectedName} size="lg" />
                    <h2>{selectedName}</h2>
                  </div>
                  <p>
                    {t(`presentation:typeDescriptions.${selectedType}`, {
                      defaultValue: selectedMeta.description,
                    })}
                  </p>
                  <div className="obs-record-count">
                    <strong>{selectedResearch?.count ?? 0}</strong>
                    <span>{t("typesPage:kantoRecords")}</span>
                  </div>
                  <button
                    type="button"
                    className="obs-view-species"
                    onClick={openSelectedType}
                  >
                    {t("typesPage:viewSpecies", { type: selectedName })}
                    <strong>→</strong>
                  </button>
                </div>

                <div className="observatory-visual">
                  <span className="observatory-sigil">
                    <TypeIcon type={selectedType} label={selectedName} size="xl" />
                  </span>
                  <span className="obs-stage-scanner" />
                  {selectedResearch?.representatives.length > 0 ? (
                    <motion.div
                      className="observatory-specimens"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: {},
                        visible: {
                          transition: { staggerChildren: 0.075, delayChildren: 0.08 },
                        },
                      }}
                    >
                      {selectedResearch.representatives.map((pokemon, index) => (
                        <motion.button
                          type="button"
                          key={pokemon.id}
                          className={`obs-specimen obs-specimen-${index + 1}`}
                          variants={{
                            hidden: { opacity: 0, y: 25, scale: 0.92 },
                            visible: {
                              opacity: 1,
                              y: 0,
                              scale: 1,
                              transition: {
                                duration: 0.52,
                                ease: [0.16, 1, 0.3, 1],
                              },
                            },
                          }}
                          onClick={() => navigate(`/pokemon/${pokemon.id}`)}
                        >
                          <Artwork src={pokemon.image} alt={pokemon.name} />
                          <span>#{pokemon.id.toString().padStart(3, "0")}</span>
                          <strong>{pokemon.name}</strong>
                        </motion.button>
                      ))}
                    </motion.div>
                  ) : (
                    <div className="obs-empty-specimens">
                      <span>{t("typesPage:noRecords")}</span>
                      <strong>000</strong>
                      <small>{t("typesPage:battleData")}</small>
                    </div>
                  )}
                </div>
              </div>

              <div className="observatory-relations">
                <div className="obs-relation-panel">
                  <div className="obs-relation-heading">
                    <span>01</span>
                    <div>
                      <strong>{t("typesPage:attackProfile")}</strong>
                      <small>{t("typesPage:offensive")}</small>
                    </div>
                  </div>
                  <div className="obs-relation-row">
                    <span>{t("typesPage:superEffective")}</span>
                    <RelationChips types={selectedResearch?.strongAgainst} />
                  </div>
                  <div className="obs-relation-row">
                    <span>{t("typesPage:notVeryEffective")}</span>
                    <RelationChips types={selectedResearch?.notEffectiveAgainst} />
                  </div>
                  <div className="obs-relation-row">
                    <span>{t("typesPage:noEffect")}</span>
                    <RelationChips types={selectedResearch?.noEffectAgainst} />
                  </div>
                </div>

                <div className="obs-relation-panel">
                  <div className="obs-relation-heading">
                    <span>02</span>
                    <div>
                      <strong>{t("typesPage:defenseProfile")}</strong>
                      <small>{t("typesPage:defensive")}</small>
                    </div>
                  </div>
                  <div className="obs-relation-row">
                    <span>{t("typesPage:weakTo")}</span>
                    <RelationChips types={selectedResearch?.weakTo} />
                  </div>
                  <div className="obs-relation-row">
                    <span>{t("typesPage:resists")}</span>
                    <RelationChips types={selectedResearch?.resists} />
                  </div>
                  {selectedResearch?.immuneTo.length > 0 && (
                    <div className="obs-relation-row">
                      <span>{t("typesPage:immuneTo")}</span>
                      <RelationChips types={selectedResearch.immuneTo} />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </section>
    </main>
  );
}

export default Types;
