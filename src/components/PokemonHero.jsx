/*
  Agora recebemos três props:

  pokemon
  onNext
  onSelectPokemon
*/
function PokemonHero({
  pokemon,
  onNext,
  onSelectPokemon,
}) {

  return (
    <section className="pokemon-hero">


      {/* =========================
          INFORMAÇÕES
          ========================= */}
      <div className="pokemon-info">


        <span className="pokemon-number">

          #{pokemon.number
            .toString()
            .padStart(3, '0')}

        </span>


        <h2 className="pokemon-name">
          {pokemon.name}
        </h2>


        <p className="pokemon-category">
          {pokemon.category}
        </p>


        <p className="pokemon-description">
          {pokemon.description}
        </p>



        {/* =========================
            DADOS DE CAMPO
            ========================= */}
        <div className="pokemon-measurements">


          <div className="measurement">

            <span className="measurement-label">
              Height
            </span>

            <strong className="measurement-value">
              {pokemon.height} m
            </strong>

          </div>


          <div className="measurement">

            <span className="measurement-label">
              Weight
            </span>

            <strong className="measurement-value">
              {pokemon.weight} kg
            </strong>

          </div>


          <div className="measurement">

            <span className="measurement-label">
              Habitat
            </span>

            <strong className="measurement-value">
              {pokemon.habitat}
            </strong>

          </div>


          <div className="measurement">

            <span className="measurement-label">
              Generation
            </span>

            <strong className="measurement-value">
              {pokemon.generation}
            </strong>

          </div>

        </div>



        {/* =========================
            HABILIDADES
            ========================= */}
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



        {/* =========================
            STATS
            ========================= */}
        <div className="pokemon-stats">

          <span className="stats-title">
            Base Stats
          </span>


          <div className="stats-grid">

            {pokemon.stats.map((stat) => (

              <div
                className="stat"
                key={stat.name}
              >

                <div className="stat-header">

                  <span className="stat-label">
                    {stat.label}
                  </span>

                  <strong className="stat-value">
                    {stat.value}
                  </strong>

                </div>


                <div className="stat-bar">

                  <div
                    className="stat-bar-fill"

                    style={{
                      width: `${Math.min(
                        (stat.value / 180)
                        * 100,
                        100
                      )}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>



        {/* =========================
            TIPOS
            ========================= */}
        <div className="pokemon-types">

          {pokemon.types.map((type) => (

            <span
              className="type"
              key={type}
            >
              {type}
            </span>

          ))}

        </div>



        {/* =========================
            EVOLUÇÕES
            ========================= */}
        <div className="pokemon-evolutions">

          <span className="evolution-title">
            Evolution Family
          </span>


          <div className="evolution-list">

            {pokemon.evolutions.map(
              (evolution) => (

                /*
                  Mudamos de <div> para <button>.

                  Agora o card pode
                  ser clicado.
                */
                <button

                  className="evolution-card"

                  key={evolution.id}

                  /*
                    Quando clicar:

                    abre aquele Pokémon.
                  */
                  onClick={() => {

                    onSelectPokemon(
                      evolution.id
                    )

                  }}

                >


                  <img
                    src={evolution.image}
                    alt={evolution.name}
                    className="evolution-image"
                  />


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



        <button
          className="explore-button"
          onClick={onNext}
        >
          Explore next →
        </button>

      </div>



      {/* IMAGEM */}
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