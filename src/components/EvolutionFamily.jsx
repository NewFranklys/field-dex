import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import Artwork from "./Artwork";
import { inArchive } from "../data/archive";
import { localizeEvolutionMethod } from "../i18n/presentation";
import EvolutionMethodIcon from "./EvolutionMethodIcon";

export default function EvolutionFamily({ pokemon, onSelectPokemon }) {
  const { t } = useTranslation("record");
  const { t: tp } = useTranslation("presentation");
  const evolutions = pokemon.evolutions || [];
  const isLinear = evolutions.every(
    (evolution, index) =>
      index === 0 || evolution.parent?.id === evolutions[index - 1]?.id,
  );

  return (
    <section className="record-evolution-section evolution-family">
      <div className="record-evolution-heading">
        <div className="record-section-heading">
          <span>04</span>
          <div>
            <h2>{t("evolutionTitle")}</h2>
            <small>{t("evolutionSubtitle")}</small>
          </div>
        </div>
      </div>
      {pokemon.hasExtendedFamily && (
        <p className="record-no-data">{t("extendedFamily")}</p>
      )}
      {evolutions.length === 0 ? (
        <p className="record-no-data">{t("evolutionUnavailable")}</p>
      ) : isLinear ? (
        <div className="evolution-flow is-linear">
          {evolutions.map((evolution, index) => {
            const localizedMethod = localizeEvolutionMethod(
              evolution.method,
              t,
              tp,
            );
            return (
              <Fragment key={evolution.id}>
                {index > 0 && (
                  <div className="evolution-link" aria-label={localizedMethod}>
                    <span className="evolution-link-line" />
                    <EvolutionMethodIcon
                      method={localizedMethod}
                      details={evolution.methodDetails}
                    />
                    <strong>{localizedMethod}</strong>
                    <span className="evolution-link-arrow">→</span>
                  </div>
                )}
                <EvolutionCard
                  evolution={evolution}
                  pokemon={pokemon}
                  onSelectPokemon={onSelectPokemon}
                  t={t}
                  tp={tp}
                  showMethod={index === 0}
                />
              </Fragment>
            );
          })}
        </div>
      ) : (
        <div className="evolution-family-grid branching-family">
          {evolutions.map((evolution) => (
            <EvolutionCard
              key={evolution.id}
              evolution={evolution}
              pokemon={pokemon}
              onSelectPokemon={onSelectPokemon}
              t={t}
              tp={tp}
              showMethod
            />
          ))}
        </div>
      )}
      {evolutions.length === 1 && !pokemon.hasExtendedFamily && (
        <p className="record-no-data">{t("noFurther")}</p>
      )}
    </section>
  );
}

function EvolutionCard({
  evolution,
  pokemon,
  onSelectPokemon,
  t,
  tp,
  showMethod,
}) {
  const parentOutside = evolution.parent && !inArchive(evolution.parent.id);
  const localizedMethod = localizeEvolutionMethod(evolution.method, t, tp);
  return (
    <button
      type="button"
      className="evolution-timeline-stage"
      onClick={() => onSelectPokemon(evolution.id)}
      aria-current={evolution.id === pokemon.number ? "page" : undefined}
    >
      <span className="timeline-pokemon-id">
        #{String(evolution.id).padStart(3, "0")}
        {evolution.id === pokemon.number ? ` · ${t("currentRecord")}` : ""}
      </span>
      <span className="timeline-artwork">
        <span className="timeline-background-number" aria-hidden="true">
          {String(evolution.id).padStart(3, "0")}
        </span>
        <Artwork src={evolution.image} alt={evolution.name} loading="lazy" />
      </span>
      <strong>{evolution.name}</strong>
      <small>
        {evolution.parent
          ? t("from", {
              name: evolution.parent.name,
              suffix: parentOutside ? ` (${t("outsideKanto")})` : "",
            })
          : t("familyOrigin")}
      </small>
      {showMethod && (
        <span className="evolution-card-method">
          <EvolutionMethodIcon
            method={localizedMethod}
            details={evolution.methodDetails}
          />
          <small>{localizedMethod}</small>
        </span>
      )}
    </button>
  );
}
