/*
  ============================================================
  TYPE OBSERVATORY — V4
  ============================================================

  Estrutura:

  1. Cabeçalho
  2. Faixa horizontal com os 18 tipos
  3. Grande palco de análise
  4. Pokémon representantes
  5. Relações ofensivas / defensivas

  IMPORTANTE:

  Hover apenas reage visualmente.

  Quem realmente troca o tipo
  é o clique.
*/


import {
  useEffect,
  useMemo,
  useState,
} from 'react'


import {
  useNavigate,
} from 'react-router-dom'


import {
  AnimatePresence,
  motion,
} from 'motion/react'


import {
  getTypeMeta,
  pokemonTypes,
} from '../data/pokemonTypes'



/*
  ============================================================
  REPRESENTANTES PREFERIDOS
  ============================================================

  Em vez de pegar simplesmente os primeiros
  Pokémon retornados pela API, damos preferência
  a alguns representantes visualmente marcantes.

  Se algum deles não pertencer ao tipo,
  o código automaticamente procura substitutos.
*/

const representativePreferences = {

  normal: [
    143, // Snorlax
    128, // Tauros
    133, // Eevee
  ],

  fire: [
    6,  // Charizard
    38, // Ninetales
    59, // Arcanine
  ],

  water: [
    9,   // Blastoise
    131, // Lapras
    134, // Vaporeon
  ],

  electric: [
    25,  // Pikachu
    26,  // Raichu
    135, // Jolteon
  ],

  grass: [
    3,   // Venusaur
    45,  // Vileplume
    103, // Exeggutor
  ],

  ice: [
    144, // Articuno
    131, // Lapras
    124, // Jynx
  ],

  fighting: [
    68,  // Machamp
    106, // Hitmonlee
    57,  // Primeape
  ],

  poison: [
    34,  // Nidoking
    94,  // Gengar
    110, // Weezing
  ],

  ground: [
    112, // Rhydon
    28,  // Sandslash
    51,  // Dugtrio
  ],

  flying: [
    149, // Dragonite
    142, // Aerodactyl
    18,  // Pidgeot
  ],

  psychic: [
    150, // Mewtwo
    65,  // Alakazam
    122, // Mr. Mime
  ],

  bug: [
    123, // Scyther
    12,  // Butterfree
    127, // Pinsir
  ],

  rock: [
    142, // Aerodactyl
    76,  // Golem
    95,  // Onix
  ],

  ghost: [
    94, // Gengar
    93, // Haunter
    92, // Gastly
  ],

  dragon: [
    149, // Dragonite
    148, // Dragonair
    147, // Dratini
  ],

  /*
    Nenhuma espécie #001—151
    possui Dark atualmente.
  */
  dark: [],

  steel: [
    82, // Magneton
    81, // Magnemite
  ],

  fairy: [
    36,  // Clefable
    40,  // Wigglytuff
    122, // Mr. Mime
  ],

}



/*
  ============================================================
  FORMATAR NOME
  ============================================================
*/

function formatName(name) {

  return name
    .split('-')
    .map((word) => {

      return (
        word.charAt(0).toUpperCase()
        +
        word.slice(1)
      )

    })
    .join(' ')

}



/*
  ============================================================
  PEGAR ID PELA URL
  ============================================================
*/

function getPokemonIdFromUrl(url) {

  const parts =
    url
      .split('/')
      .filter(Boolean)


  return Number(
    parts[
      parts.length - 1
    ]
  )

}



/*
  ============================================================
  ARTWORK OFICIAL
  ============================================================
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



/*
  ============================================================
  ESCOLHER REPRESENTANTES
  ============================================================

  Primeiro tentamos os IDs que escolhemos.

  Depois completamos até 3 Pokémon
  usando registros reais daquele tipo.
*/

function pickRepresentatives(
  pokemonList,
  typeSlug
) {

  const pokemonById =
    new Map(

      pokemonList.map(
        (pokemon) => [

          pokemon.id,
          pokemon,

        ]
      )

    )



  const preferredIds =
    representativePreferences[
      typeSlug
    ]
    ||
    []



  const selected = []



  /*
    Primeiro:
    representantes escolhidos manualmente.
  */
  preferredIds.forEach(
    (id) => {

      const pokemon =
        pokemonById.get(id)


      if (pokemon) {

        selected.push(
          pokemon
        )

      }

    }
  )



  /*
    Se já temos 3,
    acabou.
  */
  if (
    selected.length >= 3
  ) {

    return selected.slice(
      0,
      3
    )

  }



  /*
    Criamos alguns pontos interessantes
    da lista para preencher as vagas:

    começo
    meio
    final
  */
  const fallbackIndexes = [

    0,

    Math.floor(
      pokemonList.length / 2
    ),

    pokemonList.length - 1,

  ]



  fallbackIndexes.forEach(
    (index) => {

      const pokemon =
        pokemonList[
          index
        ]


      if (
        pokemon
        &&
        !selected.some(
          (item) =>
            item.id === pokemon.id
        )
        &&
        selected.length < 3
      ) {

        selected.push(
          pokemon
        )

      }

    }
  )



  return selected

}



/*
  ============================================================
  CHIPS DE TIPO
  ============================================================

  Reutilizamos esse pequeno componente
  várias vezes nas relações de batalha.
*/

function RelationChips({
  types,
}) {

  if (
    !types
    ||
    types.length === 0
  ) {

    return (
      <span className="obs-relation-empty">
        —
      </span>
    )

  }



  return (

    <div className="obs-relation-chips">

      {types.map(
        (typeSlug) => {

          const typeMeta =
            getTypeMeta(
              typeSlug
            )


          return (

            <span

              className="obs-relation-chip"

              key={
                typeSlug
              }

              style={{

                '--chip-accent':
                  typeMeta?.accent
                  ||
                  '#77736a',

              }}

            >
              {typeMeta?.name
                ||
                formatName(
                  typeSlug
                )
              }
            </span>

          )

        }
      )}

    </div>

  )

}



/*
  ============================================================
  TYPES
  ============================================================
*/

function Types() {

  const navigate =
    useNavigate()



  /*
    Começamos em Fire para a primeira
    composição já ter bastante presença.
  */
  const [
    selectedType,
    setSelectedType,
  ] = useState(
    'fire'
  )



  const [
    typeResearch,
    setTypeResearch,
  ] = useState({})


  const [
    loading,
    setLoading,
  ] = useState(true)


  const [
    error,
    setError,
  ] = useState(null)



  /*
    ============================================================
    CARREGAR PESQUISA
    ============================================================
  */

  useEffect(() => {

    async function loadTypeResearch() {

      setLoading(true)
      setError(null)


      try {

        /*
          18 requisições em paralelo.
        */
        const responses =
          await Promise.all(

            pokemonTypes.map(
              (type) => {

                return fetch(
                  `https://pokeapi.co/api/v2/type/${type.slug}`
                )

              }
            )

          )



        if (
          responses.some(
            (response) =>
              !response.ok
          )
        ) {

          throw new Error(
            'Could not load type research.'
          )

        }



        const dataList =
          await Promise.all(

            responses.map(
              (response) =>
                response.json()
            )

          )



        const research = {}



        dataList.forEach(
          (typeData, index) => {

            const typeMeta =
              pokemonTypes[
                index
              ]



            /*
              ========================================
              POKÉMON DE KANTO
              ========================================
            */

            const kantoPokemon =
              typeData
                .pokemon
                .map(
                  (entry) => {

                    const id =
                      getPokemonIdFromUrl(
                        entry
                          .pokemon
                          .url
                      )


                    return {

                      id,

                      name:
                        formatName(
                          entry
                            .pokemon
                            .name
                        ),

                      image:
                        getPokemonArtwork(
                          id
                        ),

                    }

                  }
                )
                .filter(
                  (pokemon) => {

                    return (
                      pokemon.id >= 1
                      &&
                      pokemon.id <= 151
                    )

                  }
                )
                .sort(
                  (a, b) =>
                    a.id - b.id
                )



            /*
              ========================================
              RELAÇÕES DE BATALHA
              ========================================
            */

            const relations =
              typeData
                .damage_relations



            research[
              typeMeta.slug
            ] = {

              count:
                kantoPokemon.length,


              representatives:
                pickRepresentatives(
                  kantoPokemon,
                  typeMeta.slug
                ),


              strongAgainst:
                relations
                  .double_damage_to
                  .map(
                    (type) =>
                      type.name
                  ),


              noEffectAgainst:
                relations
                  .no_damage_to
                  .map(
                    (type) =>
                      type.name
                  ),


              weakTo:
                relations
                  .double_damage_from
                  .map(
                    (type) =>
                      type.name
                  ),


              resists:
                relations
                  .half_damage_from
                  .map(
                    (type) =>
                      type.name
                  ),


              immuneTo:
                relations
                  .no_damage_from
                  .map(
                    (type) =>
                      type.name
                  ),

            }

          }
        )



        setTypeResearch(
          research
        )

      } catch (error) {

        console.error(
          error
        )


        setError(
          error.message
        )

      } finally {

        setLoading(false)

      }

    }


    loadTypeResearch()

  }, [])



  /*
    ============================================================
    METADADOS ATUAIS
    ============================================================
  */

  const selectedMeta =
    useMemo(
      () => {

        return (
          getTypeMeta(
            selectedType
          )
          ||
          pokemonTypes[0]
        )

      },
      [
        selectedType,
      ]
    )



  const selectedResearch =
    typeResearch[
      selectedType
    ]



  const selectedIndex =
    pokemonTypes
      .findIndex(
        (type) =>
          type.slug === selectedType
      )



  /*
    ============================================================
    ABRIR POKÉDEX FILTRADA
    ============================================================
  */

  function openSelectedType() {

    navigate(
      `/pokedex?type=${selectedType}`
    )

  }



  return (

    <main

      className="
        types-page
        type-observatory
      "

      style={{

        '--obs-accent':
          selectedMeta.accent,

        '--obs-soft':
          selectedMeta.soft,

      }}

    >


      {/* =======================================================
          HEADER
          ======================================================= */}
      <header className="types-header">


        <button

          className="types-logo"

          onClick={() => {
            navigate('/')
          }}

        >
          FIELD DEX
        </button>



        <div className="obs-header-data">

          <span>
            Type Research
          </span>

          <strong>
            Current Type System
          </strong>

        </div>

      </header>



      {/* =======================================================
          INTRO
          ======================================================= */}
      <section className="obs-intro">


        <div>

          <span className="types-eyebrow">
            Classification Observatory
          </span>


          <h1>
            Type Analysis
          </h1>


          <p>

            Study Kanto species through the
            current elemental classification
            system and analyze their battle
            relationships.

          </p>

        </div>



        <div className="obs-status">

          <span>
            Research Database
          </span>


          <strong>

            {loading
              ? 'Indexing'
              : error
                ? 'Offline'
                : '18 Classes Online'
            }

          </strong>

        </div>

      </section>



      {/* =======================================================
          TYPE RAIL
          ======================================================= */}
      <nav

        className="type-rail"

        aria-label="Pokémon types"

      >

        {pokemonTypes.map(
          (type, index) => {

            const isSelected =
              type.slug
              ===
              selectedType



            return (

              <button

                type="button"

                key={
                  type.slug
                }

                className={`
                  type-rail-item
                  ${isSelected
                    ? 'is-selected'
                    : ''
                  }
                `}

                aria-pressed={
                  isSelected
                }

                onClick={() => {

                  setSelectedType(
                    type.slug
                  )

                }}

              >


                <span className="rail-index">

                  {String(
                    index + 1
                  ).padStart(
                    2,
                    '0'
                  )}

                </span>


                <span className="rail-dot" />


                <strong>
                  {type.name}
                </strong>



                {/*
                  layoutId cria uma coisa legal:

                  este underline parece ser
                  O MESMO elemento deslizando
                  entre os botões.
                */}
                {isSelected && (

                  <motion.span

                    className="rail-indicator"

                    layoutId="type-rail-indicator"

                    transition={{

                      type:
                        'spring',

                      stiffness:
                        430,

                      damping:
                        34,

                    }}

                  />

                )}

              </button>

            )

          }
        )}

      </nav>



      {/* =======================================================
          OBSERVATORY STAGE
          ======================================================= */}
      <section className="observatory-stage">


        {/*
          Estes elementos NÃO desaparecem
          quando trocamos de tipo.

          Só mudam de cor.

          Isso evita aquela sensação
          de tela vazia.
        */}
        <span className="observatory-color-field" />

        <span className="observatory-static-axis horizontal" />

        <span className="observatory-static-axis vertical" />



        {loading ? (

          <div className="obs-loading">

            <span />

            Indexing type research...

          </div>

        ) : error ? (

          <div className="obs-loading">
            {error}
          </div>

        ) : (

          <AnimatePresence
            mode="sync"
            initial={false}
            >

            <motion.div

                key={
                selectedType
                }

                className="observatory-motion-layer"


                /*
                O novo tipo começa um pouco abaixo.

                Repare que não usamos mais X.

                A troca agora é vertical,
                parecendo um "reveal".
                */
                initial={{
                opacity: 0,
                y: 16,
                }}


                /*
                O novo conteúdo espera o anterior
                praticamente desaparecer.

                Como o campo de cor e os eixos
                ficam FORA deste componente,
                a página nunca fica realmente vazia.
                */
                animate={{
                opacity: 1,
                y: 0,

                transition: {

                    duration:
                    0.28,

                    delay:
                    0.13,

                    ease: [
                    0.16,
                    1,
                    0.3,
                    1,
                    ],

                },
                }}


                /*
                O conteúdo antigo sobe rapidamente.

                Isso elimina coisas como:

                Fire + Normal
                =
                "Firemal" kkkkk
                */
                exit={{
                opacity: 0,
                y: -13,

                transition: {

                    duration:
                    0.13,

                    ease: [
                    0.4,
                    0,
                    1,
                    1,
                    ],

                },
                }}

            >


              {/* =================================================
                  ÁREA PRINCIPAL
                  ================================================= */}
              <div className="observatory-main">


                {/* ===============================================
                    INFORMAÇÕES
                    =============================================== */}
                <div className="observatory-type-info">


                  <span className="obs-classification">

                    Classification

                    {' / '}

                    {String(
                      selectedIndex + 1
                    ).padStart(
                      2,
                      '0'
                    )}

                  </span>



                  <h2>
                    {selectedMeta.name}
                  </h2>



                  <p>
                    {selectedMeta.description}
                  </p>



                  <div className="obs-record-count">

                    <strong>

                      {selectedResearch
                        ?.count
                        ??
                        0
                      }

                    </strong>


                    <span>
                      Kanto species
                      <br />
                      records
                    </span>

                  </div>



                  <button

                    type="button"

                    className="obs-view-species"

                    onClick={
                      openSelectedType
                    }

                  >

                    View {selectedMeta.name} species

                    <strong>
                      →
                    </strong>

                  </button>

                </div>



                {/* ===============================================
                    VISUAL / POKÉMON
                    =============================================== */}
                <div className="observatory-visual">


                  {/* Símbolo técnico */}
                  <span className="observatory-sigil">

                    <span>

                      {selectedMeta
                        .name
                        .slice(
                          0,
                          2
                        )
                        .toUpperCase()
                      }

                    </span>

                  </span>



                  {/* scanner */}
                  <span className="obs-stage-scanner" />



                  {selectedResearch
                    ?.representatives
                    .length > 0
                    ? (

                      <motion.div

                        className="observatory-specimens"

                        initial="hidden"

                        animate="visible"

                        variants={{

                          hidden: {},

                          visible: {

                            transition: {

                              staggerChildren:
                                0.075,

                              delayChildren:
                                0.08,

                            },

                          },

                        }}

                      >


                        {selectedResearch
                          .representatives
                          .map(
                            (
                              pokemon,
                              index
                            ) => (

                              <motion.button

                                type="button"

                                key={
                                  pokemon.id
                                }

                                className={`
                                  obs-specimen
                                  obs-specimen-${index + 1}
                                `}

                                variants={{

                                  hidden: {

                                    opacity:
                                      0,

                                    y:
                                      25,

                                    scale:
                                      0.92,

                                  },

                                  visible: {

                                    opacity:
                                      1,

                                    y:
                                      0,

                                    scale:
                                      1,

                                    transition: {

                                      duration:
                                        0.52,

                                      ease: [
                                        0.16,
                                        1,
                                        0.3,
                                        1,
                                      ],

                                    },

                                  },

                                }}

                                onClick={() => {

                                  navigate(
                                    `/pokemon/${pokemon.id}`
                                  )

                                }}

                              >


                                <img

                                  src={
                                    pokemon.image
                                  }

                                  alt={
                                    pokemon.name
                                  }

                                />


                                <span>

                                  #{pokemon.id
                                    .toString()
                                    .padStart(
                                      3,
                                      '0'
                                    )}

                                </span>


                                <strong>
                                  {pokemon.name}
                                </strong>

                              </motion.button>

                            )
                          )}

                      </motion.div>

                    ) : (

                      /*
                        Exemplo:
                        Dark possui zero
                        registros Kanto atuais.
                      */
                      <div className="obs-empty-specimens">

                        <span>
                          No Kanto species records
                        </span>


                        <strong>
                          000
                        </strong>


                        <small>
                          Battle classification
                          data remains available.
                        </small>

                      </div>

                    )
                  }

                </div>

              </div>



              {/* =================================================
                  BATTLE PROFILE
                  ================================================= */}
              <div className="observatory-relations">


                {/* ===============================================
                    ATAQUE
                    =============================================== */}
                <div className="obs-relation-panel">


                  <div className="obs-relation-heading">

                    <span>
                      01
                    </span>


                    <div>

                      <strong>
                        Attack Profile
                      </strong>

                      <small>
                        Offensive relationships
                      </small>

                    </div>

                  </div>



                  <div className="obs-relation-row">

                    <span>
                      Super Effective
                    </span>


                    <RelationChips

                      types={
                        selectedResearch
                          ?.strongAgainst
                      }

                    />

                  </div>



                  <div className="obs-relation-row">

                    <span>
                      No Effect
                    </span>


                    <RelationChips

                      types={
                        selectedResearch
                          ?.noEffectAgainst
                      }

                    />

                  </div>

                </div>



                {/* ===============================================
                    DEFESA
                    =============================================== */}
                <div className="obs-relation-panel">


                  <div className="obs-relation-heading">

                    <span>
                      02
                    </span>


                    <div>

                      <strong>
                        Defense Profile
                      </strong>

                      <small>
                        Defensive relationships
                      </small>

                    </div>

                  </div>



                  <div className="obs-relation-row">

                    <span>
                      Weak To
                    </span>


                    <RelationChips

                      types={
                        selectedResearch
                          ?.weakTo
                      }

                    />

                  </div>



                  <div className="obs-relation-row">

                    <span>
                      Resists
                    </span>


                    <RelationChips

                      types={
                        selectedResearch
                          ?.resists
                      }

                    />

                  </div>



                  {selectedResearch
                    ?.immuneTo
                    .length > 0
                    &&
                    (

                      <div className="obs-relation-row">

                        <span>
                          Immune To
                        </span>


                        <RelationChips

                          types={
                            selectedResearch
                              .immuneTo
                          }

                        />

                      </div>

                    )
                  }

                </div>

              </div>

            </motion.div>

          </AnimatePresence>

        )}

      </section>

    </main>

  )

}


export default Types