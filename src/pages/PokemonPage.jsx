/*
  ========================================
  IMPORTS
  ========================================
*/

import {
  useEffect,
  useState,
} from 'react'


import {
  useNavigate,
  useParams,
} from 'react-router-dom'


import '../App.css'

import PokemonHero from '../components/PokemonHero'
import PokemonSearch from '../components/PokemonSearch'



/*
  ========================================
  TEMAS VISUAIS
  ========================================
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
  ========================================
  LABELS DOS STATS
  ========================================
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
  ========================================
  FORMATAR NOMES
  ========================================

  solar-power
  ↓
  Solar Power
*/

function formatApiName(name) {

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
  FORMATAR GERAÇÃO
  ========================================

  generation-i
  ↓
  Generation I
*/

function formatGeneration(name) {

  const generationNumber =
    name.replace(
      'generation-',
      ''
    )


  return (
    `Generation ${generationNumber.toUpperCase()}`
  )
}



/*
  ========================================
  PEGAR ID DE UMA URL
  ========================================

  .../pokemon-species/147/
  ↓
  147
*/

function getSpeciesIdFromUrl(url) {

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
  CARREGAR POKÉMON VIZINHO
  ========================================

  Essa é a função nova importante.

  Recebe:

  5

  Busca:

  /pokemon/5

  E retorna:

  {
    id: 5,
    name: 'Charmeleon'
  }
*/

async function loadPokemonNeighbor(id) {

  /*
    null significa:

    "não existe Pokémon desse lado".

    Exemplo:
    Bulbasaur não possui anterior.
  */
  if (!id) {
    return null
  }


  const response =
    await fetch(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    )


  if (!response.ok) {
    return null
  }


  const data =
    await response.json()


  return {

    id:
      data.id,

    name:
      formatApiName(
        data.name
      ),

  }
}



/*
  ========================================
  MÉTODO DE EVOLUÇÃO
  ========================================
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
  ========================================
  CADEIA DE EVOLUÇÃO
  ========================================
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



/*
  ========================================
  FRAQUEZAS / RESISTÊNCIAS
  ========================================
*/

function calculateTypeMatchups(
  typeDataList
) {

  /*
    Aqui guardamos:

    rock: 4
    water: 2
    grass: 0.25
    ground: 0
  */
  const multipliers = {}



  /*
    Função interna para multiplicar
    vantagens/desvantagens.
  */
  function multiplyType(
    typeName,
    amount
  ) {

    if (
      multipliers[typeName]
      === undefined
    ) {

      multipliers[typeName] = 1

    }


    multipliers[typeName] *= amount
  }



  /*
    Percorremos cada tipo
    do Pokémon.
  */
  typeDataList.forEach(
    (typeData) => {


      /*
        Fraquezas:

        recebe 2×.
      */
      typeData
        .damage_relations
        .double_damage_from
        .forEach(
          (type) => {

            multiplyType(
              type.name,
              2
            )

          }
        )



      /*
        Resistências:

        recebe 0.5×.
      */
      typeData
        .damage_relations
        .half_damage_from
        .forEach(
          (type) => {

            multiplyType(
              type.name,
              0.5
            )

          }
        )



      /*
        Imunidades:

        recebe 0×.
      */
      typeData
        .damage_relations
        .no_damage_from
        .forEach(
          (type) => {

            multipliers[
              type.name
            ] = 0

          }
        )

    }
  )



  /*
    Transformamos o objeto
    numa lista.
  */
  const matchups =
    Object
      .entries(
        multipliers
      )
      .map(
        ([type, multiplier]) => {

          return {

            type:
              formatApiName(
                type
              ),

            multiplier,

          }

        }
      )
      .filter(
        (matchup) =>
          matchup.multiplier !== 1
      )



  /*
    Fraquezas.
  */
  const weaknesses =
    matchups
      .filter(
        (matchup) =>
          matchup.multiplier > 1
      )
      .sort(
        (a, b) =>
          b.multiplier
          -
          a.multiplier
      )



  /*
    Resistências.
  */
  const resistances =
    matchups
      .filter(
        (matchup) =>

          matchup.multiplier > 0

          &&

          matchup.multiplier < 1

      )
      .sort(
        (a, b) =>
          a.multiplier
          -
          b.multiplier
      )



  /*
    Imunidades.
  */
  const immunities =
    matchups
      .filter(
        (matchup) =>
          matchup.multiplier === 0
      )



  return {

    weaknesses,

    resistances,

    immunities,

  }
}



function PokemonPage() {

  /*
    ========================================
    PEGAR POKÉMON DA URL
    ========================================

    /pokemon/6

    ↓

    pokemonQuery = "6"
  */

  const {
    pokemonQuery,
  } = useParams()



  /*
    Navegação do React Router.
  */
  const navigate =
    useNavigate()



  /*
    ========================================
    ESTADOS
    ========================================
  */

  const [
    searchTerm,
    setSearchTerm,
  ] = useState(
    pokemonQuery || ''
  )


  const [
    pokemon,
    setPokemon,
  ] = useState(null)


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
    SINCRONIZAR PESQUISA COM URL
    ========================================
  */

  useEffect(() => {

    setSearchTerm(
      pokemonQuery || ''
    )

  }, [pokemonQuery])



  /*
    ========================================
    CARREGAR POKÉMON
    ========================================
  */

  useEffect(() => {

    async function loadPokemon() {

      setLoading(true)

      setError(null)


      try {

        /*
          ========================================
          1. DADOS PRINCIPAIS
          ========================================
        */

        const pokemonResponse =
          await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemonQuery}`
          )


        if (!pokemonResponse.ok) {

          throw new Error(
            'Pokémon not found.'
          )

        }


        const pokemonData =
          await pokemonResponse.json()



        /*
          ========================================
          NOVO:
          POKÉMON ANTERIOR E PRÓXIMO
          ========================================

          Nossa Pokédex atual:

          #001 → #151.
        */


        /*
          Se for maior que 1,
          existe anterior.
        */
        const previousPokemonId =

          pokemonData.id > 1

            ? pokemonData.id - 1

            : null



        /*
          Se for menor que 151,
          existe próximo.
        */
        const nextPokemonId =

          pokemonData.id < 151

            ? pokemonData.id + 1

            : null



        /*
          Buscamos os dois
          ao mesmo tempo.
        */
        const [
          previousPokemon,
          nextPokemon,
        ] = await Promise.all([

          loadPokemonNeighbor(
            previousPokemonId
          ),

          loadPokemonNeighbor(
            nextPokemonId
          ),

        ])



        /*
          ========================================
          2. ESPÉCIE
          ========================================
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
          ========================================
          3. EVOLUÇÃO
          ========================================
        */

        const evolutionResponse =
          await fetch(
            speciesData
              .evolution_chain
              .url
          )


        if (!evolutionResponse.ok) {

          throw new Error(
            'Evolution information not found.'
          )

        }


        const evolutionData =
          await evolutionResponse.json()



        /*
          ========================================
          4. DADOS DOS TIPOS
          ========================================
        */

        const typeResponses =
          await Promise.all(

            pokemonData
              .types
              .map(
                (typeInfo) => {

                  return fetch(
                    typeInfo.type.url
                  )

                }
              )

          )



        /*
          Transformamos tudo
          em JSON.
        */
        const typeDataList =
          await Promise.all(

            typeResponses.map(
              (response) => {

                if (!response.ok) {

                  throw new Error(
                    'Type information not found.'
                  )

                }


                return response.json()

              }
            )

          )



        /*
          Calculamos os matchups.
        */
        const typeMatchups =
          calculateTypeMatchups(
            typeDataList
          )



        /*
          ========================================
          CATEGORIA
          ========================================
        */

        const englishGenus =
          speciesData
            .genera
            .find(
              (genusInfo) =>

                genusInfo
                  .language
                  .name
                ===
                'en'

            )



        /*
          ========================================
          DESCRIÇÃO
          ========================================
        */

        const englishDescription =
          speciesData
            .flavor_text_entries
            .find(
              (entry) =>

                entry
                  .language
                  .name
                ===
                'en'

            )



        /*
          Cadeia evolutiva.
        */
        const evolutionFamily =
          extractEvolutionFamily(
            evolutionData.chain
          )



        /*
          ========================================
          OBJETO FINAL DO POKÉMON
          ========================================
        */

        const formattedPokemon = {


          /*
            Número.
          */
          number:
            pokemonData.id,


          /*
            Nome.
          */
          name:
            formatApiName(
              pokemonData.name
            ),


          /*
            Categoria.
          */
          category:
            englishGenus?.genus
            ||
            'Unknown Pokémon',


          /*
            Descrição.
          */
          description:
            englishDescription
              ?.flavor_text
              .replace(
                /\f/g,
                ' '
              )
              .replace(
                /\n/g,
                ' '
              )
            ||
            'No field notes available.',


          /*
            Altura.
          */
          height:
            pokemonData.height / 10,


          /*
            Peso.
          */
          weight:
            pokemonData.weight / 10,


          /*
            Habitat.
          */
          habitat:
            speciesData
              .habitat
              ?.name

              ? formatApiName(
                  speciesData
                    .habitat
                    .name
                )

              : 'Unknown',


          /*
            Geração.
          */
          generation:
            speciesData
              .generation
              ?.name

              ? formatGeneration(
                  speciesData
                    .generation
                    .name
                )

              : 'Unknown',


          /*
            Habilidades.
          */
          abilities:
            pokemonData
              .abilities
              .map(
                (abilityInfo) => {

                  return formatApiName(
                    abilityInfo
                      .ability
                      .name
                  )

                }
              ),


          /*
            Stats.
          */
          stats:
            pokemonData
              .stats
              .map(
                (statInfo) => {

                  const statName =
                    statInfo
                      .stat
                      .name


                  return {

                    name:
                      statName,

                    label:
                      statLabels[
                        statName
                      ]
                      ||
                      statName,

                    value:
                      statInfo
                        .base_stat,

                  }

                }
              ),


          /*
            Tipos.
          */
          types:
            pokemonData
              .types
              .map(
                (typeInfo) => {

                  return formatApiName(
                    typeInfo
                      .type
                      .name
                  )

                }
              ),


          /*
            Imagem.
          */
          image:
            pokemonData
              .sprites
              .other[
                'official-artwork'
              ]
              .front_default,


          /*
          ========================================
          CRY
          ========================================

          A PokéAPI entrega arquivos de áudio
          dentro de:

          pokemonData.cries

          Tentamos primeiro "latest".

          Se não existir, usamos "legacy".

          Se nenhum existir:
          null
        */
          cry:
          pokemonData.cries?.latest
          ||
          pokemonData.cries?.legacy
          ||
          null,


          /*
            Evolução.
          */
          evolutions:
            evolutionFamily,


          /*
            Fraquezas /
            resistências /
            imunidades.
          */
          matchups:
            typeMatchups,


          /*
            ========================================
            NAVEGAÇÃO

            ESSA ERA A PARTE QUE ESTAVA FALTANDO.
            ========================================
          */

          navigation: {

            previous:
              previousPokemon,

            next:
              nextPokemon,

          },

        }



        /*
          Salva tudo.
        */
        setPokemon(
          formattedPokemon
        )

      } catch (error) {

        setError(
          error.message
        )

      } finally {

        setLoading(false)

      }

    }


    loadPokemon()

  }, [pokemonQuery])



  /*
    ========================================
    PESQUISA
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
    ABRIR OUTRO POKÉMON
    ========================================
  */

  function goToPokemon(id) {

    navigate(
      `/pokemon/${id}`
    )

  }



  /*
    ========================================
    TEMA VISUAL
    ========================================
  */

  const primaryType =
    pokemon
      ?.types
      ?.[0]
      ?.toLowerCase()
    ||
    'normal'


  const currentTheme =
    typeThemes[
      primaryType
    ]
    ||
    typeThemes.normal



  /*
    ========================================
    INTERFACE
    ========================================
  */

  return (
    <main

      className="home pokemon-record-page"

      style={{

        '--accent-color':
          currentTheme.accent,

        '--soft-color':
          currentTheme.soft,

      }}

    >


      {/* HEADER */}
      <header className="header">


        {/* Volta para Home */}
        <button

          className="logo-button"

          onClick={() => {
            navigate('/')
          }}

        >
          FIELD DEX
        </button>


        <p className="database-name">
          Pokémon Research Database
        </p>

      </header>



      {/* PESQUISA */}
      <PokemonSearch

        searchTerm={
          searchTerm
        }

        onSearchTermChange={
          setSearchTerm
        }

        onSearch={
          handleSearch
        }

      />



      {/* CONTEÚDO */}
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

          /*
            A key diz ao React:

            "quando o número mudar,
            este é um novo componente."

            Isso faz as animações de entrada
            do PokemonHero reiniciarem quando
            navegarmos para outro Pokémon.
          */
          key={
            pokemon.number
          }

          pokemon={
            pokemon
          }

          onSelectPokemon={
            goToPokemon
          }

        />

      )}

    </main>
  )
}


export default PokemonPage