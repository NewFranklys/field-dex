import {
  useRef,
  useState,
} from 'react'

import {
  motion,
} from 'motion/react'



/*
  ============================================================
  ARTWORK
  ============================================================

  Usamos isso também na navegação
  Previous / Next.
*/

function getPokemonArtwork(id) {

  return (
    'https://raw.githubusercontent.com/'
    +
    'PokeAPI/sprites/master/sprites/pokemon/'
    +
    `other/official-artwork/${id}.png`
  )

}



function PokemonHero({
  pokemon,
  onSelectPokemon,
}) {

  /*
    ============================================================
    CRY
    ============================================================
  */

  const audioRef =
    useRef(null)


  const [
    isCryPlaying,
    setIsCryPlaying,
  ] = useState(false)



  function toggleCry() {

    const audio =
      audioRef.current


    if (!audio) {
      return
    }


    if (isCryPlaying) {

      audio.pause()

      setIsCryPlaying(false)

      return

    }


    audio.currentTime = 0

    audio.play()

    setIsCryPlaying(true)

  }



  /*
    ============================================================
    ANIMAÇÃO BASE
    ============================================================
  */

  const fadeUp = {

    hidden: {
      opacity: 0,
      y: 14,
    },

    visible: {
      opacity: 1,
      y: 0,
    },

  }



  return (

    <section className="field-record">


      {/* =======================================================
          HERO
          ======================================================= */}
      <div className="record-hero">


        {/* =====================================================
            IDENTIDADE
            ===================================================== */}
        <motion.div

          className="record-identity"

          initial="hidden"

          animate="visible"

          variants={{

            hidden: {},

            visible: {

              transition: {
                staggerChildren: 0.065,
              },

            },

          }}

        >


          <motion.span
            className="record-eyebrow"
            variants={fadeUp}
          >

            Field Record /

            {' '}

            {pokemon.number
              .toString()
              .padStart(3, '0')
            }

          </motion.span>



          {/* Número de fundo */}
          <span className="record-hero-number">

            {pokemon.number
              .toString()
              .padStart(3, '0')
            }

          </span>



          {/* Nome com reveal vertical */}
          <div className="record-name-window">

            <motion.h2

              className="record-pokemon-name"

              variants={{

                hidden: {
                  y: '105%',
                },

                visible: {

                  y: 0,

                  transition: {

                    duration: 0.65,

                    ease: [
                      0.16,
                      1,
                      0.3,
                      1,
                    ],

                  },

                },

              }}

            >

              {pokemon.name}

            </motion.h2>

          </div>



          <motion.p
            className="record-category"
            variants={fadeUp}
          >

            {pokemon.category}

          </motion.p>



          <motion.p
            className="record-description"
            variants={fadeUp}
          >

            {pokemon.description}

          </motion.p>



          {/* TIPOS */}
          <motion.div
            className="record-types"
            variants={fadeUp}
          >

            {pokemon.types.map(
              (type) => (

                <span
                  className="record-type-chip"
                  key={type}
                >
                  {type}
                </span>

              )
            )}

          </motion.div>



          {/* DADOS DE CAMPO */}
          <motion.div
            className="record-field-data"
            variants={fadeUp}
          >


            <div>

              <span>
                Height
              </span>

              <strong>
                {pokemon.height} M
              </strong>

            </div>



            <div>

              <span>
                Weight
              </span>

              <strong>
                {pokemon.weight} KG
              </strong>

            </div>



            <div>

              <span>
                Habitat
              </span>

              <strong>
                {pokemon.habitat}
              </strong>

            </div>



            <div>

              <span>
                Generation
              </span>

              <strong>
                {pokemon.generation}
              </strong>

            </div>

          </motion.div>



          {/* HABILIDADES */}
          <motion.div
            className="record-abilities"
            variants={fadeUp}
          >

            <span>
              Abilities
            </span>


            <div>

              {pokemon.abilities.map(
                (ability) => (

                  <strong key={ability}>
                    {ability}
                  </strong>

                )
              )}

            </div>

          </motion.div>

        </motion.div>



        {/* =====================================================
            POKÉMON
            ===================================================== */}
        <div className="record-specimen-stage">


          {/* Campo de cor */}
          <span className="record-type-atmosphere" />



          {/* Marca gigante */}
          <span className="record-specimen-number">

            {pokemon.number
              .toString()
              .padStart(3, '0')
            }

          </span>



          {/* Órbita */}
          <motion.span

            className="field-record-orbit"

            initial={{
              opacity: 0,
              scale: 0.72,
              rotate: -12,
            }}

            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}

            transition={{

              duration: 0.8,

              ease: [
                0.16,
                1,
                0.3,
                1,
              ],

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

            initial={{
              opacity: 0,
              x: 55,
              scale: 0.92,
            }}

            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}

            transition={{

              duration: 0.72,

              delay: 0.08,

              ease: [
                0.16,
                1,
                0.3,
                1,
              ],

            }}

          />



          <span className="record-specimen-label">

            Registered specimen

          </span>

        </div>

      </div>



      {/* =======================================================
          ANALYSIS DECK

          Stats + Cry agora fazem parte
          da mesma composição.
          ======================================================= */}
      <section className="record-analysis-deck">


        {/* =====================================================
            BASE STATS
            ===================================================== */}
        <div className="record-analysis-panel stats-panel">


          <div className="record-section-heading">

            <span>
              01
            </span>


            <div>

              <strong>
                Base Stat Analysis
              </strong>

              <small>
                Species baseline values
              </small>

            </div>

          </div>



          <div className="record-stats">

            {pokemon.stats.map(
              (
                stat,
                index
              ) => {

                const statPercentage =
                  Math.min(
                    (
                      stat.value
                      /
                      180
                    )
                    *
                    100,
                    100
                  )



                return (

                  <motion.div

                    className="record-stat"

                    key={stat.name}

                    initial={{
                      opacity: 0,
                      y: 8,
                    }}

                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}

                    viewport={{
                      once: true,
                      amount: 0.4,
                    }}

                    transition={{
                      delay:
                        index
                        *
                        0.055,
                    }}

                  >


                    <span>
                      {stat.label}
                    </span>


                    <strong>
                      {stat.value}
                    </strong>


                    <div className="record-stat-track">

                      <motion.span

                        initial={{
                          width: 0,
                        }}

                        whileInView={{
                          width:
                            `${statPercentage}%`,
                        }}

                        viewport={{
                          once: true,
                        }}

                        transition={{

                          duration: 0.7,

                          delay:
                            0.12
                            +
                            (
                              index
                              *
                              0.06
                            ),

                          ease: [
                            0.16,
                            1,
                            0.3,
                            1,
                          ],

                        }}

                      />

                    </div>

                  </motion.div>

                )

              }
            )}

          </div>

        </div>



        {/* =====================================================
            VOCALIZATION
            ===================================================== */}
        <div className="record-analysis-panel cry-panel">


          <div className="record-section-heading">

            <span>
              02
            </span>


            <div>

              <strong>
                Vocalization
              </strong>

              <small>
                Recorded species cry
              </small>

            </div>

          </div>



          {pokemon.cry ? (

            <>

              <audio

                ref={audioRef}

                src={pokemon.cry}

                preload="none"

                onEnded={() => {
                  setIsCryPlaying(false)
                }}

                onPause={() => {
                  setIsCryPlaying(false)
                }}

              />



              <button

                className="record-cry-control"

                onClick={toggleCry}

              >


                <span className="record-cry-play">

                  {isCryPlaying
                    ? 'Ⅱ'
                    : '▶'
                  }

                </span>



                <span className={`
                  record-waveform
                  ${isCryPlaying
                    ? 'is-playing'
                    : ''
                  }
                `}>

                  {[
                    18,
                    32,
                    14,
                    42,
                    26,
                    50,
                    21,
                    37,
                    16,
                    45,
                    29,
                    20,
                    38,
                    15,
                    31,
                    22,
                    44,
                    18,
                    28,
                    14,
                    35,
                    20,
                  ].map(
                    (
                      height,
                      index
                    ) => (

                      <i

                        key={index}

                        style={{

                          '--wave-height':
                            `${height}%`,

                          '--wave-delay':
                            `${index * 35}ms`,

                        }}

                      />

                    )
                  )}

                </span>



                <strong>

                  {isCryPlaying
                    ? 'Playing'
                    : 'Play Cry'
                  }

                </strong>

              </button>

            </>

          ) : (

            <p className="record-no-data">
              No recorded cry available.
            </p>

          )}

        </div>

      </section>



      {/* =======================================================
          TYPE RESPONSE
          ======================================================= */}
      <section className="record-type-analysis">


        <div className="record-type-analysis-heading">


          <div className="record-section-heading">

            <span>
              03
            </span>


            <div>

              <strong>
                Type Response
              </strong>

              <small>
                Defensive interaction analysis
              </small>

            </div>

          </div>



          <span className="record-type-analysis-code">

            {pokemon.types
              .join(' / ')
            }

          </span>

        </div>



        <div className="record-matchups">


          <div className="record-matchup-column">

            <span>
              Weak To
            </span>


            <div>

              {pokemon
                .matchups
                .weaknesses
                .map(
                  (matchup) => (

                    <span

                      className="
                        record-matchup-chip
                        weakness
                      "

                      key={
                        matchup.type
                      }

                    >

                      {matchup.type}

                      <strong>
                        {matchup.multiplier}×
                      </strong>

                    </span>

                  )
                )}

            </div>

          </div>



          <div className="record-matchup-column">

            <span>
              Resists
            </span>


            <div>

              {pokemon
                .matchups
                .resistances
                .map(
                  (matchup) => (

                    <span

                      className="
                        record-matchup-chip
                        resistance
                      "

                      key={
                        matchup.type
                      }

                    >

                      {matchup.type}

                      <strong>
                        {matchup.multiplier}×
                      </strong>

                    </span>

                  )
                )}

            </div>

          </div>



          {pokemon
            .matchups
            .immunities
            .length > 0
            &&
            (

              <div className="record-matchup-column">

                <span>
                  Immune To
                </span>


                <div>

                  {pokemon
                    .matchups
                    .immunities
                    .map(
                      (matchup) => (

                        <span

                          className="
                            record-matchup-chip
                            immunity
                          "

                          key={
                            matchup.type
                          }

                        >

                          {matchup.type}

                          <strong>
                            0×
                          </strong>

                        </span>

                      )
                    )}

                </div>

              </div>

            )
          }

        </div>

      </section>



      {/* =======================================================
    EVOLUTION — V2.2
    =======================================================

    Antes cada evolução parecia um "card".

    Agora tratamos a evolução como uma
    sequência temporal:

    Squirtle ───── Wartortle ───── Blastoise

    O Pokémon é o conteúdo principal.
    A linha conecta os estágios.
    ======================================================= */}
<section className="record-evolution-section evolution-timeline-v22">


  <div className="record-evolution-heading">


    <div className="record-section-heading">

      <span>
        04
      </span>


      <div>

        <strong>
          Evolution Record
        </strong>

        <small>
          Registered evolutionary family
        </small>

      </div>

    </div>


    <span>
      Evolutionary sequence
    </span>

  </div>



  <div className="record-evolution-scroll">


    <div className="record-evolution-timeline">


      {pokemon.evolutions.map(
        (
          evolution,
          index
        ) => {


          const isLast =
            index
            ===
            pokemon.evolutions.length - 1



          return (

            <div

              className="evolution-timeline-unit"

              key={
                evolution.id
              }

            >


              {/* =========================================
                  ESTÁGIO
                  ========================================= */}
              <motion.button

                type="button"

                className="evolution-timeline-stage"

                onClick={() => {

                  onSelectPokemon(
                    evolution.id
                  )

                }}


                /*
                  Cada estágio aparece quando
                  a timeline chega na viewport.
                */
                initial={{
                  opacity: 0,
                  y: 18,
                }}

                whileInView={{
                  opacity: 1,
                  y: 0,
                }}

                viewport={{
                  once: true,
                  amount: 0.4,
                }}

                transition={{

                  duration: 0.5,

                  delay:
                    index
                    *
                    0.12,

                  ease: [
                    0.16,
                    1,
                    0.3,
                    1,
                  ],

                }}

              >


                {/* Número */}
                <span className="timeline-pokemon-id">

                  #{evolution.id
                    .toString()
                    .padStart(
                      3,
                      '0'
                    )}

                </span>



                {/* Artwork */}
                <span className="timeline-artwork">

                  <span className="timeline-background-number">

                    {evolution.id
                      .toString()
                      .padStart(
                        3,
                        '0'
                      )}

                  </span>


                  <img

                    src={
                      evolution.image
                    }

                    alt={
                      evolution.name
                    }

                  />

                </span>



                {/* Nome */}
                <strong>

                  {evolution.name}

                </strong>



                {/* Método de evolução */}
                <small>

                  {evolution.method}

                </small>



                {/*
                  O ponto fica exatamente
                  sobre a linha da timeline.
                */}
                <span className="timeline-node" />

              </motion.button>



              {/* =========================================
                  CONECTOR
                  =========================================

                  Não existe depois do
                  último Pokémon.
              */}
              {!isLast && (

                <span className="timeline-connector">


                  <motion.i

                    initial={{
                      scaleX: 0,
                    }}

                    whileInView={{
                      scaleX: 1,
                    }}

                    viewport={{
                      once: true,
                    }}

                    transition={{

                      duration: 0.6,

                      delay:
                        0.15
                        +
                        (
                          index
                          *
                          0.12
                        ),

                      ease: [
                        0.16,
                        1,
                        0.3,
                        1,
                      ],

                    }}

                  />


                  <span>
                    →
                  </span>

                </span>

              )}

            </div>

          )

        }
      )}

    </div>

  </div>

</section>



      {/* =======================================================
          PREVIOUS / NEXT
          ======================================================= */}
      <nav className="record-navigation">


        {pokemon.navigation.previous ? (

          <button

            className="
              record-nav-item
              previous
            "

            onClick={() => {

              onSelectPokemon(
                pokemon
                  .navigation
                  .previous
                  .id
              )

            }}

          >


            <img

              src={
                getPokemonArtwork(
                  pokemon
                    .navigation
                    .previous
                    .id
                )
              }

              alt=""

            />


            <span>
              ← Previous Record
            </span>


            <small>

              #{pokemon
                .navigation
                .previous
                .id
                .toString()
                .padStart(3, '0')
              }

            </small>


            <strong>

              {pokemon
                .navigation
                .previous
                .name
              }

            </strong>

          </button>

        ) : (

          <div />

        )}



        {pokemon.navigation.next ? (

          <button

            className="
              record-nav-item
              next
            "

            onClick={() => {

              onSelectPokemon(
                pokemon
                  .navigation
                  .next
                  .id
              )

            }}

          >


            <img

              src={
                getPokemonArtwork(
                  pokemon
                    .navigation
                    .next
                    .id
                )
              }

              alt=""

            />


            <span>
              Next Record →
            </span>


            <small>

              #{pokemon
                .navigation
                .next
                .id
                .toString()
                .padStart(3, '0')
              }

            </small>


            <strong>

              {pokemon
                .navigation
                .next
                .name
              }

            </strong>

          </button>

        ) : (

          <div />

        )}

      </nav>

    </section>

  )

}


export default PokemonHero