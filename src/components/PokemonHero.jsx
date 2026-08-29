import {
  useRef,
  useState,
} from 'react'

/*
  ========================================
  POKEMON HERO
  ========================================

  Este componente recebe:

  pokemon
  → todos os dados do Pokémon atual

  onSelectPokemon
  → função usada para abrir outro Pokémon

  Ela serve para:

  - clicar numa evolução
  - Pokémon anterior
  - próximo Pokémon
*/
function PokemonHero({
  pokemon,
  onSelectPokemon,
}) {


  /*
  ========================================
  CONTROLE DO CRY
  ========================================
*/


/*
  useRef permite guardar uma referência
  direta para um elemento do HTML.

  Neste caso:

  <audio>
*/
const audioRef =
  useRef(null)


/*
  Guarda se o áudio
  está tocando ou não.
*/
const [isCryPlaying, setIsCryPlaying] =
  useState(false)



/*
  Função executada
  quando clicamos no botão.
*/
function toggleCry() {

  /*
    Pegamos o elemento <audio>
    através do ref.
  */
  const audio =
    audioRef.current


  /*
    Se ele ainda não existir,
    não fazemos nada.
  */
  if (!audio) {
    return
  }


  /*
    Se estiver tocando:
    pausa.
  */
  if (isCryPlaying) {

    audio.pause()

    setIsCryPlaying(false)

    return
  }


  /*
    Caso contrário:
    toca.
  */
  audio.play()

  setIsCryPlaying(true)
}

  return (
    <section className="pokemon-hero">


      {/* =================================
          LADO ESQUERDO
          ================================= */}
      <div className="pokemon-info">


        {/* =================================
            NÚMERO
            ================================= */}
        <span className="pokemon-number">

          #{pokemon.number
            .toString()
            .padStart(3, '0')}

        </span>



        {/* =================================
            NOME
            ================================= */}
        <h2 className="pokemon-name">
          {pokemon.name}
        </h2>



        {/* =================================
            CATEGORIA
            ================================= */}
        <p className="pokemon-category">
          {pokemon.category}
        </p>



        {/* =================================
            DESCRIÇÃO
            ================================= */}
        <p className="pokemon-description">
          {pokemon.description}
        </p>



        {/* =================================
            DADOS DE CAMPO
            ================================= */}
        <div className="pokemon-measurements">


          {/* ALTURA */}
          <div className="measurement">

            <span className="measurement-label">
              Height
            </span>

            <strong className="measurement-value">
              {pokemon.height} m
            </strong>

          </div>



          {/* PESO */}
          <div className="measurement">

            <span className="measurement-label">
              Weight
            </span>

            <strong className="measurement-value">
              {pokemon.weight} kg
            </strong>

          </div>



          {/* HABITAT */}
          <div className="measurement">

            <span className="measurement-label">
              Habitat
            </span>

            <strong className="measurement-value">
              {pokemon.habitat}
            </strong>

          </div>



          {/* GERAÇÃO */}
          <div className="measurement">

            <span className="measurement-label">
              Generation
            </span>

            <strong className="measurement-value">
              {pokemon.generation}
            </strong>

          </div>

        </div>



        {/* =================================
            HABILIDADES
            ================================= */}
        <div className="pokemon-abilities">

          <span className="abilities-label">
            Abilities
          </span>


          <div className="abilities-list">

            {pokemon.abilities.map(
              (ability) => (

                <span
                  className="ability"
                  key={ability}
                >
                  {ability}
                </span>

              )
            )}

          </div>

        </div>



        {/* =================================
            BASE STATS
            ================================= */}
        <div className="pokemon-stats">

          <span className="stats-title">
            Base Stats
          </span>


          <div className="stats-grid">

            {pokemon.stats.map(
              (stat) => (

                <div
                  className="stat"
                  key={stat.name}
                >


                  {/* Nome + valor */}
                  <div className="stat-header">

                    <span className="stat-label">
                      {stat.label}
                    </span>

                    <strong className="stat-value">
                      {stat.value}
                    </strong>

                  </div>



                  {/* Barra */}
                  <div className="stat-bar">

                    <div
                      className="stat-bar-fill"

                      style={{
                        width:
                          `${Math.min(
                            (
                              stat.value /
                              180
                            ) * 100,
                            100
                          )}%`,
                      }}
                    />

                  </div>

                </div>

              )
            )}

          </div>

        </div>



        {/* =================================
            TIPOS
            ================================= */}
        <div className="pokemon-types">

          {pokemon.types.map(
            (type) => (

              <span
                className="type"
                key={type}
              >
                {type}
              </span>

            )
          )}

        </div>

        {/* =================================
    CRY
    ================================= */}

{pokemon.cry && (

  <div className="pokemon-cry">

    <span className="cry-label">
      Cry
    </span>


    {/*
      Esse é o elemento de áudio.

      Ele não precisa mostrar
      os controles padrão do navegador,
      porque vamos criar nosso próprio botão.
    */}
    <audio

      ref={audioRef}

      src={pokemon.cry}

      preload="none"

      /*
        Quando o Cry terminar,
        atualizamos nosso estado.
      */
      onEnded={() => {
        setIsCryPlaying(false)
      }}

      /*
        Também sincronizamos quando
        ele for pausado.
      */
      onPause={() => {
        setIsCryPlaying(false)
      }}

    />


    <button
      className="cry-button"
      onClick={toggleCry}
    >

      <span className="cry-icon">

        {isCryPlaying
          ? 'Ⅱ'
          : '▶'
        }

      </span>


      {isCryPlaying
        ? 'Pause Cry'
        : 'Play Cry'
      }

    </button>

  </div>

)}



        {/* =================================
            TYPE MATCHUPS
            ================================= */}
        <div className="pokemon-matchups">

          <span className="matchups-title">
            Type Matchups
          </span>



          {/* =================================
              FRAQUEZAS
              ================================= */}
          <div className="matchup-group">

            <span className="matchup-group-label">
              Weak To
            </span>


            <div className="matchup-list">

              {pokemon
                .matchups
                .weaknesses
                .map(
                  (matchup) => (

                    <span
                      className="matchup-chip weakness"
                      key={matchup.type}
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



          {/* =================================
              RESISTÊNCIAS
              ================================= */}
          <div className="matchup-group">

            <span className="matchup-group-label">
              Resists
            </span>


            <div className="matchup-list">

              {pokemon
                .matchups
                .resistances
                .map(
                  (matchup) => (

                    <span
                      className="matchup-chip resistance"
                      key={matchup.type}
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



          {/* =================================
              IMUNIDADES

              Só aparece se houver alguma.
              ================================= */}
          {pokemon
            .matchups
            .immunities
            .length > 0
            && (

              <div className="matchup-group">

                <span className="matchup-group-label">
                  Immune To
                </span>


                <div className="matchup-list">

                  {pokemon
                    .matchups
                    .immunities
                    .map(
                      (matchup) => (

                        <span
                          className="matchup-chip immunity"
                          key={matchup.type}
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



        {/* =================================
            EVOLUTION FAMILY
            ================================= */}
        <div className="pokemon-evolutions">

          <span className="evolution-title">
            Evolution Family
          </span>


          <div className="evolution-list">

            {pokemon.evolutions.map(
              (evolution) => (

                <button

                  className="evolution-card"

                  key={evolution.id}

                  /*
                    Ao clicar:

                    abrimos aquele Pokémon.
                  */
                  onClick={() => {

                    onSelectPokemon(
                      evolution.id
                    )

                  }}

                >


                  {/* Imagem */}
                  <img
                    src={evolution.image}
                    alt={evolution.name}
                    className="evolution-image"
                  />



                  {/* Informações */}
                  <div className="evolution-info">

                    <span className="evolution-number">

                      #{evolution.id
                        .toString()
                        .padStart(3, '0')}

                    </span>


                    <strong className="evolution-name">
                      {evolution.name}
                    </strong>


                    <span className="evolution-method">
                      {evolution.method}
                    </span>

                  </div>

                </button>

              )
            )}

          </div>

        </div>



        {/* =================================
            ANTERIOR / PRÓXIMO
            ================================= */}
        <div className="pokemon-sequence-nav">


          {/* =============================
              POKÉMON ANTERIOR
              ============================= */}
          {pokemon.navigation.previous ? (

            <button

              className="sequence-button previous"

              onClick={() => {

                onSelectPokemon(
                  pokemon.navigation.previous.id
                )

              }}

            >

              <span className="sequence-direction">
                ← Previous
              </span>


              <span className="sequence-number">

                #{pokemon.navigation.previous.id
                  .toString()
                  .padStart(3, '0')}

              </span>


              <strong className="sequence-name">

                {pokemon.navigation.previous.name}

              </strong>

            </button>

          ) : (

            /*
              Bulbasaur (#001)
              não possui anterior.
            */
            <div />

          )}



          {/* =============================
              PRÓXIMO POKÉMON
              ============================= */}
          {pokemon.navigation.next ? (

            <button

              className="sequence-button next"

              onClick={() => {

                onSelectPokemon(
                  pokemon.navigation.next.id
                )

              }}

            >

              <span className="sequence-direction">
                Next →
              </span>


              <span className="sequence-number">

                #{pokemon.navigation.next.id
                  .toString()
                  .padStart(3, '0')}

              </span>


              <strong className="sequence-name">

                {pokemon.navigation.next.name}

              </strong>

            </button>

          ) : (

            /*
              Mew (#151)
              não possui próximo.
            */
            <div />

          )}

        </div>

      </div>



      {/* =================================
          LADO DIREITO
          ================================= */}
      <div className="pokemon-image-area">

        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="pokemon-image"
        />

      </div>

    </section>
  )
}


export default PokemonHero