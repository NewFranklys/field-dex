import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getTypeMeta } from "../data/pokemonTypes";
import { normalizeQuery } from "../domain/pokemon";
import { getRecord } from "../services/pokemon";
import { useResource } from "../hooks/useResource";
import PokemonHero from "../components/PokemonHero";
import PokemonSearch from "../components/PokemonSearch";
import ResourceState from "../components/ResourceState";

function Record({ query }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState(query);
  const {
    data: pokemon,
    loading,
    error,
    retry,
  } = useResource(getRecord, query);
  const theme = getTypeMeta(pokemon?.types[0]?.toLowerCase() || "normal");
  const archive = location.state?.archive;
  const backTo =
    typeof archive === "string" && /^\/pokedex(?:\?|$)/.test(archive)
      ? archive
      : "/pokedex";
  function search(event) {
    event.preventDefault();
    const normalized = normalizeQuery(searchTerm);
    if (normalized)
      navigate(`/pokemon/${encodeURIComponent(normalized)}`, {
        state: { archive: backTo },
      });
  }
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="home pokemon-record-page"
      style={{ "--accent-color": theme.accent, "--soft-color": theme.soft }}
    >
      <header className="header">
        <Link className="logo-button" to="/">
          FIELD DEX
        </Link>
        <p className="database-name">Pokémon Research Database</p>
      </header>
      <Link className="archive-return" to={backTo}>
        ← Back to species archive
      </Link>
      <PokemonSearch
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        onSearch={search}
      />
      {loading || error ? (
        <ResourceState
          loading={loading}
          error={error}
          retry={error?.status === 404 ? null : retry}
        />
      ) : (
        <>
          {pokemon.warnings.length > 0 && (
            <ResourceState retry={retry}>
              {pokemon.warnings.join(" ")} The available record is shown below.
            </ResourceState>
          )}
          <PokemonHero
            pokemon={pokemon}
            onSelectPokemon={(id) =>
              navigate(`/pokemon/${id}`, { state: { archive: backTo } })
            }
          />
        </>
      )}
    </main>
  );
}
export default function PokemonPage() {
  const { pokemonQuery } = useParams();
  return <Record key={pokemonQuery} query={pokemonQuery} />;
}
