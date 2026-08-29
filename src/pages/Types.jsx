/*
  useNavigate permite abrir
  outras páginas do site.
*/
import {
  useNavigate,
} from 'react-router-dom'


/*
  Importamos nossa lista central
  com os 18 tipos.
*/
import {
  pokemonTypes,
} from '../data/pokemonTypes'



function Types() {

  const navigate =
    useNavigate()



  /*
    Abre a Pokédex já filtrada
    naquele tipo.

    Fire:

    /pokedex?type=fire
  */
  function openType(type) {

    navigate(
      `/pokedex?type=${type}`
    )

  }



  return (
    <main className="types-page">


      {/* =================================
          HEADER
          ================================= */}
      <header className="types-header">

        <button
          className="types-logo"
          onClick={() => {
            navigate('/')
          }}
        >
          FIELD DEX
        </button>


        <span className="types-header-label">
          Type Research
        </span>

      </header>



      {/* =================================
          INTRO
          ================================= */}
      <section className="types-intro">

        <span className="types-eyebrow">
          Classification System
        </span>


        <h1>
          Explore Types
        </h1>


        <p>
          Browse species through the elemental
          classifications that define their
          strengths, weaknesses and behavior.
        </p>

      </section>



      {/* =================================
          GRID DE TIPOS
          ================================= */}
      <section className="types-grid">

        {pokemonTypes.map(
          (type, index) => (

            <button

              className="type-explorer-card"

              key={type.slug}


              /*
                Aqui fazemos algo parecido
                com o tema da página Pokémon.

                Passamos cores do JavaScript
                para variáveis CSS.
              */
              style={{

                '--type-accent':
                  type.accent,

                '--type-soft':
                  type.soft,

              }}


              onClick={() => {

                openType(
                  type.slug
                )

              }}

            >


              {/* Número visual */}
              <span className="type-explorer-number">

                {String(
                  index + 1
                ).padStart(
                  2,
                  '0'
                )}

              </span>



              {/* Nome */}
              <strong className="type-explorer-name">

                {type.name}

              </strong>



              {/* Descrição */}
              <p className="type-explorer-description">

                {type.description}

              </p>



              <span className="type-explorer-action">
                Explore species →
              </span>



              {/*
                Elemento decorativo.

                Não contém informação,
                serve apenas para o visual.
              */}
              <span className="type-explorer-shape" />

            </button>

          )
        )}

      </section>

    </main>
  )
}


export default Types