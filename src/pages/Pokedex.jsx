/*
  ============================================================
  POKÉDEX / SPECIES ARCHIVE
  ============================================================

  Agora a página tem duas responsabilidades:

  1. continuar sendo rápida para encontrar Pokémon;
  2. parecer um "arquivo vivo" da mesma interface da Home.

  O Motion entra principalmente para:

  - reorganizar a grade;
  - animar entrada/saída dos Pokémon;
  - criar uma sensação contínua ao trocar filtros.
*/


import {
  useEffect,
  useMemo,
  useState,
} from 'react'


import {
  useNavigate,
  useSearchParams,
} from 'react-router-dom'


/*
  Motion:

  motion
  → transforma elementos normais em elementos animáveis.

  AnimatePresence
  → permite animar também quando um elemento DESAPARECE.
*/
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
  FORMATAR NOME
  ============================================================
*/

function formatPokemonName(name) {

  return name
    .split('-')
    .map((word) => (
      word.charAt(0).toUpperCase()
      +
      word.slice(1)
    ))
    .join(' ')

}



/*
  ============================================================
  EXTRAIR ID DA URL DA POKEAPI
  ============================================================

  https://pokeapi.co/api/v2/pokemon/25/

  ↓

  25
*/

function getPokemonIdFromUrl(url) {

  const parts =
    url
      .split('/')
      .filter(Boolean)


  return Number(
    parts[parts.length - 1]
  )

}



function Pokedex() {

  const navigate =
    useNavigate()



  /*
    ============================================================
    QUERY PARAMETERS
    ============================================================

    /pokedex?type=ghost

    ↓

    selectedType = "ghost"
  */

  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams()


  const typeFromUrl =
    searchParams.get('type')



  /*
    Só aceitamos tipos que realmente existem.
  */
  const selectedType =

    pokemonTypes.some(
      (type) =>
        type.slug === typeFromUrl
    )

      ? typeFromUrl

      : 'all'



  /*
    ============================================================
    ESTADOS
    ============================================================
  */

  const [
    pokemonList,
    setPokemonList,
  ] = useState([])


  const [
    searchTerm,
    setSearchTerm,
  ] = useState('')


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
    CARREGAR ARQUIVO
    ============================================================
  */

  useEffect(() => {

    async function loadPokedex() {

      setLoading(true)
      setError(null)


      try {

        /*
          --------------------------------------------------------
          1. LISTA DOS 151
          --------------------------------------------------------
        */

        const pokemonResponse =
          await fetch(
            'https://pokeapi.co/api/v2/pokemon?limit=151'
          )


        if (!pokemonResponse.ok) {

          throw new Error(
            'Could not load Pokémon archive.'
          )

        }


        const pokemonData =
          await pokemonResponse.json()



        /*
          Criamos os registros básicos.

          Ainda sem tipos.
        */
        const basePokemonList =
          pokemonData.results.map(
            (pokemon) => {

              const id =
                getPokemonIdFromUrl(
                  pokemon.url
                )


              return {

                id,

                name:
                  formatPokemonName(
                    pokemon.name
                  ),

                image:
                  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,

                types: [],

              }

            }
          )



        /*
          --------------------------------------------------------
          2. BUSCAR OS 18 TIPOS
          --------------------------------------------------------
        */

        const typeResponses =
          await Promise.all(

            pokemonTypes.map(
              (type) => (

                fetch(
                  `https://pokeapi.co/api/v2/type/${type.slug}`
                )

              )
            )

          )



        if (
          typeResponses.some(
            (response) =>
              !response.ok
          )
        ) {

          throw new Error(
            'Could not load Pokémon types.'
          )

        }



        const typeDataList =
          await Promise.all(

            typeResponses.map(
              (response) =>
                response.json()
            )

          )



        /*
          --------------------------------------------------------
          3. MAPEAR TIPOS POR POKÉMON
          --------------------------------------------------------

          Resultado:

          {
            1: ['grass', 'poison'],
            4: ['fire'],
            6: ['fire', 'flying']
          }
        */

        const pokemonTypeMap = {}



        typeDataList.forEach(
          (typeData, index) => {

            const typeName =
              pokemonTypes[index].slug



            typeData.pokemon.forEach(
              (entry) => {

                const pokemonId =
                  getPokemonIdFromUrl(
                    entry.pokemon.url
                  )


                /*
                  Nossa V1 usa Kanto.
                */
                if (
                  pokemonId < 1
                  ||
                  pokemonId > 151
                ) {
                  return
                }



                if (
                  !pokemonTypeMap[
                    pokemonId
                  ]
                ) {

                  pokemonTypeMap[
                    pokemonId
                  ] = []

                }



                pokemonTypeMap[
                  pokemonId
                ].push(
                  typeName
                )

              }
            )

          }
        )



        /*
          Juntamos tudo.
        */
        const completedPokemonList =
          basePokemonList.map(
            (pokemon) => ({

              ...pokemon,

              types:
                pokemonTypeMap[
                  pokemon.id
                ]
                ||
                [],

            })
          )


        setPokemonList(
          completedPokemonList
        )

      } catch (error) {

        console.error(error)

        setError(
          error.message
        )

      } finally {

        setLoading(false)

      }

    }


    loadPokedex()

  }, [])



  /*
    ============================================================
    FILTRAGEM
    ============================================================
  */

  const filteredPokemon =
    useMemo(
      () => {

        const cleanedSearch =
          searchTerm
            .trim()
            .toLowerCase()



        return pokemonList.filter(
          (pokemon) => {

            const matchesSearch =

              cleanedSearch === ''

              ||

              pokemon
                .name
                .toLowerCase()
                .includes(
                  cleanedSearch
                )

              ||

              pokemon
                .id
                .toString()
                .includes(
                  cleanedSearch
                )



            const matchesType =

              selectedType === 'all'

              ||

              pokemon
                .types
                .includes(
                  selectedType
                )



            return (
              matchesSearch
              &&
              matchesType
            )

          }
        )

      },

      [
        pokemonList,
        searchTerm,
        selectedType,
      ]

    )



  /*
    ============================================================
    TEMA DO ARQUIVO
    ============================================================

    Se filtrarmos Water, a própria interface
    recebe um pequeno toque azul.

    Se for All Types, usamos neutro.
  */

  const selectedTypeMeta =

    selectedType === 'all'

      ? null

      : getTypeMeta(
          selectedType
        )



  /*
    ============================================================
    TROCAR FILTRO
    ============================================================
  */

  function selectType(typeSlug) {

    if (typeSlug === 'all') {

      setSearchParams({})

      return
    }


    setSearchParams({
      type: typeSlug,
    })

  }



  return (

    <main

      className="pokedex-page archive-v2"

      style={{

        '--archive-accent':
          selectedTypeMeta?.accent
          ||
          '#191919',

        '--archive-soft':
          selectedTypeMeta?.soft
          ||
          '#ece9e2',

      }}

    >


      {/* =======================================================
          HEADER
          ======================================================= */}
      <header className="pokedex-header">


        <button

          className="pokedex-logo"

          onClick={() => {
            navigate('/')
          }}

        >
          FIELD DEX
        </button>



        <div className="pokedex-archive">

          <span>
            Kanto Archive
          </span>

          <strong>
            001—151
          </strong>

        </div>

      </header>



      {/* =======================================================
          INTRO
          ======================================================= */}
      <section className="pokedex-intro">


        <span>
          National Pokédex / Generation I
        </span>


        <h1>
          Species Archive
        </h1>


        <p>
          Browse all currently registered
          species from the Kanto research archive.
        </p>


        {/*
          Pequeno indicador do filtro atual.
        */}
        <div className="archive-current-state">

          <span>
            Current Classification
          </span>


          <strong>

            {selectedType === 'all'
              ? 'All Species'
              : selectedTypeMeta?.name
            }

          </strong>

        </div>

      </section>



      {/* =======================================================
          FERRAMENTAS
          ======================================================= */}
      <section className="pokedex-tools">


        <div className="pokedex-search-area">

          <label htmlFor="pokedex-search">
            Search Species
          </label>


          <input

            id="pokedex-search"

            type="text"

            placeholder="Name or #"

            value={searchTerm}

            onChange={(event) => {

              setSearchTerm(
                event.target.value
              )

            }}

          />

        </div>



        <div className="pokedex-results">

          <span>
            Active Records
          </span>


          <strong>
            {loading
              ? 0
              : filteredPokemon.length
            }
          </strong>

        </div>

      </section>



      {/* =======================================================
          FILTROS
          ======================================================= */}
      <div className="pokedex-type-filters">


        <button

          className={
            selectedType === 'all'
              ? 'pokedex-type-filter active'
              : 'pokedex-type-filter'
          }

          onClick={() => {
            selectType('all')
          }}

        >
          All Types
        </button>



        {pokemonTypes.map(
          (type) => (

            <button

              key={type.slug}

              className={
                selectedType === type.slug
                  ? 'pokedex-type-filter active'
                  : 'pokedex-type-filter'
              }

              onClick={() => {

                selectType(
                  type.slug
                )

              }}

            >
              {type.name}
            </button>

          )
        )}

      </div>



      {/* =======================================================
          LOADING
          ======================================================= */}
      {loading && (

        <div className="archive-loading">

          <span />

          <p>
            Indexing species archive...
          </p>

        </div>

      )}



      {/* =======================================================
          ERRO
          ======================================================= */}
      {!loading && error && (

        <p className="pokedex-status">
          {error}
        </p>

      )}



      {/* =======================================================
          GRID ANIMADO
          ======================================================= */}
      {!loading && !error && (

        <section className="pokedex-grid archive-grid">


          {/*
            AnimatePresence permite que Pokémon
            que deixaram de passar pelo filtro
            tenham animação de SAÍDA.
          */}
          <AnimatePresence
            mode="popLayout"
          >

            {filteredPokemon.map(
              (pokemon) => {


                /*
                  O tipo principal controla
                  a cor do registro.
                */
                const primaryType =
                  pokemon.types[0]


                const primaryTypeMeta =
                  getTypeMeta(
                    primaryType
                  )



                return (

                  <motion.button

                    /*
                      layout é uma das partes
                      mais legais do Motion.

                      Quando a posição do Pokémon
                      muda na grid, ele anima
                      automaticamente até a
                      nova posição.
                    */
                    layout

                    key={pokemon.id}

                    className="
                      pokedex-entry
                      archive-record
                    "


                    style={{

                      '--entry-accent':
                        primaryTypeMeta?.accent
                        ||
                        '#77736a',

                      '--entry-soft':
                        primaryTypeMeta?.soft
                        ||
                        '#ebe9e2',

                    }}


                    /*
                      Entrada.
                    */
                    initial={{
                      opacity: 0,
                      y: 14,
                      scale: 0.985,
                    }}


                    /*
                      Estado normal.
                    */
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}


                    /*
                      Saída quando o filtro
                      remove esse Pokémon.
                    */
                    exit={{
                      opacity: 0,
                      scale: 0.96,
                      y: -8,
                    }}


                    /*
                      Transição do movimento
                      da própria grid.
                    */
                    transition={{

                      layout: {
                        duration: 0.42,
                        ease: [
                          0.16,
                          1,
                          0.3,
                          1,
                        ],
                      },

                      opacity: {
                        duration: 0.18,
                      },

                      scale: {
                        duration: 0.25,
                      },

                    }}


                    onClick={() => {

                      navigate(
                        `/pokemon/${pokemon.id}`
                      )

                    }}

                  >


                    {/* ENTRY */}
                    <span className="record-label">
                      Entry
                    </span>



                    {/* NÚMERO */}
                    <span className="pokedex-entry-number">

                      #{pokemon.id
                        .toString()
                        .padStart(
                          3,
                          '0'
                        )}

                    </span>



                    {/*
                      Número enorme e quase invisível
                      no fundo.
                    */}
                    <span className="record-background-number">

                      {pokemon.id
                        .toString()
                        .padStart(
                          3,
                          '0'
                        )}

                    </span>



                    {/* ==========================================
                        ÁREA VISUAL
                        ========================================== */}
                    <span className="archive-record-visual">


                      <span className="record-orbit" />


                      <span className="record-cross horizontal" />


                      <span className="record-cross vertical" />


                      <span className="record-scan" />



                      <img

                        className="pokedex-entry-image"

                        src={pokemon.image}

                        alt={pokemon.name}

                        loading="lazy"

                      />

                    </span>



                    {/* ==========================================
                        INFORMAÇÕES
                        ========================================== */}
                    <span className="record-information">


                      <strong className="pokedex-entry-name">
                        {pokemon.name}
                      </strong>



                      <span className="pokedex-entry-types">

                        {pokemon.types.map(
                          (type) => {

                            const typeMeta =
                              getTypeMeta(
                                type
                              )


                            return (

                              <span

                                key={type}

                                className="pokedex-entry-type"

                                style={{

                                  '--type-color':
                                    typeMeta?.accent
                                    ||
                                    '#77736a',

                                }}

                              >

                                {typeMeta?.name
                                  ||
                                  formatPokemonName(
                                    type
                                  )
                                }

                              </span>

                            )

                          }
                        )}

                      </span>



                      <span className="record-open">

                        View field record

                        <b>
                          ↗
                        </b>

                      </span>

                    </span>

                  </motion.button>

                )

              }
            )}

          </AnimatePresence>

        </section>

      )}

    </main>

  )

}


export default Pokedex