/*
  ========================================
  DADOS DOS TIPOS
  ========================================

  Centralizamos aqui informações visuais
  sobre os tipos Pokémon.

  Isso evita repetir:

  Fire = vermelho
  Water = azul
  Ghost = roxo

  em vários arquivos diferentes.

  Mais tarde podemos adicionar aqui:

  - ícones
  - traduções
  - outros detalhes
*/

export const pokemonTypes = [

  {
    slug: 'normal',
    name: 'Normal',
    accent: '#77736a',
    soft: '#e9e7e1',
    description: 'Adaptable species with broad characteristics.',
  },

  {
    slug: 'fire',
    name: 'Fire',
    accent: '#c56545',
    soft: '#f3e5dc',
    description: 'Species associated with heat, flames and combustion.',
  },

  {
    slug: 'water',
    name: 'Water',
    accent: '#4f7fa3',
    soft: '#e0eaf0',
    description: 'Aquatic species adapted to rivers, seas and lakes.',
  },

  {
    slug: 'electric',
    name: 'Electric',
    accent: '#c49b28',
    soft: '#f2ecd2',
    description: 'Species capable of generating electrical energy.',
  },

  {
    slug: 'grass',
    name: 'Grass',
    accent: '#5f8f66',
    soft: '#e7eee2',
    description: 'Species closely connected to plants and nature.',
  },

  {
    slug: 'ice',
    name: 'Ice',
    accent: '#60989a',
    soft: '#e2eeee',
    description: 'Species adapted to extreme cold and frozen habitats.',
  },

  {
    slug: 'fighting',
    name: 'Fighting',
    accent: '#914c43',
    soft: '#eee1de',
    description: 'Species specialized in physical combat.',
  },

  {
    slug: 'poison',
    name: 'Poison',
    accent: '#875a91',
    soft: '#ebe2ec',
    description: 'Species that use toxins, venom and poisonous compounds.',
  },

  {
    slug: 'ground',
    name: 'Ground',
    accent: '#9b7748',
    soft: '#eee6d9',
    description: 'Species associated with soil, sand and the earth.',
  },

  {
    slug: 'flying',
    name: 'Flying',
    accent: '#7183a5',
    soft: '#e5e9ef',
    description: 'Species adapted for aerial movement and flight.',
  },

  {
    slug: 'psychic',
    name: 'Psychic',
    accent: '#aa6075',
    soft: '#f0e1e5',
    description: 'Species capable of extraordinary mental abilities.',
  },

  {
    slug: 'bug',
    name: 'Bug',
    accent: '#788843',
    soft: '#e8ebdc',
    description: 'Species inspired by insects and other small creatures.',
  },

  {
    slug: 'rock',
    name: 'Rock',
    accent: '#88774f',
    soft: '#ebe7dd',
    description: 'Species with bodies connected to stone and minerals.',
  },

  {
    slug: 'ghost',
    name: 'Ghost',
    accent: '#65577e',
    soft: '#e7e3ec',
    description: 'Mysterious species associated with spirits and shadows.',
  },

  {
    slug: 'dragon',
    name: 'Dragon',
    accent: '#66549c',
    soft: '#e5e1ee',
    description: 'Rare species possessing extraordinary draconic power.',
  },

  {
    slug: 'dark',
    name: 'Dark',
    accent: '#514a47',
    soft: '#e5e2df',
    description: 'Species known for cunning and unconventional tactics.',
  },

  {
    slug: 'steel',
    name: 'Steel',
    accent: '#66747a',
    soft: '#e5e9ea',
    description: 'Species protected by metallic bodies and armor.',
  },

  {
    slug: 'fairy',
    name: 'Fairy',
    accent: '#b86f92',
    soft: '#f1e1e8',
    description: 'Species associated with mysterious magical energy.',
  },

]


/*
  Função auxiliar.

  Recebe:

  "fire"

  e devolve:

  {
    slug: 'fire',
    name: 'Fire',
    accent: ...
  }
*/
export function getTypeMeta(slug) {

  return pokemonTypes.find(
    (type) =>
      type.slug === slug
  )

}