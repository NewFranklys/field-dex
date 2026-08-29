/*
  ========================================
  HOME
  ========================================

  Página inicial da nossa Pokédex.

  Ela possui três entradas principais:

  01 - Pokémon aleatório
  02 - Pokédex completa
  03 - Explorar por tipos
*/


import {
  useState,
} from 'react'


import {
  useNavigate,
} from 'react-router-dom'



function Home() {

  /*
    ========================================
    NAVEGAÇÃO
    ========================================
  */

  const navigate =
    useNavigate()



  /*
    ========================================
    PESQUISA
    ========================================

    Guarda o que o usuário digitou.
  */

  const [
    searchTerm,
    setSearchTerm,
  ] = useState('')



  /*
    ========================================
    PESQUISAR POKÉMON
    ========================================
  */

  function handleSearch(event) {

    /*
      Impede o formulário
      de recarregar a página.
    */
    event.preventDefault()


    /*
      Remove espaços extras.
    */
    const cleanedSearch =
      searchTerm.trim()


    /*
      Se não digitou nada,
      não fazemos nada.
    */
    if (!cleanedSearch) {
      return
    }


    /*
      Exemplo:

      pikachu

      ↓

      /pokemon/pikachu
    */
    navigate(
      `/pokemon/${cleanedSearch.toLowerCase()}`
    )

  }



  /*
    ========================================
    RANDOM ENCOUNTER
    ========================================

    Sorteia um número entre:

    1 e 151
  */

  function openRandomPokemon() {

    const randomId =
      Math.floor(
        Math.random() * 151
      ) + 1


    navigate(
      `/pokemon/${randomId}`
    )

  }



  return (

    <main className="home-page">


      {/* =================================
          HEADER
          ================================= */}
      <header className="home-header">


        {/* Logo */}
        <div>

          <h1 className="home-logo">
            FIELD DEX
          </h1>


          <p className="home-eyebrow">
            Pokémon Research Archive
          </p>

        </div>



        {/* Identificação do arquivo */}
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
          INTRO
          ================================= */}
      <section className="home-intro">


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



        {/* =================================
            PESQUISA
            ================================= */}
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

      </section>



      {/* =================================
          AÇÕES PRINCIPAIS
          ================================= */}
      <section className="home-actions">


        {/* =================================
            01 - RANDOM
            ================================= */}
        <button

          className="home-action"

          onClick={
            openRandomPokemon
          }

        >


          <span className="action-number">
            01
          </span>



          <div>

            <strong>
              Random Encounter
            </strong>


            <p>
              Discover a random species
              from the Kanto archive.
            </p>

          </div>



          <span className="action-arrow">
            ↗
          </span>

        </button>



        {/* =================================
            02 - POKÉDEX
            ================================= */}
        <button

          className="home-action"

          onClick={() => {

            navigate(
              '/pokedex'
            )

          }}

        >


          <span className="action-number">
            02
          </span>



          <div>

            <strong>
              Browse Pokédex
            </strong>


            <p>
              Explore all 151 species
              in the Kanto archive.
            </p>

          </div>



          <span className="action-arrow">
            ↗
          </span>

        </button>



        {/* =================================
            03 - TIPOS
            ================================= */}
        <button

          className="home-action"

          onClick={() => {

            navigate(
              '/types'
            )

          }}

        >


          <span className="action-number">
            03
          </span>



          <div>

            <strong>
              Explore Types
            </strong>


            <p>
              Discover species through
              their elemental types.
            </p>

          </div>



          <span className="action-arrow">
            ↗
          </span>

        </button>

      </section>



      {/* =================================
          FOOTER
          ================================= */}
      <footer className="home-footer">

        <span>
          151 species in current archive
        </span>

      </footer>


    </main>

  )

}


export default Home