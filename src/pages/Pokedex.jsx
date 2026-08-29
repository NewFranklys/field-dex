/*
  ========================================
  POKÉDEX
  ========================================

  Esta página:

  - carrega os 151 Pokémon de Kanto
  - descobre os tipos de cada Pokémon
  - permite pesquisar
  - permite filtrar por tipo
  - entende URLs como:

    /pokedex?type=fire
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


import {
  pokemonTypes,
  getTypeMeta,
} from '../data/pokemonTypes'



/*
  ========================================
  FORMATAR NOME
  ========================================

  mr-mime
  ↓
  Mr Mime
*/

function formatPokemonName(name) {

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
  ========================================
  PEGAR ID PELA URL
  ========================================

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



/*
  ========================================
  COMPONENTE
  ========================================
*/

function Pokedex() {

  const navigate =
    useNavigate()



  /*
    ========================================
    QUERY PARAMETERS
    ========================================

    Exemplo:

    /pokedex?type=ghost

    typeFromUrl:

    "ghost"
  */

  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams()


  const typeFromUrl =
    searchParams.get('type')



  /*
    Verificamos se o tipo recebido
    realmente existe.

    Se alguém colocar:

    ?type=banana

    voltamos para "all".
  */
  const selectedType =

    pokemonTypes.some(
      (type) =>
        type.slug === typeFromUrl
    )

      ? typeFromUrl

      : 'all'



  /*
    ========================================
    STATES
    ========================================
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
    ========================================
    CARREGAR POKÉMON
    ========================================
  */

  useEffect(() => {

    async function loadPokedex() {

      setLoading(true)

      setError(null)


      try {

        /*
          ========================================
          1. LISTA DOS 151
          ========================================
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
          Criamos nossa lista base.

          Nesse momento temos:

          id
          name
          image

          Os tipos serão adicionados depois.
        */
        const basePokemonList =
          pokemonData
            .results
            .map(
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

                  /*
                    Começa vazio.

                    Depois vamos descobrir
                    os tipos.
                  */
                  types: [],

                }

              }
            )



        /*
          ========================================
          2. CARREGAR OS 18 TIPOS
          ========================================

          pokemonTypes agora contém objetos:

          {
            slug: 'fire',
            name: 'Fire'
          }

          Por isso usamos:

          type.slug
        */

        const typeResponses =
          await Promise.all(

            pokemonTypes.map(
              (type) => {

                return fetch(
                  `https://pokeapi.co/api/v2/type/${type.slug}`
                )

              }
            )

          )



        /*
          Verificamos se alguma chamada
          falhou.
        */
        const failedTypeRequest =
          typeResponses.some(
            (response) =>
              !response.ok
          )


        if (failedTypeRequest) {

          throw new Error(
            'Could not load Pokémon types.'
          )

        }



        /*
          Transformamos as 18 respostas
          em JSON.
        */
        const typeDataList =
          await Promise.all(

            typeResponses.map(
              (response) =>
                response.json()
            )

          )



        /*
          ========================================
          3. MAPA DE TIPOS
          ========================================

          Vamos construir algo assim:

          {
            1: ['grass', 'poison'],
            4: ['fire'],
            6: ['fire', 'flying'],
            25: ['electric']
          }
        */

        const pokemonTypeMap = {}



        typeDataList.forEach(
          (typeData, index) => {

            /*
              Descobrimos qual tipo
              corresponde àquela resposta.

              index 0 → normal
              index 1 → fire
              etc.
            */
            const typeName =
              pokemonTypes[index].slug



            /*
              A API retorna todos os Pokémon
              pertencentes àquele tipo.
            */
            typeData
              .pokemon
              .forEach(
                (entry) => {

                  const pokemonId =
                    getPokemonIdFromUrl(
                      entry.pokemon.url
                    )


                  /*
                    Nossa V1 usa apenas Kanto.
                  */
                  if (
                    pokemonId < 1
                    ||
                    pokemonId > 151
                  ) {

                    return

                  }



                  /*
                    Se ainda não existe
                    uma lista para esse Pokémon,
                    criamos.
                  */
                  if (
                    !pokemonTypeMap[
                      pokemonId
                    ]
                  ) {

                    pokemonTypeMap[
                      pokemonId
                    ] = []

                  }



                  /*
                    Adicionamos o tipo.
                  */
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
          ========================================
          4. JUNTAR POKÉMON + TIPOS
          ========================================
        */

        const completedPokemonList =
          basePokemonList.map(
            (pokemon) => {

              return {

                ...pokemon,

                types:
                  pokemonTypeMap[
                    pokemon.id
                  ]
                  ||
                  [],

              }

            }
          )



        /*
          Agora temos tudo.
        */
        setPokemonList(
          completedPokemonList
        )

      } catch (error) {

        console.error(
          error
        )


        setError(
          error.message
        )

      } finally {

        /*
          Mesmo se der erro,
          paramos o loading.
        */
        setLoading(false)

      }

    }


    loadPokedex()

  }, [])



  /*
    ========================================
    FILTRAR LISTA
    ========================================

    useMemo recalcula a lista somente
    quando alguma dependência muda.

    Aqui:

    - lista
    - pesquisa
    - tipo selecionado
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


            /*
              =================================
              FILTRO DE PESQUISA
              =================================

              Funciona por:

              nome
              ou
              número
            */

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



            /*
              =================================
              FILTRO DE TIPO
              =================================
            */

            const matchesType =

              selectedType === 'all'

              ||

              pokemon
                .types
                .includes(
                  selectedType
                )



            /*
              Precisa passar pelos dois.
            */
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
    ========================================
    TROCAR FILTRO
    ========================================
  */

  function selectType(typeSlug) {

    /*
      All Types:

      /pokedex
    */
    if (typeSlug === 'all') {

      setSearchParams({})

      return

    }



    /*
      Fire:

      /pokedex?type=fire
    */
    setSearchParams({

      type:
        typeSlug,

    })

  }



  return (

    <main className="pokedex-page">


      {/* =================================
          HEADER
          ================================= */}
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



      {/* =================================
          INTRO
          ================================= */}
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

      </section>



      {/* =================================
          FERRAMENTAS
          ================================= */}
      <section className="pokedex-tools">


        {/* PESQUISA */}
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



        {/* RESULTADOS */}
        <div className="pokedex-results">

          <span>
            Results
          </span>


          <strong>

            {loading
              ? 0
              : filteredPokemon.length
            }

          </strong>

        </div>

      </section>



      {/* =================================
          FILTROS
          ================================= */}
      <div className="pokedex-type-filters">


        {/* TODOS */}
        <button

          className={
            selectedType === 'all'

              ? 'pokedex-type-filter active'

              : 'pokedex-type-filter'
          }

          onClick={() => {

            selectType(
              'all'
            )

          }}

        >
          All Types
        </button>



        {/* 18 TIPOS */}
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



      {/* =================================
          LOADING
          ================================= */}
      {loading && (

        <p className="pokedex-status">
          Loading species archive...
        </p>

      )}



      {/* =================================
          ERRO
          ================================= */}
      {!loading && error && (

        <p className="pokedex-status">
          {error}
        </p>

      )}



      {/* =================================
          GRID DE POKÉMON
          ================================= */}
      {!loading && !error && (

        <section className="pokedex-grid">

          {filteredPokemon.map(
            (pokemon) => (

              <button

                className="pokedex-entry"

                key={pokemon.id}

                onClick={() => {

                  navigate(
                    `/pokemon/${pokemon.id}`
                  )

                }}

              >


                {/* NÚMERO */}
                <span className="pokedex-entry-number">

                  #{pokemon.id
                    .toString()
                    .padStart(
                      3,
                      '0'
                    )}

                </span>



                {/* IMAGEM */}
                <img

                  className="pokedex-entry-image"

                  src={pokemon.image}

                  alt={pokemon.name}

                  loading="lazy"

                />



                {/* NOME */}
                <strong className="pokedex-entry-name">

                  {pokemon.name}

                </strong>



                {/* TIPOS */}
                <div className="pokedex-entry-types">

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

                </div>


                {/* SETA */}
                <span className="pokedex-entry-arrow">
                  ↗
                </span>

              </button>

            )
          )}

        </section>

      )}

    </main>

  )

}


export default Pokedex