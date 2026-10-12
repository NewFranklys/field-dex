import { useTranslation } from "react-i18next";
import Artwork from "./Artwork";
import { inArchive } from "../data/archive";
import { localizeEvolutionMethod } from "../i18n/presentation";

export default function EvolutionFamily({ pokemon, onSelectPokemon }) {
  const { t } = useTranslation("record");
  const { t: tp } = useTranslation("presentation");

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
      {pokemon.evolutions.length === 0 ? (
        <p className="record-no-data">{t("evolutionUnavailable")}</p>
      ) : (
        <div className="evolution-family-grid">
          {pokemon.evolutions.map((evolution) => {
            const parentOutside =
              evolution.parent && !inArchive(evolution.parent.id);
            return (
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
                  {evolution.id === pokemon.number
                    ? ` · ${t("currentRecord")}`
                    : ""}
                </span>
                <span className="timeline-artwork">
                  <span
                    className="timeline-background-number"
                    aria-hidden="true"
                  >
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
                    ? t("from", {
                        name: evolution.parent.name,
                        suffix: parentOutside
                          ? ` (${t("outsideKanto")})`
                          : "",
                      })
                    : t("familyOrigin")}
                </small>
                <small>{localizeEvolutionMethod(evolution.method, t, tp)}</small>
              </button>
            );
          })}
        </div>
      )}
      {pokemon.evolutions.length === 1 && !pokemon.hasExtendedFamily && (
        <p className="record-no-data">{t("noFurther")}</p>
      )}
    </section>
  );
}
