import Artwork from "./Artwork";
import { inArchive } from "../data/archive";

export default function EvolutionFamily({ pokemon, onSelectPokemon }) {
  return (
    <section className="record-evolution-section evolution-family">
      <div className="record-evolution-heading">
        <div className="record-section-heading">
          <span>04</span>
          <div>
            <h2>Evolution Record</h2>
            <small>Registered evolutionary family · Kanto records</small>
          </div>
        </div>
      </div>
      {pokemon.hasExtendedFamily && (
        <p className="record-no-data">
          This family also contains species outside the V1 Kanto archive. Only
          Kanto records are available here.
        </p>
      )}
      {pokemon.evolutions.length === 0 ? (
        <p className="record-no-data">Evolution data unavailable.</p>
      ) : (
        <div className="evolution-family-grid">
          {pokemon.evolutions.map((evolution) => (
            <button
              type="button"
              className="evolution-timeline-stage"
              key={evolution.id}
              onClick={() => onSelectPokemon(evolution.id)}
              aria-current={
                evolution.id === pokemon.number ? "page" : undefined
              }
            >
              <span className="timeline-pokemon-id">
                #{String(evolution.id).padStart(3, "0")}
                {evolution.id === pokemon.number ? " · Current record" : ""}
              </span>
              <span className="timeline-artwork">
                <span className="timeline-background-number" aria-hidden="true">
                  {String(evolution.id).padStart(3, "0")}
                </span>
                <Artwork
                  src={evolution.image}
                  alt={evolution.name}
                  loading="lazy"
                />
              </span>
              <strong>{evolution.name}</strong>
              <small>
                {evolution.parent
                  ? `From ${evolution.parent.name}${inArchive(evolution.parent.id) ? "" : " (outside Kanto)"} →`
                  : "Family origin"}
              </small>
              <small>{evolution.method}</small>
            </button>
          ))}
        </div>
      )}
      {pokemon.evolutions.length === 1 && !pokemon.hasExtendedFamily && (
        <p className="record-no-data">No further evolutions recorded.</p>
      )}
    </section>
  );
}
