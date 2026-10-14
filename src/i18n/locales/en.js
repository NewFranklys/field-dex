export default {
  common: {
    skipToContent: "Skip to content",
    brandHome: "FIELD DEX home",
    brandTagline: "Pokémon companion platform",
    nav: { home: "Home", pokedex: "Pokédex", types: "Types", aria: "Main navigation" },
    currentModule: { label: "Current module", value: "Species Research", aria: "Current public module" },
    language: { label: "Language", en: "English", ptBR: "Português (Brasil)" },
    titles: {
      home: "FIELD DEX | Pokémon Companion Platform",
      pokedex: "National Dex | FIELD DEX",
      types: "Type Analysis | FIELD DEX",
      record: "Field Record | FIELD DEX",
      notFound: "Page Not Found | FIELD DEX"
    },
    pageNotFound: {
      title: "Page not found",
      body: "This route is not available in the current FIELD DEX experience.",
      action: "Open the current species archive →"
    },
    search: { pokemon: "Search Pokémon", button: "Search", placeholder: "Search name or #" },
    states: {
      searching: "Searching field database…",
      retry: "Try again",
      notFound: "Pokémon not found.",
      unavailable: "The research database is temporarily unavailable.",
      timeout: "The request took too long. Please try again.",
      offline: "Could not reach the research database. Check your connection and try again.",
      outOfScope: "This record is outside the current National Dex scope.",
      alternateForm: "This alternate form is not exposed in the current species archive."
    },
    types: {
      normal: "Normal", fire: "Fire", water: "Water", electric: "Electric", grass: "Grass", ice: "Ice",
      fighting: "Fighting", poison: "Poison", ground: "Ground", flying: "Flying", psychic: "Psychic", bug: "Bug",
      rock: "Rock", ghost: "Ghost", dragon: "Dragon", dark: "Dark", steel: "Steel", fairy: "Fairy"
    },
    habitats: {
      cave: "Cave", forest: "Forest", grassland: "Grassland", mountain: "Mountain", rare: "Rare",
      "rough-terrain": "Rough terrain", sea: "Sea", urban: "Urban", "waters-edge": "Water's edge"
    },
    stats: {
      hp: "HP", attack: "Attack", defense: "Defense", "special-attack": "Sp. Atk", "special-defense": "Sp. Def", speed: "Speed"
    }
  },
  home: {
    eyebrow: "Pokémon Companion Platform",
    currentArchive: "Current Archive",
    kantoRange: "National / 001—1025",
    sectionLabel: "Species Research",
    title1: "Explore the world",
    title2: "one species at a time.",
    description: "Explore the National Dex: search species from every generation, study their biology, compare base stats and trace evolutionary families.",
    scopeNote: "Current public dataset · National Dex 001—1025",
    featured: "Featured Specimen",
    scanning: "Scanning...",
    rescan: "Rescan ↻",
    searchingArchive: "Searching archive",
    specimen: "Specimen / {{number}}",
    viewRecord: "View record →",
    type: "Type",
    height: "Height",
    weight: "Weight",
    categoryFallback: "{{type}}-type Pokémon",
    encounter: {
      label: "Encounter", kicker: "Unknown specimen", title1: "Random", title2: "Encounter",
      description: "Pull an unidentified entry from the current National Dex.", action: "Initiate scan ↗"
    },
    archive: {
      label: "Species Archive", kicker: "National Dex", title1: "Browse", title2: "Pokédex",
      description: "Browse catalogued species from Generation I through IX.", action: "Open archive ↗"
    },
    typeModule: {
      label: "Classification", kicker: "18 elemental classes", title1: "Explore", title2: "Types",
      description: "Study the current type system using representatives from across the National Dex.", action: "View classes ↗"
    },
    footer: "FIELD DEX · Current archive: National Dex / 001—1025"
  },
  pokedex: {
    currentArchive: "Current Archive",
    range: "National / 001—1025",
    eyebrow: "Species Research / National Dex",
    title: "National Dex",
    description: "Explore FIELD DEX's national species catalogue. Filter by generation, type, name or number without mounting the full archive at once.",
    currentClassification: "Current Classification",
    allSpecies: "All Species",
    searchSpecies: "Search Species",
    nameOrNumber: "Name or #",
    activeRecords: "Active Records",
    generationFilter: "Generation",
    generationFilterAria: "Filter by generation",
    generationShort: "Generation",
    generationState: "Generation {{generation}} · {{region}}",
    national: "National Dex",
    allGenerations: "All",
    showing: "Showing {{visible}} of {{total}}",
    loadMore: "Load more records",
    filterAria: "Filter by type",
    allTypes: "All Types",
    indexing: "Indexing National Dex...",
    noMatches: "No matching records",
    noMatchesBody: "Try another name, number, generation or type.",
    clear: "Clear search and filters",
    entry: "Entry",
    viewRecord: "View field record"
  },
  typesPage: {
    headerLabel: "Type Research",
    headerValue: "Current Type System",
    eyebrow: "Classification Observatory",
    title: "Type Analysis",
    description: "Study National Dex species through the current elemental classification system and analyze their battle relationships.",
    database: "Research Database",
    indexing: "Indexing",
    offline: "Offline",
    classesOnline: "18 Classes Online",
    navAria: "Pokémon types",
    loading: "Indexing type research...",
    classification: "Classification / {{index}}",
    kantoRecords: "National Dex species\nrecords",
    viewSpecies: "View {{type}} species",
    noRecords: "No species records",
    battleData: "Battle classification data remains available.",
    attackProfile: "Attack Profile",
    offensive: "Offensive relationships",
    superEffective: "Super Effective",
    notVeryEffective: "Not Very Effective",
    noEffect: "No Effect",
    defenseProfile: "Defense Profile",
    defensive: "Defensive relationships",
    weakTo: "Weak To",
    resists: "Resists",
    immuneTo: "Immune To"
  },
  record: {
    databaseName: "Pokémon Research Database",
    back: "← Back to species archive",
    fieldRecord: "Field Record / {{number}}",
    height: "Height", weight: "Weight", habitat: "Habitat", generation: "Generation", abilities: "Abilities", hidden: "hidden",
    registered: "Registered specimen",
    categoryFallback: "{{type}}-type Pokémon",
    sourceFallback: "Source text: {{language}}",
    statsTitle: "Base Stat Analysis", statsSubtitle: "Species baseline values · scale 0–255",
    bstAria: "Base stat total",
    vocalization: "Vocalization", vocalizationSubtitle: "Recorded species cry",
    typeResponse: "Type Response", typeSubtitle: "Defensive interaction analysis",
    typeUnavailable: "Type response data unavailable.",
    typeContext: "Current type chart. Abilities, moves and battle conditions are not included.",
    weakTo: "Weak To", resists: "Resists", immuneTo: "Immune To", none: "None",
    evolutionTitle: "Evolution Record", evolutionSubtitle: "Registered evolutionary family · National Dex",
    extendedFamily: "This family contains species outside the current public scope. Available records are shown below.",
    evolutionUnavailable: "Evolution data unavailable.",
    currentRecord: "Current record", outsideKanto: "outside archive", from: "From {{name}}{{suffix}} →", familyOrigin: "Family origin",
    noFurther: "No further evolutions recorded.",
    sizeComparisonAria: "Size comparison",
    sizeComparisonTitle: "Scale Reference",
    sizeComparisonSubtitle: "Species height compared with a 1.75 m human reference",
    humanReference: "Human reference",
    spriteArchiveTitle: "Specimen Archive",
    spriteArchiveSubtitle: "Historical in-game sprite representations by generation",
    spriteUnavailable: "No archived sprite",
    adjacentAria: "Adjacent Pokémon records", previous: "← Previous Record", next: "Next Record →",
    cry: {
      unavailable: "No recorded cry available.", pause: "Pause cry", play: "Play cry", loading: "Loading…", playing: "Playing", playLabel: "Play Cry",
      error: "Cry playback unavailable. You can try playing again."
    },
    warnings: {
      speciesNotes: "Species notes unavailable.", typeResponse: "Type response unavailable.", evolutionFamily: "Evolution family unavailable.",
      suffix: "The available record is shown below."
    },
    evolution: {
      base: "Base form", missing: "Method not recorded", trade: "Trade", holding: "holding {{item}}", friendship: "High friendship",
      affection: "Affection {{value}}+", beauty: "Beauty {{value}}+", at: "at {{location}}", knowing: "knowing {{move}}",
      knowingType: "knowing a {{type}} move", rain: "Rain", female: "Female", male: "Male", day: "Day", night: "Night"
    }
  }
};
