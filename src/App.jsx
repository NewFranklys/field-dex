import { useEffect, useState } from 'react'

import './App.css'

import PokemonHero from './components/PokemonHero'
import PokemonSearch from './components/PokemonSearch'


/*
  ================================
  TEMAS POR TIPO
  ================================
*/
const typeThemes = {
  grass: {
    accent: '#5f8f66',
    soft: '#e7eee2',
  },

  fire: {
    accent: '#c56545',
    soft: '#f3e5dc',
  },

  water: {
    accent: '#4f7fa3',
    soft: '#e0eaf0',
  },

  electric: {
    accent: '#c49b28',
    soft: '#f2ecd2',
  },

  poison: {
    accent: '#875a91',
    soft: '#ebe2ec',
  },

  ghost: {
    accent: '#65577e',
    soft: '#e7e3ec',
  },

  psychic: {
    accent: '#aa6075',
    soft: '#f0e1e5',
  },

  ice: {
    accent: '#60989a',
    soft: '#e2eeee',
  },

  dragon: {
    accent: '#66549c',
    soft: '#e5e1ee',
  },

  dark: {
    accent: '#514a47',
    soft: '#e5e2df',
  },

  fairy: {
    accent: '#b86f92',
    soft: '#f1e1e8',
  },

  fighting: {
    accent: '#914c43',
    soft: '#eee1de',
  },

  normal: {
    accent: '#6d6a61',
    soft: '#ebe9e2',
  },

  flying: {
    accent: '#7183a5',
    soft: '#e5e9ef',
  },

  bug: {
    accent: '#788843',
    soft: '#e8ebdc',
  },

  rock: {
    accent: '#88774f',
    soft: '#ebe7dd',
  },

  ground: {
    accent: '#9b7748',
    soft: '#eee6d9',
  },

  steel: {
    accent: '#66747a',
    soft: '#e5e9ea',
  },
}


/*
  Nomes bonitos dos stats.
*/
const statLabels = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
}


/*
  Transforma:

  solar-power

  em:

  Solar Power
*/
function formatApiName(name) {

  return name
    .split('-')
    .map((word) => {

      return (
        word.charAt(0).toUpperCase() +
        word.slice(1)
      )

    })
    .join(' ')
}


/*
  generation-i
  ↓
  Generation I
*/
function formatGeneration(name) {

  const generationNumber =
    name.replace('generation-', '')

  return `Generation ${generationNumber.toUpperCase()}`
}


/*
  Retira o ID de uma URL da API.
*/
function getSpeciesIdFromUrl(url) {

  const parts =
    url.split('/').filter(Boolean)

  return Number(
    parts[parts.length - 1]
  )
}


/*
  Descobre como aconteceu
  uma evolução.
*/
function getEvolutionMethod(details) {

  if (!details) {
    return 'Evolution'
  }


  if (details.min_level) {
    return `Lv. ${details.min_level}`
  }


  if (details.item?.name) {

    return formatApiName(
      details.item.name
    )
  }


  if (
    details.trigger?.name === 'trade'
  ) {
    return 'Trade'
  }


  if (details.min_happiness) {
    return 'Friendship'
  }


  if (details.time_of_day) {

    return formatApiName(
      details.time_of_day
    )
  }


  return 'Evolution'
}


/*
  Percorre a árvore de evolução
  usando recursão.
*/
function extractEvolutionFamily(
  chainNode,
  result = [],
  method = 'Base form'
) {

  const id =
    getSpeciesIdFromUrl(
      chainNode.species.url
    )


  result.push({

    id,

    name:
      formatApiName(
        chainNode.species.name
      ),

    method,

    image:
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
  })


  chainNode.evolves_to.forEach(
    (nextEvolution) => {

      const evolutionDetails =
        nextEvolution
          .evolution_details?.[0]


      extractEvolutionFamily(

        nextEvolution,

        result,

        getEvolutionMethod(
          evolutionDetails
        )
      )
    }
  )


  return result
}


function App() {

  /*
    ================================
    ESTADOS
    ================================
  */

  const [searchTerm, setSearchTerm] =
    useState('')


  const [
    currentPokemonQuery,
    setCurrentPokemonQuery,
  ] = useState('1')


  const [pokemon, setPokemon] =
    useState(null)


  const [loading, setLoading] =
    useState(true)


  const [error, setError] =
    useState(null)



  /*
    ================================
    API
    ================================
  */

  useEffect(() => {

    async function loadPokemon() {

      setLoading(true)

      setError(null)


      try {

        /*
          1ª REQUISIÇÃO:
          Pokémon.
        */
        const pokemonResponse =
          await fetch(
            `https://pokeapi.co/api/v2/pokemon/${currentPokemonQuery}`
          )


        if (!pokemonResponse.ok) {

          throw new Error(
            'Pokémon not found.'
          )
        }


        const pokemonData =
          await pokemonResponse.json()



        /*
          2ª REQUISIÇÃO:
          espécie.
        */
        const speciesResponse =
          await fetch(
            `https://pokeapi.co/api/v2/pokemon-species/${pokemonData.id}`
          )


        if (!speciesResponse.ok) {

          throw new Error(
            'Species information not found.'
          )
        }


        const speciesData =
          await speciesResponse.json()



        /*
          3ª REQUISIÇÃO:
          evolução.
        */
        const evolutionResponse =
          await fetch(
            speciesData.evolution_chain.url
          )


        if (!evolutionResponse.ok) {

          throw new Error(
            'Evolution information not found.'
          )
        }


        const evolutionData =
          await evolutionResponse.json()



        const englishGenus =
          speciesData.genera.find(
            (genusInfo) =>
              genusInfo.language.name === 'en'
          )


        const englishDescription =
          speciesData
            .flavor_text_entries
            .find(
              (entry) =>
                entry.language.name === 'en'
            )


        const evolutionFamily =
          extractEvolutionFamily(
            evolutionData.chain
          )



        /*
          ================================
          NOSSO OBJETO
          ================================
        */
        const formattedPokemon = {

          number:
            pokemonData.id,


          name:
            formatApiName(
              pokemonData.name
            ),


          category:
            englishGenus?.genus ||
            'Unknown Pokémon',


          description:
            englishDescription
              ?.flavor_text
              .replace(/\f/g, ' ')
              .replace(/\n/g, ' ')
            ||
            'No field notes available.',


          height:
            pokemonData.height / 10,


          weight:
            pokemonData.weight / 10,


          habitat:
            speciesData.habitat?.name
              ? formatApiName(
                  speciesData.habitat.name
                )
              : 'Unknown',


          generation:
            speciesData.generation?.name
              ? formatGeneration(
                  speciesData.generation.name
                )
              : 'Unknown',


          abilities:
            pokemonData.abilities.map(
              (abilityInfo) => {

                return formatApiName(
                  abilityInfo.ability.name
                )
              }
            ),


          stats:
            pokemonData.stats.map(
              (statInfo) => {

                const statName =
                  statInfo.stat.name


                return {

                  name:
                    statName,

                  label:
                    statLabels[statName]
                    || statName,

                  value:
                    statInfo.base_stat,
                }
              }
            ),


          types:
            pokemonData.types.map(
              (typeInfo) => {

                return formatApiName(
                  typeInfo.type.name
                )
              }
            ),


          image:
            pokemonData
              .sprites
              .other[
                'official-artwork'
              ]
              .front_default,


          evolutions:
            evolutionFamily,
        }


        setPokemon(formattedPokemon)

      } catch (error) {

        setError(error.message)

      } finally {

        setLoading(false)
      }
    }


    loadPokemon()

  }, [currentPokemonQuery])



  /*
    ================================
    PESQUISA
    ================================
  */

  function handleSearch(event) {

    event.preventDefault()


    const cleanedSearch =
      searchTerm.trim()


    if (!cleanedSearch) {
      return
    }


    setCurrentPokemonQuery(
      cleanedSearch.toLowerCase()
    )
  }



  /*
    ================================
    IR PARA UM POKÉMON
    ================================

    Criamos uma função genérica.

    Podemos usá-la:

    - no botão Next
    - nas evoluções
    - futuramente em qualquer card
  */
  function goToPokemon(id) {

    /*
      Alteramos o Pokémon pesquisado.
    */
    setCurrentPokemonQuery(
      id.toString()
    )


    /*
      Também atualizamos o texto
      mostrado no campo de pesquisa.

      Assim o input não fica mostrando
      um número antigo.
    */
    setSearchTerm(
      id.toString()
    )
  }



  /*
    ================================
    PRÓXIMO POKÉMON
    ================================
  */

  function showNextPokemon() {

    const nextPokemonId =
      pokemon.number + 1


    /*
      Em vez de repetir a lógica,
      reutilizamos goToPokemon().
    */
    goToPokemon(
      nextPokemonId
    )
  }



  /*
    ================================
    TEMA
    ================================
  */

  const primaryType =
    pokemon?.types?.[0]?.toLowerCase()
    || 'normal'


  const currentTheme =
    typeThemes[primaryType]
    || typeThemes.normal



  /*
    ================================
    INTERFACE
    ================================
  */

  return (
    <main

      className="home"

      style={{
        '--accent-color':
          currentTheme.accent,

        '--soft-color':
          currentTheme.soft,
      }}

    >

      <header className="header">

        <h1 className="logo">
          FIELD DEX
        </h1>

        <p className="database-name">
          Kanto Research Database
        </p>

      </header>


      <PokemonSearch

        searchTerm={searchTerm}

        onSearchTermChange={
          setSearchTerm
        }

        onSearch={handleSearch}

      />


      {loading ? (

        <p className="status-message">
          Searching field database...
        </p>

      ) : error ? (

        <p className="status-message">
          {error}
        </p>

      ) : (

        <PokemonHero

          pokemon={pokemon}

          onNext={showNextPokemon}

          /*
            NOVA PROP.

            Estamos entregando ao
            PokemonHero uma função
            para trocar de Pokémon.
          */
          onSelectPokemon={goToPokemon}

        />

      )}

    </main>
  )
}


export default App