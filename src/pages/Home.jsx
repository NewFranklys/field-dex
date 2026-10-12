import Artwork from "../components/Artwork";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTypeMeta } from "../data/pokemonTypes";
import { randomArchiveId } from "../data/archive";
import { normalizeQuery } from "../domain/pokemon";
import { getFeatured } from "../services/pokemon";
import { useResource } from "../hooks/useResource";
import ResourceState from "../components/ResourceState";

function Home() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [featuredId, setFeaturedId] = useState(() => randomArchiveId());
  const {
    data,
    previousData,
    loading: featuredLoading,
    error,
    retry,
  } = useResource(getFeatured, featuredId);
  const featuredPokemon = data || previousData;
  const specimenRef = useRef(null);
  const primaryTypeSlug =
    featuredPokemon?.types?.[0]?.toLowerCase() || "normal";
  const featuredTypeMeta = getTypeMeta(primaryTypeSlug);

  function scanNewPokemon() {
    if (!featuredLoading) setFeaturedId(randomArchiveId(featuredId));
  }

  function handleSpecimenMouseMove(event) {
    const specimen = specimenRef.current;
    if (!specimen) return;
    const rect = specimen.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    specimen.style.setProperty("--mouse-x", x);
    specimen.style.setProperty("--mouse-y", y);
  }

  function handleSpecimenMouseLeave() {
    const specimen = specimenRef.current;
    if (!specimen) return;
    specimen.style.setProperty("--mouse-x", 0);
    specimen.style.setProperty("--mouse-y", 0);
  }

  function handleSearch(event) {
    event.preventDefault();
    const cleanedSearch = normalizeQuery(searchTerm);
    if (!cleanedSearch) return;
    navigate(`/pokemon/${encodeURIComponent(cleanedSearch)}`);
  }

  function openRandomPokemon() {
    navigate(`/pokemon/${randomArchiveId()}`);
  }

  return (
    <main id="main-content" tabIndex={-1} className="home-page">
      <header className="home-header">
        <div>
          <h1 className="home-logo">FIELD DEX</h1>
          <p className="home-eyebrow">Pokémon Companion Platform</p>
        </div>
        <div className="home-version">
          <span>Current Archive</span>
          <strong>Kanto / 001—151</strong>
        </div>
      </header>

      <section className="home-stage">
        <div className="home-intro">
          <span className="home-section-label">Species Research</span>
          <h2 className="home-title">
            Explore the world
            <br />
            <span>one species at a time.</span>
          </h2>
          <p className="home-description">
            Begin with the Kanto archive: search species, study their biology,
            compare base stats and trace their evolutionary families.
          </p>
          <p className="home-scope-note">
            Current public dataset · Kanto species 001—151
          </p>
          <form className="home-search" onSubmit={handleSearch}>
            <input
              aria-label="Search Pokémon"
              type="text"
              value={searchTerm}
              placeholder="Search Pokémon name or #"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
            <button type="submit">Search →</button>
          </form>
        </div>

        <div
          className={`
            featured-specimen
            ${featuredLoading ? "is-scanning" : ""}
          `}
          ref={specimenRef}
          style={{
            "--specimen-accent": featuredTypeMeta?.accent || "#77736a",
            "--specimen-soft": featuredTypeMeta?.soft || "#ebe9e2",
          }}
          onMouseMove={handleSpecimenMouseMove}
          onMouseLeave={handleSpecimenMouseLeave}
        >
          <span className="specimen-type-field" />
          <div className="specimen-topline">
            <span>Featured Specimen</span>
            <button
              type="button"
              disabled={featuredLoading}
              onClick={scanNewPokemon}
            >
              {featuredLoading ? "Scanning..." : "Rescan ↻"}
            </button>
          </div>

          {featuredPokemon ? (
            <div className="specimen-record" key={featuredPokemon.id}>
              <span className="specimen-background-number">
                {featuredPokemon.id.toString().padStart(3, "0")}
              </span>
              <button
                type="button"
                className="specimen-visual"
                onClick={() => {
                  navigate(`/pokemon/${featuredPokemon.id}`);
                }}
              >
                <span className="specimen-orbit" />
                <span className="specimen-axis horizontal" />
                <span className="specimen-axis vertical" />
                <span className="specimen-scanner" />
                <Artwork
                  src={featuredPokemon.image}
                  alt={featuredPokemon.name}
                  className="specimen-image"
                />
                <span className="specimen-view">View record →</span>
              </button>

              <div className="specimen-identification">
                <div className="specimen-main-data">
                  <span className="specimen-id">
                    Specimen / {featuredPokemon.id.toString().padStart(3, "0")}
                  </span>
                  <strong className="specimen-name">
                    {featuredPokemon.name}
                  </strong>
                  <span className="specimen-category">
                    {featuredPokemon.category}
                  </span>
                </div>
                <div className="specimen-data">
                  <div>
                    <span>Type</span>
                    <strong>{featuredPokemon.types.join(" / ")}</strong>
                  </div>
                  <div>
                    <span>Height</span>
                    <strong>{featuredPokemon.height} M</strong>
                  </div>
                  <div>
                    <span>Weight</span>
                    <strong>{featuredPokemon.weight} KG</strong>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <ResourceState
              loading={featuredLoading}
              error={error}
              retry={retry}
            />
          )}

          {featuredLoading && featuredPokemon && (
            <div className="specimen-scan-overlay" role="status">
              <span />
              <strong>Searching archive</strong>
            </div>
          )}
        </div>
      </section>

      <section className="home-research-modules">
        <button
          className="
            research-module
            encounter-module
          "
          onClick={openRandomPokemon}
        >
          <div className="module-topline">
            <span>01</span>
            <span>Encounter</span>
          </div>
          <div className="module-content">
            <span className="module-kicker">Unknown specimen</span>
            <strong className="module-title">
              Random
              <br />
              Encounter
            </strong>
            <p>Pull an unidentified entry from the current Kanto archive.</p>
          </div>
          <div className="encounter-visual">
            <span>001</span>
            <span className="encounter-line" />
            <strong>???</strong>
            <span className="encounter-line" />
            <span>151</span>
          </div>
          <span className="module-action">Initiate scan ↗</span>
        </button>

        <button
          className="
            research-module
            archive-module
          "
          onClick={() => {
            navigate("/pokedex");
          }}
        >
          <div className="module-topline">
            <span>02</span>
            <span>Species Archive</span>
          </div>
          <div className="module-content">
            <span className="module-kicker">Current archive</span>
            <strong className="module-title">
              Browse
              <br />
              Pokédex
            </strong>
            <p>Browse the 151 catalogued Kanto species in the current release.</p>
          </div>
          <div className="archive-visual">
            <span>001</span>
            <span>025</span>
            <span>050</span>
            <span>075</span>
            <span>100</span>
            <span>125</span>
            <span>151</span>
            <i />
          </div>
          <span className="module-action">Open archive ↗</span>
        </button>

        <button
          className="
            research-module
            type-module
          "
          onClick={() => {
            navigate("/types");
          }}
        >
          <div className="module-topline">
            <span>03</span>
            <span>Classification</span>
          </div>
          <div className="module-content">
            <span className="module-kicker">18 elemental classes</span>
            <strong className="module-title">
              Explore
              <br />
              Types
            </strong>
            <p>Study the current type system using Kanto representatives.</p>
          </div>
          <div className="type-module-visual">
            <span className="mini-type grass">GR</span>
            <span className="mini-type fire">FI</span>
            <span className="mini-type water">WA</span>
            <span className="mini-type electric">EL</span>
            <span className="mini-type psychic">PS</span>
            <span className="mini-type ghost">GH</span>
          </div>
          <span className="module-action">View classes ↗</span>
        </button>
      </section>

      <footer className="home-footer">
        <span>FIELD DEX · Current archive: Kanto / 001—151</span>
      </footer>
    </main>
  );
}

export default Home;
