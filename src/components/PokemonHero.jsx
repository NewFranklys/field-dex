import { useTranslation } from "react-i18next";
import Artwork from "./Artwork";
import { motion } from "motion/react";
import { artwork as getPokemonArtwork } from "../domain/pokemon";
import CryPlayer from "./CryPlayer";
import EvolutionFamily from "./EvolutionFamily";
import TypeMatchups from "./TypeMatchups";

function PokemonHero({ pokemon, onSelectPokemon }) {
  const { t } = useTranslation(["record", "common"]);
  const fadeUp = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0 },
  };
  const typeSlugs = pokemon.typeSlugs || pokemon.types.map((type) => type.toLowerCase());
  const abilities =
    pokemon.abilitiesDetailed ||
    pokemon.abilities.map((name) => ({ name, isHidden: false }));

  return (
    <section className="field-record">
      <div className="record-hero">
        <motion.div
          className="record-identity"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.065 } },
          }}
        >
          <motion.span className="record-eyebrow" variants={fadeUp}>
            {t("record:fieldRecord", {
              number: pokemon.number.toString().padStart(3, "0"),
            })}
          </motion.span>
          <span className="record-hero-number">
            {pokemon.number.toString().padStart(3, "0")}
          </span>
          <div className="record-name-window">
            <motion.h1
              className="record-pokemon-name"
              variants={{
                hidden: { y: "105%" },
                visible: {
                  y: 0,
                  transition: {
                    duration: 0.65,
                    ease: [0.16, 1, 0.3, 1],
                  },
                },
              }}
            >
              {pokemon.name}
            </motion.h1>
          </div>
          <motion.p className="record-category" variants={fadeUp}>
            {pokemon.category}
          </motion.p>
          <motion.p className="record-description" variants={fadeUp}>
            {pokemon.description}
          </motion.p>
          <motion.div className="record-types" variants={fadeUp}>
            {typeSlugs.map((typeSlug, index) => (
              <span className="record-type-chip" key={typeSlug}>
                {t(`common:types.${typeSlug}`, {
                  defaultValue: pokemon.types[index],
                })}
              </span>
            ))}
          </motion.div>
          <motion.div className="record-field-data" variants={fadeUp}>
            <div>
              <span>{t("record:height")}</span>
              <strong>{pokemon.height} M</strong>
            </div>
            <div>
              <span>{t("record:weight")}</span>
              <strong>{pokemon.weight} KG</strong>
            </div>
            <div>
              <span>{t("record:habitat")}</span>
              <strong>{pokemon.habitat}</strong>
            </div>
            <div>
              <span>{t("record:generation")}</span>
              <strong>
                {pokemon.generationCode
                  ? `${t("record:generation")} ${pokemon.generationCode}`
                  : pokemon.generation}
              </strong>
            </div>
          </motion.div>
          <motion.div className="record-abilities" variants={fadeUp}>
            <span>{t("record:abilities")}</span>
            <div>
              {abilities.map((ability) => (
                <strong key={`${ability.name}-${ability.isHidden}`}>
                  {ability.name}
                  {ability.isHidden ? ` (${t("record:hidden")})` : ""}
                </strong>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <div className="record-specimen-stage">
          <span className="record-type-atmosphere" />
          <span className="record-specimen-number">
            {pokemon.number.toString().padStart(3, "0")}
          </span>
          <motion.span
            className="field-record-orbit"
            initial={{ opacity: 0, scale: 0.72, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <span />
          </motion.span>
          <span className="record-axis horizontal" />
          <span className="record-axis vertical" />
          <span className="record-scanner" />
          <motion.img
            className="record-specimen-image"
            src={pokemon.image}
            alt={pokemon.name}
            initial={{ opacity: 0, x: 55, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              duration: 0.72,
              delay: 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
          <span className="record-specimen-label">{t("record:registered")}</span>
        </div>
      </div>

      <section className="record-analysis-deck">
        <div className="record-analysis-panel stats-panel">
          <div className="record-section-heading">
            <span>01</span>
            <div>
              <h2>{t("record:statsTitle")}</h2>
              <small>{t("record:statsSubtitle")}</small>
            </div>
          </div>
          <div className="record-stats">
            {pokemon.stats.map((stat, index) => {
              const statPercentage = Math.min((stat.value / 255) * 100, 100);
              return (
                <motion.div
                  className="record-stat"
                  key={stat.name}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: index * 0.055 }}
                >
                  <span>
                    {t(`common:stats.${stat.name}`, { defaultValue: stat.label })}
                  </span>
                  <strong>{stat.value}</strong>
                  <div className="record-stat-track">
                    <motion.span
                      initial={{ width: 0 }}
                      whileInView={{ width: `${statPercentage}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.7,
                        delay: 0.12 + index * 0.06,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        <div className="record-analysis-panel cry-panel">
          <div className="record-section-heading">
            <span>02</span>
            <div>
              <h2>{t("record:vocalization")}</h2>
              <small>{t("record:vocalizationSubtitle")}</small>
            </div>
          </div>
          <CryPlayer src={pokemon.cry} />
        </div>
      </section>

      <section className="record-type-analysis">
        <div className="record-type-analysis-heading">
          <div className="record-section-heading">
            <span>03</span>
            <div>
              <h2>{t("record:typeResponse")}</h2>
              <small>{t("record:typeSubtitle")}</small>
            </div>
          </div>
          <span className="record-type-analysis-code">
            {typeSlugs
              .map((typeSlug, index) =>
                t(`common:types.${typeSlug}`, {
                  defaultValue: pokemon.types[index],
                }),
              )
              .join(" / ")}
          </span>
        </div>
        <TypeMatchups matchups={pokemon.matchups} />
      </section>

      <EvolutionFamily pokemon={pokemon} onSelectPokemon={onSelectPokemon} />

      <nav className="record-navigation" aria-label={t("record:adjacentAria")}>
        {pokemon.navigation.previous ? (
          <button
            className="record-nav-item previous"
            onClick={() => onSelectPokemon(pokemon.navigation.previous.id)}
          >
            <Artwork
              src={getPokemonArtwork(pokemon.navigation.previous.id)}
              alt=""
            />
            <span>{t("record:previous")}</span>
            <small>
              #{pokemon.navigation.previous.id.toString().padStart(3, "0")}
            </small>
            <strong>{pokemon.navigation.previous.name}</strong>
          </button>
        ) : (
          <div />
        )}
        {pokemon.navigation.next ? (
          <button
            className="record-nav-item next"
            onClick={() => onSelectPokemon(pokemon.navigation.next.id)}
          >
            <Artwork src={getPokemonArtwork(pokemon.navigation.next.id)} alt="" />
            <span>{t("record:next")}</span>
            <small>#{pokemon.navigation.next.id.toString().padStart(3, "0")}</small>
            <strong>{pokemon.navigation.next.name}</strong>
          </button>
        ) : (
          <div />
        )}
      </nav>
    </section>
  );
}

export default PokemonHero;
