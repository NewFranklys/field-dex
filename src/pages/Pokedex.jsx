import Artwork from "../components/Artwork";

import { useNavigate, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { getTypeMeta, pokemonTypes } from "../data/pokemonTypes";
import {
  formatName as formatPokemonName,
  filterPokemon,
} from "../domain/pokemon";
import { getArchive } from "../services/pokemon";
import { useResource } from "../hooks/useResource";
import ResourceState from "../components/ResourceState";

function Pokedex() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFromUrl = searchParams.get("type");
  const selectedType = pokemonTypes.some((type) => type.slug === typeFromUrl)
    ? typeFromUrl
    : "all";
  const { data: pokemonList, loading, error, retry } = useResource(getArchive);
  const searchTerm = searchParams.get("q") || "";

  function setSearchTerm(value) {
    const next = new URLSearchParams(searchParams);
    value ? next.set("q", value) : next.delete("q");
    setSearchParams(next, { replace: true });
  }

  const filteredPokemon = filterPokemon(
    pokemonList || [],
    searchTerm,
    selectedType,
  );
  const selectedTypeMeta =
    selectedType === "all" ? null : getTypeMeta(selectedType);

  function selectType(typeSlug) {
    const next = new URLSearchParams(searchParams);
    typeSlug === "all" ? next.delete("type") : next.set("type", typeSlug);
    setSearchParams(next);
  }

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="pokedex-page archive-v2"
      style={{
        "--archive-accent": selectedTypeMeta?.accent || "#191919",
        "--archive-soft": selectedTypeMeta?.soft || "#ece9e2",
      }}
    >
      <header className="pokedex-header">
        <button
          className="pokedex-logo"
          onClick={() => {
            navigate("/");
          }}
        >
          FIELD DEX
        </button>
        <div className="pokedex-archive">
          <span>Current Archive</span>
          <strong>Kanto / 001—151</strong>
        </div>
      </header>

      <section className="pokedex-intro">
        <span>Species Research / Kanto</span>
        <h1>Kanto Species Archive</h1>
        <p>
          Browse the 151 species currently available in FIELD DEX. Kanto is the
          first archive scope, not the long-term limit of the platform.
        </p>
        <div className="archive-current-state">
          <span>Current Classification</span>
          <strong>
            {selectedType === "all" ? "All Species" : selectedTypeMeta?.name}
          </strong>
        </div>
      </section>

      <section className="pokedex-tools">
        <div className="pokedex-search-area">
          <label htmlFor="pokedex-search">Search Species</label>
          <input
            id="pokedex-search"
            type="text"
            placeholder="Name or #"
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>
        <div className="pokedex-results" role="status" aria-live="polite">
          <span>Active Records</span>
          <strong>{loading ? 0 : filteredPokemon.length}</strong>
        </div>
      </section>

      <div
        className="pokedex-type-filters"
        role="group"
        aria-label="Filter by type"
      >
        <button
          aria-pressed={selectedType === "all"}
          className={
            selectedType === "all"
              ? "pokedex-type-filter active"
              : "pokedex-type-filter"
          }
          onClick={() => {
            selectType("all");
          }}
        >
          All Types
        </button>
        {pokemonTypes.map((type) => (
          <button
            key={type.slug}
            aria-pressed={selectedType === type.slug}
            className={
              selectedType === type.slug
                ? "pokedex-type-filter active"
                : "pokedex-type-filter"
            }
            onClick={() => {
              selectType(type.slug);
            }}
          >
            {type.name}
          </button>
        ))}
      </div>

      {loading && (
        <div className="archive-loading" role="status">
          <span />
          <p>Indexing species archive...</p>
        </div>
      )}
      {!loading && error && <ResourceState error={error} retry={retry} />}
      {!loading && !error && filteredPokemon.length === 0 && (
        <div className="resource-state" role="status">
          <h2>No matching records</h2>
          <p>
            Try another name, number or type. The current archive covers Kanto
            species 001–151.
          </p>
          <button onClick={() => setSearchParams({})}>
            Clear search and filters
          </button>
        </div>
      )}

      {!loading && !error && (
        <section className="pokedex-grid archive-grid">
          <AnimatePresence mode="popLayout">
            {filteredPokemon.map((pokemon) => {
              const primaryType = pokemon.types[0];
              const primaryTypeMeta = getTypeMeta(primaryType);
              return (
                <motion.button
                  layout
                  key={pokemon.id}
                  className="
                      pokedex-entry
                      archive-record
                    "
                  style={{
                    "--entry-accent": primaryTypeMeta?.accent || "#77736a",
                    "--entry-soft": primaryTypeMeta?.soft || "#ebe9e2",
                  }}
                  initial={{
                    opacity: 0,
                    y: 14,
                    scale: 0.985,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.96,
                    y: -8,
                  }}
                  transition={{
                    layout: {
                      duration: 0.42,
                      ease: [0.16, 1, 0.3, 1],
                    },
                    opacity: {
                      duration: 0.18,
                    },
                    scale: {
                      duration: 0.25,
                    },
                  }}
                  onClick={() => {
                    navigate(`/pokemon/${pokemon.id}`, {
                      state: { archive: `/pokedex?${searchParams}` },
                    });
                  }}
                >
                  <span className="record-label">Entry</span>
                  <span className="pokedex-entry-number">
                    #{pokemon.id.toString().padStart(3, "0")}
                  </span>
                  <span className="record-background-number">
                    {pokemon.id.toString().padStart(3, "0")}
                  </span>
                  <span className="archive-record-visual">
                    <span className="record-orbit" />
                    <span className="record-cross horizontal" />
                    <span className="record-cross vertical" />
                    <span className="record-scan" />
                    <Artwork
                      className="pokedex-entry-image"
                      src={pokemon.image}
                      alt={pokemon.name}
                      loading="lazy"
                    />
                  </span>
                  <span className="record-information">
                    <strong className="pokedex-entry-name">
                      {pokemon.name}
                    </strong>
                    <span className="pokedex-entry-types">
                      {pokemon.types.map((type) => {
                        const typeMeta = getTypeMeta(type);
                        return (
                          <span
                            key={type}
                            className="pokedex-entry-type"
                            style={{
                              "--type-color": typeMeta?.accent || "#77736a",
                            }}
                          >
                            {typeMeta?.name || formatPokemonName(type)}
                          </span>
                        );
                      })}
                    </span>
                    <span className="record-open">
                      View field record
                      <b>↗</b>
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </section>
      )}
    </main>
  );
}

export default Pokedex;
