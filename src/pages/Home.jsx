import {
  useEffect,
  useRef,
  useState,
} from 'react'

import {
  useNavigate,
} from 'react-router-dom'

import {
  getTypeMeta,
} from '../data/pokemonTypes'



/*
  ========================================
  FORMATAR NOMES
  ========================================
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
  ========================================
  POKÉMON ALEATÓRIO DE KANTO
  ========================================
*/

function getRandomKantoId() {

  return (
    Math.floor(
      Math.random() * 151
    )
    + 1
  )

}



function Home() {

  const navigate =
    useNavigate()



  /*
    ========================================
    PESQUISA
    ========================================
  */

  const [
    searchTerm,
    setSearchTerm,
  ] = useState('')



  /*
    ========================================
    FEATURED SPECIMEN
    ========================================
  */

  const [
    featuredPokemon,
    setFeaturedPokemon,
  ] = useState(null)


  const [
    featuredLoading,
    setFeaturedLoading,
  ] = useState(true)



  /*
    Referência à área visual.

    Usaremos isso para o parallax.
  */
  const specimenRef =
    useRef(null)



  /*
    ========================================
    CARREGAR ESPÉCIME
    ========================================
  */

  async function loadFeaturedPokemon(id) {

    /*
      Quando já existe Pokémon na tela,
      ele continua visível enquanto
      procuramos o próximo.

      O CSS vai animar esse estado.
    */
    setFeaturedLoading(true)


    try {

      const [
        pokemonResponse,
        speciesResponse,
      ] = await Promise.all([

        fetch(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        ),

        fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${id}`
        ),

      ])


      if (
        !pokemonResponse.ok
        ||
        !speciesResponse.ok
      ) {

        throw new Error(
          'Could not scan specimen.'
        )

      }


      const [
        pokemonData,
        speciesData,
      ] = await Promise.all([

        pokemonResponse.json(),

        speciesResponse.json(),

      ])



      /*
        Categoria oficial em inglês.
      */
      const englishGenus =
        speciesData
          .genera
          .find(
            (genus) =>
              genus.language.name === 'en'
          )



      setFeaturedPokemon({

        id:
          pokemonData.id,

        name:
          formatName(
            pokemonData.name
          ),

        category:
          englishGenus?.genus
          ||
          'Unknown Pokémon',

        height:
          pokemonData.height / 10,

        weight:
          pokemonData.weight / 10,

        types:
          pokemonData.types.map(
            (typeInfo) =>
              formatName(
                typeInfo.type.name
              )
          ),

        image:
          pokemonData
            .sprites
            .other[
              'official-artwork'
            ]
            .front_default,

      })

    } catch (error) {

      console.error(
        error
      )

    } finally {

      setFeaturedLoading(false)

    }

  }



  /*
    Primeiro scan.
  */
  useEffect(() => {

    loadFeaturedPokemon(
      getRandomKantoId()
    )

  }, [])



  /*
    ========================================
    CORES DO TIPO
    ========================================

    Exemplo:

    Poison
    ↓
    poison
    ↓
    pokemonTypes.js
    ↓
    accent + soft
  */

  const primaryTypeSlug =
    featuredPokemon
      ?.types
      ?.[0]
      ?.toLowerCase()
    ||
    'normal'


  const featuredTypeMeta =
    getTypeMeta(
      primaryTypeSlug
    )



  /*
    ========================================
    RESCAN
    ========================================
  */

  function scanNewPokemon() {

    /*
      Evita clicar várias vezes
      enquanto já estamos buscando.
    */
    if (featuredLoading) {
      return
    }


    let newId =
      getRandomKantoId()


    /*
      Evita sortear imediatamente
      o mesmo Pokémon.
    */
    while (
      featuredPokemon
      &&
      newId === featuredPokemon.id
    ) {

      newId =
        getRandomKantoId()

    }


    loadFeaturedPokemon(
      newId
    )

  }



  /*
    ========================================
    PARALLAX
    ========================================
  */

  function handleSpecimenMouseMove(event) {

    const specimen =
      specimenRef.current


    if (!specimen) {
      return
    }


    const rect =
      specimen
        .getBoundingClientRect()


    const x =
      (
        event.clientX
        -
        rect.left
      )
      /
      rect.width
      -
      0.5


    const y =
      (
        event.clientY
        -
        rect.top
      )
      /
      rect.height
      -
      0.5



    specimen.style.setProperty(
      '--mouse-x',
      x
    )


    specimen.style.setProperty(
      '--mouse-y',
      y
    )

  }



  function handleSpecimenMouseLeave() {

    const specimen =
      specimenRef.current


    if (!specimen) {
      return
    }


    specimen.style.setProperty(
      '--mouse-x',
      0
    )


    specimen.style.setProperty(
      '--mouse-y',
      0
    )

  }



  /*
    ========================================
    BUSCA
    ========================================
  */

  function handleSearch(event) {

    event.preventDefault()


    const cleanedSearch =
      searchTerm.trim()


    if (!cleanedSearch) {
      return
    }


    navigate(
      `/pokemon/${cleanedSearch.toLowerCase()}`
    )

  }



  /*
    ========================================
    RANDOM ENCOUNTER
    ========================================
  */

  function openRandomPokemon() {

    navigate(
      `/pokemon/${getRandomKantoId()}`
    )

  }



  return (

    <main className="home-page">


      {/* =================================
          HEADER
          ================================= */}
      <header className="home-header">

        <div>

          <h1 className="home-logo">
            FIELD DEX
          </h1>


          <p className="home-eyebrow">
            Pokémon Research Archive
          </p>

        </div>



        <div className="home-version">

          <span>
            Kanto Archive
          </span>


          <strong>
            001—151
          </strong>

        </div>

      </header>



      {/* =================================
          HERO
          ================================= */}
      <section className="home-stage">


        {/* =================================
            TEXTO
            ================================= */}
        <div className="home-intro">

          <span className="home-section-label">
            Research Database
          </span>


          <h2 className="home-title">

            Explore the world

            <br />

            <span>
              one species at a
            </span>

            <br />

            <span>
              time.
            </span>

          </h2>


          <p className="home-description">

            Search species, study their biology,
            compare base stats and trace their
            evolutionary families.

          </p>



          <form
            className="home-search"
            onSubmit={handleSearch}
          >

            <input

              type="text"

              value={searchTerm}

              placeholder="Search Pokémon name or #"

              onChange={(event) => {

                setSearchTerm(
                  event.target.value
                )

              }}

            />


            <button type="submit">
              Search →
            </button>

          </form>

        </div>



        {/* =================================
            FEATURED SPECIMEN
            ================================= */}
        <div

          className={`
            featured-specimen
            ${featuredLoading
              ? 'is-scanning'
              : ''
            }
          `}

          ref={specimenRef}

          style={{

            '--specimen-accent':
              featuredTypeMeta?.accent
              ||
              '#77736a',

            '--specimen-soft':
              featuredTypeMeta?.soft
              ||
              '#ebe9e2',

          }}

          onMouseMove={
            handleSpecimenMouseMove
          }

          onMouseLeave={
            handleSpecimenMouseLeave
          }

        >


          {/* Cor ambiente do tipo */}
          <span className="specimen-type-field" />



          {/* Cabeçalho */}
          <div className="specimen-topline">

            <span>
              Featured Specimen
            </span>


            <button

              type="button"

              disabled={
                featuredLoading
              }

              onClick={
                scanNewPokemon
              }

            >

              {featuredLoading
                ? 'Scanning...'
                : 'Rescan ↻'
              }

            </button>

          </div>



          {featuredPokemon ? (

            /*
              key faz este bloco ser recriado
              quando o Pokémon muda.

              Isso faz as animações de entrada
              rodarem novamente.
            */
            <div
              className="specimen-record"
              key={featuredPokemon.id}
            >


              {/* Número gigante */}
              <span className="specimen-background-number">

                {featuredPokemon.id
                  .toString()
                  .padStart(
                    3,
                    '0'
                  )}

              </span>



              {/* Visual */}
              <button

                type="button"

                className="specimen-visual"

                onClick={() => {

                  navigate(
                    `/pokemon/${featuredPokemon.id}`
                  )

                }}

              >

                <span className="specimen-orbit" />

                <span className="specimen-axis horizontal" />

                <span className="specimen-axis vertical" />

                <span className="specimen-scanner" />



                <img

                  src={
                    featuredPokemon.image
                  }

                  alt={
                    featuredPokemon.name
                  }

                  className="specimen-image"

                />



                <span className="specimen-view">
                  View record →
                </span>

              </button>



              {/* Identificação */}
              <div className="specimen-identification">

                <div className="specimen-main-data">

                  <span className="specimen-id">

                    Specimen /

                    {' '}

                    {featuredPokemon.id
                      .toString()
                      .padStart(
                        3,
                        '0'
                      )}

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

                    <span>
                      Type
                    </span>

                    <strong>
                      {featuredPokemon.types.join(
                        ' / '
                      )}
                    </strong>

                  </div>



                  <div>

                    <span>
                      Height
                    </span>

                    <strong>
                      {featuredPokemon.height} M
                    </strong>

                  </div>



                  <div>

                    <span>
                      Weight
                    </span>

                    <strong>
                      {featuredPokemon.weight} KG
                    </strong>

                  </div>

                </div>

              </div>

            </div>

          ) : (

            <div className="specimen-loading">

              <span className="scan-pulse" />

              Scanning archive...

            </div>

          )}



          {/* Overlay usado durante Rescan */}
          {featuredLoading
            &&
            featuredPokemon
            &&
            (

              <div className="specimen-scan-overlay">

                <span />

                <strong>
                  Searching archive
                </strong>

              </div>

            )
          }

        </div>

      </section>



      {/* =================================
          RESEARCH MODULES
          ================================= */}
      <section className="home-research-modules">


        {/* =================================
            RANDOM ENCOUNTER
            ================================= */}
        <button

          className="
            research-module
            encounter-module
          "

          onClick={
            openRandomPokemon
          }

        >

          <div className="module-topline">

            <span>
              01
            </span>

            <span>
              Encounter
            </span>

          </div>



          <div className="module-content">

            <span className="module-kicker">
              Unknown specimen
            </span>


            <strong className="module-title">
              Random
              <br />
              Encounter
            </strong>


            <p>
              Pull an unidentified entry
              from the Kanto archive.
            </p>

          </div>



          {/* Visual próprio do módulo */}
          <div className="encounter-visual">

            <span>
              001
            </span>

            <span className="encounter-line" />

            <strong>
              ???
            </strong>

            <span className="encounter-line" />

            <span>
              151
            </span>

          </div>



          <span className="module-action">
            Initiate scan ↗
          </span>

        </button>



        {/* =================================
            BROWSE
            ================================= */}
        <button

          className="
            research-module
            archive-module
          "

          onClick={() => {

            navigate(
              '/pokedex'
            )

          }}

        >

          <div className="module-topline">

            <span>
              02
            </span>

            <span>
              Species Archive
            </span>

          </div>



          <div className="module-content">

            <span className="module-kicker">
              Indexed records
            </span>


            <strong className="module-title">
              Browse
              <br />
              Pokédex
            </strong>


            <p>
              Access all 151 catalogued
              species from Generation I.
            </p>

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



          <span className="module-action">
            Open archive ↗
          </span>

        </button>



        {/* =================================
            TYPES
            ================================= */}
        <button

          className="
            research-module
            type-module
          "

          onClick={() => {

            navigate(
              '/types'
            )

          }}

        >

          <div className="module-topline">

            <span>
              03
            </span>

            <span>
              Classification
            </span>

          </div>



          <div className="module-content">

            <span className="module-kicker">
              18 elemental classes
            </span>


            <strong className="module-title">
              Explore
              <br />
              Types
            </strong>


            <p>
              Study species through their
              elemental classifications.
            </p>

          </div>



          <div className="type-module-visual">

            <span className="mini-type grass">
              GR
            </span>

            <span className="mini-type fire">
              FI
            </span>

            <span className="mini-type water">
              WA
            </span>

            <span className="mini-type electric">
              EL
            </span>

            <span className="mini-type psychic">
              PS
            </span>

            <span className="mini-type ghost">
              GH
            </span>

          </div>



          <span className="module-action">
            View classes ↗
          </span>

        </button>

      </section>



      <footer className="home-footer">

        <span>
          151 species in current archive
        </span>

      </footer>

    </main>

  )

}


export default Home